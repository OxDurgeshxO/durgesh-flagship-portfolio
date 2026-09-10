import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Durgesh Dutt Sinha — AIML Engineer & Full-Stack Developer'
export const size = {
  width: 2400,
  height: 1260,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '110px 130px',
          backgroundColor: '#0b0914',
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(168, 85, 247, 0.4) 0%, transparent 55%), radial-gradient(circle at 85% 80%, rgba(244, 63, 94, 0.35) 0%, transparent 55%)',
          color: '#ffffff',
          border: '4px solid rgba(244, 63, 94, 0.35)',
        }}
      >
        {/* Top Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              padding: '16px 36px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '2px solid rgba(168, 85, 247, 0.45)',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#10b981',
              }}
            />
            <span
              style={{
                fontSize: '28px',
                color: '#e2e8f0',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Available for AIML & Full-Stack Roles
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '56px',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            <span>DDS</span>
            <span style={{ color: '#f43f5e' }}>.</span>
          </div>
        </div>

        {/* Center Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: '30px 0' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '128px',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#ffffff',
            }}
          >
            Durgesh Dutt Sinha
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '54px',
              fontWeight: 700,
              color: '#c084fc',
              letterSpacing: '-0.01em',
            }}
          >
            AIML Engineer & Full-Stack Developer
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '36px',
              color: '#94a3b8',
              maxWidth: '1850px',
              lineHeight: 1.4,
            }}
          >
            Autonomous AI Systems • Neural Architectures • Real-Time Computer Vision & Full-Stack Platforms
          </div>
        </div>

        {/* Feature Badges Row */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {[
            '🚀 RoleRadar (16 Roles Evaluated)',
            '🏋️ FitTrack CV (<50ms MediaPipe)',
            '📊 MarketMatch AI',
            '🎓 MCA in AIML • Sri Balaji Univ',
            '☁️ AWS ML Foundations',
          ].map((pill, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                padding: '14px 30px',
                borderRadius: '24px',
                background: 'rgba(168, 85, 247, 0.16)',
                border: '2px solid rgba(168, 85, 247, 0.4)',
                color: '#f8fafc',
                fontSize: '28px',
                fontWeight: 600,
              }}
            >
              {pill}
            </div>
          ))}
        </div>

        {/* Bottom Status Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '32px',
            fontSize: '29px',
            color: '#64748b',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', gap: '36px', color: '#94a3b8' }}>
            <span>🌐 durgesh-portfolio.pages.dev</span>
            <span>•</span>
            <span>github.com/OxDurgeshxO</span>
          </div>
          <div style={{ display: 'flex', color: '#f43f5e', fontWeight: 600 }}>
            Interactive 3D Portfolio ↗
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
