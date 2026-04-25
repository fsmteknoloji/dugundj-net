import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0C0C0C', padding: '64px 64px 36px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,.06)', marginBottom: '30px' }}>
        
        <div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '20px', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase', color: '#fff', marginBottom: '6px' }}>
            Düğün<em style={{ fontStyle: 'normal', color: '#6B1FFF' }}>DJ</em>
          </div>
          <div style={{ width: '32px', height: '2px', background: '#6B1FFF', margin: '12px 0 16px' }} />
          <p style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,.28)', lineHeight: 1.8, maxWidth: '230px' }}>
            Türkiye&apos;nin DJ kiralama ve organizasyon platformu. Doğru DJ&apos;i, doğru fiyata, güvenle.
          </p>
        </div>

        <div>
          <h5 style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '18px', fontWeight: 500 }}>Platform</h5>
          {['DJ Listesi', 'Kategoriler', 'Teklif Al', 'Ekipman Kirala', 'Blog'].map(l => (
            <Link key={l} href="#" style={{ display: 'block', fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,.38)', textDecoration: 'none', marginBottom: '10px' }}>{l}</Link>
          ))}
        </div>

        <div>
          <h5 style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '18px', fontWeight: 500 }}>DJ&apos;ler</h5>
          {['Başvuru Formu', 'DJ Paneli', 'Nasıl Çalışır'].map(l => (
            <Link key={l} href="#" style={{ display: 'block', fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,.38)', textDecoration: 'none', marginBottom: '10px' }}>{l}</Link>
          ))}
        </div>

        <div>
          <h5 style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '18px', fontWeight: 500 }}>Destek</h5>
          {['SSS', 'İletişim', 'Gizlilik Politikası', 'Kullanım Koşulları', 'KVKK'].map(l => (
            <Link key={l} href="#" style={{ display: 'block', fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,.38)', textDecoration: 'none', marginBottom: '10px' }}>{l}</Link>
          ))}
        </div>

      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
  <div style={{ fontSize: '11px', letterSpacing: '1px', color: 'rgba(255,255,255,.18)' }}>
    <span style={{ color: '#6B1FFF' }}>© 2025 dugundj.net</span> &nbsp;|&nbsp;
    <span style={{ color: '#fff' }}> | Tasarım & Yazılım: </span>
    <a href="https://fsmteknoloji.com.tr" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
      FSM Teknoloji
    </a>
  </div>
  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '13px', fontStyle: 'italic', color: '#fff' }}>
    
  </div>
</div>       
<div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '13px', fontStyle: 'italic', color: 'rgba(107,31,255,.5)' }}>Müziğin durmadığı yerde.</div>
      </div>
    </footer>
  )
}