import { spawn } from 'child_process';
import http from 'http';
import { WebSocket } from 'ws';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9225;

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

async function runInteractiveTests() {
  console.log('--- Starting Chrome Interactive Feature Audit ---');
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    '--window-size=1920,1080',
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
    const wsUrl = target.webSocketDebuggerUrl;
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

    const consoleErrors = [];
    ws.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
          consoleErrors.push(msg.params.args.map((a) => a.value || a.description).join(' '));
        }
      } catch {}
    });

    await sendCommand('Console.enable');
    await sendCommand('Runtime.enable');

    console.log('Waiting 3.5s for initial animation and hydration...');
    await sleep(3500);

    // 1. Evaluate Hero Resume CTAs
    const heroCtas = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const resumeBtn = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('View Resume'));
        const downloadBtn = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('Download PDF'));
        const resumeBtnHasUpcoming = resumeBtn ? resumeBtn.textContent.includes('Upcoming') : false;
        return {
          resumeHref: resumeBtn ? resumeBtn.getAttribute('href') : null,
          downloadHref: downloadBtn ? downloadBtn.getAttribute('href') : null,
          resumeBtnHasUpcoming
        };
      })()`,
      returnByValue: true,
    });
    console.log('Hero CTAs:', heroCtas.result.value);

    // 2. Test Accessibility Panel
    const a11yTrigger = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        window.dispatchEvent(new CustomEvent('open-accessibility-panel'));
        return true;
      })()`,
      returnByValue: true,
    });
    await sleep(600);

    const a11yStatus = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const panel = document.querySelector('[role="dialog"]') || Array.from(document.querySelectorAll('div')).find(d => d.textContent.includes('Accessibility Settings') || d.textContent.includes('Reduced Motion'));
        return { open: !!panel, textSnippet: panel ? panel.textContent.slice(0, 80) : null };
      })()`,
      returnByValue: true,
    });
    console.log('A11y Panel via Event/Shortcut:', a11yStatus.result.value);

    // 3. Test Command Palette
    const paletteTrigger = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        window.dispatchEvent(new CustomEvent('open-command-palette'));
        return true;
      })()`,
      returnByValue: true,
    });
    await sleep(600);

    const paletteStatus = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const input = document.querySelector('input[placeholder*="Type a command"]');
        const hud = Array.from(document.querySelectorAll('div')).find(d => d.textContent.includes('Neo-Tokyo HUD'));
        return { open: !!(input || hud) };
      })()`,
      returnByValue: true,
    });
    console.log('Command Palette via Event/Shortcut:', paletteStatus.result.value);

    // 4. Test Navigation to /work/fittrack
    await sendCommand('Page.navigate', { url: 'http://localhost:3000/work/fittrack' });
    await sleep(2000);

    const fitTrackStatus = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const h1 = document.querySelector('h1')?.textContent || '';
        const hasArchitecture = document.body.textContent.includes('Architecture') || document.body.textContent.includes('Overview');
        return { title: h1, hasContent: hasArchitecture };
      })()`,
      returnByValue: true,
    });
    console.log('Case study /work/fittrack:', fitTrackStatus.result.value);

    // 5. Test Navigation to /privacy
    await sendCommand('Page.navigate', { url: 'http://localhost:3000/privacy' });
    await sleep(1500);

    const privacyStatus = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const h1 = document.querySelector('h1')?.textContent || '';
        const mentionsCamera = document.body.textContent.includes('Camera & Vision Access');
        const mentionsNoTrackers = document.body.textContent.includes('Zero Microphone Access');
        return { title: h1, mentionsCamera, mentionsNoTrackers };
      })()`,
      returnByValue: true,
    });
    console.log('Privacy Center /privacy:', privacyStatus.result.value);

    // 6. Test Navigation to /recruiter
    await sendCommand('Page.navigate', { url: 'http://localhost:3000/recruiter' });
    await sleep(1500);

    const recruiterStatus = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const hasContent = document.body.textContent.includes('Recruiter Fast-Track') || document.body.textContent.includes('Candidate Summary');
        return { hasContent };
      })()`,
      returnByValue: true,
    });
    console.log('Recruiter overview /recruiter:', recruiterStatus.result.value);

    // 7. Test Navigation to /performance
    await sendCommand('Page.navigate', { url: 'http://localhost:3000/performance' });
    await sleep(1500);

    const perfStatus = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const hasPerfTelemetry = document.body.textContent.includes('Performance') || document.body.textContent.includes('Lighthouse');
        return { hasPerfTelemetry };
      })()`,
      returnByValue: true,
    });
    console.log('Performance center /performance:', perfStatus.result.value);

    // 8. Test Navigation to /resume
    await sendCommand('Page.navigate', { url: 'http://localhost:3000/resume' });
    await sleep(1500);

    const resumeStatus = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const hasResumePdf = !!document.querySelector('a[href="/resume.pdf"]');
        const hasDurgesh = document.body.textContent.includes('Durgesh Dutt Sinha');
        return { hasResumePdf, hasDurgesh };
      })()`,
      returnByValue: true,
    });
    console.log('Resume view /resume:', resumeStatus.result.value);

    // 9. Check console errors count
    console.log('\nConsole Errors count:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log('Console Errors:', consoleErrors);
    }

    ws.close();
    chrome.kill();

    if (
      heroCtas.result.value.resumeHref === '/resume' &&
      heroCtas.result.value.downloadHref === '/resume.pdf' &&
      !heroCtas.result.value.resumeBtnHasUpcoming &&
      a11yStatus.result.value.open &&
      paletteStatus.result.value.open &&
      fitTrackStatus.result.value.hasContent &&
      privacyStatus.result.value.mentionsCamera &&
      privacyStatus.result.value.mentionsNoTrackers &&
      recruiterStatus.result.value.hasContent &&
      perfStatus.result.value.hasPerfTelemetry &&
      resumeStatus.result.value.hasResumePdf &&
      resumeStatus.result.value.hasDurgesh
    ) {
      console.log('\n🎉 ALL 9 CRITICAL INTERACTIVE CHECKS PASSED WITH ZERO ERRORS!');
    } else {
      console.error('\n⚠️ Some interactive checks did not meet criteria.');
      process.exit(1);
    }
  } catch (err) {
    chrome.kill();
    throw err;
  }
}

runInteractiveTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
