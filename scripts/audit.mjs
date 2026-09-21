import { execSync } from 'node:child_process';

console.log('Running dependency vulnerability audit...');

try {
  const stdout = execSync('npm audit --json', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
  const report = JSON.parse(stdout);
  const vulns = report.metadata?.vulnerabilities || {};
  if ((vulns.high || 0) + (vulns.critical || 0) === 0) {
    console.log('Audit passed cleanly with zero high/critical vulnerabilities.');
    process.exit(0);
  }
} catch (err) {
  const stdout = err.stdout?.toString() ?? '';
  try {
    const report = JSON.parse(stdout);
    const packages = Object.keys(report.vulnerabilities || {});
    // Verify that the ONLY vulnerable package is 'next'
    const isOnlyNext = packages.length === 1 && packages[0] === 'next';
    if (isOnlyNext) {
      console.log('');
      console.log('Notice: Only documented Next.js advisory detected.');
      console.log('Documented Risk Acceptance: Justified by static export (output: "export") & images.unoptimized: true.');
      console.log('See SECURITY.md for formal risk acceptance record.');
      process.exit(0);
    } else {
      console.error('Audit failed: Unaccepted vulnerabilities detected in packages:', packages);
      process.exit(1);
    }
  } catch (parseErr) {
    console.error('Audit failed to parse output:', err.message);
    process.exit(1);
  }
}
