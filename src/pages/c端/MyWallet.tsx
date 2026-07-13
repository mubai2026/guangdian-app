import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Ticket, ChevronRight, Wallet, TrendingUp, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';
import { myCoupons } from '../../mock/data';

export default function MyWallet() {
  const navigate = useNavigate();
  const availableCoupons = myCoupons.filter(c => c.status === 'available');

  const walletRecords = [
    { icon: ArrowDownCircle, title: '充值到账', amount: '+100.00', time: '今天 14:30', color: '#10B981' },
    { icon: Wallet, title: '订单消费', amount: '-138.00', time: '昨天 19:00', color: '#FF7A45' },
    { icon: ArrowUpCircle, title: '提现成功', amount: '-200.00', time: '7月5日 10:20', color: '#6B7280' },
    { icon: TrendingUp, title: '退款到账', amount: '+50.00', time: '7月3日 16:45', color: '#10B981' },
  ];

  return (
    <main className="mobile-page">
      <header className="publish-header">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h1>我的钱包</h1>
        <div style={{ width: 24 }} />
      </header>

      {/* 余额卡片 */}
      <div className="wallet-balance-card">
        <div className="wallet-balance-bg" />
        <div className="wallet-balance-content">
          <span className="wallet-balance-label">账户余额（元）</span>
          <div className="wallet-balance-amount">
            <span className="wallet-currency">¥</span>
            <span className="wallet-value">0.00</span>
          </div>
          <div className="wallet-balance-actions">
            <PrimaryButton>充值</PrimaryButton>
            <button className="wallet-btn-outline">提现</button>
          </div>
        </div>
      </div>

      {/* 优惠券模块 */}
      <GlassCard className="wallet-coupons-card" onClick={() => navigate('/c/coupons')}>
        <div className="wallet-coupons-left">
          <div className="wallet-coupons-icon">
            <Ticket size={20} />
          </div>
          <div className="wallet-coupons-info">
            <div className="wallet-coupons-count">
              <span className="coupon-count-num">{availableCoupons.length}</span>
              <span className="coupon-count-label">张可用</span>
            </div>
            <span className="wallet-coupons-label">我的优惠券</span>
          </div>
        </div>
        <div className="wallet-coupons-right">
          <span className="wallet-coupons-link">去使用</span>
          <ChevronRight size={16} />
        </div>
      </GlassCard>

      {/* 可用优惠券快速展示 */}
      <section className="wallet-section">
        <div className="wallet-section-header">
          <h2>可用优惠券</h2>
          <span className="wallet-section-more" onClick={() => navigate('/c/coupons')}>
            全部 <ChevronRight size={12} />
          </span>
        </div>
        <div className="wallet-coupon-list">
          {availableCoupons.slice(0, 3).map((c) => (
            <div key={c.id} className="wallet-coupon-item">
              <div className="wallet-coupon-left">
                <span className="wallet-coupon-amount">¥{c.amount}</span>
                <span className="wallet-coupon-desc">{c.desc}</span>
              </div>
              <div className="wallet-coupon-right">
                <div className="wallet-coupon-title">{c.title}</div>
                <div className="wallet-coupon-expire">{c.expire} 到期</div>
                <button className="wallet-coupon-use" onClick={() => navigate('/c/discover')}>
                  去使用
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 钱包明细 */}
      <section className="wallet-section">
        <div className="wallet-section-header">
          <h2>账单明细</h2>
          <span className="wallet-section-more">
            更多 <ChevronRight size={12} />
          </span>
        </div>
        <div className="wallet-records">
          {walletRecords.map((r, i) => (
            <div key={i} className="wallet-record-item">
              <div className="wallet-record-icon" style={{ background: `${r.color}15` }}>
                <r.icon size={18} style={{ color: r.color }} />
              </div>
              <div className="wallet-record-info">
                <div className="wallet-record-title">{r.title}</div>
                <div className="wallet-record-time">{r.time}</div>
              </div>
              <span className="wallet-record-amount" style={{ color: r.color }}>{r.amount}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
