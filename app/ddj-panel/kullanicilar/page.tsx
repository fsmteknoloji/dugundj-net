'use client'
import Link from 'next/link'

export default function KullanicilarAdmin() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3' }}>
      <div style={{ background: '#0C0C0C', padding: '20px 40px', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/ddj-panel" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none', fontSize: '13px' }}>← Admin</Link>
          <span style={{ color: 'rgba(255,255,255,.2)' }}>/</span>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>Kullanıcı Yönetimi</span>
        </div>
      </div>

      <div style={{ padding: '40px', maxWidth: '700px' }}>
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E0DB', padding: '32px' }}>
          <div style={{ fontSize: '20px', fontWeight: 600, color: '#0C0C0C', marginBottom: '12px' }}>👥 Admin Kullanıcıları</div>
          <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, marginBottom: '24px' }}>
            Kullanıcı eklemek, silmek veya şifre değiştirmek için Supabase panelini kullanın. Güvenlik nedeniyle bu işlemler doğrudan Supabase üzerinden yapılmalıdır.
          </p>
          
            href="https://supabase.com/dashboard/project/ttlkptscooljyppmhjbu/auth/users"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#6B1FFF', color: '#fff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}
          >
            Supabase Kullanıcı Paneli
          </a>

          <div style={{ marginTop: '32px', padding: '20px', background: '#F7F6F3', borderRadius: '8px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '12px' }}>Kullanıcı Eklemek İçin:</div>
            <ol style={{ fontSize: '13px', color: '#666', lineHeight: 2, paddingLeft: '20px' }}>
              <li>Yukarıdaki linke tıkla</li>
              <li>"Add user" butonuna bas</li>
              <li>Email ve şifre gir</li>
              <li>"Create user" bas</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}