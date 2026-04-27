'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useIsMobile } from './useIsMobile'

export default function Navbar() {
  const isMobile = useIsMobile()
  const [menuAcik, setMenuAcik] = useState(false)

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '0 20px' : '0 64px', height: '76px',
        background: 'rgba(255,255,255,0.93)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}>
        <Link href="/">
  <img src="/logo.jpg" alt="dugundj.net" style={{ height: '56px', width: 'auto', display: 'block' }} />
</Link>

        {!isMobile && (
          <div style={{ display: 'flex', gap: '40px' }}>
            {['Hizmetler', "DJ'ler", 'Süreç', 'İletişim'].map((item, i) => (
              <Link key={i} href="#" style={{ fontSize: '11px', letterSpacing: '1.8px', textTransform: 'uppercase', color: '#888', textDecoration: 'none' }}>{item}</Link>
            ))}
          </div>
        )}

        {!isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link href="/giris" style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#888', textDecoration: 'none' }}>Giriş Yap</Link>
            <Link href="/teklif-al" style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 500, background: '#6B1FFF', color: '#fff', padding: '10px 26px', borderRadius: '2px', textDecoration: 'none' }}>Teklif Al</Link>
          </div>
        ) : (
          <button onClick={() => setMenuAcik(!menuAcik)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0C0C0C" strokeWidth="1.5">
              {menuAcik
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        )}
      </nav>

      {/* MOBİL MENU */}
      {isMobile && menuAcik && (
        <div style={{
          position: 'fixed', top: '66px', left: 0, right: 0, zIndex: 998,
          background: '#fff', borderBottom: '1px solid #E2E0DB',
          padding: '20px',
          display: 'flex', flexDirection: 'column', gap: '0',
        }}>
          {[
            { label: 'Hizmetler', href: '/hizmetler' },
            { label: "DJ'ler", href: '/djler' },
            { label: 'Süreç', href: '/surec' },
            { label: 'İletişim', href: '/iletisim' },
          ].map((item, i) => (
            <Link key={i} href={item.href} style={{
              fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase',
              color: '#0C0C0C', textDecoration: 'none',
              padding: '14px 0', borderBottom: '1px solid #F0EEF8',
            }} onClick={() => setMenuAcik(false)}>{item.label}</Link>
          ))}
          <Link href="/teklif-al" style={{
            marginTop: '16px', background: '#6B1FFF', color: '#fff',
            fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase',
            fontWeight: 500, padding: '14px', textAlign: 'center',
            textDecoration: 'none', borderRadius: '2px',
          }} onClick={() => setMenuAcik(false)}>Teklif Al</Link>
        </div>
      )}
    </>
  )
}