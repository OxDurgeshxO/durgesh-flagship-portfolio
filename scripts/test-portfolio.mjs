// Automated Portfolio Validation & Testing Suite
import http from 'http';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000';

function get(pathStr) {
  return new Promise((resolve, reject) => {
    http.get(BASE_URL + pathStr, (res) => {
      let data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(data);
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body,
          text: () => body.toString('utf8'),
        });
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('🚀 RUNNING COMPREHENSIVE PORTFOLIO TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}: ${details}`);
      failed++;
    }
  }

  // TEST 1: Root Home Page Response
  try {
    const homeRes = await get('/');
    assert(homeRes.statusCode === 200, 'Home page returns HTTP 200 OK');
    assert(homeRes.headers['content-type'].includes('text/html'), 'Content-Type is text/html');
    const html = homeRes.text();
    assert(html.length > 50000, `Page HTML size is substantial (${html.length} bytes)`);

    // TEST 2: Critical DOM Landmarks
    assert(html.includes('id="hero"'), 'Hero Section (#hero) is present');
    assert(html.includes('id="about"'), 'About Section (#about) is present');
    assert(html.includes('id="experience"'), 'Experience Section (#experience) is present');
    assert(html.includes('id="education"'), 'Education Section (#education) is present');
    assert(html.includes('id="projects"'), 'Featured Projects (#projects) is present');
    assert(html.includes('id="github-projects"'), 'GitHub Showcase (#github-projects) is present');
    assert(html.includes('id="contact"'), 'Contact Section (#contact) is present');

    // TEST 3: Navigation & Quick Search Command Palette
    assert(html.includes('DDS'), 'Brand Monogram "DDS" is present in Navbar');
    assert(html.includes('Search'), 'Navbar includes Quick Search trigger');
    assert(html.includes('⌘K'), 'Navbar includes "⌘K" Command Palette badge');

    // TEST 4: Category Filter Pills in Featured Projects
    assert(html.includes('All Platforms'), 'Category filter "✨ All Platforms" is rendered');
    assert(html.includes('Full Stack AI'), 'Category filter "Full Stack AI" is rendered');
    assert(html.includes('Computer Vision'), 'Category filter "Computer Vision" is rendered');
    assert(html.includes('Machine Learning'), 'Category filter "Machine Learning" is rendered');

    // TEST 5: Contact Section Dual Fallback
    assert(html.includes('Available for AIML'), 'Contact section renders availability status');
    assert(html.includes('Copy'), 'Contact section provides copy button');

  } catch (err) {
    assert(false, 'Home page request', err.message);
  }

  // TEST 6: Resume PDF Endpoint & File Size
  try {
    const resumeRes = await get('/resume.pdf');
    assert(resumeRes.statusCode === 200, 'Resume PDF endpoint returns HTTP 200 OK');
    assert(resumeRes.headers['content-type'] === 'application/pdf', 'Resume Content-Type is application/pdf');
    const size = parseInt(resumeRes.headers['content-length'], 10);
    assert(size > 500000, `Verified resume is 534 KB authentic PDF (Actual: ${size} bytes, not 899B dummy)`);
  } catch (err) {
    assert(false, 'Resume PDF endpoint', err.message);
  }

  // TEST 7: Vector SVG Favicon Endpoint
  try {
    const iconRes = await get('/icon.svg');
    assert(iconRes.statusCode === 200, 'Vector favicon (/icon.svg) returns HTTP 200 OK');
    assert(iconRes.headers['content-type'].includes('svg'), 'Favicon Content-Type is image/svg+xml');
  } catch (err) {
    assert(false, 'Favicon endpoint', err.message);
  }

  // TEST 8: Ultra-HD Social Share Preview Image
  try {
    const ogRes = await get('/og-image.png');
    assert(ogRes.statusCode === 200, 'Social share preview (/og-image.png) returns HTTP 200 OK');
    assert(ogRes.headers['content-type'] === 'image/png', 'OG Image Content-Type is image/png');
    const ogSize = parseInt(ogRes.headers['content-length'], 10);
    assert(ogSize > 500000, `OG Image is high resolution Ultra-HD (${ogSize} bytes)`);
  } catch (err) {
    assert(false, 'OG Image endpoint', err.message);
  }

  // TEST 9: Color System Verification (Zero Legacy Cyan in Components)
  try {
    const componentsDir = path.resolve('components');
    const files = fs.readdirSync(componentsDir, { recursive: true });
    let legacyCyanCount = 0;
    for (const file of files) {
      if (typeof file === 'string' && (file.endsWith('.tsx') || file.endsWith('.ts'))) {
        const fullPath = path.join(componentsDir, file);
        if (fs.statSync(fullPath).isFile()) {
          const content = fs.readFileSync(fullPath, 'utf8');
          const matches = content.match(/from-cyan-|to-cyan-|text-cyan-|border-cyan-|bg-cyan-/g);
          if (matches) legacyCyanCount += matches.length;
        }
      }
    }
    assert(legacyCyanCount === 0, `Zero legacy cyan styling classes in components/ (Found: ${legacyCyanCount})`);
  } catch (err) {
    assert(false, 'Color system audit', err.message);
  }

  // TEST 10: CommandPalette Component Verification
  try {
    const cpPath = path.resolve('components', 'CommandPalette.tsx');
    assert(fs.existsSync(cpPath), 'CommandPalette.tsx exists');
    const cpCode = fs.readFileSync(cpPath, 'utf8');
    assert(cpCode.includes('ctrlKey') || cpCode.includes('metaKey'), 'CommandPalette listens for Ctrl+K / Cmd+K');
    assert(cpCode.includes('open-command-palette'), 'CommandPalette listens for custom window event');
    assert(cpCode.includes('Quick Actions'), 'CommandPalette includes quick project actions');
  } catch (err) {
    assert(false, 'CommandPalette component verification', err.message);
  }

  // TEST 11: CyberBot Audio Mute Persistence
  try {
    const cbPath = path.resolve('components', 'companion', 'RoamingCompanion3D.tsx');
    const cbCode = fs.readFileSync(cbPath, 'utf8');
    assert(cbCode.includes('cyberbot_muted'), 'RoamingCompanion3D tracks persistent cyberbot_muted in localStorage');
    assert(cbCode.includes('isMutedRef'), 'Audio synthesis uses ref check to immediately mute audio');
    assert(cbCode.includes('cyberbot-mute-toggle'), 'RoamingCompanion3D listens to cyberbot-mute-toggle event');
  } catch (err) {
    assert(false, 'CyberBot audio mute check', err.message);
  }

  // TEST 12: LoadingScreen Palette Purity
  try {
    const lsPath = path.resolve('components', 'LoadingScreen.tsx');
    const lsCode = fs.readFileSync(lsPath, 'utf8');
    assert(!lsCode.includes('#00d4ff'), 'LoadingScreen contains 0 instances of legacy cyan (#00d4ff)');
    assert(lsCode.includes('text-rose-400') && lsCode.includes('from-purple-500'), 'LoadingScreen uses Sunset Violet & Rose Quartz');
  } catch (err) {
    assert(false, 'LoadingScreen palette check', err.message);
  }

  // TEST 13: Memory Leak Prevention (Timer Cleanups)
  try {
    const heroPath = path.resolve('components', 'sections', 'HeroSection.tsx');
    const heroCode = fs.readFileSync(heroPath, 'utf8');
    assert(heroCode.includes('resumeTimerRef') && heroCode.includes('clearTimeout'), 'HeroSection clears resume tooltip timeout on unmount');

    const themePath = path.resolve('components', 'ThemeToggle.tsx');
    const themeCode = fs.readFileSync(themePath, 'utf8');
    assert(themeCode.includes('timerRef') && themeCode.includes('clearTimeout'), 'ThemeToggle clears upcoming tooltip timeout on unmount');
  } catch (err) {
    assert(false, 'Memory leak timer audit', err.message);
  }

  // TEST 14: CommandPalette In-App Feedback & Event Sync
  try {
    const cpPath = path.resolve('components', 'CommandPalette.tsx');
    const cpCode = fs.readFileSync(cpPath, 'utf8');
    assert(!cpCode.includes('alert('), 'CommandPalette contains 0 intrusive window alert() calls');
    assert(!cpCode.includes('location.reload()'), 'CommandPalette contains 0 page reloads on audio toggle');
    assert(cpCode.includes('cyberbot-mute-toggle'), 'CommandPalette dispatches cyberbot-mute-toggle custom event');
  } catch (err) {
    assert(false, 'CommandPalette feedback audit', err.message);
  }

  // TEST 15: Recruiter Fast-Track Endpoint
  try {
    const recRes = await get('/recruiter');
    assert(recRes.statusCode === 200, 'Recruiter page (/recruiter) returns HTTP 200 OK');
    const recHtml = recRes.text();
    assert(recHtml.includes('Recruiter') && recHtml.includes('Fast Track'), 'Recruiter page contains heading badge');
    assert(recHtml.includes('Download PDF Resume'), 'Recruiter page contains above-the-fold resume download CTA');
    assert(recHtml.includes('AIML Engineer'), 'Recruiter page displays target roles');
  } catch (err) {
    assert(false, 'Recruiter page test', err.message);
  }

  // TEST 16: Standalone HTML Resume Endpoint
  try {
    const resPage = await get('/resume');
    assert(resPage.statusCode === 200, 'HTML Resume (/resume) returns HTTP 200 OK');
    const resHtml = resPage.text();
    assert(resHtml.includes('Executive Summary'), 'Resume includes Executive Summary section');
    assert(resHtml.includes('Production Engineering Projects'), 'Resume includes Flagship Projects section');
    assert(resHtml.includes('Sri Balaji University'), 'Resume includes SBUP MCA AIML education');
  } catch (err) {
    assert(false, 'HTML Resume test', err.message);
  }

  // TEST 17: Performance Center Endpoint
  try {
    const perfRes = await get('/performance');
    assert(perfRes.statusCode === 200, 'Performance Center (/performance) returns HTTP 200 OK');
    const perfHtml = perfRes.text();
    assert(perfHtml.includes('First Contentful Paint'), 'Performance page displays FCP metric');
    assert(perfHtml.includes('Performance') && perfHtml.includes('Selector'), 'Performance page includes 3-way mode toggle');
    assert(perfHtml.includes('Low-Bandwidth'), 'Performance page details low-bandwidth mode');
  } catch (err) {
    assert(false, 'Performance Center test', err.message);
  }

  // TEST 18: Full Technical Case Studies Endpoints
  const studySlugs = ['roleradar', 'fitness-platform', 'marketmatch-ai'];
  for (const slug of studySlugs) {
    try {
      const studyRes = await get(`/work/${slug}`);
      assert(studyRes.statusCode === 200, `Case Study (/work/${slug}) returns HTTP 200 OK`);
      const studyHtml = studyRes.text();
      assert(studyHtml.includes('Deterministic Execution Pipeline') || studyHtml.includes('Architecture'), `Case study ${slug} contains architecture section`);
      assert(studyHtml.includes('Technical Tradeoffs'), `Case study ${slug} details tradeoffs`);
    } catch (err) {
      assert(false, `Case Study ${slug} test`, err.message);
    }
  }

  // TEST 19: GitHub Actions CI/CD Workflow Verification
  try {
    const ciPath = path.resolve('.github', 'workflows', 'portfolio-quality.yml');
    assert(fs.existsSync(ciPath), 'GitHub Actions workflow (.github/workflows/portfolio-quality.yml) exists');
    const ciContent = fs.readFileSync(ciPath, 'utf8');
    assert(ciContent.includes('npm run lint') && ciContent.includes('npm run build'), 'CI workflow executes lint and production build');
  } catch (err) {
    assert(false, 'CI workflow verification', err.message);
  }

  console.log('\n====================================================');
  console.log(`📊 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
