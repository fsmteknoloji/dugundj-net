'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ayarGruplari = [
  {
    baslik: 'Genel Bilgiler',
    ikon: '🌐',
    ayarlar: [
      { anahtar: 'site_adi', label: 'Site Adı', tip: 'text' },
      { anahtar: 'site_slogan', label: 'Site Sloganı', tip: 'text' },
      { anahtar: 'footer_metin', label: 'Footer Açıklama', tip: 'textarea' },
      { anahtar: 'footer_telif', label: 'Telif Yazısı', tip: 'text' },
    ]
  },
  {
    baslik: 'İletişim',
    ikon: '📞',
    ayarlar: [
      { anahtar: 'whatsapp', label: 'WhatsApp Numarası', tip: 'text' },
      { anahtar: 'email', label: 'E-posta Adresi', tip: 'text' },
    ]
  },
  {
    baslik: 'Sosyal Medya',
    ikon: '📱',
    ayarlar: [
      { anahtar: 'instagram', label: 'Instagram URL', tip: 'text' },
      { anahtar: 'facebook', label: 'Facebook URL', tip: 'text' },
      { anahtar: 'youtube', label: 'YouTube URL', tip: 'text' },
    ]
  },
  {
    baslik: 'İstatistikler',
    ikon: '📊',
    ayarlar: [
      { anahtar: 'aktif_dj_sayisi', label: 'Aktif DJ Sayısı', tip: 'text' },
      { anahtar: 'etkinlik_sayisi', label: 'Tamamlanan Etkinlik', tip: 'text' },
      { anahtar: 'il_sayisi', label: 'İl Sayısı', tip: 'text' },
      { anahtar: 'mutlu_misafir', label: 'Mutlu Misafir', tip: 'text' },
    ]
  },
]

export default function AyarlarPage() {
  const [degerler, setDegerler] = useState<Record<string, string>>({})
  const [yukleniyor, setYukleniyor] = useState(true)
  const [kaydediliyor, setKaydediliyor] = useState(false)
  const [mesaj, setMesaj] = useState('')

  useEffect(() => {
    ayarlariYukle()
  }, [])

  async function ayarlariYukle() {
    const { data } = await supabase.from('ayarlar').select('*')
    if (data) {
      const obj: Record<string, string> = {}
      data.forEach((row: { anahtar: string; deger: string }) => {
        obj[row.anahtar] = row.deger
      })
      setDegerler(obj)
    }
    setYukleniyor(false)
  }

  async function kaydet() {
    setKaydediliyor(true)
    for (const [anahtar, deger] of Object.entries(degerler)) {
      await supabase.from('ayarlar').upsert({ anahtar, deger }, { onConflict: 'anahtar' })
    }
    setMesaj('✅ Ayarlar kaydedildi!')
    setKaydediliyor(false)
    setTimeout(() => setMesaj(''), 3000)
  }

  if (yukleniyor) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F6F3' }}>
      <div style={{ fontSize: '16px', color: '#888' }}>Yükleniyor...</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3' }}>

      {/* HEADER */}
      <div style={{ background: '#0C0C0C', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/ddj-panel" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none', fontSize: '13px' }}>
            ← Admin
          </Link>
          <div style={{ color: 'rgba(255,255,255,.2)', fontSize: '13px' }}>/</div>
          <div style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>Site Ayarları</div>
        </div>
        <button
          onClick={kaydet}
          disabled={kaydediliyor}
          style={{ background: '#6B1FFF', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          {kaydediliyor ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      {/* MESAJ */}
      {mesaj && (
        <div style={{ background: '#E8F5E9', border: '1px solid #A5D6A7', padding: '14px 40px', fontSize: '14px', color: '#2E7D32' }}>
          {mesaj}
        </div>
      )}

      {/* İÇERİK */}
      <div style={{ padding: '32px 40px', maxWidth: '900px' }}>
        {ayarGruplari.map((grup, gi) => (
          <div key={gi} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E0DB', marginBottom: '20px', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #E2E0DB', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>{grup.ikon}</span>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#0C0C0C' }}>{grup.baslik}</span>
            </div>
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {grup.ayarlar.map((a, ai) => (
                <div key={ai}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {a.label}
                  </label>
                  {a.tip === 'textarea' ? (
                    <textarea
                      value={degerler[a.anahtar] || ''}
                      onChange={e => setDegerler({ ...degerler, [a.anahtar]: e.target.value })}
                      rows={3}
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E2E0DB', borderRadius: '8px', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none', resize: 'vertical' }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={degerler[a.anahtar] || ''}
                      onChange={e => setDegerler({ ...degerler, [a.anahtar]: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E2E0DB', borderRadius: '8px', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}