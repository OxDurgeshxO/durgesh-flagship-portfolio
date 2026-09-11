// Capture Command Palette screenshot via Chrome CDP
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9223;

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
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    '--window-size=1920,1080',
    'http://localhost:3000',
  ]);

  try {
    for (let i = 0; i < 20; i++) {
      try {
        await fetchJson(`http://127.0.0.1:${PORT}/json/version`);
        break;
      } catch {
        await sleep(250);
      }
    }

    const list = await fetchJson(`http://127.0.0.1:${PORT}/json/list`);
    const target = list.find((t) => t.type === 'page') || list[0];
    const ws = new WebSocket(target.webSocketDebuggerUrl);

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
    await send('Runtime.enable');

    // Wait for initial render
    await sleep(3500);

    // Dispatch custom event to open command palette
    await send('Runtime.evaluate', {
      expression: 'window.dispatchEvent(new CustomEvent("open-command-palette"))',
    });

    // Wait 500ms for modal spring animation
    await sleep(600);

    const result = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(result.data, 'base64');

    const outPath = path.resolve('public', 'live-command-palette.png');
    fs.writeFileSync(outPath, buffer);
    console.log(`✅ Saved Command Palette screenshot (${buffer.length} bytes) to: ${outPath}`);

    ws.close();
  } finally {
    chrome.kill('SIGKILL');
  }
}

capture().catch((err) => {
  console.error('CDP Palette Capture Error:', err);
  process.exit(1);
});
