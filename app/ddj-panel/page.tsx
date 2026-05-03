'use client'
import Link from 'next/link'

const menuler = [
  { baslik: 'DJ Yönetimi', aciklama: "DJ ekle, düzenle, sil", href: '/ddj-panel/djler', ikon: '🎧', renk: '#6B1FFF' },
  { baslik: 'Kategoriler', aciklama: 'Etkinlik kategorilerini yönet', href: '/ddj-panel/kategoriler', ikon: '📂', renk: '#8B45FF' },
  { baslik: 'Blog Yazıları', aciklama: 'Yazı ekle ve düzenle', href: '/ddj-panel/blog', ikon: '✍️', renk: '#6B1FFF' },
  { baslik: 'Referans Etkinlikler', aciklama: 'Referans etkinlikleri yönet', href: '/ddj-panel/etkinlikler', ikon: '🎪', renk: '#8B45FF' },
  { baslik: 'Teklif Talepleri', aciklama: 'Gelen talepleri görüntüle', href: '/ddj-panel/teklifler', ikon: '📋', renk: '#6B1FFF' },
  { baslik: 'Yorumlar', aciklama: 'Yorumları onayla veya sil', href: '/ddj-panel/yorumlar', ikon: '⭐', renk: '#8B45FF' },
  { baslik: 'Site Ayarları', aciklama: 'Footer, iletişim, sosyal medya', href: '/ddj-panel/ayarlar', ikon: '⚙️', renk: '#6B1FFF' },
  { baslik: 'Kullanıcılar', aciklama: 'Admin kullanıcıları yönet', href: '/ddj-panel/kullanicilar', ikon: '👥', renk: '#6B1FFF' },
]

export default function AdminPanel() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3', fontFamily: 'Inter, sans-serif' }}>

      <div style={{ background: '#0C0C0C', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src="/logo.jpg" alt="logo" style={{ height: '40px', width: 'auto' }} />
          <div>
            <div style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>Admin Paneli</div>
            <div style={{ color: 'rgba(255,255,255,.4)', fontSize: '12px' }}>dugundj.net yönetim sistemi</div>
          </div>
        </div>
        <Link href="/" style={{ fontSize: '12px', color: 'rgba(255,255,255,.5)', textDecoration: 'none', border: '1px solid rgba(255,255,255,.15)', padding: '8px 16px', borderRadius: '6px' }}>
          Siteye Git
        </Link>
      </div>

      <div style={{ padding: '40px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#0C0C0C', marginBottom: '6px' }}>Hoş geldiniz 👋</div>
          <div style={{ fontSize: '14px', color: '#888' }}>Yönetmek istediğiniz bölümü seçin</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {menuler.map((m, i) => (
            <MenuKart key={i} m={m} />
          ))}
        </div>

        <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
          {[
            { label: 'Aktif DJ', value: '0', ikon: '🎧' },
            { label: 'Blog Yazısı', value: '0', ikon: '✍️' },
            { label: 'Teklif Talebi', value: '0', ikon: '📋' },
            { label: 'Bekleyen Yorum', value: '0', ikon: '⭐' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '10px', padding: '20px', border: '1px solid #E2E0DB', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.ikon}</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#6B1FFF' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MenuKart({ m }: { m: typeof menuler[0] }) {
  return (
    <Link href={m.href} style={{ textDecoration: 'none' }}>
      <div
        style={{ background: '#fff', borderRadius: '12px', padding: '28px 24px', border: '1px solid #E2E0DB', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'transform .2s, box-shadow .2s', cursor: 'pointer' }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'translateY(-4px)'
          el.style.boxShadow = '0 12px 32px rgba(107,31,255,0.12)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'translateY(0)'
          el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ fontSize: '36px', marginBottom: '14px' }}>{m.ikon}</div>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#0C0C0C', marginBottom: '6px' }}>{m.baslik}</div>
        <div style={{ fontSize: '13px', color: '#888', fontWeight: 300 }}>{m.aciklama}</div>
        <div style={{ marginTop: '16px', fontSize: '12px', color: m.renk, fontWeight: 500 }}>Yönet</div>
      </div>
    </Link>
  )
}