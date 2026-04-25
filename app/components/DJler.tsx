const djler = [
  {
    isim: 'DJ Karadeniz',
    genre: 'House · Pop · Türkçe Pop',
    sehir: 'İstanbul',
    fiyat: '₺4.500\'den',
    puan: '4.9',
    yorum: '87',
    foto: 'https://images.unsplash.com/photo-1571266028243-d220c6a7f2f0?w=600&q=80&fit=crop&crop=center',
    feat: true,
  },
  {
    isim: 'DJ Murat Rıza',
    genre: 'Latin · Cumbia · Deep House',
    sehir: 'İzmir',
    fiyat: '₺6.000\'den',
    puan: '4.8',
    yorum: '124',
    foto: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80&fit=crop&crop=center',
    feat: true,
  },
  {
    isim: 'DJ Alara Ses',
    genre: 'Türkçe Pop · Wedding Mix',
    sehir: 'Ankara',
    fiyat: '₺5.200\'den',
    puan: '5.0',
    yorum: '56',
    foto: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=80&fit=crop&crop=faces',
    feat: true,
  },
  {
    isim: 'DJ Ege Yıldız',
    genre: 'Techno · Minimal · Progressive',
    sehir: 'Antalya',
    fiyat: '₺3.800\'den',
    puan: '4.7',
    yorum: '203',
    foto: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80&fit=crop&crop=center',
    feat: false,
  },
]

export default function DJler() {
  return (
    <section style={{ padding: '100px 64px', background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '44px' }}>
        <div>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#6B1FFF' }} />
            Öne Çıkan
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(34px,4vw,56px)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-1px', color: '#0C0C0C' }}>
            Platformun<br /><em style={{ color: '#6B1FFF' }}>Seçkin DJ&apos;leri</em>
          </div>
        </div>
        <a href="/djler" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', textDecoration: 'none', borderBottom: '1px solid rgba(107,31,255,0.2)', paddingBottom: '2px' }}>
          Tümünü Gör
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: '#E2E0DB', border: '1px solid #E2E0DB' }}>
        {djler.map((dj, i) => (
          <a key={i} href={`/djler/${dj.isim.toLowerCase().replace(/ /g, '-')}`} style={{ background: '#F7F6F3', textDecoration: 'none', display: 'block' }}>
            <div style={{ height: '280px', position: 'relative', overflow: 'hidden', background: '#0C0C0C' }}>
              {dj.feat && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#6B1FFF', zIndex: 4 }} />
              )}
              <img
                src={dj.foto}
                alt={dj.isim}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(.88)' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3, background: 'linear-gradient(to top,rgba(0,0,0,.72),transparent)', padding: '14px 16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)' }}>{dj.sehir}</span>
                <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#8B45FF', fontWeight: 500 }}>{dj.fiyat}</span>
              </div>
            </div>
            <div style={{ padding: '18px 18px 22px' }}>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '22px', fontWeight: 400, color: '#0C0C0C', letterSpacing: '.5px', marginBottom: '3px' }}>{dj.isim}</div>
              <div style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#888', marginBottom: '14px' }}>{dj.genre}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: '#6B1FFF' }}>★★★★★</span>
                <span style={{ fontSize: '12px', color: '#0C0C0C', fontWeight: 500 }}>{dj.puan}</span>
                <span style={{ fontSize: '11px', color: '#888' }}>{dj.yorum} yorum</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}