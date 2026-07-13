import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, ArrowRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function MyPoints() {
  const navigate = useNavigate();
  return (
    <main className="mobile-page">
      <header className="publish-header">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h1>积分中心</h1>
        <div style={{ width: 24 }} />
      </header>
      <GlassCard className="balance-card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span>当前积分</span>
          <button 
            onClick={() => navigate('/c/points-shop')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 4, 
              padding: '6px 12px', 
              background: 'linear-gradient(135deg, #FF7A45, #FFB088)', 
              color: '#fff', 
              borderRadius: 20, 
              fontSize: 12,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Gift size={14} />
            积分商城
            <ArrowRight size={14} />
          </button>
        </div>
        <strong style={{ fontSize: 36, color: '#FF7A45' }}>860</strong>
        <p style={{ color: '#8E8E93', fontSize: 13 }}>积分可用于兑换优惠券或抵扣订单</p>
      </GlassCard>
      <section className="list-stack">
        {[
          { title: '签到奖励', pts: '+10', time: '今天' },
          { title: '完成订单', pts: '+50', time: '昨天' },
          { title: '邀请有礼', pts: '+100', time: '7月5日' },
          { title: '完善资料', pts: '+20', time: '7月3日' },
        ].map((r, i) => (
          <GlassCard key={i} className="order-card-v2">
            <h3>{r.title}</h3>
            <p style={{ color: '#6C6C70' }}>{r.time}</p>
            <b style={{ color: '#FF7A45' }}>{r.pts}</b>
          </GlassCard>
        ))}
      </section>
    </main>
  );
}
