'use client'
import { useState, useEffect, use } from 'react'
import { createClient } from '@supabase/supabase-js'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type BlogYazisi = {
  id: number
  baslik: string
  slug: string
  ozet: string
  icerik: string
  kapak_foto: string
  kategori: string
  yazar: string
  created_at: string
}

export default function BlogDetay({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [yazi, setYazi] = useState<BlogYazisi | null>(null)
  const [yukleniyor, setYukleniyor] = useState(true)

  useEffect(() => {
    async function yukle() {
      const { data } = await supabase
        .from('blog_yazilari')
        .select('*')
        .eq('slug', slug)
        .single()
      if (data) setYazi(data)
      setYukleniyor(false)
    }
    yukle()
  }, [slug])

  if (yukleniyor) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#888' }}>Yükleniyor...</div>
    </div>
  )

  if (!yazi) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✍️</div>
        <div style={{ fontSize: '20px', marginBottom: '8px' }}>Yazı bulunamadı</div>
        <a href="/blog" style={{ color: '#6B1FFF', textDecoration: 'none' }}>← Blog'a dön</a>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3' }}>
      <Navbar />

      {/* KAPAK */}
      <div style={{ background: '#0C0C0C', marginTop: '66px', padding: '80px 64px 60px', position: 'relative', overflow: 'hidden' }}>
        {yazi.kapak_foto && (
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${yazi.kapak_foto})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(.3)' }} />
        )}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          {yazi.kategori && (
            <div style={{ display: 'inline-block', background: '#6B1FFF', color: '#fff', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '4px', marginBottom: '20px', fontWeight: 500 }}>
              {yazi.kategori}
            </div>
          )}
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 300, color: '#fff', lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-1px' }}>
            {yazi.baslik}
          </h1>
          <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: 'rgba(255,255,255,.5)' }}>
            <span>{yazi.yazar}</span>
            <span>·</span>
            <span>{new Date(yazi.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* İÇERİK */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 64px' }}>
        {yazi.ozet && (
          <div style={{ background: '#fff', borderRadius: '12px', padding: '28px 32px', border: '1px solid #E2E0DB', borderLeft: '4px solid #6B1FFF', marginBottom: '40px' }}>
            <p style={{ fontSize: '17px', fontWeight: 300, color: '#555', lineHeight: 1.75, fontStyle: 'italic' }}>{yazi.ozet}</p>
          </div>
        )}

        {yazi.icerik && (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '48px', border: '1px solid #E2E0DB' }}>
            <div style={{ fontSize: '16px', fontWeight: 300, color: '#333', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>
              {yazi.icerik}
            </div>
          </div>
        )}

        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #E2E0DB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/blog" style={{ color: '#6B1FFF', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>← Blog'a Dön</a>
          <a href="/teklif-al" style={{ background: '#6B1FFF', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontSize: '13px', textDecoration: 'none', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Teklif Al
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}