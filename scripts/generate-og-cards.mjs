import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OG_DIR = join(ROOT, 'public', 'images', 'og');

mkdirSync(OG_DIR, { recursive: true });

const CARDS = [
  {
    slug: 'roleradar',
    title: 'RoleRadar AI',
    subtitle: 'Autonomous Multi-Model ATS Scoring & Google XYZ Pipeline',
    metrics: ['87% Match Score', '<45ms Latency', 'FastAPI & Next.js'],
    accent: '#10b981',
    accentName: 'Emerald',
  },
  {
    slug: 'fittrack',
    title: 'FitTrack Kinematics',
    subtitle: 'Real-Time Edge Computer Vision & Joint Angle Rep Counter',
    metrics: ['60 FPS Pose Inference', 'Trigonometry Angles', 'Zero Cloud Egress'],
    accent: '#06b6d4',
    accentName: 'Cyan',
  },
  {
    slug: 'marketmatch-ai',
    title: 'MarketMatch AI',
    subtitle: 'RFM Customer Clustering with 2D PCA & Unsupervised ML',
    metrics: ['K-Means & DBSCAN', 'Silhouette 0.74', 'Scikit-Learn'],
    accent: '#a855f7',
    accentName: 'Purple',
  },
  {
    slug: 'jarvis-realtime-assistant',
    title: 'J.A.R.V.I.S. Assistant',
    subtitle: 'Real-Time Multimodal Voice & Autonomous Agent Assistant',
    metrics: ['Whisper Speech STT', 'Web Audio Synth', 'Gemini Tool Calling'],
    accent: '#3b82f6',
    accentName: 'Cobalt',
  },
  {
    slug: 'cnn-streamlit',
    title: 'CNN Deep Learning Suite',
    subtitle: 'Convolutional Neural Networks for Medical Image Classification',
    metrics: ['PyTorch ResNet-50', '94.2% Validation', 'Streamlit UI'],
    accent: '#f59e0b',
    accentName: 'Amber',
  },
];

function generateSvgCard(card) {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${card.accent}"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="${card.accent}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Border Frame -->
  <rect x="24" y="24" width="1152" height="582" rx="20" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
  <rect x="28" y="28" width="1144" height="574" rx="16" fill="none" stroke="${card.accent}" stroke-opacity="0.25" stroke-width="1"/>

  <!-- Brand Eyebrow -->
  <text x="80" y="110" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="${card.accent}" letter-spacing="3">
    DURGESH DUTT SINHA • AI/ML ENGINEERING FLAGSHIP
  </text>

  <!-- Title -->
  <text x="80" y="200" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="56" font-weight="800" fill="#ffffff" letter-spacing="-1">
    ${card.title}
  </text>

  <!-- Subtitle -->
  <text x="80" y="260" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="400" fill="#94a3b8">
    ${card.subtitle}
  </text>

  <!-- Metrics Badges -->
  <g transform="translate(80, 360)">
    ${card.metrics.map((m, i) => `
    <g transform="translate(${i * 320}, 0)">
      <rect width="290" height="74" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <rect x="16" y="18" width="6" height="38" rx="3" fill="${card.accent}"/>
      <text x="34" y="47" font-family="monospace" font-size="16" font-weight="700" fill="#f8fafc">
        ${m}
      </text>
    </g>`).join('')}
  </g>

  <!-- Footer Tagline -->
  <text x="80" y="540" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="500" fill="#64748b">
    Production Architecture Case Study • durgesh-portfolio.pages.dev/work/${card.slug}
  </text>

  <!-- Signature Badge -->
  <g transform="translate(1000, 500)">
    <rect width="120" height="42" rx="8" fill="${card.accent}" fill-opacity="0.15" stroke="${card.accent}" stroke-opacity="0.4"/>
    <text x="60" y="26" font-family="monospace" font-size="12" font-weight="700" fill="${card.accent}" text-anchor="middle">
      V10 VERIFIED
    </text>
  </g>
</svg>`;
}

CARDS.forEach((card) => {
  const filePath = join(OG_DIR, `${card.slug}.svg`);
  writeFileSync(filePath, generateSvgCard(card), 'utf8');
  console.log(`Generated OG card: ${filePath}`);
});

console.log('All case study OG cards created successfully.');
