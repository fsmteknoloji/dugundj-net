'use client'
import { useIsMobile } from './useIsMobile'

export default function DJolCTA() {
  const isMobile = useIsMobile()

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1C1228 0%, #0C0C0C 100%)',
      padding: isMobile ? '60px 20px' : '80px 64px',
      borderTop: '1px solid rgba(107,31,255,0.2)',
      borderBottom: '1px solid rgba(107,31,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '32px' : '40px',
      textAlign: isMobile ? 'center' : 'left',
    }}>
      <div>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: isMobile ? '32px' : 'clamp(32px,4vw,52px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-1px' }}>
          Sen de{' '}
          <em style={{ color: '#6B1FFF', fontStyle: 'italic' }}>Platformumuza</em>
          {' '}Katıl
        </div>
        <p style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,.5)', lineHeight: 1.7, maxWidth: '480px' }}>
          Profilini oluştur, etkinlik taleplerini al ve kariyerini büyüt. Kayıt tamamen ücretsiz.
        </p>
      </div>
      <CTAButton />
    </div>
  )
}

function CTAButton() {
  return (
    <div
      onClick={() => { window.location.href = '/dj-ol' }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background = '#8B45FF'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background = '#6B1FFF'
        el.style.transform = 'translateY(0)'
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: '#6B1FFF',
        color: '#fff',
        fontSize: '13px',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        fontWeight: 500,
        padding: '16px 36px',
        borderRadius: '4px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        boxShadow: '0 8px 24px rgba(107,31,255,0.35)',
        transition: 'background .2s, transform .2s',
      }}
    >
      DJ Olarak Başvur
    </div>
  )
}