'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Kategori = {
  id: number
  isim: string
  slug: string
  ikon: string
}

export default function KategorilerBar({ aktifSlug }: { aktifSlug?: string }) {
  const [kategoriler, setKategoriler] = useState<Kategori[]>([])

  useEffect(() => {
    async function yukle() {
      const { data } = await supabase
        .from('kategoriler')
        .select('id, isim, slug, ikon')
        .eq('aktif', true)
        .order('sira')
      if (data) setKategoriler(data)
    }
    yukle()
  }, [])

  if (kategoriler.length === 0) return null

  return (
    <div style={{ background: '#F7F6F3', padding: '48px 64px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#6B1FFF' }} />
          Tüm Kategoriler
        </div>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 300, color: '#0C0C0C', marginBottom: '24px' }}>
          Her Etkinlik İçin <em style={{ color: '#6B1FFF' }}>Profesyonel DJ</em>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {kategoriler.map((k, i) => (
            <a key={i} href={'/kategoriler/' + k.slug}
              style={{
                padding: '10px 18px', borderRadius: '100px',
                border: '1.5px solid',
                borderColor: aktifSlug === k.slug ? '#6B1FFF' : '#E2E0DB',
                background: aktifSlug === k.slug ? 'rgba(107,31,255,0.08)' : '#fff',
                color: aktifSlug === k.slug ? '#6B1FFF' : '#444',
                fontSize: '13px', textDecoration: 'none',
                fontWeight: aktifSlug === k.slug ? 600 : 400,
                display: 'flex', alignItems: 'center', gap: '6px',
                transition: 'all .2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = '#6B1FFF'
                el.style.color = '#6B1FFF'
                el.style.background = 'rgba(107,31,255,0.05)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                if (aktifSlug === k.slug) return
                el.style.borderColor = '#E2E0DB'
                el.style.color = '#444'
                el.style.background = '#fff'
              }}
            >
              {k.ikon && <span>{k.ikon}</span>}
              {k.isim}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}