'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Footer() {
  const [ayarlar, setAyarlar] = useState<Record<string, string>>({})

  useEffect(() => {
    async function yukle() {
      const { data } = await supabase.from('ayarlar').select('*')
      if (data) {
        const obj: Record<string, string> = {}
        data.forEach((row: { anahtar: string; deger: string }) => {
          obj[row.anahtar] = row.deger
        })
        setAyarlar(obj)
      }
    }
    yukle()
  }, [])

  return (
    <footer style={{ background: '#0C0C0C', padding: '60px 64px 32px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '40px', marginBottom: '48px' }}>

          {/* LOGO & AÇIKLAMA */}
          <div style={{ gridColumn: 'span 1' }}>
            <img src="/logo.jpg" alt="dugundj.net" style={{ height: '48px', marginBottom: '16px' }} />
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.4)', lineHeight: 1.8, fontWeight: 300 }}>
              {ayarlar.footer_metin || 'Türkiye\'nin DJ kiralama platformu.'}
            </p>
          </div>

          {/* LİNKLER */}
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '16px', fontWeight: 600 }}>Platform</div>
            {[
              { label: 'DJ Bul', href: '/djler' },
              { label: 'Kategoriler', href: '/kategoriler/dugun' },
              { label: 'Blog', href: '/blog' },
              { label: 'Teklif Al', href: '/teklif-al' },
            ].map((l, i) => (
              <a key={i} href={l.href} style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,.4)', textDecoration: 'none', marginBottom: '10px', fontWeight: 300 }}>
                {l.label}
              </a>
            ))}
          </div>

          {/* İLETİŞİM */}
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '16px', fontWeight: 600 }}>İletişim</div>
            <a href={`https://wa.me/${(ayarlar.whatsapp || '').replace(/\s/g, '')}`}
              style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,.4)', textDecoration: 'none', marginBottom: '10px', fontWeight: 300 }}>
              {ayarlar.whatsapp || 'WhatsApp'}
            </a>
            <a href={`mailto:${ayarlar.email}`}
              style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,.4)', textDecoration: 'none', marginBottom: '10px', fontWeight: 300 }}>
              {ayarlar.email || 'E-posta'}
            </a>
          </div>

          {/* SOSYAL MEDYA */}
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '16px', fontWeight: 600 }}>Sosyal Medya</div>
            {[
              { label: 'Instagram', key: 'instagram' },
              { label: 'Facebook', key: 'facebook' },
              { label: 'YouTube', key: 'youtube' },
            ].map((s, i) => ayarlar[s.key] ? (
              <a key={i} href={ayarlar[s.key]}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,.4)', textDecoration: 'none', marginBottom: '10px', fontWeight: 300 }}>
                {s.label}
              </a>
            ) : null)}
          </div>
        </div>

        {/* ALT ÇIZGI */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.2)', fontWeight: 300 }}>
            {ayarlar.footer_telif || '© 2025 dugundj.net'}
          </div>
          <a href="https://fsmteknoloji.com.tr" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '12px', color: 'rgba(255,255,255,.2)', textDecoration: 'none', fontWeight: 300 }}>
            FSM Teknoloji
          </a>
        </div>
      </div>
    </footer>
  )
}