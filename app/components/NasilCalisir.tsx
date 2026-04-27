'use client'
import { useIsMobile } from './useIsMobile'

const steps = [
  {
    n: '01',
    title: 'Etkinliğinizi Tanımlayın',
    desc: 'Tarih, yer, etkinlik türü ve beklentilerinizi girin. Ses sistemi, drone ya da enstrüman gibi ek hizmetleri seçin.',
    icon: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
  },
  {
    n: '02',
    title: 'Profilleri İnceleyin',
    desc: "O tarihe müsait DJ'leri listeleyin. Biyografi, müzik tarzı, referans video ve gerçek yorumları karşılaştırın.",
    icon: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
  },
  {
    n: '03',
    title: 'Teklifleri Karşılaştırın',
    desc: "DJ'ler size özel fiyat tekliflerini iletir. Paketleri, fiyatları ve yorumları yan yana görerek en iyi seçimi yapın.",
    icon: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,
  },
  {
    n: '04',
    title: 'Rezervasyonu Onaylayın',
    desc: "Güvenli ön rezervasyon ile DJ'inizi kilitleyin. Otomatik onay bildirimi ve hatırlatıcılar gönderilir.",
    icon: <polyline points="20 6 9 17 4 12"/>,
  },
]

function StepKart({ step, index }: { step: typeof steps[0]; index: number }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '36px 28px',
        border: '1px solid #E2E0DB',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform .3s ease, box-shadow .3s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 20px 48px rgba(107,31,255,0.13)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
      }}
    >
      {/* Sol mor çizgi */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: 'linear-gradient(to bottom, #6B1FFF, #FF6B2B)' }} />

      {/* Büyük numara arka planda */}
      <div style={{
        position: 'absolute', top: '12px', right: '20px',
        fontFamily: 'var(--font-cormorant)',
        fontSize: '100px', fontWeight: 300,
        color: 'rgba(107,31,255,0.06)',
        lineHeight: 1, userSelect: 'none',
      }}>
        {step.n}
      </div>

      {/* İkon */}
      <div style={{
        width: '52px', height: '52px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #6B1FFF, #8B45FF)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '20px',
        boxShadow: '0 8px 20px rgba(107,31,255,0.25)',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
          {step.icon}
        </svg>
      </div>

      {/* Adım numarası */}
      <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', fontWeight: 600, marginBottom: '10px' }}>
        Adım {index + 1}
      </div>

      {/* Başlık */}
      <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '24px', fontWeight: 400, color: '#0C0C0C', marginBottom: '12px', lineHeight: 1.2 }}>
        {step.title}
      </h3>

      {/* Açıklama */}
      <p style={{ fontSize: '14px', fontWeight: 300, color: '#777', lineHeight: 1.8 }}>
        {step.desc}
      </p>
    </div>
  )
}

export default function NasilCalisir() {
  const isMobile = useIsMobile()

  return (
    <section style={{ padding: isMobile ? '60px 20px' : '100px 64px', background: '#F7F6F3' }}>
      <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#6B1FFF' }} />
        Süreç
      </div>
      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(34px,4vw,56px)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-1px', color: '#0C0C0C', marginBottom: '56px' }}>
        Dört Adımda<br /><em style={{ color: '#6B1FFF' }}>Mükemmel Gece</em>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4,1fr)',
        gap: '20px',
      }}>
        {steps.map((s, i) => (
          <StepKart key={i} step={s} index={i} />
        ))}
      </div>
    </section>
  )
}