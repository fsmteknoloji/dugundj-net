'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Etkinlik = {
  id?: number
  baslik: string
  kategori: string
  mekan: string
  tarih: string
  dj_isim: string
  misafir_sayisi: number
  fotograf: string
  yorum: string
  buyuk_kart: boolean
  aktif: boolean
  sira: number
}

const bos: Etkinlik = {
  baslik: '', kategori: '', mekan: '', tarih: '', dj_isim: '',
  misafir_sayisi: 0, fotograf: '', yorum: '', buyuk_kart: false, aktif: true, sira: 0
}

export default function EtkinliklerAdmin() {
  const [liste, setListe] = useState<Etkinlik[]>([])
  const [form, setForm] = useState<Etkinlik>(bos)
  const [duzenleId, setDuzenleId] = useState<number | null>(null)
  const [mesaj, setMesaj] = useState('')
  const [yukleniyor, setYukleniyor] = useState(true)
  const [tab, setTab] = useState<'liste' | 'form'>('liste')

  useEffect(() => { yukle() }, [])

  async function yukle() {
    const { data } = await supabase.from('etkinlikler').select('*').order('sira')
    if (data) setListe(data)
    setYukleniyor(false)
  }

  async function kaydet() {
    if (!form.baslik) return
    const veri = {
      baslik: form.baslik,
      kategori: form.kategori,
      mekan: form.mekan,
      tarih: form.tarih,
      dj_isim: form.dj_isim,
      misafir_sayisi: form.misafir_sayisi,
      fotograf: form.fotograf,
      yorum: form.yorum,
      buyuk_kart: form.buyuk_kart,
      aktif: form.aktif,
      sira: form.sira,
    }
    if (duzenleId) {
      await supabase.from('etkinlikler').update(veri).eq('id', duzenleId)
      setMesaj('Etkinlik guncellendi!')
    } else {
      await supabase.from('etkinlikler').insert(veri)
      setMesaj('Etkinlik eklendi!')
    }
    setForm(bos)
    setDuzenleId(null)
    setTab('liste')
    yukle()
    setTimeout(() => setMesaj(''), 3000)
  }

  async function sil(id: number) {
    if (!confirm('Silmek istediginize emin misiniz?')) return
    await supabase.from('etkinlikler').delete().eq('id', id)
    yukle()
  }

  function duzenle(e: Etkinlik) {
    setForm({
      baslik: e.baslik || '',
      kategori: e.kategori || '',
      mekan: e.mekan || '',
      tarih: e.tarih || '',
      dj_isim: e.dj_isim || '',
      misafir_sayisi: e.misafir_sayisi || 0,
      fotograf: e.fotograf || '',
      yorum: e.yorum || '',
      buyuk_kart: e.buyuk_kart || false,
      aktif: e.aktif !== false,
      sira: e.sira || 0,
    })
    setDuzenleId(e.id!)
    setTab('form')
  }

  async function fotoYukle(ev: React.ChangeEvent<HTMLInputElement>) {
    const dosya = ev.target.files?.[0]
    if (!dosya) return
    const dosyaAdi = `etkinlikler/${Date.now()}-${dosya.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const { error } = await supabase.storage.from('fotograflar').upload(dosyaAdi, dosya)
    if (!error) {
      const { data } = supabase.storage.from('fotograflar').getPublicUrl(dosyaAdi)
      setForm(prev => ({ ...prev, fotograf: data.publicUrl }))
    }
  }

  const inputStyle = {
    width: '100%', padding: '9px 12px', border: '1.5px solid #E2E0DB',
    borderRadius: '8px', fontSize: '14px', outline: 'none',
    fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3' }}>
      <div style={{ background: '#0C0C0C', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/ddj-panel" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none', fontSize: '13px' }}>Admin</Link>
          <span style={{ color: 'rgba(255,255,255,.2)' }}>/</span>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>Referans Etkinlikler</span>
        </div>
        <button onClick={() => { setForm(bos); setDuzenleId(null); setTab('form') }}
          style={{ background: '#6B1FFF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
          + Yeni Ekle
        </button>
      </div>

      {mesaj && (
        <div style={{ background: '#E8F5E9', borderBottom: '1px solid #A5D6A7', padding: '12px 40px', fontSize: '14px', color: '#2E7D32' }}>{mesaj}</div>
      )}

      <div style={{ padding: '32px 40px' }}>
        {tab === 'liste' ? (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E0DB', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #E2E0DB', fontSize: '15px', fontWeight: 600, color: '#0C0C0C' }}>
              Etkinlikler ({liste.length})
            </div>
            {yukleniyor ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Yukleniyor...</div>
            ) : liste.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Henuz etkinlik eklenmemis.</div>
            ) : (
              liste.map((e, i) => (
                <div key={i} style={{ padding: '16px 24px', borderBottom: '1px solid #F5F4F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                    {e.fotograf ? (
                      <img src={e.fotograf} alt={e.baslik} style={{ width: '56px', height: '42px', borderRadius: '6px', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '56px', height: '42px', borderRadius: '6px', background: '#F0EEF8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🎪</div>
                    )}
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#0C0C0C' }}>{e.baslik}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>{e.kategori} · {e.mekan} · {e.tarih}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {e.buyuk_kart && <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '100px', background: '#EDE7F6', color: '#6B1FFF' }}>Buyuk Kart</span>}
                    <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '100px', background: e.aktif ? '#E8F5E9' : '#FFF3E0', color: e.aktif ? '#2E7D32' : '#E65100' }}>
                      {e.aktif ? 'Aktif' : 'Pasif'}
                    </span>
                    <button onClick={() => duzenle(e)} style={{ background: '#F7F6F3', border: '1px solid #E2E0DB', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#444' }}>Duzenle</button>
                    <button onClick={() => sil(e.id!)} style={{ background: '#FFF5F5', border: '1px solid #FFCDD2', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#C62828' }}>Sil</button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div style={{ maxWidth: '700px' }}>
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E0DB', padding: '28px' }}>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#0C0C0C', marginBottom: '24px' }}>
                {duzenleId ? 'Etkinligi Duzenle' : 'Yeni Etkinlik'}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>Baslik *</label>
                  <input type="text" value={form.baslik} onChange={e => setForm({ ...form, baslik: e.target.value })} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>Kategori</label>
                  <input type="text" value={form.kategori} onChange={e => setForm({ ...form, kategori: e.target.value })} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>Mekan</label>
                  <input type="text" value={form.mekan} onChange={e => setForm({ ...form, mekan: e.target.value })} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>Tarih</label>
                  <input type="text" value={form.tarih} onChange={e => setForm({ ...form, tarih: e.target.value })} placeholder="Mayis 2025" style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>DJ Adi</label>
                  <input type="text" value={form.dj_isim} onChange={e => setForm({ ...form, dj_isim: e.target.value })} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>Misafir Sayisi</label>
                  <input type="number" value={form.misafir_sayisi} onChange={e => setForm({ ...form, misafir_sayisi: +e.target.value })} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>Sira</label>
                  <input type="number" value={form.sira} onChange={e => setForm({ ...form, sira: +e.target.value })} style={inputStyle} />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Fotograf</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {form.fotograf && (
                      <img src={form.fotograf} alt="foto" style={{ width: '80px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                    )}
                    <div>
                      <input type="file" accept="image/*" id="foto-input" style={{ display: 'none' }} onChange={fotoYukle} />
                      <button type="button" onClick={() => document.getElementById('foto-input')?.click()}
                        style={{ background: '#F7F6F3', border: '1.5px solid #E2E0DB', padding: '9px 18px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: '#444' }}>
                        Fotograf Sec
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>Musteri Yorumu</label>
                  <textarea value={form.yorum} onChange={e => setForm({ ...form, yorum: e.target.value })} rows={3}
                    style={{ ...inputStyle, resize: 'vertical' as const }} />
                </div>

                <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '24px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#444', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.buyuk_kart} onChange={e => setForm({ ...form, buyuk_kart: e.target.checked })} />
                    Buyuk Kart
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#444', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.aktif} onChange={e => setForm({ ...form, aktif: e.target.checked })} />
                    Aktif
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                <button onClick={kaydet} style={{ flex: 1, background: '#6B1FFF', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                  {duzenleId ? 'Guncelle' : 'Ekle'}
                </button>
                <button onClick={() => setTab('liste')} style={{ background: '#F7F6F3', color: '#888', border: '1px solid #E2E0DB', padding: '12px 20px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>
                  Iptal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}