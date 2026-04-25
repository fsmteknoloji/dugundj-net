const steps = [
  {
    n: '01',
    title: 'Etkinliğinizi Tanımlayın',
    desc: 'Tarih, yer, etkinlik türü ve beklentilerinizi girin. Ses sistemi, drone ya da enstrüman gibi ek hizmetleri seçin.',
  },
  {
    n: '02',
    title: 'Profilleri İnceleyin',
    desc: "O tarihe müsait DJ'leri listeleyin. Biyografi, müzik tarzı, referans video ve gerçek yorumları karşılaştırın.",
  },
  {
    n: '03',
    title: 'Teklifleri Karşılaştırın',
    desc: "DJ'ler size özel fiyat tekliflerini iletir. Paketleri, fiyatları ve yorumları yan yana görerek en iyi seçimi yapın.",
  },
  {
    n: '04',
    title: 'Rezervasyonu Onaylayın',
    desc: "Güvenli ön rezervasyon ile DJ'inizi kilitleyin. Otomatik onay bildirimi ve hatırlatıcılar gönderilir.",
  },
]

const BG = () => (
  <svg
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    viewBox="0 0 400 380"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Arka plan */}
    <rect width="400" height="380" fill="#2D2D3E"/>

    {/* Mor eğri çizgiler */}
    <path d="M-40 80 Q100 20 200 120 Q300 220 440 160" stroke="#6B1FFF" strokeWidth="1.2" fill="none" opacity="0.6"/>
    <path d="M-40 140 Q80 60 200 180 Q320 280 440 220" stroke="#6B1FFF" strokeWidth="0.8" fill="none" opacity="0.4"/>
    <path d="M-40 200 Q120 120 220 240 Q340 340 440 280" stroke="#8B45FF" strokeWidth="1.5" fill="none" opacity="0.5"/>
    <path d="M-40 260 Q100 180 200 300 Q300 380 440 320" stroke="#6B1FFF" strokeWidth="0.6" fill="none" opacity="0.3"/>
    <path d="M-40 320 Q140 240 240 340 Q360 420 440 360" stroke="#8B45FF" strokeWidth="1" fill="none" opacity="0.35"/>

    {/* Turuncu vurgu çizgileri */}
    <path d="M-20 340 Q80 280 160 360 Q240 420 300 380" stroke="#FF6B2B" strokeWidth="1.4" fill="none" opacity="0.55"/>
    <path d="M100 -10 Q160 60 140 160 Q120 260 200 320" stroke="#FF6B2B" strokeWidth="0.9" fill="none" opacity="0.4"/>
    <path d="M300 -20 Q380 80 360 200 Q340 300 420 360" stroke="#FF8C42" strokeWidth="1.2" fill="none" opacity="0.3"/>

    {/* Antrasit gri yatay çizgiler */}
    <path d="M0 60 Q200 40 400 60" stroke="#4A4A5A" strokeWidth="0.5" fill="none" opacity="0.5"/>
    <path d="M0 120 Q200 100 400 120" stroke="#4A4A5A" strokeWidth="0.5" fill="none" opacity="0.4"/>
    <path d="M0 180 Q200 160 400 180" stroke="#4A4A5A" strokeWidth="0.5" fill="none" opacity="0.4"/>
    <path d="M0 240 Q200 220 400 240" stroke="#4A4A5A" strokeWidth="0.5" fill="none" opacity="0.4"/>
    <path d="M0 300 Q200 280 400 300" stroke="#4A4A5A" strokeWidth="0.5" fill="none" opacity="0.4"/>

    {/* Diagonal ince çizgiler */}
    <path d="M0 0 Q200 190 400 380" stroke="#6B1FFF" strokeWidth="0.4" fill="none" opacity="0.2"/>
    <path d="M40 0 Q240 190 440 380" stroke="#FF6B2B" strokeWidth="0.4" fill="none" opacity="0.15"/>
    <path d="M-40 0 Q160 190 360 380" stroke="#8B45FF" strokeWidth="0.4" fill="none" opacity="0.15"/>

    {/* Küçük nokta aksan */}
    <circle cx="80" cy="60" r="1.5" fill="#FF6B2B" opacity="0.7"/>
    <circle cx="200" cy="140" r="1.5" fill="#6B1FFF" opacity="0.8"/>
    <circle cx="320" cy="80" r="1.5" fill="#FF6B2B" opacity="0.6"/>
    <circle cx="140" cy="260" r="1.5" fill="#8B45FF" opacity="0.7"/>
    <circle cx="360" cy="300" r="1.5" fill="#FF6B2B" opacity="0.6"/>
    <circle cx="60" cy="320" r="1.5" fill="#6B1FFF" opacity="0.5"/>

    {/* Overlay karartma */}
    <rect width="400" height="380" fill="rgba(10,10,18,0.15)" />
  </svg>
)

export default function NasilCalisir() {
  return (
    <section style={{ padding: '100px 64px', background: '#F7F6F3' }}>
      <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#6B1FFF' }} />
        Süreç
      </div>
      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(34px,4vw,56px)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-1px', color: '#0C0C0C', marginBottom: '56px' }}>
        Dört Adımda<br /><em style={{ color: '#6B1FFF' }}>Mükemmel Gece</em>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: '#E2E0DB', border: '1px solid #E2E0DB' }}>
        {steps.map((s, i) => (
          <div key={i} style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
            <BG />
            {/* Mor üst çizgi */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #6B1FFF, #FF6B2B)', zIndex: 4 }} />
            {/* İçerik */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 3, padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '72px', fontWeight: 300, color: 'rgba(107,31,255,0.5)', lineHeight: 1 }}>
                {s.n}
              </div>
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