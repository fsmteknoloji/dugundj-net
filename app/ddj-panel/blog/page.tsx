'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type BlogYazisi = {
  id?: number
  baslik: string
  slug: string
  ozet: string
  icerik: string
  kapak_foto: string
  kategori: string
  yazar: string
  yayinda: boolean
}

const bos: BlogYazisi = {
  baslik: '', slug: '', ozet: '', icerik: '',
  kapak_foto: '', kategori: '', yazar: 'Admin', yayinda: false
}

export default function BlogAdmin() {
  const [liste, setListe] = useState<BlogYazisi[]>([])
  const [form, setForm] = useState<BlogYazisi>(bos)
  const [duzenleId, setDuzenleId] = useState<number | null>(null)
  const [mesaj, setMesaj] = useState('')
  const [yukleniyor, setYukleniyor] = useState(true)
  const [tab, setTab] = useState<'liste' | 'form'>('liste')

  useEffect(() => { yukle() }, [])

  async function yukle() {
    const { data } = await supabase.from('blog_yazilari').select('*').order('created_at', { ascending: false })
    if (data) setListe(data)
    setYukleniyor(false)
  }

  function slugOlustur(baslik: string) {
    return baslik.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
  }

  async function kaydet() {
    if (!form.baslik) return
    const veri = { ...form, slug: form.slug || slugOlustur(form.baslik) }
    if (duzenleId) {
      await supabase.from('blog_yazilari').update(veri).eq('id', duzenleId)
      setMesaj('✅ Yazı güncellendi!')
    } else {
      await supabase.from('blog_yazilari').insert(veri)
      setMesaj('✅ Yazı eklendi!')
    }
    setForm(bos)
    setDuzenleId(null)
    setTab('liste')
    yukle()
    setTimeout(() => setMesaj(''), 3000)
  }

  async function sil(id: number) {
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return
    await supabase.from('blog_yazilari').delete().eq('id', id)
    yukle()
  }

  async function yayinDurumu(id: number, yayinda: boolean) {
    await supabase.from('blog_yazilari').update({ yayinda: !yayinda }).eq('id', id)
    yukle()
  }

  function duzenle(yazi: BlogYazisi) {
    setForm(yazi)
    setDuzenleId(yazi.id!)
    setTab('form')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3' }}>

      <div style={{ background: '#0C0C0C', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/ddj-panel" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none', fontSize: '13px' }}>← Admin</Link>
          <span style={{ color: 'rgba(255,255,255,.2)' }}>/</span>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>Blog Yazıları</span>
        </div>
        <button onClick={() => { setForm(bos); setDuzenleId(null); setTab('form') }}
          style={{ background: '#6B1FFF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
          + Yeni Yazı
        </button>
      </div>

      {mesaj && (
        <div style={{ background: '#E8F5E9', borderBottom: '1px solid #A5D6A7', padding: '12px 40px', fontSize: '14px', color: '#2E7D32' }}>{mesaj}</div>
      )}

      <div style={{ padding: '32px 40px' }}>
        {tab === 'liste' ? (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E0DB', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #E2E0DB', fontSize: '15px', fontWeight: 600, color: '#0C0C0C' }}>
              Blog Yazıları ({liste.length})
            </div>
            {yukleniyor ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Yükleniyor...</div>
            ) : liste.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Henüz yazı eklenmemiş.</div>
            ) : (
              liste.map((yazi, i) => (
                <div key={i} style={{ padding: '16px 24px', borderBottom: '1px solid #F5F4F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                    {yazi.kapak_foto && (
                      <img src={yazi.kapak_foto} alt={yazi.baslik} style={{ width: '56px', height: '42px', borderRadius: '6px', objectFit: 'cover' }} />
                    )}
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#0C0C0C' }}>{yazi.baslik}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>{yazi.kategori} · {yazi.yazar}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => yayinDurumu(yazi.id!, yazi.yayinda)}
                      style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '100px', border: 'none', cursor: 'pointer', background: yazi.yayinda ? '#E8F5E9' : '#FFF3E0', color: yazi.yayinda ? '#2E7D32' : '#E65100' }}>
                      {yazi.yayinda ? '✅ Yayında' : '⏸ Taslak'}
                    </button>
                    <button onClick={() => duzenle(yazi)} style={{ background: '#F7F6F3', border: '1px solid #E2E0DB', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#444' }}>Düzenle</button>
                    <button onClick={() => sil(yazi.id!)} style={{ background: '#FFF5F5', border: '1px solid #FFCDD2', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#C62828' }}>Sil</button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div style={{ maxWidth: '800px' }}>
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E0DB', padding: '28px' }}>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#0C0C0C', marginBottom: '24px' }}>
                {duzenleId ? '✏️ Yazıyı Düzenle' : '➕ Yeni Yazı'}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Başlık *', key: 'baslik', tip: 'text' },
                  { label: 'Slug (URL)', key: 'slug', tip: 'text' },
                  { label: 'Kategori', key: 'kategori', tip: 'text' },
                  { label: 'Yazar', key: 'yazar', tip: 'text' },
                  { label: 'Kapak Fotoğraf URL', key: 'kapak_foto', tip: 'text' },
                ].map((f, i) => (
                  <div key={i}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>
                      {f.label}
                    </label>
                    <input type={f.tip} value={(form as Record<string, string>)[f.key]}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #E2E0DB', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif' }} />
                  </div>
                ))}

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>Özet</label>
                  <textarea value={form.ozet} onChange={e => setForm({ ...form, ozet: e.target.value })} rows={3}
                    style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #E2E0DB', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif', resize: 'vertical' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>İçerik</label>
                  <textarea value={form.icerik} onChange={e => setForm({ ...form, icerik: e.target.value })} rows={12}
                    style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #E2E0DB', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif', resize: 'vertical' }} />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#444', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.yayinda} onChange={e => setForm({ ...form, yayinda: e.target.checked })} />
                  Yayına Al
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                <button onClick={kaydet} style={{ flex: 1, background: '#6B1FFF', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                  {duzenleId ? 'Güncelle' : 'Yayınla'}
                </button>
                <button onClick={() => setTab('liste')} style={{ background: '#F7F6F3', color: '#888', border: '1px solid #E2E0DB', padding: '12px 20px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>
                  İptal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}