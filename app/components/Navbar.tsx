'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 64px', height: '66px',
      background: 'rgba(255,255,255,0.93)',
      backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(0,0,0,0.07)',
    }}>
      <Link href="/" style={{
        fontFamily: 'var(--font-cormorant)',
        fontSize: '22px', fontWeight: 600,
        letterSpacing: '2px', textDecoration: 'none',
        color: 'var(--black)', textTransform: 'uppercase',
      }}>
        Düğün<em style={{ fontStyle: 'normal', color: 'var(--v)' }}>DJ</em>
      </Link>

      <div style={{ display: 'flex', gap: '40px' }}>
        <Link href="/hizmetler" style={{ fontSize: '11px', letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--grey)', textDecoration: 'none' }}>Hizmetler</Link>
        <Link href="/djler" style={{ fontSize: '11px', letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--grey)', textDecoration: 'none' }}>DJ'ler</Link>
        <Link href="/surec" style={{ fontSize: '11px', letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--grey)', textDecoration: 'none' }}>Süreç</Link>
        <Link href="/iletisim" style={{ fontSize: '11px', letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--grey)', textDecoration: 'none' }}>İletişim</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link href="/giris" style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--grey)', textDecoration: 'none' }}>Giriş Yap</Link>
        <Link href="/teklif-al" style={{
          fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase',
          fontWeight: 500, background: 'var(--v)', color: '#fff',
          padding: '10px 26px', borderRadius: '2px', textDecoration: 'none',
        }}>Teklif Al</Link>
      </div>
    </nav>
  )
}