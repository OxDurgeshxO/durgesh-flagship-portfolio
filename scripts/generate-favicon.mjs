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

function makeIcoFromPng(pngBuffer, width = 32, height = 32) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(1, 4); // 1 image

  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(width === 256 ? 0 : width, 0);
  dirEntry.writeUInt8(height === 256 ? 0 : height, 1);
  dirEntry.writeUInt8(0, 2); // color count
  dirEntry.writeUInt8(0, 3); // reserved
  dirEntry.writeUInt16LE(1, 4); // color planes
  dirEntry.writeUInt16LE(32, 6); // bpp
  dirEntry.writeUInt32LE(pngBuffer.length, 8); // size
  dirEntry.writeUInt32LE(22, 12); // offset (6 + 16 = 22)

  return Buffer.concat([header, dirEntry, pngBuffer]);
}

async function run() {
  const iconUrl = 'http://localhost:3000/icon.svg';
  console.log('Spawning Chrome to snapshot icon.svg at 32x32...');
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    '--window-size=128,128',
    iconUrl,
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
    const wsUrl = target.webSocketDebuggerUrl;

    const { WebSocket } = await import('ws');
    const ws = new WebSocket(wsUrl);

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

    await sleep(500);

    const shot = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 128, height: 128, scale: 0.25 }, // 32x32
    });

    ws.close();
    chrome.kill();

    const pngBuf = Buffer.from(shot.data, 'base64');
    const icoBuf = makeIcoFromPng(pngBuf, 32, 32);

    fs.writeFileSync('public/favicon.ico', icoBuf);
    fs.writeFileSync('out/favicon.ico', icoBuf);
    console.log('✅ Successfully created public/favicon.ico and out/favicon.ico (' + icoBuf.length + ' bytes)');
  } catch (err) {
    chrome.kill();
    throw err;
  }
}

run().catch((e) => {
  console.error('Error generating favicon:', e);
  process.exit(1);
});
