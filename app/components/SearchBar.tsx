'use client'
import { useIsMobile } from './useIsMobile'

export default function SearchBar() {
  const isMobile = useIsMobile()

  return (
    <div style={{ background: '#fff', borderBottom: '1px solid #E2E0DB' }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        border: '1px solid #E2E0DB', borderTop: '3px solid #6B1FFF',
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
      }}>
        <div style={{ flex: 1, borderRight: isMobile ? 'none' : '1px solid #E2E0DB', borderBottom: isMobile ? '1px solid #E2E0DB' : 'none', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', fontWeight: 500 }}>Etkinlik Türü</div>
          <select style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#0C0C0C', background: 'transparent', fontWeight: 300 }}>
            <option>Düğün</option><option>Kına Gecesi</option><option>After Parti</option>
            <option>Doğum Günü</option><option>Sünnet</option><option>Gelin Alma</option>
            <option>Gala Gecesi</option><option>Şirket Lansmanı</option>
            <option>Açık Hava Konseri</option><option>Okul Mezuniyeti</option><option>Drone Çekim</option>
          </select>
        </div>
        <div style={{ flex: 1, borderRight: isMobile ? 'none' : '1px solid #E2E0DB', borderBottom: isMobile ? '1px solid #E2E0DB' : 'none', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', fontWeight: 500 }}>Şehir</div>
          <select style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#0C0C0C', background: 'transparent', fontWeight: 300 }}>
            <option>İstanbul</option><option>Ankara</option><option>İzmir</option>
            <option>Antalya</option><option>Bursa</option><option>Bodrum</option><option>Tüm Türkiye</option>
          </select>
        </div>
        <div style={{ flex: 1, borderRight: isMobile ? 'none' : '1px solid #E2E0DB', borderBottom: isMobile ? '1px solid #E2E0DB' : 'none', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', fontWeight: 500 }}>Etkinlik Tarihi</div>
          <input type="date" style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#0C0C0C', background: 'transparent', fontWeight: 300 }} />
        </div>
        <button style={{
          background: '#6B1FFF', color: '#fff', border: 'none',
          padding: isMobile ? '16px' : '0 44px',
          fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
          cursor: 'pointer', fontWeight: 500,
        }}>DJ Ara</button>
      </div>
    </div>
  )
}