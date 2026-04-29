'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useIsMobile } from '../components/useIsMobile'

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

export default function DJler() {
  const isMobile = useIsMobile()
  const [djler, setDjler] = useState<DJ[]>([])

  useEffect(() => {
    async function yukle() {
      const { data } = await supabase
        .from('djler')
        .select('*')
        .eq('aktif', true)
        .eq('one_cikan', true)
        .order('isim')
        .limit(4)
      if (data) setDjler(data)
    }
    yukle()
  }, [])

  if (djler.length === 0) return null

  return (
    <section style={{ padding: isMobile ? '60px 20px' : '100px 64px', background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '44px' }}>
        <div>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#6B1FFF' }} />
            Öne Çıkan
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(34px,4vw,56px)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-1px', color: '#0C0C0C' }}>
            Platformun<br /><em style={{ color: '#6B1FFF' }}>Seçkin DJ&apos;leri</em>
          </div>
        </div>
        <a href="/djler" style={{ alignSelf: 'flex-end', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', textDecoration: 'none', borderBottom: '1px solid rgba(107,31,255,0.2)', paddingBottom: '2px' }}>
          Tümünü Gör
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4,1fr)', gap: '16px' }}>
        {djler.map((dj, i) => (
          <DJKart key={i} dj={dj} />
        ))}
      </div>
    </section>
  )
}

function DJKart({ dj }: { dj: DJ }) {
  return (
    <div
      style={{ background: '#F7F6F3', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E0DB', cursor: 'pointer', transition: 'transform .3s ease, box-shadow .3s ease' }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 20px 48px rgba(107,31,255,0.15)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
      onClick={() => window.location.href = '/djler/' + dj.slug}
    >
      <div style={{ height: '280px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1a1a2e, #2d1b5e)' }}>
        {dj.one_cikan && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#6B1FFF', zIndex: 4 }} />
        )}
        {dj.profil_foto ? (
          <img src={dj.profil_foto} alt={dj.isim} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.88)' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '64px', fontWeight: 300, color: 'rgba(255,255,255,.2)' }}>{dj.isim.charAt(0)}</span>
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3, background: 'linear-gradient(to top,rgba(0,0,0,.72),transparent)', padding: '14px 16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)' }}>{dj.sehir}</span>
          <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#8B45FF', fontWeight: 500 }}>
            {dj.baslangic_fiyati ? '₺' + dj.baslangic_fiyati.toLocaleString() + '\'den' : 'Teklif Al'}
          </span>
        </div>
      </div>
      <div style={{ padding: '18px 18px 22px' }}>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '22px', fontWeight: 400, color: '#0C0C0C', letterSpacing: '.5px', marginBottom: '3px' }}>{dj.isim}</div>
        <div style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#888', marginBottom: '14px' }}>{dj.muzik_tarzi}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: '#6B1FFF' }}>{'★'.repeat(Math.round(dj.puan || 0))}</span>
          <span style={{ fontSize: '12px', color: '#0C0C0C', fontWeight: 500 }}>{dj.puan}</span>
          <span style={{ fontSize: '11px', color: '#888' }}>{dj.yorum_sayisi} yorum</span>
        </div>
      </div>
    </div>
  )
}