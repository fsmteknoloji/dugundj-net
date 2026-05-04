'use client'
import { useState, useEffect } from 'react'
import { useIsMobile } from './useIsMobile'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Etkinlik = {
  id: number
  baslik: string
  kategori: string
  mekan: string
  tarih: string
  dj_isim: string
  misafir_sayisi: number
  fotograf: string
  yorum: string
  buyuk_kart: boolean
}

export default function Referanslar() {
  const isMobile = useIsMobile()
  const [etkinlikler, setEtkinlikler] = useState<Etkinlik[]>([])

  useEffect(() => {
    async function yukle() {
      const { data } = await supabase
        .from('etkinlikler')
        .select('*')
        .eq('aktif', true)
        .order('sira')
      if (data) setEtkinlikler(data)
    }
    yukle()
  }, [])

  if (etkinlikler.length === 0) return null

  return (
    <section style={{ padding: isMobile ? '60px 20px' : '100px 64px', background: '#F7F6F3' }}>
      <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#6B1FFF' }} />
        Referanslar
      </div>
      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(34px,4vw,56px)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-1px', color: '#0C0C0C', marginBottom: '48px' }}>
        Unutulmaz<br /><em style={{ color: '#6B1FFF' }}>Anlar</em>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '16px' }}>
        {etkinlikler.map((e, i) => (
          <div key={i} style={{
            gridColumn: e.buyuk_kart && !isMobile ? 'span 2' : 'span 1',
            borderRadius: '16px', overflow: 'hidden', position: 'relative',
            height: e.buyuk_kart ? '420px' : '280px',
            background: 'linear-gradient(135deg, #1a1a2e, #2d1b5e)',
          }}>
            {e.fotograf && (
              <img src={e.fotograf} alt={e.baslik} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.6)' }} />
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 50%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px' }}>
              {e.kategori && (
                <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8B45FF', marginBottom: '8px', fontWeight: 500 }}>
                  {e.kategori}
                </div>
              )}
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: e.buyuk_kart ? '28px' : '20px', fontWeight: 300, color: '#fff', marginBottom: '6px' }}>
                {e.baslik}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.5)' }}>
                {e.mekan} {e.tarih && `· ${e.tarih}`} {e.dj_isim && `· DJ ${e.dj_isim}`}
              </div>
              {e.yorum && (
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.7)', marginTop: '10px', fontStyle: 'italic', lineHeight: 1.5 }}>
                  "{e.yorum}"
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}