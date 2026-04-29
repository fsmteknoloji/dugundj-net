'use client'
import { useState, useEffect, use } from 'react'
import { createClient } from '@supabase/supabase-js'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type DJ = {
  id: number
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
}

export default function DJDetay({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [dj, setDj] = useState<DJ | null>(null)
  const [benzerDjler, setBenzerDjler] = useState<DJ[]>([])
  const [yukleniyor, setYukleniyor] = useState(true)

  useEffect(() => {
    async function yukle() {
      const { data } = await supabase
        .from('djler')
        .select('*')
        .eq('slug', slug)
        .single()
      if (data) {
        setDj(data)
        // Benzer DJ'ler — aynı şehir veya müzik tarzı
        const { data: benzer } = await supabase
          .from('djler')
          .select('*')
          .eq('aktif', true)
          .neq('slug', slug)
          .limit(3)
        if (benzer) setBenzerDjler(benzer)
      }
      setYukleniyor(false)
    }
    yukle()
  }, [slug])

  if (yukleniyor) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#888', fontSize: '16px' }}>Yükleniyor...</div>
    </div>
  )

  if (!dj) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎧</div>
        <div style={{ fontSize: '20px', color: '#0C0C0C', marginBottom: '8px' }}>DJ bulunamadı</div>
        <a href="/djler" style={{ color: '#6B1FFF', textDecoration: 'none', fontSize: '14px' }}>← DJ listesine dön</a>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3' }}>
      <Navbar />

      {/* HERO */}
      <div style={{ background: '#0C0C0C', marginTop: '66px', padding: '60px 64px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '48px', alignItems: 'center', flexWrap: 'wrap' }}>
          {dj.profil_foto ? (
            <img src={dj.profil_foto} alt={dj.isim} style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(107,31,255,0.5)', flexShrink: 0 }} />
          ) : (
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', background: 'linear-gradient(135deg, #6B1FFF, #8B45FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '72px', fontWeight: 300, color: 'rgba(255,255,255,.4)' }}>{dj.isim.charAt(0)}</span>
            </div>
          )}

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'inline-block', width: '20px', height: '1px', background: '#6B1FFF' }} />
              Profesyonel DJ
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: '16px' }}>
              {dj.isim}
            </div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,.7)' }}>📍 {dj.sehir}</span>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,.7)' }}>★ {dj.puan} ({dj.yorum_sayisi} yorum)</span>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,.7)' }}>🎵 {dj.muzik_tarzi}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '32px', fontWeight: 300, color: '#8B45FF' }}>
              {dj.baslangic_fiyati ? '₺' + dj.baslangic_fiyati.toLocaleString() + '\'den' : 'Teklif Al'}
            </div>
          </div>

          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="/teklif-al" style={{ display: 'block', background: '#6B1FFF', color: '#fff', padding: '16px 32px', borderRadius: '8px', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>
              Teklif Al
            </a>
            <a href="https://wa.me/905550000000" style={{ display: 'block', background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.7)', padding: '14px 32px', borderRadius: '8px', fontSize: '13px', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center', border: '1px solid rgba(255,255,255,.15)' }}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* İÇERİK */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>

          {/* SOL */}
          <div>
            {dj.biyografi && (
              <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', border: '1px solid #E2E0DB', marginBottom: '24px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '16px', fontWeight: 500 }}>Hakkında</div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '22px', fontWeight: 300, color: '#0C0C0C', marginBottom: '16px' }}>{dj.isim} Kimdir?</div>
                <p style={{ fontSize: '15px', fontWeight: 300, color: '#555', lineHeight: 1.8 }}>{dj.biyografi}</p>
              </div>
            )}

            <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', border: '1px solid #E2E0DB', marginBottom: '24px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '16px', fontWeight: 500 }}>Müzik Tarzı</div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {dj.muzik_tarzi?.split('·').map((tarzi, i) => (
                  <span key={i} style={{ background: '#F7F6F3', border: '1px solid #E2E0DB', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', color: '#444' }}>
                    {tarzi.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* TEKLİF AL CTA */}
            <div style={{ background: 'linear-gradient(135deg, #1C1228, #0C0C0C)', borderRadius: '16px', padding: '36px', border: '1px solid rgba(107,31,255,0.3)' }}>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '28px', fontWeight: 300, color: '#fff', marginBottom: '12px' }}>
                {dj.isim} ile Etkinliğinizi Planlayın
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.5)', marginBottom: '24px', fontWeight: 300 }}>
                Tarihinizi ve etkinlik detaylarınızı paylaşın, size özel teklif hazırlansın.
              </p>
              <a href="/teklif-al" style={{ display: 'inline-block', background: '#6B1FFF', color: '#fff', padding: '14px 32px', borderRadius: '8px', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
                Hemen Teklif Al
              </a>
            </div>
          </div>

          {/* SAĞ - BİLGİ KARTI */}
          <div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #E2E0DB', position: 'sticky', top: '90px', marginBottom: '24px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '20px', fontWeight: 500 }}>Detaylar</div>
              {[
                { label: 'Şehir', value: dj.sehir },
                { label: 'Başlangıç Fiyatı', value: dj.baslangic_fiyati ? '₺' + dj.baslangic_fiyati.toLocaleString() : '-' },
                { label: 'Puan', value: `${dj.puan} ★ (${dj.yorum_sayisi} yorum)` },
                { label: 'Müzik Tarzı', value: dj.muzik_tarzi },
              ].map((item, i) => (
                <div key={i} style={{ paddingBottom: '14px', marginBottom: '14px', borderBottom: i < 3 ? '1px solid #F0EEF8' : 'none' }}>
                  <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</div>
                  <div style={{ fontSize: '14px', color: '#0C0C0C', fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
              <a href="/teklif-al" style={{ display: 'block', background: '#6B1FFF', color: '#fff', padding: '14px', borderRadius: '8px', marginTop: '8px', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>
                Teklif Al
              </a>
            </div>

            {/* HIZLI İLETİŞİM */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E2E0DB' }}>
              <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '16px', fontWeight: 500 }}>Hızlı İletişim</div>
              <a href="https://wa.me/905550000000" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#25D366', color: '#fff', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500, marginBottom: '10px' }}>
                <span>💬</span> WhatsApp ile Yaz
              </a>
              <a href="tel:+905550000000" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F7F6F3', color: '#0C0C0C', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500, border: '1px solid #E2E0DB' }}>
                <span>📞</span> Hemen Ara
              </a>
            </div>
          </div>
        </div>

        {/* BENZERLERİ */}
        {benzerDjler.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#6B1FFF' }} />
              Diğer DJ'ler
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '32px', fontWeight: 300, color: '#0C0C0C', marginBottom: '32px' }}>
              Benzer <em style={{ color: '#6B1FFF' }}>DJ'leri İnceleyin</em>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {benzerDjler.map((b, i) => (
                <div key={i}
                  onClick={() => window.location.href = '/djler/' + b.slug}
                  style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E0DB', cursor: 'pointer', transition: 'transform .3s, box-shadow .3s' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(-4px)'
                    el.style.boxShadow = '0 16px 40px rgba(107,31,255,0.12)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ height: '160px', background: 'linear-gradient(135deg, #1a1a2e, #2d1b5e)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {b.profil_foto ? (
                      <img src={b.profil_foto} alt={b.isim} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '48px', fontWeight: 300, color: 'rgba(255,255,255,.2)' }}>{b.isim.charAt(0)}</span>
                    )}
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '18px', fontWeight: 400, color: '#0C0C0C', marginBottom: '4px' }}>{b.isim}</div>
                    <div style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>{b.sehir} · {b.muzik_tarzi}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}