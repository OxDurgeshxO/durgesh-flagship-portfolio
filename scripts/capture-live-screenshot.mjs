// Capture live screenshot via Chrome DevTools Protocol
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;

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

async function capture() {
  console.log('Spawning Chrome with CDP on http://localhost:3000...');
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    '--window-size=1920,1080',
    'http://localhost:3000',
  ]);

  try {
    // Wait for CDP port
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

    if (!connected) {
      throw new Error('Could not connect to Chrome CDP');
    }

    console.log('Connected to Chrome CDP! Finding portfolio tab...');
    const list = await fetchJson(`http://127.0.0.1:${PORT}/json/list`);
    const target = list.find((t) => t.type === 'page') || list[0];
    const wsUrl = target.webSocketDebuggerUrl;

    // Use built-in WebSocket in Node 20+
    const ws = new WebSocket(wsUrl);

    await new Promise((resolve) => (ws.onopen = resolve));

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === id) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');

    console.log('Waiting 3.5s for loading screen animation to finish...');
    await sleep(3500);

    console.log('Capturing viewport screenshot...');
    const result = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(result.data, 'base64');

    const outPath = path.resolve('public', 'live-portfolio-screen.png');
    fs.writeFileSync(outPath, buffer);
    console.log(`✅ Saved live screenshot (${buffer.length} bytes) to: ${outPath}`);

    ws.close();
  } finally {
    chrome.kill('SIGKILL');
  }
}

capture().catch((err) => {
  console.error('CDP Capture Error:', err);
  process.exit(1);
});
