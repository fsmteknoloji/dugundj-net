'use client'
import { useIsMobile } from './useIsMobile'

export default function SearchBar() {
  const isMobile = useIsMobile()

  return (
    <div style={{ background: '#fff', padding: isMobile ? '24px 20px' : '32px 64px', borderBottom: '1px solid #E2E0DB' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* BAŞLIK */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: isMobile ? '24px' : '32px', fontWeight: 300, color: '#0C0C0C', letterSpacing: '-0.5px' }}>
            Etkinliğinize Uygun <em style={{ color: '#6B1FFF', fontStyle: 'italic' }}>DJ'i Bulun</em>
          </div>
          <div style={{ fontSize: '13px', color: '#888', marginTop: '6px', fontWeight: 300 }}>
            250+ profesyonel DJ arasından tarihe ve şehre göre filtreleyin
          </div>
        </div>

        {/* ARAMA KUTUSU */}
        <div style={{
          border: '2px solid #6B1FFF',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          boxShadow: '0 8px 32px rgba(107,31,255,0.12)',
        }}>
          <div style={{ flex: 1, borderRight: isMobile ? 'none' : '1px solid #E2E0DB', borderBottom: isMobile ? '1px solid #E2E0DB' : 'none', padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: '6px', background: '#fff' }}>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', fontWeight: 600 }}>
              🎉 Etkinlik Türü
            </div>
            <select style={{ border: 'none', outline: 'none', fontSize: '15px', color: '#0C0C0C', background: 'transparent', fontWeight: 400, cursor: 'pointer' }}>
              <option>Düğün</option>
              <option>Kına Gecesi</option>
              <option>After Parti</option>
              <option>Doğum Günü</option>
              <option>Sünnet</option>
              <option>Gelin Alma</option>
              <option>Gala Gecesi</option>
              <option>Şirket Lansmanı</option>
              <option>Açık Hava Konseri</option>
              <option>Okul Mezuniyeti</option>
              <option>Drone Çekim</option>
            </select>
          </div>

          <div style={{ flex: 1, borderRight: isMobile ? 'none' : '1px solid #E2E0DB', borderBottom: isMobile ? '1px solid #E2E0DB' : 'none', padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: '6px', background: '#fff' }}>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', fontWeight: 600 }}>
              📍 Şehir
            </div>
            <select style={{ border: 'none', outline: 'none', fontSize: '15px', color: '#0C0C0C', background: 'transparent', fontWeight: 400, cursor: 'pointer' }}>
              <option>İstanbul</option>
              <option>Ankara</option>
              <option>İzmir</option>
              <option>Antalya</option>
              <option>Bursa</option>
              <option>Bodrum</option>
              <option>Tüm Türkiye</option>
            </select>
          </div>

          <div style={{ flex: 1, borderRight: isMobile ? 'none' : '1px solid #E2E0DB', borderBottom: isMobile ? '1px solid #E2E0DB' : 'none', padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: '6px', background: '#fff' }}>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', fontWeight: 600 }}>
              📅 Etkinlik Tarihi
            </div>
            <input type="date" style={{ border: 'none', outline: 'none', fontSize: '15px', color: '#0C0C0C', background: 'transparent', fontWeight: 400 }} />
          </div>

          <button
            style={{
              background: '#6B1FFF',
              color: '#fff',
              border: 'none',
              padding: isMobile ? '18px' : '0 48px',
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'background .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#8B45FF')}
            onMouseLeave={e => (e.currentTarget.style.background = '#6B1FFF')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            DJ Ara
          </button>
        </div>

      </div>
    </div>
  )
}