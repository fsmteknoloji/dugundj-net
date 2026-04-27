'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Dosya = {
  name: string
  url: string
  klasor: string
  boyut?: number
  created_at?: string
}

const klasorler = ['genel', 'djler', 'blog', 'etkinlikler', 'referanslar']

export default function MedyaAdmin() {
  const [dosyalar, setDosyalar] = useState<Dosya[]>([])
  const [aktifKlasor, setAktifKlasor] = useState('genel')
  const [yukleniyor, setYukleniyor] = useState(true)
  const [yukleniyorDosya, setYukleniyorDosya] = useState(false)
  const [mesaj, setMesaj] = useState('')
  const [kopyalandi, setKopyalandi] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { yukle(aktifKlasor) }, [aktifKlasor])

  async function yukle(klasor: string) {
    setYukleniyor(true)
    const { data } = await supabase.storage.from('fotograflar').list(klasor, { sortBy: { column: 'created_at', order: 'desc' } })
    if (data) {
      const dosyaListesi = data
        .filter(d => d.name !== '.emptyFolderPlaceholder')
        .map(d => ({
          name: d.name,
          url: supabase.storage.from('fotograflar').getPublicUrl(klasor + '/' + d.name).data.publicUrl,
          klasor,
          boyut: d.metadata?.size,
          created_at: d.created_at ?? undefined,
        }))
      setDosyalar(dosyaListesi)
    }
    setYukleniyor(false)
  }

  async function yukle_dosya(e: React.ChangeEvent<HTMLInputElement>) {
    const dosyalar = e.target.files
    if (!dosyalar || dosyalar.length === 0) return
    setYukleniyorDosya(true)
    for (const dosya of Array.from(dosyalar)) {
      const dosyaAdi = `${aktifKlasor}/${Date.now()}-${dosya.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      await supabase.storage.from('fotograflar').upload(dosyaAdi, dosya)
    }
    setMesaj(`✅ ${dosyalar.length} dosya yüklendi!`)
    setTimeout(() => setMesaj(''), 3000)
    setYukleniyorDosya(false)
    yukle(aktifKlasor)
    if (inputRef.current) inputRef.current.value = ''
  }

  async function sil(dosyaAdi: string) {
    if (!confirm('Bu dosyayı silmek istediğinize emin misiniz?')) return
    await supabase.storage.from('fotograflar').remove([aktifKlasor + '/' + dosyaAdi])
    yukle(aktifKlasor)
  }

  function kopyala(url: string) {
    navigator.clipboard.writeText(url)
    setKopyalandi(url)
    setTimeout(() => setKopyalandi(''), 2000)
  }

  function boyutFormat(bytes?: number) {
    if (!bytes) return ''
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1024 / 1024).toFixed(1) + ' MB'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3' }}>

      {/* HEADER */}
      <div style={{ background: '#0C0C0C', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/ddj-panel" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none', fontSize: '13px' }}>← Admin</Link>
          <span style={{ color: 'rgba(255,255,255,.2)' }}>/</span>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>Medya Kütüphanesi</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {yukleniyorDosya && <span style={{ color: 'rgba(255,255,255,.5)', fontSize: '13px' }}>Yükleniyor...</span>}
          <input ref={inputRef} type="file" accept="image/*" multiple onChange={yukle_dosya} style={{ display: 'none' }} id="dosya-input" />
          <button onClick={() => document.getElementById('dosya-input')?.click()}
            style={{ background: '#6B1FFF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            + Dosya Yükle
          </button>
        </div>
      </div>

      {mesaj && (
        <div style={{ background: '#E8F5E9', borderBottom: '1px solid #A5D6A7', padding: '12px 40px', fontSize: '14px', color: '#2E7D32' }}>{mesaj}</div>
      )}

      <div style={{ padding: '32px 40px' }}>

        {/* KLASÖR SEKMELERİ */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {klasorler.map(k => (
            <button key={k} onClick={() => setAktifKlasor(k)}
              style={{
                padding: '8px 18px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: 500,
                background: aktifKlasor === k ? '#6B1FFF' : '#fff',
color: aktifKlasor === k ? '#fff' : '#444',
outline: aktifKlasor === k ? 'none' : '1px solid #E2E0DB',
              }}>
              {k === 'genel' ? '📁 Genel' :
               k === 'djler' ? '🎧 DJ\'ler' :
               k === 'blog' ? '✍️ Blog' :
               k === 'etkinlikler' ? '🎪 Etkinlikler' : '⭐ Referanslar'}
            </button>
          ))}
        </div>

        {/* DOSYA GRID */}
        {yukleniyor ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>Yükleniyor...</div>
        ) : dosyalar.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📂</div>
            <div>Bu klasörde henüz dosya yok.</div>
            <button onClick={() => document.getElementById('dosya-input')?.click()}
              style={{ marginTop: '16px', background: '#6B1FFF', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
              İlk Dosyayı Yükle
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
            {dosyalar.map((d, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E2E0DB', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ height: '140px', overflow: 'hidden', position: 'relative', background: '#F5F4F0' }}>
                  <img src={d.url} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: '11px', color: '#555', fontWeight: 500, marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={d.name}>
                    {d.name}
                  </div>
                  <div style={{ fontSize: '10px', color: '#aaa', marginBottom: '8px' }}>{boyutFormat(d.boyut)}</div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => kopyala(d.url)}
                      style={{ flex: 1, background: kopyalandi === d.url ? '#E8F5E9' : '#F7F6F3', border: '1px solid #E2E0DB', padding: '5px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', color: kopyalandi === d.url ? '#2E7D32' : '#444' }}>
                      {kopyalandi === d.url ? '✅ Kopyalandı' : '📋 URL Kopyala'}
                    </button>
                    <button onClick={() => sil(d.name)}
                      style={{ background: '#FFF5F5', border: '1px solid #FFCDD2', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', color: '#C62828' }}>
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}