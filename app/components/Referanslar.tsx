'use client'
import { useIsMobile } from './useIsMobile'

const etkinlikler = [
  {
    buyuk: true,
    kategori: 'Düğün Töreni',
    baslik: 'İstanbul Hilton Grand Ballroom',
    dj: 'DJ Mert Akay',
    detay: 'Mayıs 2025 · 350 misafir',
    yorum: '"Muhteşem bir geceydi"',
    img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&q=80&fit=crop&crop=center',
  },
  {
    kategori: 'Gala Gecesi',
    baslik: 'Zorlu PSM · Nisan 2025',
    dj: 'DJ Ayşe Kara',
    detay: '200 kişi',
    img: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80&fit=crop&crop=center',
  },
  {
    kategori: 'Beach Club',
    baslik: 'Bodrum Marina · Haziran 2025',
    dj: 'DJ Selin Öz',
    detay: '500 kişi',
    img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80&fit=crop&crop=center',
  },
  {
    kategori: 'Özel Kutlama',
    baslik: 'Four Seasons · Mart 2025',
    dj: 'DJ Kerem Yıldız',
    detay: '80 kişi',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80&fit=crop&crop=center',
  },
  {
    kategori: 'Mezuniyet Balosu',
    baslik: 'Swissôtel · Mayıs 2025',
    dj: 'DJ Can Arslan',
    detay: '300 kişi',
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80&fit=crop&crop=center',
  },
]

export default function Referanslar() {
  const isMobile = useIsMobile()

  return (
    <section style={{ padding: isMobile ? '60px 20px' : '100px 64px', background: '#111115' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px' }}>
        <div>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#6B1FFF' }} />
            Referanslar
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(34px,4vw,56px)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-1px', color: '#fff' }}>
            Referans <em style={{ color: '#6B1FFF' }}>Etkinlikler</em>
          </div>
          <div style={{ fontSize: '14px', fontWeight: 300, color: '#666', marginTop: '8px' }}>Gerçek etkinliklerden kareler</div>
        </div>
        <a href="/referanslar" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', textDecoration: 'none', borderBottom: '1px solid rgba(107,31,255,0.3)', paddingBottom: '2px' }}>
          Tümünü gör →
        </a>
      </div>

      {isMobile ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          {etkinlikler.map((e, i) => (
            <KucukKart key={i} etkinlik={e} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '6px' }}>
          <BuyukKart etkinlik={etkinlikler[0]} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {etkinlikler.slice(1).map((e, i) => (
              <KucukKart key={i} etkinlik={e} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

function BuyukKart({ etkinlik }: { etkinlik: typeof etkinlikler[0] }) {
  return (
    <div
      style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', minHeight: '480px', cursor: 'pointer', transition: 'transform .3s ease' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.01)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
    >
      <img src={etkinlik.img} alt={etkinlik.baslik} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, filter: 'brightness(.55)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.85) 0%, transparent 50%)' }} />
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'linear-gradient(to bottom, #6B1FFF, transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '10px', fontWeight: 600 }}>{etkinlik.kategori}</div>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '28px', fontWeight: 400, color: '#fff', marginBottom: '8px' }}>{etkinlik.baslik}</div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.6)', marginBottom: '12px' }}>{etkinlik.dj} · {etkinlik.detay}</div>
        <div style={{ fontSize: '13px', color: '#8B45FF', fontStyle: 'italic' }}>★★★★★ {etkinlik.yorum}</div>
      </div>
    </div>
  )
}

function KucukKart({ etkinlik }: { etkinlik: typeof etkinlikler[0] }) {
  return (
    <div
      style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', minHeight: '234px', cursor: 'pointer', transition: 'transform .3s ease' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
    >
      <img src={etkinlik.img} alt={etkinlik.baslik} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, filter: 'brightness(.5)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 60%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 20px' }}>
        <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '6px', fontWeight: 600 }}>{etkinlik.kategori}</div>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '18px', fontWeight: 400, color: '#fff', marginBottom: '4px' }}>{etkinlik.baslik}</div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.55)' }}>{etkinlik.dj} · {etkinlik.detay}</div>
      </div>
    </div>
  )
}