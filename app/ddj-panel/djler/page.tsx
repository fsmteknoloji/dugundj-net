'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type DJ = {
  id?: number
  isim: string
  slug: string
  sehir: string
  biyografi: string
  muzik_tarzi: string
  baslangic_fiyati: number
  profil_foto: string
  puan: number
  yorum_sayisi: number
  one_cikan: boolean
  aktif: boolean
}

const bos: DJ = {
  isim: '', slug: '', sehir: '', biyografi: '', muzik_tarzi: '',
  baslangic_fiyati: 0, profil_foto: '', puan: 0, yorum_sayisi: 0,
  one_cikan: false, aktif: true
}

const sehirler = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Bodrum', 'Muğla', 'Eskişehir', 'Gaziantep', 'Diğer']

export default function DJlerAdmin() {
  const [liste, setListe] = useState<DJ[]>([])
  const [form, setForm] = useState<DJ>(bos)
  const [duzenleId, setDuzenleId] = useState<number | null>(null)
  const [mesaj, setMesaj] = useState('')
  const [yukleniyor, setYukleniyor] = useState(true)
  const [tab, setTab] = useState<'liste' | 'form'>('liste')

  useEffect(() => { yukle() }, [])

  async function yukle() {
    const { data } = await supabase.from('djler').select('*').order('isim')
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
    const veri = {
      isim: form.isim,
      slug: form.slug || slugOlustur(form.isim),
      sehir: form.sehir,
      biyografi: form.biyografi,
      muzik_tarzi: form.muzik_tarzi,
      baslangic_fiyati: form.baslangic_fiyati,
      profil_foto: form.profil_foto,
      puan: form.puan,
      yorum_sayisi: form.yorum_sayisi,
      one_cikan: form.one_cikan,
      aktif: form.aktif,
    }
    if (duzenleId) {
      const { error } = await supabase
        .from('djler')
        .update(veri)
        .eq('id', duzenleId)
      if (error) { alert('Hata: ' + error.message); return }
      setMesaj('DJ güncellendi!')
    } else {
      const { error } = await supabase
        .from('djler')
        .insert(veri)
      if (error) { alert('Hata: ' + error.message); return }
      setMesaj('DJ eklendi!')
    }
    setForm(bos)
    setDuzenleId(null)
    setTab('liste')
    yukle()
    setTimeout(() => setMesaj(''), 3000)
  }

  async function sil(id: number) {
    if (!confirm('Bu DJ\'i silmek istediğinize emin misiniz?')) return
    await supabase.from('djler').delete().eq('id', id)
    yukle()
  }

  function duzenle(dj: DJ) {
    setForm({
      isim: dj.isim || '',
      slug: dj.slug || '',
      sehir: dj.sehir || '',
      biyografi: dj.biyografi || '',
      muzik_tarzi: dj.muzik_tarzi || '',
      baslangic_fiyati: dj.baslangic_fiyati || 0,
      profil_foto: dj.profil_foto || '',
      puan: dj.puan || 0,
      yorum_sayisi: dj.yorum_sayisi || 0,
      one_cikan: dj.one_cikan || false,
      aktif: dj.aktif !== false,
    })
    setDuzenleId(dj.id!)
    setTab('form')
  }

  function yeniDJ() {
    setForm(bos)
    setDuzenleId(null)
    setTab('form')
  }

  async function fotoyukle(e: React.ChangeEvent<HTMLInputElement>) {
    const dosya = e.target.files?.[0]
    if (!dosya) return
    const dosyaAdi = `djler/${Date.now()}-${dosya.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const { error } = await supabase.storage.from('fotograflar').upload(dosyaAdi, dosya)
    if (!error) {
      const { data } = supabase.storage.from('fotograflar').getPublicUrl(dosyaAdi)
      setForm(prev => ({ ...prev, profil_foto: data.publicUrl }))
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3' }}>
      <div style={{ background: '#0C0C0C', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/ddj-panel" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none', fontSize: '13px' }}>← Admin</Link>
          <span style={{ color: 'rgba(255,255,255,.2)' }}>/</span>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>DJ Yönetimi</span>
        </div>
        <button onClick={yeniDJ} style={{ background: '#6B1FFF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
          + Yeni DJ Ekle
        </button>
      </div>

      {mesaj && (
        <div style={{ background: '#E8F5E9', borderBottom: '1px solid #A5D6A7', padding: '12px 40px', fontSize: '14px', color: '#2E7D32' }}>{mesaj}</div>
      )}

      <div style={{ padding: '32px 40px' }}>
        {tab === 'liste' ? (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E0DB', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #E2E0DB', fontSize: '15px', fontWeight: 600, color: '#0C0C0C' }}>
              DJ Listesi ({liste.length})
            </div>
            {yukleniyor ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Yükleniyor...</div>
            ) : liste.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
                Henüz DJ eklenmemiş.{' '}
                <button onClick={yeniDJ} style={{ color: '#6B1FFF', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '14px' }}>
                  İlk DJ ekle
                </button>
              </div>
            ) : (
              liste.map((dj, i) => (
                <div key={i} style={{ padding: '16px 24px', borderBottom: '1px solid #F5F4F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                    {dj.profil_foto ? (
                      <img src={dj.profil_foto} alt={dj.isim} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #6B1FFF, #8B45FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '16px', fontWeight: 700 }}>
                        {dj.isim.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#0C0C0C' }}>{dj.isim}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>{dj.sehir} · {dj.muzik_tarzi}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>₺{dj.baslangic_fiyati?.toLocaleString()} · ⭐ {dj.puan}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {dj.one_cikan && <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '100px', background: '#EDE7F6', color: '#6B1FFF' }}>Öne Çıkan</span>}
                    <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '100px', background: dj.aktif ? '#E8F5E9' : '#FFF3E0', color: dj.aktif ? '#2E7D32' : '#E65100' }}>
                      {dj.aktif ? 'Aktif' : 'Pasif'}
                    </span>
                    <button onClick={() => duzenle(dj)} style={{ background: '#F7F6F3', border: '1px solid #E2E0DB', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#444' }}>Düzenle</button>
                    <button onClick={() => sil(dj.id!)} style={{ background: '#FFF5F5', border: '1px solid #FFCDD2', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#C62828' }}>Sil</button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div style={{ maxWidth: '700px' }}>
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E0DB', padding: '28px' }}>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#0C0C0C', marginBottom: '24px' }}>
                {duzenleId ? '✏️ DJ Düzenle' : '➕ Yeni DJ Ekle'}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { label: 'DJ Adı *', key: 'isim', tip: 'text' },
                  { label: 'Slug (URL)', key: 'slug', tip: 'text' },
                  { label: 'Müzik Tarzı', key: 'muzik_tarzi', tip: 'text' },
                  { label: 'Başlangıç Fiyatı (₺)', key: 'baslangic_fiyati', tip: 'number' },
                  { label: 'Puan (0-5)', key: 'puan', tip: 'number' },
                  { label: 'Yorum Sayısı', key: 'yorum_sayisi', tip: 'number' },
                ].map((f, i) => (
                  <div key={i}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>
                      {f.label}
                    </label>
                    <input
                      type={f.tip}
                      value={(form as Record<string, string | number | boolean>)[f.key] as string}
                      onChange={e => setForm({ ...form, [f.key]: f.tip === 'number' ? +e.target.value : e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #E2E0DB', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>Şehir</label>
                  <select value={form.sehir} onChange={e => setForm({ ...form, sehir: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #E2E0DB', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif' }}>
                    <option value="">Seçin...</option>
                    {sehirler.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Profil Fotoğrafı
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {form.profil_foto ? (
                      <img src={form.profil_foto} alt="profil" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E2E0DB' }} />
                    ) : (
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F7F6F3', border: '2px dashed #E2E0DB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                        👤
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input type="file" accept="image/*" id="profil-foto-input" style={{ display: 'none' }} onChange={fotoyukle} />
                      <button type="button" onClick={() => document.getElementById('profil-foto-input')?.click()}
                        style={{ background: '#F7F6F3', border: '1.5px solid #E2E0DB', padding: '9px 18px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: '#444' }}>
                        📸 Fotoğraf Seç
                      </button>
                      {form.profil_foto && (
                        <button type="button" onClick={() => setForm(prev => ({ ...prev, profil_foto: '' }))}
                          style={{ background: '#FFF5F5', border: '1px solid #FFCDD2', padding: '9px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: '#C62828' }}>
                          Sil
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B1FFF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>Biyografi</label>
                  <textarea value={form.biyografi} onChange={e => setForm({ ...form, biyografi: e.target.value })} rows={4}
                    style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #E2E0DB', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif', resize: 'vertical' }} />
                </div>

                <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '24px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#444', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.one_cikan} onChange={e => setForm({ ...form, one_cikan: e.target.checked })} />
                    Öne Çıkan
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#444', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.aktif} onChange={e => setForm({ ...form, aktif: e.target.checked })} />
                    Aktif
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                <button onClick={kaydet} style={{ flex: 1, background: '#6B1FFF', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                  {duzenleId ? 'Güncelle' : 'Ekle'}
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