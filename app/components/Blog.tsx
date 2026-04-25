'use client'

const yazilar = [
  {
    kategori: 'Düğün',
    baslik: 'Düğün DJ\'i Seçerken Dikkat Edilmesi Gerekenler',
    ozet: 'Hayalinizdeki düğün için doğru DJ\'i bulmak artık çok daha kolay. İşte bilmeniz gereken her şey...',
    tarih: '1 Nisan 2025',
    img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80&fit=crop&crop=center',
    slug: 'dugun-dji-secerken-dikkat-edilmesi-gerekenler',
  },
  {
    kategori: 'Trend',
    baslik: '2025 Beach Club Müzik Trendleri',
    ozet: 'Bu yaz beach club\'larda hangi müzikler çalınıyor? En popüler DJ setleri ve müzik stilleri...',
    tarih: '20 Mart 2025',
    img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80&fit=crop&crop=center',
    slug: '2025-beach-club-muzik-trendleri',
  },
  {
    kategori: 'Kurumsal',
    baslik: 'Kurumsal Etkinliklerde Müzik Seçimi Nasıl Yapılmalı?',
    ozet: 'Şirket lansmanı, gala gecesi veya yıl sonu partisi için doğru müzik atmosferi nasıl oluşturulur?',
    tarih: '5 Mart 2025',
    img: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80&fit=crop&crop=center',
    slug: 'kurumsal-etkinliklerde-muzik-secimi',
  },
]

export default function Blog() {
  return (
    <section style={{ padding: '100px 64px', background: '#F7F6F3' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px' }}>
        <div>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#6B1FFF' }} />
            Blog
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(34px,4vw,56px)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-1px', color: '#0C0C0C' }}>
            Son <em style={{ color: '#6B1FFF' }}>Yazılar</em>
          </div>
        </div>
        <a href="/blog" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', textDecoration: 'none', borderBottom: '1px solid rgba(107,31,255,0.2)', paddingBottom: '2px' }}>
          Tüm Yazılar →
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
        {yazilar.map((y, i) => (
          <BlogKart key={i} yazi={y} />
        ))}
      </div>
    </section>
  )
}

function BlogKart({ yazi }: { yazi: typeof yazilar[0] }) {
  return (
    
      href={`/blog/${yazi.slug}`}
      style={{
        display: 'block', textDecoration: 'none',
        background: '#fff', borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid #E2E0DB',
        transition: 'transform .3s ease, box-shadow .3s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 20px 48px rgba(0,0,0,0.12)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* FOTOĞRAF */}
      <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
        <img
          src={yazi.img}
          alt={yazi.baslik}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .4s ease' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div style={{
          position: 'absolute', top: '14px', left: '14px',
          background: '#6B1FFF', color: '#fff',
          fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase',
          padding: '5px 12px', borderRadius: '2px', fontWeight: 500,
        }}>{yazi.kategori}</div>
      </div>

      {/* İÇERİK */}
      <div style={{ padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '22px', fontWeight: 400, color: '#0C0C0C', lineHeight: 1.3, marginBottom: '10px', letterSpacing: '.3px' }}>
          {yazi.baslik}
        </h3>
        <p style={{ fontSize: '13px', fontWeight: 300, color: '#888', lineHeight: 1.75, marginBottom: '18px' }}>
          {yazi.ozet}
        </p>
        <div style={{ fontSize: '11px', color: '#aaa', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          {yazi.tarih}
        </div>
      </div>
    </a>
  )
}