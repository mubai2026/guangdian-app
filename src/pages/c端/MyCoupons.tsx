import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function MyCoupons() {
  const navigate = useNavigate();
  const coupons = [
    { title: '新用户立减券', amount: '¥20', desc: '满100可用', expire: '2026-08-01' },
    { title: '生日专属券', amount: '¥50', desc: '满200可用', expire: '2026-07-30' },
    { title: '周末狂欢券', amount: '¥10', desc: '满50可用', expire: '2026-07-15' },
  ];
  return (
    <main className="mobile-page">
      <header className="publish-header">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h1>我的优惠券</h1>
        <div style={{ width: 24 }} />
      </header>
      <section className="list-stack">
        {coupons.map((c, i) => (
          <GlassCard key={i} className="coupon-card">
            <div className="coupon-left">
              <strong>{c.amount}</strong>
              <span>{c.desc}</span>
            </div>
            <div className="coupon-right">
              <h3>{c.title}</h3>
              <p>有效期至 {c.expire}</p>
            </div>
          </GlassCard>
        ))}
      </section>
    </main>
  );
}
