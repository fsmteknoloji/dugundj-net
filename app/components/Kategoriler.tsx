'use client'

const kategoriler = [
  { isim: 'Düğün', svg: <path d="M12 2l1.5 4.5H18l-3.5 2.5 1.3 4L12 11l-3.8 2 1.3-4L6 6.5h4.5z"/> },
  { isim: 'After Parti', svg: <><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/><circle cx="12" cy="12" r="2"/></> },
  { isim: 'Kına Gecesi', svg: <><path d="M17 8C8 10 5.9 16.17 3.82 19.9A2 2 0 004 22h16a2 2 0 001-3.73C18 14 17 8 17 8z"/><path d="M15 8a3 3 0 10-6 0"/></> },
  { isim: 'Gelin Alma', svg: <><path d="M5 12H3l9-9 9 9h-2"/><path d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/><rect x="9" y="15" width="6" height="6"/></> },
  { isim: 'Evlilik Yıldönümü', svg: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/> },
  { isim: 'Sünnet', svg: <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></> },
  { isim: 'Doğum Günü', svg: <><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M8 2v4M16 2v4M3 10h18"/><circle cx="8" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="15" r="1" fill="currentColor" stroke="none"/></> },
  { isim: 'Mezuniyet', svg: <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></> },
  { isim: 'Gala Gecesi', svg: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/> },
  { isim: 'Şirket Lansmanı', svg: <><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></> },
  { isim: 'Açık Hava Konseri', svg: <><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></> },
    { isim: 'Mağaza Açılışı', svg: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> },
  { isim: 'VIP Davet', svg: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
  { isim: 'Beach Club', svg: <><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></> },
  { isim: 'Yıl Sonu Partisi', svg: <><circle cx="12" cy="12" r="3"/><path d="M6.3 6.3a8 8 0 000 11.4M17.7 6.3a8 8 0 010 11.4M3.5 3.5a12 12 0 000 17M20.5 3.5a12 12 0 010 17"/></> },
  { isim: 'Asker Uğurlama', svg: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></> },
  { isim: 'Tatil Köyü', svg: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></> },
  { isim: 'Spor Kutlaması', svg: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> },
  { isim: 'Otel Organizasyonu', svg: <><rect x="2" y="3" width="20" height="14" rx="1"/><path d="M8 21h8M12 17v4"/></> },
  { isim: 'Temalı Parti', svg: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></> },
  { isim: 'Ev Partisi', svg: <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></> },
  { isim: 'Üniversite Şenliği', svg: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/> },
  { isim: 'Gençlik Festivali', svg: <><circle cx="12" cy="8" r="6"/><path d="M4.93 19.07A10 10 0 0119.07 4.93"/><path d="M12 14v8M9 19h6"/></> },
  { isim: 'Drone Çekim', svg: <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></> },
]

export default function Kategoriler() {
  return (
    <section style={{ padding: '100px 64px', background: '#fff' }}>
      <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#6B1FFF' }} />
        Hizmetler
      </div>
      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(34px,4vw,56px)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-1px', color: '#0C0C0C', marginBottom: '12px' }}>
        Her Etkinlik İçin<br /><em style={{ color: '#6B1FFF' }}>Profesyonel Çözüm</em>
      </div>
      <div style={{ fontSize: '14px', fontWeight: 300, color: '#888', lineHeight: 1.8, maxWidth: '420px', marginBottom: '56px' }}>
        Düğünden galaya, kurumsal lansmanlardan özel kutlamalara 24 farklı kategori.
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '1px', background: '#E2E0DB', border: '1px solid #E2E0DB',
      }}>
        {kategoriler.map((k, i) => (
          <a key={i} href="#" style={{
            background: '#fff', padding: '30px 16px 28px',
            textAlign: 'center', textDecoration: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
            transition: 'background .22s ease',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#6B1FFF';
              const svg = (e.currentTarget as HTMLElement).querySelector('svg');
              const span = (e.currentTarget as HTMLElement).querySelector('span');
              if (svg) svg.style.stroke = '#fff';
              if (span) span.style.color = '#fff';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#fff';
              const svg = (e.currentTarget as HTMLElement).querySelector('svg');
              const span = (e.currentTarget as HTMLElement).querySelector('span');
              if (svg) svg.style.stroke = '#0C0C0C';
              if (span) span.style.color = '#0C0C0C';
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0C0C0C" strokeWidth="1.2" style={{ transition: 'stroke .22s' }}>
              {k.svg}
            </svg>
            <span style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0C0C0C', fontWeight: 400, transition: 'color .22s', lineHeight: 1.4 }}>
              {k.isim}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}