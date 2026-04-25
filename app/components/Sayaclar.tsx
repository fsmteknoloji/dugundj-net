'use client'
import { useIsMobile } from './useIsMobile'

const sayaclar = [
  { n: '250', sup: '+', label: 'Aktif DJ' },
  { n: '4.800', sup: '+', label: 'Tamamlanan Etkinlik' },
  { n: '81', sup: '', label: "İl'de Hizmet" },
  { n: '12K', sup: '+', label: 'Mutlu Misafir' },
]

export default function Sayaclar() {
  const isMobile = useIsMobile()

  return (
    <div style={{
      background: '#0C0C0C',
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
      borderLeft: '1px solid rgba(255,255,255,.07)',
    }}>
      {sayaclar.map((s, i) => (
        <div key={i} style={{
          borderRight: '1px solid rgba(255,255,255,.07)',
          borderBottom: isMobile && i < 2 ? '1px solid rgba(255,255,255,.07)' : 'none',
          padding: isMobile ? '40px 24px' : '64px 48px',
        }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: isMobile ? 'clamp(36px,8vw,52px)' : 'clamp(52px,5.5vw,80px)', fontWeight: 300, color: '#fff', lineHeight: 1, marginBottom: '14px', letterSpacing: '-2px' }}>
            {s.n}<sup style={{ fontSize: '.5em', color: '#6B1FFF', fontStyle: 'italic' }}>{s.sup}</sup>
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,.28)' }}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}