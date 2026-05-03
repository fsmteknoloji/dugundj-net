'use client'
import { useIsMobile } from './useIsMobile'

const kategoriler = [
  { isim: 'Düğün', svg: 'dugun' },
  { isim: 'After Parti', svg: 'after' },
  { isim: 'Kına Gecesi', svg: 'kina' },
  { isim: 'Gelin Alma', svg: 'gelin' },
  { isim: 'Evlilik Yıldönümü', svg: 'evlilik' },
  { isim: 'Sünnet', svg: 'sunnet' },
  { isim: 'Doğum Günü', svg: 'dogum' },
  { isim: 'Mezuniyet', svg: 'mezuniyet' },
  { isim: 'Gala Gecesi', svg: 'gala' },
  { isim: 'Şirket Lansmanı', svg: 'sirket' },
  { isim: 'Açık Hava Konseri', svg: 'acik' },
  { isim: 'Mağaza Açılışı', svg: 'magaza' },
  { isim: 'VIP Davet', svg: 'vip' },
  { isim: 'Beach Club', svg: 'beach' },
  { isim: 'Yıl Sonu Partisi', svg: 'yilsonu' },
  { isim: 'Asker Uğurlama', svg: 'asker' },
  { isim: 'Tatil Köyü', svg: 'tatil' },
  { isim: 'Spor Kutlaması', svg: 'spor' },
  { isim: 'Otel Organizasyonu', svg: 'otel' },
  { isim: 'Temalı Parti', svg: 'temali' },
  { isim: 'Ev Partisi', svg: 'ev' },
  { isim: 'Üniversite Şenliği', svg: 'universite' },
  { isim: 'Drone Çekim', svg: 'drone' },
]

function slugOlustur(isim: string) {
  return isim.toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
}

function getPath(key: string) {
  switch(key) {
    case 'dugun': return <path d="M12 2l1.5 4.5H18l-3.5 2.5 1.3 4L12 11l-3.8 2 1.3-4L6 6.5h4.5z"/>
    case 'after': return <><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/><circle cx="12" cy="12" r="2"/></>
    case 'kina': return <><path d="M17 8C8 10 5.9 16.17 3.82 19.9A2 2 0 004 22h16a2 2 0 001-3.73C18 14 17 8 17 8z"/><path d="M15 8a3 3 0 10-6 0"/></>
    case 'gelin': return <><path d="M5 12H3l9-9 9 9h-2"/><path d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/><rect x="9" y="15" width="6" height="6"/></>
    case 'evlilik': return <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    case 'sunnet': return <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></>
    case 'dogum': return <><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M8 2v4M16 2v4M3 10h18"/><circle cx="8" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="15" r="1" fill="currentColor" stroke="none"/></>
    case 'mezuniyet': return <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>
    case 'gala': return <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    case 'sirket': return <><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></>
    case 'acik': return <><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></>
    case 'magaza': return <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>
    case 'vip': return <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    case 'beach': return <><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></>
    case 'yilsonu': return <><circle cx="12" cy="12" r="3"/><path d="M6.3 6.3a8 8 0 000 11.4M17.7 6.3a8 8 0 010 11.4"/></>
    case 'asker': return <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>
    case 'tatil': return <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>
    case 'spor': return <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    case 'otel': return <><rect x="2" y="3" width="20" height="14" rx="1"/><path d="M8 21h8M12 17v4"/></>
    case 'temali': return <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>
    case 'ev': return <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>
    case 'universite': return <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    case 'drone': return <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>
    default: return <circle cx="12" cy="12" r="10"/>
  }
}

function KategoriKart({ isim, svgKey }: { isim: string; svgKey: string }) {
  return (
    <div
      onClick={() => window.location.href = '/kategoriler/' + slugOlustur(isim)}
      style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '24px 12px 20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #F0EEF8',
        transition: 'transform .25s ease, box-shadow .25s ease, background .25s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-5px)'
        el.style.boxShadow = '0 16px 36px rgba(107,31,255,0.18)'
        el.style.background = '#6B1FFF'
        const svg = el.querySelector('svg')
        const span = el.querySelector('span')
        if (svg) svg.style.stroke = '#fff'
        if (span) span.style.color = '#fff'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
        el.style.background = '#fff'
        const svg = el.querySelector('svg')
        const span = el.querySelector('span')
        if (svg) svg.style.stroke = '#0C0C0C'
        if (span) span.style.color = '#0C0C0C'
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0C0C0C" strokeWidth="1.2" style={{ transition: 'stroke .25s' }}>
        {getPath(svgKey)}
      </svg>
      <span style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0C0C0C', fontWeight: 400, transition: 'color .25s', lineHeight: 1.4 }}>
        {isim}
      </span>
    </div>
  )
}

export default function Kategoriler() {
  const isMobile = useIsMobile()

  return (
    <section style={{ padding: isMobile ? '60px 20px' : '100px 64px', background: '#fff' }}>
      <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#6B1FFF' }} />
        Hizmetler
      </div>
      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(34px,4vw,56px)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-1px', color: '#0C0C0C', marginBottom: '12px' }}>
        Her Etkinlik İçin<br /><em style={{ color: '#6B1FFF' }}>Profesyonel Çözüm</em>
      </div>
      <div style={{ fontSize: '14px', fontWeight: 300, color: '#888', lineHeight: 1.8, maxWidth: '420px', marginBottom: '48px' }}>
        Düğünden galaya, kurumsal lansmanlardan özel kutlamalara 24 farklı kategori.
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(3,1fr)' : 'repeat(6,1fr)',
        gap: '12px',
      }}>
        {kategoriler.map((k, i) => (
          <KategoriKart key={i} isim={k.isim} svgKey={k.svg} />
        ))}
      </div>
    </section>
  )
}