'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Kategori = {
  id?: number
  isim: string
  slug: string
  ikon: string
  sira: number
  aktif: boolean
}

const bos: Kategori = { isim: '', slug: '', ikon: '', sira: 0, aktif: true }

export default function KategorilerAdmin() {
  const [liste, setListe] = useState<Kategori[]>([])
  const [form, setForm] = useState<Kategori>(bos)
  const [duzenleId, setDuzenleId] = useState<number | null>(null)
  const [mesaj, setMesaj] = useState('')
  const [yukleniyor, setYukleniyor] = useState(true)

  useEffect(() => { yukle() }, [])

  async function yukle() {
    const { data } = await supabase.from('kategoriler').select('*').order('sira')
    if (data) setListe(data)
    setYukleniyor(false)
  }

  function slugOlustur(isim: string) {
    return isim.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
  }

  async function kaydet() {
    if (!form.isim) return
    const veri = { ...form, slug: form.slug || slugOlustur(form.isim) }
    if (duzenleId) {
      await supabase.from('kategoriler').update(veri).eq('id', duzenleId)
      setMesaj('✅ Güncellendi!')
    } else {
      await supabase.from('kategoriler').insert(veri)
      setMesaj('✅ Eklendi!')
    }
    setForm(bos)
    setDuzenleId(null)
    yukle()
    setTimeout(() => setMesaj(''), 3000)
  }

  async function sil(id: number) {
    if (!confirm('Silmek istediğinize emin misiniz?')) return
    await supabase.from('kategoriler').delete().eq('id', id)
    yukle()
  }

  function duzenle(k: Kategori) {
    setForm(k)
    setDuzenleId(k.id!)
    window.scrollTo(0, 0)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3' }}>

      {/* HEADER */}
      <div style={{ background: '#0C0C0C', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/ddj-panel" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none', fontSize: '13px' }}>← Admin</Link>
          <span style={{ color: 'rgba(255,255,255,.2)' }}>/</span>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>Kategoriler</span>
        </div>
      </div>

      {mesaj && (
        <div style={{ background: '#E8F5E9', borderBottom: '1px solid #A5D6A7', padding: '12px 40px', fontSize: '14px', color: '#2E7D32' }}>{mesaj}</div>
      )}

      <div style={{ padding: '32px 40px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'start' }}>

        {/* FORM */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E0DB', padding: '24px' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#0C0C0C', marginBottom: '20px' }}>
            {duzenleId ? '✏️ Düzenle' : '➕ Yeni Kategori'}
          </div>

          {[
            { label: 'Kategori Adı', key: 'isim', tip: 'text', zorunlu: true },
            { label: 'Slug (URL)', key: 'slug', tip: 'text', zorunlu: false },
            { label: 'İkon (emoji)', key: 'ikon', tip: 'text', zorunlu: false },
            { label: 'Sıra', key: 'sira', tip: 'number', zorunlu: false },
          ].map((f, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>
                {f.label} {f.zorunlu && '*'}
              </label>
              <input
                type={f.tip}
                value={(form as Record<string, string | number | boolean>)[f.key] as string}
                onChange={e => setForm({ ...form, [f.key]: f.tip === 'number' ? +e.target.value : e.target.value })}
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #E2E0DB', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif' }}
              />
            </div>
          ))}

          <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" checked={form.aktif} onChange={e => setForm({ ...form, aktif: e.target.checked })} id="aktif" />
            <label htmlFor="aktif" style={{ fontSize: '14px', color: '#444' }}>Aktif</label>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={kaydet} style={{ flex: 1, background: '#6B1FFF', color: '#fff', border: 'none', padding: '11px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
              {duzenleId ? 'Güncelle' : 'Ekle'}
            </button>
            {duzenleId && (
              <button onClick={() => { setForm(bos); setDuzenleId(null) }} style={{ background: '#F7F6F3', color: '#888', border: '1px solid #E2E0DB', padding: '11px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
                İptal
              </button>
            )}
          </div>
        </div>

        {/* LİSTE */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E0DB', overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid #E2E0DB', fontSize: '15px', fontWeight: 600, color: '#0C0C0C' }}>
            Kategoriler ({liste.length})
          </div>
          {yukleniyor ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Yükleniyor...</div>
          ) : liste.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Henüz kategori eklenmemiş</div>
          ) : (
            liste.map((k, i) => (
              <div key={i} style={{ padding: '14px 24px', borderBottom: '1px solid #F5F4F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>{k.ikon}</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#0C0C0C' }}>{k.isim}</div>
                    <div style={{ fontSize: '11px', color: '#aaa' }}>/{k.slug} · Sıra: {k.sira}</div>
                  </div>
                  <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '100px', background: k.aktif ? '#E8F5E9' : '#FFF3E0', color: k.aktif ? '#2E7D32' : '#E65100' }}>
                    {k.aktif ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => duzenle(k)} style={{ background: '#F7F6F3', border: '1px solid #E2E0DB', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#444' }}>Düzenle</button>
                  <button onClick={() => sil(k.id!)} style={{ background: '#FFF5F5', border: '1px solid #FFCDD2', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#C62828' }}>Sil</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}