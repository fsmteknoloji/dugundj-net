'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const adimlar = ['Etkinlik', 'İletişim', 'Detaylar', 'Gönder']

const etkinlikTurleri = [
  'Düğün', 'Kına Gecesi', 'After Parti', 'Doğum Günü', 'Sünnet',
  'Gelin Alma', 'Gala Gecesi', 'Şirket Lansmanı', 'Açık Hava Konseri',
  'Okul Mezuniyeti', 'Beach Club', 'VIP Davet', 'Diğer'
]

const sehirler = [
  'İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Bodrum',
  'Muğla', 'Eskişehir', 'Gaziantep', 'Diğer'
]

const butceler = [
  '5.000 ₺ - 10.000 ₺',
  '10.000 ₺ - 20.000 ₺',
  '20.000 ₺ - 35.000 ₺',
  '35.000 ₺ - 50.000 ₺',
  '50.000 ₺ üzeri',
  'Belirtmek istemiyorum'
]

export default function TeklifAl() {
  const [adim, setAdim] = useState(0)
  const [gonderildi, setGonderildi] = useState(false)
  const [gonderiyor, setGonderiyor] = useState(false)
  const [form, setForm] = useState({
    ad_soyad: '',
    telefon: '',
    email: '',
    etkinlik_turu: '',
    sehir: '',
    tarih: '',
    butce: '',
    notlar: '',
  })

  function set(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function ileri() {
    setAdim(a => Math.min(a + 1, 3))
  }

  function geri() {
    setAdim(a => Math.max(a - 1, 0))
  }

  async function gonder() {
    setGonderiyor(true)
    await supabase.from('teklif_talepleri').insert({
      ad_soyad: form.ad_soyad,
      telefon: form.telefon,
      email: form.email,
      etkinlik_turu: form.etkinlik_turu,
      sehir: form.sehir,
      tarih: form.tarih,
      butce: form.butce,
      notlar: form.notlar,
      durum: 'yeni',
    })
    setGonderiyor(false)
    setGonderildi(true)
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1.5px solid #E2E0DB',
    borderRadius: '10px',
    fontSize: '15px',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    background: '#fff',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600,
    color: '#6B1FFF',
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
    marginBottom: '6px',
  }

  if (gonderildi) return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3' }}>
      <Navbar />
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '42px', fontWeight: 300, color: '#0C0C0C', marginBottom: '16px', letterSpacing: '-1px' }}>
            Talebiniz Alındı!
          </div>
          <p style={{ fontSize: '16px', color: '#888', lineHeight: 1.7, marginBottom: '32px', fontWeight: 300 }}>
            En kısa sürede sizinle iletişime geçeceğiz. Ortalama yanıt süremiz 2 saattir.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <a href="/" style={{ background: '#6B1FFF', color: '#fff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Ana Sayfaya Dön
            </a>
            <a href="/djler" style={{ background: '#F7F6F3', color: '#444', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', border: '1px solid #E2E0DB' }}>
              DJ'leri İncele
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3' }}>
      <Navbar />

      {/* HERO */}
      <div style={{ background: '#0C0C0C', marginTop: '66px', padding: '60px 64px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500 }}>
            Ücretsiz Teklif
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, letterSpacing: '-1px' }}>
            Etkinliğiniz İçin<br /><em style={{ color: '#8B45FF' }}>Teklif Alın</em>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '48px 64px' }}>

        {/* ADIM GÖSTERGESİ */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          {adimlar.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < adimlar.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: i <= adim ? '#6B1FFF' : '#E2E0DB',
                  color: i <= adim ? '#fff' : '#888',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 600, transition: 'all .3s',
                }}>
                  {i < adim ? '✓' : i + 1}
                </div>
                <div style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: i <= adim ? '#6B1FFF' : '#888', fontWeight: i === adim ? 600 : 400 }}>
                  {a}
                </div>
              </div>
              {i < adimlar.length - 1 && (
                <div style={{ flex: 1, height: '2px', background: i < adim ? '#6B1FFF' : '#E2E0DB', margin: '0 8px', marginBottom: '22px', transition: 'background .3s' }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid #E2E0DB', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

          {/* ADIM 1: ETKİNLİK */}
          {adim === 0 && (
            <div>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '28px', fontWeight: 300, color: '#0C0C0C', marginBottom: '8px' }}>Etkinliğinizi Anlatın</div>
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '28px', fontWeight: 300 }}>Hangi tür etkinlik için DJ arıyorsunuz?</p>

              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Etkinlik Türü *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {etkinlikTurleri.map(t => (
                    <button key={t} onClick={() => set('etkinlik_turu', t)}
                      style={{
                        padding: '10px', borderRadius: '8px', border: '1.5px solid',
                        borderColor: form.etkinlik_turu === t ? '#6B1FFF' : '#E2E0DB',
                        background: form.etkinlik_turu === t ? 'rgba(107,31,255,0.08)' : '#fff',
                        color: form.etkinlik_turu === t ? '#6B1FFF' : '#444',
                        fontSize: '13px', cursor: 'pointer', fontWeight: form.etkinlik_turu === t ? 600 : 400,
                        transition: 'all .2s',
                      }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={labelStyle}>Şehir *</label>
                  <select value={form.sehir} onChange={e => set('sehir', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">Seçin...</option>
                    {sehirler.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Etkinlik Tarihi *</label>
                  <input type="date" value={form.tarih} onChange={e => set('tarih', e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Bütçe Aralığı</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {butceler.map(b => (
                    <button key={b} onClick={() => set('butce', b)}
                      style={{
                        padding: '12px 16px', borderRadius: '8px', border: '1.5px solid',
                        borderColor: form.butce === b ? '#6B1FFF' : '#E2E0DB',
                        background: form.butce === b ? 'rgba(107,31,255,0.08)' : '#fff',
                        color: form.butce === b ? '#6B1FFF' : '#444',
                        fontSize: '14px', cursor: 'pointer', textAlign: 'left',
                        fontWeight: form.butce === b ? 600 : 400, transition: 'all .2s',
                      }}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ADIM 2: İLETİŞİM */}
          {adim === 1 && (
            <div>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '28px', fontWeight: 300, color: '#0C0C0C', marginBottom: '8px' }}>İletişim Bilgileriniz</div>
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '28px', fontWeight: 300 }}>Sizinle nasıl iletişime geçelim?</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={labelStyle}>Ad Soyad *</label>
                  <input type="text" value={form.ad_soyad} onChange={e => set('ad_soyad', e.target.value)} placeholder="Adınız Soyadınız" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Telefon *</label>
                  <input type="tel" value={form.telefon} onChange={e => set('telefon', e.target.value)} placeholder="0555 000 00 00" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>E-posta</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="ornek@email.com" style={inputStyle} />
                </div>
              </div>
            </div>
          )}

          {/* ADIM 3: DETAYLAR */}
          {adim === 2 && (
            <div>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '28px', fontWeight: 300, color: '#0C0C0C', marginBottom: '8px' }}>Ek Bilgiler</div>
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '28px', fontWeight: 300 }}>Eklemek istediğiniz notlar var mı?</p>

              <div>
                <label style={labelStyle}>Notlar & Özel İstekler</label>
                <textarea
                  value={form.notlar}
                  onChange={e => set('notlar', e.target.value)}
                  rows={6}
                  placeholder="Etkinliğinizle ilgili özel isteklerinizi, müzik tercihlerinizi veya eklemek istediğiniz detayları yazabilirsiniz..."
                  style={{ ...inputStyle, resize: 'vertical' as const }}
                />
              </div>
            </div>
          )}

          {/* ADIM 4: ÖZET */}
          {adim === 3 && (
            <div>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '28px', fontWeight: 300, color: '#0C0C0C', marginBottom: '8px' }}>Özet & Onay</div>
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '28px', fontWeight: 300 }}>Bilgilerinizi kontrol edin ve gönderin.</p>

              <div style={{ background: '#F7F6F3', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                {[
                  { label: 'Etkinlik Türü', value: form.etkinlik_turu },
                  { label: 'Şehir', value: form.sehir },
                  { label: 'Tarih', value: form.tarih },
                  { label: 'Bütçe', value: form.butce },
                  { label: 'Ad Soyad', value: form.ad_soyad },
                  { label: 'Telefon', value: form.telefon },
                  { label: 'E-posta', value: form.email },
                  { label: 'Notlar', value: form.notlar },
                ].filter(item => item.value).map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid #E2E0DB' }}>
                    <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', minWidth: '120px', fontWeight: 500 }}>{item.label}</div>
                    <div style={{ fontSize: '14px', color: '#0C0C0C' }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: '13px', color: '#888', fontWeight: 300, lineHeight: 1.6 }}>
                Formu göndererek gizlilik politikamızı kabul etmiş olursunuz. Bilgileriniz yalnızca teklif süreci için kullanılacaktır.
              </p>
            </div>
          )}

          {/* BUTONLAR */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px', justifyContent: 'space-between' }}>
            {adim > 0 ? (
              <button onClick={geri} style={{ background: '#F7F6F3', color: '#444', border: '1px solid #E2E0DB', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>
                ← Geri
              </button>
            ) : <div />}

            {adim < 3 ? (
              <button onClick={ileri}
                disabled={
                  (adim === 0 && (!form.etkinlik_turu || !form.sehir || !form.tarih)) ||
                  (adim === 1 && (!form.ad_soyad || !form.telefon))
                }
                style={{
                  background: '#6B1FFF', color: '#fff', border: 'none',
                  padding: '12px 32px', borderRadius: '8px', fontSize: '14px',
                  fontWeight: 600, cursor: 'pointer', letterSpacing: '1px',
                  opacity: (adim === 0 && (!form.etkinlik_turu || !form.sehir || !form.tarih)) || (adim === 1 && (!form.ad_soyad || !form.telefon)) ? 0.5 : 1,
                }}>
                İleri →
              </button>
            ) : (
              <button onClick={gonder} disabled={gonderiyor}
                style={{ background: '#6B1FFF', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', letterSpacing: '1px' }}>
                {gonderiyor ? 'Gönderiliyor...' : 'Teklif Talebi Gönder 🎉'}
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}