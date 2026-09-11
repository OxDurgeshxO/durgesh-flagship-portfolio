import http from 'http';

const routes = [
  '/',
  '/resume',
  '/resume.pdf',
  '/work/fittrack',
  '/work/roleradar',
  '/work/marketmatch-ai',
  '/work/fitness-platform',
  '/lab',
  '/recruiter',
  '/performance',
  '/github-health',
  '/changelog',
  '/privacy',
  '/favicon.ico',
  '/icon.svg',
  '/og-image.png'
];

async function checkAll() {
  console.log('--- Testing HTTP Statuses for All Routes & Static Assets ---');
  let failures = 0;
  for (const r of routes) {
    try {
      const res = await fetch('http://127.0.0.1:3000' + r);
      const ct = res.headers.get('content-type') || '';
      const size = res.headers.get('content-length') || 'chunked';
      console.log(`[${res.status}] ${r.padEnd(25)} -> ${ct.split(';')[0]} (${size} bytes)`);
      if (res.status !== 200) {
        failures++;
      }
    } catch (err) {
      console.error(`[FAIL] ${r}: ${err.message}`);
      failures++;
    }
  }

  console.log(`\nRoute test complete: ${routes.length - failures}/${routes.length} succeeded. Failures: ${failures}`);
  if (failures > 0) process.exit(1);
}

checkAll();
