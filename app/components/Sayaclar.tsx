'use client'
import { useState, useEffect } from 'react'
import { useIsMobile } from './useIsMobile'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const varsayilan = [
  { n: '250', sup: '+', label: 'Aktif DJ', anahtar: 'aktif_dj_sayisi' },
  { n: '4.800', sup: '+', label: 'Tamamlanan Etkinlik', anahtar: 'etkinlik_sayisi' },
  { n: '81', sup: '', label: "İl'de Hizmet", anahtar: 'il_sayisi' },
  { n: '12K', sup: '+', label: 'Mutlu Misafir', anahtar: 'mutlu_misafir' },
]

export default function Sayaclar() {
  const isMobile = useIsMobile()
  const [degerler, setDegerler] = useState<Record<string, string>>({})

  useEffect(() => {
    async function yukle() {
      const { data } = await supabase.from('ayarlar').select('*')
      if (data) {
        const obj: Record<string, string> = {}
        data.forEach((row: { anahtar: string; deger: string }) => {
          obj[row.anahtar] = row.deger
        })
        setDegerler(obj)
      }
    }
    yukle()
  }, [])

  return (
    <div style={{
      background: '#0C0C0C',
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
      borderLeft: '1px solid rgba(255,255,255,.07)',
    }}>
      {varsayilan.map((s, i) => (
        <div key={i} style={{
          borderRight: '1px solid rgba(255,255,255,.07)',
          borderBottom: isMobile && i < 2 ? '1px solid rgba(255,255,255,.07)' : 'none',
          padding: isMobile ? '40px 24px' : '64px 48px',
        }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: isMobile ? 'clamp(36px,8vw,52px)' : 'clamp(52px,5.5vw,80px)', fontWeight: 300, color: '#fff', lineHeight: 1, marginBottom: '14px', letterSpacing: '-2px' }}>
            {degerler[s.anahtar] || s.n}
            <sup style={{ fontSize: '.5em', color: '#6B1FFF', fontStyle: 'italic' }}>{s.sup}</sup>
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,.28)' }}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}