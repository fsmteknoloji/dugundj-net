'use client'
import { useIsMobile } from './useIsMobile'

const BG = () => (
  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 400 380" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="380" fill="#2D2D3E"/>
    <path d="M-40 80 Q100 20 200 120 Q300 220 440 160" stroke="#6B1FFF" strokeWidth="1.2" fill="none" opacity="0.6"/>
    <path d="M-40 140 Q80 60 200 180 Q320 280 440 220" stroke="#6B1FFF" strokeWidth="0.8" fill="none" opacity="0.4"/>
    <path d="M-40 200 Q120 120 220 240 Q340 340 440 280" stroke="#8B45FF" strokeWidth="1.5" fill="none" opacity="0.5"/>
    <path d="M-40 260 Q100 180 200 300 Q300 380 440 320" stroke="#6B1FFF" strokeWidth="0.6" fill="none" opacity="0.3"/>
    <path d="M-40 320 Q140 240 240 340 Q360 420 440 360" stroke="#8B45FF" strokeWidth="1" fill="none" opacity="0.35"/>
    <path d="M-20 340 Q80 280 160 360 Q240 420 300 380" stroke="#FF6B2B" strokeWidth="1.4" fill="none" opacity="0.55"/>
    <path d="M100 -10 Q160 60 140 160 Q120 260 200 320" stroke="#FF6B2B" strokeWidth="0.9" fill="none" opacity="0.4"/>
    <path d="M300 -20 Q380 80 360 200 Q340 300 420 360" stroke="#FF8C42" strokeWidth="1.2" fill="none" opacity="0.3"/>
    <path d="M0 60 Q200 40 400 60" stroke="#4A4A5A" strokeWidth="0.5" fill="none" opacity="0.5"/>
    <path d="M0 120 Q200 100 400 120" stroke="#4A4A5A" strokeWidth="0.5" fill="none" opacity="0.4"/>
    <path d="M0 180 Q200 160 400 180" stroke="#4A4A5A" strokeWidth="0.5" fill="none" opacity="0.4"/>
    <path d="M0 240 Q200 220 400 240" stroke="#4A4A5A" strokeWidth="0.5" fill="none" opacity="0.4"/>
    <path d="M0 300 Q200 280 400 300" stroke="#4A4A5A" strokeWidth="0.5" fill="none" opacity="0.4"/>
    <circle cx="80" cy="60" r="1.5" fill="#FF6B2B" opacity="0.7"/>
    <circle cx="200" cy="140" r="1.5" fill="#6B1FFF" opacity="0.8"/>
    <circle cx="320" cy="80" r="1.5" fill="#FF6B2B" opacity="0.6"/>
    <circle cx="140" cy="260" r="1.5" fill="#8B45FF" opacity="0.7"/>
    <circle cx="360" cy="300" r="1.5" fill="#FF6B2B" opacity="0.6"/>
    <rect width="400" height="380" fill="rgba(10,10,18,0.15)"/>
  </svg>
)

const steps = [
  { n: '01', title: 'Etkinliğinizi Tanımlayın', desc: 'Tarih, yer, etkinlik türü ve beklentilerinizi girin. Ses sistemi, drone ya da enstrüman gibi ek hizmetleri seçin.', icon: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></> },
  { n: '02', title: 'Profilleri İnceleyin', desc: "O tarihe müsait DJ'leri listeleyin. Biyografi, müzik tarzı, referans video ve gerçek yorumları karşılaştırın.", icon: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></> },
  { n: '03', title: 'Teklifleri Karşılaştırın', desc: "DJ'ler size özel fiyat tekliflerini iletir. Paketleri, fiyatları ve yorumları yan yana görerek en iyi seçimi yapın.", icon: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/> },
  { n: '04', title: 'Rezervasyonu Onaylayın', desc: "Güvenli ön rezervasyon ile DJ'inizi kilitleyin. Otomatik onay bildirimi ve hatırlatıcılar gönderilir.", icon: <polyline points="20 6 9 17 4 12"/> },
]

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
        gap: '12px',
      }}>
        {steps.map((s, i) => (
          <div key={i} style={{ position: 'relative', height: isMobile ? '260px' : '380px', overflow: 'hidden', borderRadius: '12px' }}>
            <BG />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #6B1FFF, #FF6B2B)', zIndex: 4 }} />
            <div style={{ position: 'absolute', inset: 0, zIndex: 3, padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '72px', fontWeight: 300, color: 'rgba(107,31,255,0.5)', lineHeight: 1 }}>{s.n}</div>
              <div>
                <div style={{ width: '28px', height: '2px', background: '#FF6B2B', marginBottom: '14px' }} />
                <h3 style={{ fontSize: '15px', fontWeight: 500, color: '#fff', marginBottom: '10px', letterSpacing: '.5px' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,.6)', lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}