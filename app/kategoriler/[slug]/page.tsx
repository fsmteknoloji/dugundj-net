'use client'
import { useState, useEffect, use } from 'react'
import { createClient } from '@supabase/supabase-js'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type DJ = {
  id: number
  isim: string
  slug: string
  sehir: string
  muzik_tarzi: string
  baslangic_fiyati: number
  profil_foto: string
  puan: number
  yorum_sayisi: number
  one_cikan: boolean
}

type Kategori = {
  id: number
  isim: string
  slug: string
  ikon: string
}

export default function KategoriSayfasi({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [kategori, setKategori] = useState<Kategori | null>(null)
  const [djler, setDjler] = useState<DJ[]>([])
  const [yukleniyor, setYukleniyor] = useState(true)

  useEffect(() => {
    async function yukle() {
      const { data: kat } = await supabase
        .from('kategoriler')
        .select('*')
        .eq('slug', slug)
        .single()
      if (kat) {
        setKategori(kat)
        const { data: djs } = await supabase
          .from('djler')
          .select('*')
          .eq('aktif', true)
          .order('one_cikan', { ascending: false })
        if (djs) setDjler(djs)
      }
      setYukleniyor(false)
    }
    yukle()
  }, [slug])

  if (yukleniyor) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#888' }}>Yükleniyor...</div>
    </div>
  )

  if (!kategori) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📂</div>
        <div style={{ fontSize: '20px', marginBottom: '8px' }}>Kategori bulunamadı</div>
        <a href="/" style={{ color: '#6B1FFF', textDecoration: 'none' }}>← Ana sayfaya dön</a>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3' }}>
      <Navbar />

      <div style={{ background: '#0C0C0C', marginTop: '66px', padding: '80px 64px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>{kategori.ikon}</div>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500 }}>Kategori</div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '16px' }}>
            <em style={{ color: '#8B45FF' }}>{kategori.isim}</em> için<br />Profesyonel DJ
          </div>
          <div style={{ fontSize: '15px', color: 'rgba(255,255,255,.5)', fontWeight: 300 }}>
            {djler.length} DJ bu kategori için hizmet veriyor
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {djler.map((dj, i) => (
            <div key={i}
              onClick={() => window.location.href = '/djler/' + dj.slug}
              style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E0DB', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform .3s, box-shadow .3s' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-6px)'
                el.style.boxShadow = '0 20px 48px rgba(107,31,255,0.12)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ height: '220px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1a1a2e, #2d1b5e)' }}>
                {dj.profil_foto ? (
                  <img src={dj.profil_foto} alt={dj.isim} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.9)' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '64px', fontWeight: 300, color: 'rgba(255,255,255,.2)' }}>{dj.isim.charAt(0)}</span>
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top,rgba(0,0,0,.7),transparent)', padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)' }}>{dj.sehir}</span>
                  <span style={{ fontSize: '12px', color: '#8B45FF', fontWeight: 600 }}>
                    {dj.baslangic_fiyati ? '₺' + dj.baslangic_fiyati.toLocaleString() + '\'den' : 'Teklif Al'}
                  </span>
                </div>
              </div>
              <div style={{ padding: '18px 20px' }}>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '20px', fontWeight: 400, color: '#0C0C0C', marginBottom: '4px' }}>{dj.isim}</div>
                <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#888' }}>{dj.muzik_tarzi}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
{/* DİĞER KATEGORİLER */}
<div style={{ background: '#F7F6F3', padding: '60px 64px' }}>
  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
    <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#6B1FFF' }} />
      Diğer Kategoriler
    </div>
    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 300, color: '#0C0C0C', marginBottom: '32px' }}>
      Diğer <em style={{ color: '#6B1FFF' }}>Etkinlik Türleri</em>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {[
        { isim: 'Düğün', slug: 'dugun' },
        { isim: 'After Parti', slug: 'after-parti' },
        { isim: 'Kına Gecesi', slug: 'kina-gecesi' },
        { isim: 'Gelin Alma', slug: 'gelin-alma' },
        { isim: 'Evlilik Yıldönümü', slug: 'evlilik-yildonumu' },
        { isim: 'Sünnet', slug: 'sunnet' },
        { isim: 'Doğum Günü', slug: 'dogum-gunu' },
        { isim: 'Mezuniyet', slug: 'mezuniyet' },
        { isim: 'Gala Gecesi', slug: 'gala-gecesi' },
        { isim: 'Şirket Lansmanı', slug: 'sirket-lansmani' },
        { isim: 'Açık Hava Konseri', slug: 'acik-hava-konseri' },
        { isim: 'Mağaza Açılışı', slug: 'magaza-acilisi' },
        { isim: 'VIP Davet', slug: 'vip-davet' },
        { isim: 'Beach Club', slug: 'beach-club' },
        { isim: 'Yıl Sonu Partisi', slug: 'yil-sonu-partisi' },
        { isim: 'Asker Uğurlama', slug: 'asker-ugurlama' },
        { isim: 'Tatil Köyü', slug: 'tatil-koyu' },
        { isim: 'Spor Kutlaması', slug: 'spor-kutlamasi' },
        { isim: 'Otel Organizasyonu', slug: 'otel-organizasyonu' },
        { isim: 'Temalı Parti', slug: 'temali-parti' },
        { isim: 'Ev Partisi', slug: 'ev-partisi' },
        { isim: 'Üniversite Şenliği', slug: 'universite-senligi' },
        { isim: 'Drone Çekim', slug: 'drone-cekim' },
      ].filter(k => k.slug !== slug).map((k, i) => (
        <a key={i} href={'/kategoriler/' + k.slug}
          style={{
            padding: '10px 18px', borderRadius: '100px',
            border: '1.5px solid #E2E0DB',
            background: '#fff', color: '#444',
            fontSize: '13px', textDecoration: 'none',
            fontWeight: 400, transition: 'all .2s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = '#6B1FFF'
            el.style.color = '#6B1FFF'
            el.style.background = 'rgba(107,31,255,0.05)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = '#E2E0DB'
            el.style.color = '#444'
            el.style.background = '#fff'
          }}
        >
          {k.isim}
        </a>
      ))}
    </div>
  </div>
</div>
      <div style={{ background: '#0C0C0C', padding: '80px 64px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 300, color: '#fff', marginBottom: '16px' }}>
          {kategori.isim} için DJ mi Arıyorsunuz?
        </div>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.5)', marginBottom: '32px', fontWeight: 300 }}>
          Size özel teklif almak için formumuzu doldurun.
        </p>
        <a href="/teklif-al" style={{ display: 'inline-block', background: '#6B1FFF', color: '#fff', padding: '16px 40px', borderRadius: '8px', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
          Ücretsiz Teklif Al
        </a>
      </div>

      <Footer />
    </div>
  )
}