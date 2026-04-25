'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1800&q=85&fit=crop&crop=center',
    eyebrow: 'Düğün & Nikah Töreni',
    title: ['En Özel', 'Gecenizin', 'Sesi'],
    italic: 2,
    desc: 'Düğününüzün müziğini tesadüfe bırakmayın. Türkiye\'nin en iyi DJ\'leriyle unutulmaz bir gece yaşayın.',
    btn1: { text: 'DJ Bul', href: '/djler' },
    btn2: { text: 'Nasıl çalışır', href: '/surec' },
  },
  {
    img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1800&q=85&fit=crop&crop=center',
    eyebrow: 'After Parti & Kulüp Etkinlikleri',
    title: ['Geceyi', 'Tasarla,', 'Yaşat'],
    italic: 2,
    desc: 'After parti, beach club ve kulüp etkinlikleri için sektörün en deneyimli DJ\'leri tek platformda.',
    btn1: { text: 'DJ Listesi', href: '/djler' },
    btn2: { text: 'Tüm kategoriler', href: '/hizmetler' },
  },
  {
    img: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1800&q=85&fit=crop&crop=center',
    eyebrow: 'Kurumsal Etkinlikler & Gala',
    title: ['Kurumsal', 'Etkinliğinizi', 'Yükseltin'],
    italic: 2,
    desc: 'Lansman, yıl sonu partisi veya gala geceniz için tam donanımlı profesyonel DJ ve ses sistemi.',
    btn1: { text: 'Teklif Al', href: '/teklif-al' },
    btn2: { text: 'Profillere bak', href: '/djler' },
  },
  {
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800&q=85&fit=crop&crop=center',
    eyebrow: 'Özel Kutlamalar & VIP',
    title: ['Her Anı', 'Müzikle', 'Taçlandır'],
    italic: 2,
    desc: 'Doğum günü, sünnet, mezuniyet ya da VIP davet — her etkinlik için kişiye özel DJ deneyimi.',
    btn1: { text: 'Hemen Başla', href: '/teklif-al' },
    btn2: { text: 'Ekipman kirala', href: '/kiralama' },
  },
  {
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1800&q=85&fit=crop&crop=center',
    eyebrow: 'Kına Gecesi & Gelin Alma',
    title: ['Geleneksel', 'Anlara', 'Ritim Kat'],
    italic: 2,
    desc: 'Kına gecenizi ve gelin alma töreninizi canlı davul, darbuka ve profesyonel DJ eşliğinde yaşayın.',
    btn1: { text: 'Kategorilere Bak', href: '/hizmetler' },
    btn2: { text: 'DJ Bul', href: '/djler' },
  },
]

const DUR = 6000

export default function HeroSlider() {
  const [cur, setCur] = useState(0)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<NodeJS.Timeout | null>(null)

  const go = (n: number) => {
    setCur(((n % slides.length) + slides.length) % slides.length)
    setProgress(0)
  }

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (progressRef.current) clearInterval(progressRef.current)

    setProgress(0)
    let p = 0
    progressRef.current = setInterval(() => {
      p += 100 / (DUR / 100)
      setProgress(Math.min(p, 100))
    }, 100)

    timerRef.current = setTimeout(() => {
      setCur(c => (c + 1) % slides.length)
      setProgress(0)
    }, DUR)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [cur])

  const slide = slides[cur]

  return (
    <div style={{ position: 'relative', height: '100vh', minHeight: '600px', overflow: 'hidden', background: '#0C0C0C' }}>

      {/* BG IMAGE */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${slide.img})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.85)',
        transition: 'background-image 0.5s ease',
      }} />

      {/* OVERLAY */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.28) 55%,rgba(0,0,0,.04) 100%),linear-gradient(0deg,rgba(0,0,0,.55) 0%,transparent 40%)',
      }} />

      {/* ACCENT LINE */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, width: '4px', height: '100%',
        background: 'linear-gradient(to top, #6B1FFF, transparent 60%)', zIndex: 6,
      }} />

      {/* CONTENT */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 5,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '120px 64px 100px', maxWidth: '750px',
      }}>
        <div style={{
          fontSize: '10px', letterSpacing: '3.5px', textTransform: 'uppercase',
          color: '#8B45FF', marginBottom: '20px', fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ width: '30px', height: '1px', background: '#6B1FFF', display: 'inline-block' }} />
          {slide.eyebrow}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(54px, 7.5vw, 96px)',
          fontWeight: 300, lineHeight: .98, color: '#fff',
          letterSpacing: '-2px', marginBottom: '28px',
        }}>
          {slide.title.map((line, i) => (
            <span key={i}>
              {i === slide.italic - 1 ? <em style={{ fontStyle: 'italic' }}>{line}</em> : line}
              {i < slide.title.length - 1 && <br />}
            </span>
          ))}
        </h1>

        <p style={{
          fontSize: '15px', fontWeight: 300, lineHeight: 1.75,
          color: 'rgba(255,255,255,.62)', maxWidth: '400px', marginBottom: '44px',
        }}>{slide.desc}</p>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <Link href={slide.btn1.href} style={{
            fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
            fontWeight: 500, background: '#6B1FFF', color: '#fff',
            padding: '14px 34px', textDecoration: 'none', borderRadius: '2px',
          }}>{slide.btn1.text}</Link>
          <Link href={slide.btn2.href} style={{
            fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.6)', textDecoration: 'none',
            borderBottom: '1px solid rgba(255,255,255,.25)', paddingBottom: '2px',
          }}>{slide.btn2.text}</Link>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div style={{ position: 'absolute', bottom: 0, left: '4px', right: 0, height: '2px', background: 'rgba(255,255,255,.08)', zIndex: 20 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#6B1FFF,#8B45FF)', transition: 'width .1s linear' }} />
      </div>

      {/* DOTS + COUNTER */}
      <div style={{ position: 'absolute', bottom: '36px', right: '64px', zIndex: 20, display: 'flex', alignItems: 'center', gap: '28px' }}>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,.4)', letterSpacing: '1px' }}>
          <span style={{ color: 'rgba(255,255,255,.85)' }}>{String(cur + 1).padStart(2, '0')}</span> / 05
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{
              width: i === cur ? '44px' : '24px', height: '1.5px',
              backgroundColor: i === cur ? '#6B1FFF' : 'rgba(255,255,255,.25)',
border: 'none', cursor: 'pointer', padding: '5px 0',
            }} />
          ))}
        </div>
      </div>

      {/* ARROWS */}
      <button onClick={() => go(cur - 1)} style={{
        position: 'absolute', left: '28px', top: '50%', transform: 'translateY(-50%)',
        zIndex: 20, width: '48px', height: '48px',
        border: '1px solid rgba(255,255,255,.15)', background: 'rgba(255,255,255,.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button onClick={() => go(cur + 1)} style={{
        position: 'absolute', right: '28px', top: '50%', transform: 'translateY(-50%)',
        zIndex: 20, width: '48px', height: '48px',
        border: '1px solid rgba(255,255,255,.15)', background: 'rgba(255,255,255,.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  )
}