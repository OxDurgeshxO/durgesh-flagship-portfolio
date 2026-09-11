import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9226;

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function testMobile() {
  console.log('--- Testing Mobile Emulation (iPhone & Android) ---');
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    '--window-size=393,852',
    'http://localhost:3000',
  ]);

  try {
    let connected = false;
    for (let i = 0; i < 20; i++) {
      try {
        await fetchJson(`http://127.0.0.1:${PORT}/json/version`);
        connected = true;
        break;
      } catch {
        await sleep(250);
      }
    }

    if (!connected) throw new Error('Could not connect to Chrome CDP');

    const list = await fetchJson(`http://127.0.0.1:${PORT}/json/list`);
    const target = list.find((t) => t.type === 'page') || list[0];
    const { WebSocket } = await import('ws');
    const ws = new WebSocket(target.webSocketDebuggerUrl);

    await new Promise((resolve) => ws.on('open', resolve));

    let id = 1;
    function sendCommand(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        const handler = (data) => {
          const res = JSON.parse(data.toString());
          if (res.id === msgId) {
            ws.off('message', handler);
            if (res.error) reject(res.error);
            else resolve(res.result);
          }
        };
        ws.on('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    // Emulate iPhone 14 Pro
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 393,
      height: 852,
      deviceScaleFactor: 3,
      mobile: true,
      hasTouch: true,
    });
    await sendCommand('Emulation.setUserAgentOverride', {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    });

    await sendCommand('Page.enable');
    await sendCommand('Runtime.enable');

    console.log('Waiting 5.2s for mobile loading & layout to finish completely...');
    await sleep(5200);

    // 1. Check for horizontal overflow (critical for smooth mobile UX)
    const overflowCheck = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const docWidth = document.documentElement.offsetWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const windowWidth = window.innerWidth;
        const hasHorizontalScroll = scrollWidth > windowWidth;
        return { docWidth, scrollWidth, windowWidth, hasHorizontalScroll };
      })()`,
      returnByValue: true,
    });
    console.log('Mobile Viewport Width Check:', overflowCheck.result.value);

    // Capture iPhone Hero screenshot
    const shotHero = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/mobile-iphone-hero.png', Buffer.from(shotHero.data, 'base64'));
    console.log('✅ Captured public/mobile-iphone-hero.png');

    // 2. Click Hamburger Menu
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('☰'));
        if (btn) btn.click();
        return !!btn;
      })()`,
      returnByValue: true,
    });
    await sleep(600);

    const shotMenu = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/mobile-iphone-menu.png', Buffer.from(shotMenu.data, 'base64'));
    console.log('✅ Captured public/mobile-iphone-menu.png');

    // 3. Emulate Android (Pixel 7)
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 412,
      height: 915,
      deviceScaleFactor: 2.625,
      mobile: true,
      hasTouch: true,
    });
    await sendCommand('Emulation.setUserAgentOverride', {
      userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
    });
    await sendCommand('Page.navigate', { url: 'http://localhost:3000/resume' });
    await sleep(2000);

    const shotAndroidResume = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/mobile-android-resume.png', Buffer.from(shotAndroidResume.data, 'base64'));
    console.log('✅ Captured public/mobile-android-resume.png');

    ws.close();
    chrome.kill();
    console.log('Mobile tests completed successfully!');
  } catch (err) {
    chrome.kill();
    throw err;
  }
}

testMobile().catch((e) => {
  console.error(e);
  process.exit(1);
});
