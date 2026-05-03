'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const [giris, setGiris] = useState(false)
  const [email, setEmail] = useState('')
  const [sifre, setSifre] = useState('')
  const [hata, setHata] = useState('')
  const [yukleniyor, setYukleniyor] = useState(true)
  const [gonderiyor, setGonderiyor] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setGiris(true)
      setYukleniyor(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setGiris(!!session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function girisYap() {
    setGonderiyor(true)
    setHata('')
    const { error } = await supabase.auth.signInWithPassword({ email, password: sifre })
    if (error) setHata('Email veya şifre yanlış!')
    setGonderiyor(false)
  }

  async function cikisYap() {
    await supabase.auth.signOut()
    setGiris(false)
  }

  if (yukleniyor) return null

  if (!giris) return (
    <div style={{ minHeight: '100vh', background: '#0C0C0C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(107,31,255,0.3)', borderRadius: '16px', padding: '48px', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img src="/logo.jpg" alt="logo" style={{ height: '56px', marginBottom: '16px' }} />
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,.4)', letterSpacing: '2px', textTransform: 'uppercase' }}>Yönetim Paneli</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            E-posta
          </label>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setHata('') }}
            onKeyDown={e => e.key === 'Enter' && girisYap()}
            placeholder="admin@dugundj.net"
            style={{ width: '100%', padding: '12px 16px', background: '#0C0C0C', border: '1.5px solid rgba(255,255,255,.1)', borderRadius: '8px', fontSize: '15px', color: '#fff', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const, marginBottom: '12px' }}
          />
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            Şifre
          </label>
          <input
            type="password"
            value={sifre}
            onChange={e => { setSifre(e.target.value); setHata('') }}
            onKeyDown={e => e.key === 'Enter' && girisYap()}
            placeholder="••••••••••"
            style={{ width: '100%', padding: '12px 16px', background: '#0C0C0C', border: `1.5px solid ${hata ? '#C62828' : 'rgba(255,255,255,.1)'}`, borderRadius: '8px', fontSize: '15px', color: '#fff', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const }}
          />
          {hata && <div style={{ fontSize: '12px', color: '#C62828', marginTop: '6px' }}>{hata}</div>}
        </div>

        <button
          onClick={girisYap}
          disabled={gonderiyor}
          style={{ width: '100%', background: '#6B1FFF', color: '#fff', border: 'none', padding: '13px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', letterSpacing: '1px', marginTop: '8px' }}
        >
          {gonderiyor ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </button>
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
        <button onClick={cikisYap} style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.4)', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
          Çıkış Yap
        </button>
      </div>
      {children}
    </div>
  )
}