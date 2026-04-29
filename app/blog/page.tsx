'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type BlogYazisi = {
  id: number
  baslik: string
  slug: string
  ozet: string
  kapak_foto: string
  kategori: string
  yazar: string
  created_at: string
}

export default function BlogSayfasi() {
  const [yazilar, setYazilar] = useState<BlogYazisi[]>([])
  const [yukleniyor, setYukleniyor] = useState(true)
  const [kategori, setKategori] = useState('Tümü')
  const [kategoriler, setKategoriler] = useState<string[]>(['Tümü'])

  useEffect(() => {
    async function yukle() {
      const { data } = await supabase
        .from('blog_yazilari')
        .select('*')
        .eq('yayinda', true)
        .order('created_at', { ascending: false })
      if (data) {
        setYazilar(data)
        const cats = ['Tümü', ...Array.from(new Set(data.map((y: BlogYazisi) => y.kategori).filter(Boolean)))]
        setKategoriler(cats)
      }
      setYukleniyor(false)
    }
    yukle()
  }, [])

  const filtrelenmis = kategori === 'Tümü' ? yazilar : yazilar.filter(y => y.kategori === kategori)

  function tarihFormat(tarih: string) {
    return new Date(tarih).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3' }}>
      <Navbar />

      {/* HERO */}
      <div style={{ background: '#0C0C0C', marginTop: '66px', padding: '80px 64px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#6B1FFF' }} />
            Blog
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, letterSpacing: '-1px' }}>
            Etkinlik Rehberi &<br /><em style={{ color: '#8B45FF' }}>Müzik Trendleri</em>
          </div>
        </div>
      </div>

      {/* KATEGORİ FİLTRE */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E2E0DB', padding: '16px 64px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {kategoriler.map(k => (
            <button key={k} onClick={() => setKategori(k)}
              style={{
                padding: '8px 18px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: 500,
                background: kategori === k ? '#6B1FFF' : '#F7F6F3',
                color: kategori === k ? '#fff' : '#444',
              }}>
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* YAZI LİSTESİ */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 64px' }}>
        {yukleniyor ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>Yükleniyor...</div>
        ) : filtrelenmis.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✍️</div>
            <div style={{ fontSize: '18px' }}>Henüz yazı yok</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filtrelenmis.map((yazi, i) => (
              <BlogKart key={i} yazi={yazi} tarihFormat={tarihFormat} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

function BlogKart({ yazi, tarihFormat }: { yazi: BlogYazisi; tarihFormat: (t: string) => string }) {
  return (
    <div
      style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E0DB', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform .3s ease, box-shadow .3s ease' }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 20px 48px rgba(0,0,0,0.12)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'
      }}
      onClick={() => window.location.href = '/blog/' + yazi.slug}
    >
      <div style={{ height: '220px', overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, #1a1a2e, #2d1b5e)' }}>
        {yazi.kapak_foto && (
          <img src={yazi.kapak_foto} alt={yazi.baslik} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        {yazi.kategori && (
          <div style={{ position: 'absolute', top: '14px', left: '14px', background: '#6B1FFF', color: '#fff', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '5px 12px', borderRadius: '4px', fontWeight: 500 }}>
            {yazi.kategori}
          </div>
        )}
      </div>
      <div style={{ padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '22px', fontWeight: 400, color: '#0C0C0C', lineHeight: 1.3, marginBottom: '10px' }}>{yazi.baslik}</h3>
        {yazi.ozet && <p style={{ fontSize: '13px', fontWeight: 300, color: '#888', lineHeight: 1.75, marginBottom: '16px' }}>{yazi.ozet}</p>}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#aaa' }}>
          <span>{yazi.yazar}</span>
          <span>{tarihFormat(yazi.created_at)}</span>
        </div>
      </div>
    </div>
  )
}
