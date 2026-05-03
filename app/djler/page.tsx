'use client'
import { useState, useEffect, Suspense } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useSearchParams } from 'next/navigation'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import KategorilerBar from '../components/KategorilerBar'
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

const sehirler = ['Tümü', 'İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Bodrum']

function DJlerIcerik() {
  const searchParams = useSearchParams()
  const [djler, setDjler] = useState<DJ[]>([])
  const [yukleniyor, setYukleniyor] = useState(true)
  const [sehirFiltre, setSehirFiltre] = useState('Tümü')
  const [arama, setArama] = useState('')

  useEffect(() => {
    const sehir = searchParams.get('sehir')
    const etkinlik = searchParams.get('etkinlik')
    if (sehir && sehir !== 'Tüm Türkiye') setSehirFiltre(sehir)
    if (etkinlik) setArama(etkinlik)
  }, [searchParams])

  useEffect(() => {
    async function yukle() {
      const { data } = await supabase
        .from('djler')
        .select('*')
        .eq('aktif', true)
        .order('one_cikan', { ascending: false })
      if (data) setDjler(data)
      setYukleniyor(false)
    }
    yukle()
  }, [])

  const filtrelenmis = djler.filter(dj => {
    const sehirUygun = sehirFiltre === 'Tümü' || dj.sehir === sehirFiltre
    const aramaUygun = dj.isim.toLowerCase().includes(arama.toLowerCase()) ||
      dj.muzik_tarzi?.toLowerCase().includes(arama.toLowerCase())
    return sehirUygun && aramaUygun
  })

  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3' }}>
      <Navbar />

      <div style={{ background: '#0C0C0C', paddingTop: '120px', paddingBottom: '60px', paddingLeft: '64px', paddingRight: '64px', marginTop: '66px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#6B1FFF' }} />
            Profesyonel DJ'ler
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '16px' }}>
            Türkiye'nin En İyi<br /><em style={{ color: '#8B45FF' }}>DJ'leri</em>
          </div>
          <div style={{ fontSize: '15px', color: 'rgba(255,255,255,.5)', fontWeight: 300 }}>
            {djler.length}+ profesyonel DJ arasından size uygun olanı bulun
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: '1px solid #E2E0DB', padding: '20px 64px', position: 'sticky', top: '66px', zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="DJ veya müzik tarzı ara..."
            value={arama}
            onChange={e => setArama(e.target.value)}
            style={{ flex: 1, minWidth: '200px', padding: '10px 16px', border: '1.5px solid #E2E0DB', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif' }}
          />
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {sehirler.map(s => (
              <button key={s} onClick={() => setSehirFiltre(s)}
                style={{
                  padding: '8px 16px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                  fontSize: '13px', fontWeight: 500,
                  background: sehirFiltre === s ? '#6B1FFF' : '#F7F6F3',
                  color: sehirFiltre === s ? '#fff' : '#444',
                }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 64px' }}>
        {yukleniyor ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>Yükleniyor...</div>
        ) : filtrelenmis.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎧</div>
            <div style={{ fontSize: '18px', marginBottom: '8px' }}>DJ bulunamadı</div>
            <div style={{ fontSize: '14px' }}>Farklı filtreler deneyin</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {filtrelenmis.map((dj, i) => (
              <DJKart key={i} dj={dj} />
            ))}
          </div>
        )}
      </div>
<KategorilerBar />
      <Footer />
    </div>
  )
}

export default function DJlerSayfasi() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Yükleniyor...</div>}>
      <DJlerIcerik />
    </Suspense>
  )
}

function DJKart({ dj }: { dj: DJ }) {
  return (
    <div
      style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E0DB', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform .3s ease, box-shadow .3s ease' }}
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
      onClick={() => window.location.href = '/djler/' + dj.slug}
    >
      <div style={{ height: '240px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1a1a2e, #2d1b5e)' }}>
        {dj.one_cikan && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#6B1FFF', zIndex: 4 }} />
        )}
        {dj.profil_foto ? (
          <img src={dj.profil_foto} alt={dj.isim} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.9)' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '64px', fontWeight: 300, color: 'rgba(255,255,255,.2)' }}>{dj.isim.charAt(0)}</span>
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top,rgba(0,0,0,.7),transparent)', padding: '12px 16px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)' }}>{dj.sehir}</span>
          <span style={{ fontSize: '12px', color: '#8B45FF', fontWeight: 600 }}>
            {dj.baslangic_fiyati ? '₺' + dj.baslangic_fiyati.toLocaleString() + '\'den' : 'Teklif Al'}
          </span>
        </div>
      </div>
      
      <div style={{ padding: '18px 20px 22px' }}>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '22px', fontWeight: 400, color: '#0C0C0C', marginBottom: '4px' }}>{dj.isim}</div>
        <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#888', marginBottom: '14px' }}>{dj.muzik_tarzi}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '12px', borderTop: '1px solid #F0EEF8' }}>
          <span style={{ fontSize: '12px', color: '#6B1FFF' }}>{'★'.repeat(Math.round(dj.puan || 0))}</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#0C0C0C' }}>{dj.puan}</span>
          <span style={{ fontSize: '12px', color: '#888' }}>{dj.yorum_sayisi} yorum</span>
        </div>
      </div>
    </div>
  )
}