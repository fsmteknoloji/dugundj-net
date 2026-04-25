'use client'
import { useIsMobile } from './useIsMobile'

const maddeler = [
  { title: "Doğrulanmış DJ'ler", desc: 'Her DJ kimlik, referans ve portföy doğrulamasından geçer. Yalnızca onaylı profesyoneller yer alır.', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
  { title: 'Gerçek Zamanlı Müsaitlik', desc: "Tarihinizi girin, yalnızca o güne müsait DJ'leri görün. Çift rezervasyon ve hayal kırıklığı sıfır.", icon: <><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M8 2v4M16 2v4M3 10h18"/></> },
  { title: 'Şeffaf Fiyatlandırma', desc: 'Birden fazla DJ teklif verir, siz karşılaştırırsınız. Gizli ücret yok, sürpriz fatura yok.', icon: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></> },
  { title: 'Gerçek Yorumlar', desc: 'Yorum yapabilmek için etkinliğin tamamlanması zorunludur. Sahte değerlendirme sistemde yer almaz.', icon: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/> },
  { title: 'Ekipman Kiralama', desc: "DJ'in yanı sıra ses sistemi, subwoofer, mikrofon ve drone ekipmanlarını tek pakette kiralayın.", icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/> },
  { title: '7/24 Destek', desc: 'Etkinliğinize kadar WhatsApp ve e-posta üzerinden kesintisiz destek sağlanır.', icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .19h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/> },
]

function NedenItem({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div
      style={{ background: '#fff', padding: '32px 28px', borderRadius: '12px', border: '1px solid #F0EEF8', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'default', transition: 'transform .25s ease, box-shadow .25s ease' }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-5px)'
        el.style.boxShadow = '0 16px 36px rgba(107,31,255,0.12)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'
      }}
    >
      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #6B1FFF, #8B45FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 8px 24px rgba(107,31,255,0.3)' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">{icon}</svg>
      </div>
      <h4 style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '.5px', color: '#0C0C0C', marginBottom: '10px' }}>{title}</h4>
      <p style={{ fontSize: '13px', fontWeight: 300, color: '#888', lineHeight: 1.8 }}>{desc}</p>
    </div>
  )
}

export default function NedenBiz() {
  const isMobile = useIsMobile()

  return (
    <section style={{ padding: isMobile ? '60px 20px' : '100px 64px', background: '#F7F6F3' }}>
      <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1FFF', marginBottom: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#6B1FFF' }} />
        Güvence
      </div>
      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(34px,4vw,56px)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-1px', color: '#0C0C0C', marginBottom: '48px' }}>
        Neden<br /><em style={{ color: '#6B1FFF' }}>dugundj.net?</em>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
        gap: '16px',
      }}>
        {maddeler.map((m, i) => (
          <NedenItem key={i} title={m.title} desc={m.desc} icon={m.icon} />
        ))}
      </div>
    </section>
  )
}