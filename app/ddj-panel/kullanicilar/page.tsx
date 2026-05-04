'use client'
import Link from 'next/link'

export default function KullanicilarAdmin() {
  const supabaseUrl = 'https://supabase.com/dashboard/project/ttlkptscooljyppmhjbu/auth/users'
  
  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3' }}>
      <div style={{ background: '#0C0C0C', padding: '20px 40px', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/ddj-panel" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none', fontSize: '13px' }}>
            Admin
          </Link>
          <span style={{ color: 'rgba(255,255,255,.2)' }}>/</span>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>Kullanici Yonetimi</span>
        </div>
      </div>

      <div style={{ padding: '40px', maxWidth: '700px' }}>
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E0DB', padding: '32px' }}>
          <div style={{ fontSize: '20px', fontWeight: 600, color: '#0C0C0C', marginBottom: '12px' }}>
            Admin Kullanicilari
          </div>
          <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, marginBottom: '24px' }}>
            Kullanici eklemek icin Supabase panelini kullanin.
          </p>
          <button
            onClick={() => window.open(supabaseUrl, '_blank')}
            style={{ display: 'inline-block', background: '#6B1FFF', color: '#fff', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
          >
            Supabase Kullanici Paneli
          </button>
        </div>
      </div>
    </div>
  )
}