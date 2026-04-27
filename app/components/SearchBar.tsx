'use client'
import { useState } from 'react'
import { useIsMobile } from './useIsMobile'

const etkinlikler = ['Düğün', 'Kına Gecesi', 'After Parti', 'Doğum Günü', 'Sünnet', 'Gelin Alma', 'Gala Gecesi', 'Şirket Lansmanı', 'Açık Hava Konseri', 'Okul Mezuniyeti', 'Drone Çekim']
const sehirler = ['Tüm Türkiye', 'İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Bodrum', 'Muğla', 'Eskişehir', 'Gaziantep']

function Dropdown({ label, icon, options, value, onChange }: {
  label: string; icon: string; options: string[]; value: string; onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative', flex: 1 }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: '18px 24px', cursor: 'pointer',
          borderRight: '1px solid #E2E0DB',
          userSelect: 'none',
        }}
      >
        <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', fontWeight: 600, marginBottom: '6px' }}>
          {icon} {label}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '15px', color: '#0C0C0C', fontWeight: 400 }}>{value}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s', flexShrink: 0 }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
          background: '#fff',
          border: '1px solid #E2E0DB',
          borderTop: '2px solid #6B1FFF',
          borderRadius: '0 0 12px 12px',
          boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
          overflow: 'hidden',
        }}>
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => { onChange(opt); setOpen(false) }}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                color: value === opt ? '#6B1FFF' : '#0C0C0C',
                fontWeight: value === opt ? 500 : 300,
                background: value === opt ? 'rgba(107,31,255,0.05)' : '#fff',
                cursor: 'pointer',
                borderBottom: i < options.length - 1 ? '1px solid #F5F4F0' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(107,31,255,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.background = value === opt ? 'rgba(107,31,255,0.05)' : '#fff')}
            >
              {opt}
              {value === opt && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B1FFF" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function SearchBar() {
  const isMobile = useIsMobile()
  const [etkinlik, setEtkinlik] = useState('Düğün')
  const [sehir, setSehir] = useState('Tüm Türkiye')
  const [tarih, setTarih] = useState('')

  return (
    <div style={{ background: '#fff', padding: isMobile ? '24px 20px' : '32px 64px', borderBottom: '1px solid #E2E0DB' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* BAŞLIK */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: isMobile ? '24px' : '32px', fontWeight: 300, color: '#0C0C0C', letterSpacing: '-0.5px' }}>
            Etkinliğinize Uygun <em style={{ color: '#6B1FFF', fontStyle: 'italic' }}>DJ&apos;i Bulun</em>
          </div>
          <div style={{ fontSize: '13px', color: '#888', marginTop: '6px', fontWeight: 300 }}>
            250+ profesyonel DJ arasından tarihe ve şehre göre filtreleyin
          </div>
        </div>

        {/* ARAMA KUTUSU */}
        <div style={{
          border: '2px solid #6B1FFF',
          borderRadius: '12px',
          overflow: 'visible',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          boxShadow: '0 8px 32px rgba(107,31,255,0.12)',
          background: '#fff',
          position: 'relative',
        }}>

          {/* ETKİNLİK TÜRÜ */}
          {isMobile ? (
            <div style={{ borderBottom: '1px solid #E2E0DB' }}>
              <Dropdown label="Etkinlik Türü" icon="🎉" options={etkinlikler} value={etkinlik} onChange={setEtkinlik} />
            </div>
          ) : (
            <Dropdown label="Etkinlik Türü" icon="🎉" options={etkinlikler} value={etkinlik} onChange={setEtkinlik} />
          )}

          {/* ŞEHİR */}
          {isMobile ? (
            <div style={{ borderBottom: '1px solid #E2E0DB' }}>
              <Dropdown label="Şehir" icon="📍" options={sehirler} value={sehir} onChange={setSehir} />
            </div>
          ) : (
            <Dropdown label="Şehir" icon="📍" options={sehirler} value={sehir} onChange={setSehir} />
          )}

          {/* TARİH */}
          <div style={{
            flex: 1, padding: '18px 24px',
            borderRight: isMobile ? 'none' : '1px solid #E2E0DB',
            borderBottom: isMobile ? '1px solid #E2E0DB' : 'none',
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B1FFF', fontWeight: 600, marginBottom: '6px' }}>
              📅 Etkinlik Tarihi
            </div>
            <input
              type="date"
              value={tarih}
              onChange={e => setTarih(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '15px', color: tarih ? '#0C0C0C' : '#888', background: 'transparent', fontWeight: 400, width: '100%' }}
            />
          </div>

          {/* BUTON */}
          <button
            style={{
              background: '#6B1FFF', color: '#fff', border: 'none',
              padding: isMobile ? '18px' : '0 48px',
              fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase',
              cursor: 'pointer', fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              borderRadius: isMobile ? '0 0 10px 10px' : '0 10px 10px 0',
              transition: 'background .2s',
              minWidth: isMobile ? 'auto' : '160px',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#8B45FF')}
            onMouseLeave={e => (e.currentTarget.style.background = '#6B1FFF')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            DJ Ara
          </button>
        </div>

      </div>
    </div>
  )
}