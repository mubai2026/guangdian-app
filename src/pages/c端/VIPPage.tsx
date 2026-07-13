import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Crown, Check, Gift, Zap, Star, ArrowRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';
import { CTabBar } from '../../components/FloatingTabBar';

const plans = [
  {
    id: 1, name: '体验卡', price: 19, period: '月',
    blindCount: 2, discount: 0,
    features: ['每月2次盲盒', '基础浏览', '普通匹配'],
    popular: false,
  },
  {
    id: 2, name: '月度会员', price: 39, period: '月',
    blindCount: 8, discount: 95,
    features: ['每月8次盲盒', '优质伙伴优先匹配', '专属客服通道', '95折优惠'],
    popular: true,
  },
  {
    id: 3, name: '季度会员', price: 99, period: '季',
    blindCount: 30, discount: 90,
    features: ['每月10次盲盒', '优先接单响应', '优惠券礼包', '生日双倍积分', '90折优惠'],
    popular: false,
  },
  {
    id: 4, name: '年度VIP', price: 299, period: '年',
    blindCount: 999, discount: 85,
    features: ['无限次盲盒', '专属定制服务', '线下活动邀请', '平台分红权', '85折优惠'],
    popular: false,
  },
];

export default function VIPPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(2);

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/c/home')}><ChevronLeft size={20} /></button>
        <h1 className="page-title"><Crown size={20} /> 光点VIP</h1>
        <div style={{ width: 32 }} />
      </header>

      <section className="vip-hero-banner" style={{ background: 'linear-gradient(135deg,#FFD700,#FFA500)' }}>
        <h2>成为VIP，解锁更多精彩</h2>
        <p>免费盲盒 · 专属优惠 · 优先匹配</p>
      </section>

      <section className="vip-plans">
        {plans.map(plan => (
          <GlassCard key={plan.id} className={`vip-plan-card ${selectedPlan === plan.id ? 'selected' : ''} ${plan.popular ? 'popular' : ''}`}>
            {plan.popular && <span className="popular-tag">最受欢迎</span>}
            <div className="vip-plan-header">
              <h3>{plan.name}</h3>
              <div className="vip-plan-price">
                <span className="vip-yen">¥</span>
                <span className="vip-amount">{plan.price}</span>
                <span className="vip-period">/{plan.period}</span>
              </div>
            </div>
            <div className="vip-plan-benefit">
              <span><Gift size={14} /> 每月{plan.blindCount === 999 ? '无限' : plan.blindCount}次盲盒</span>
              <span><Zap size={14} /> {plan.discount === 0 ? '无额外折扣' : `${100-plan.discount}%折优惠`}</span>
            </div>
            <ul className="vip-feature-list">
              {plan.features.map(f => (<li key={f}><Check size={14} />{f}</li>))}
            </ul>
            <button className={`vip-buy-btn ${selectedPlan === plan.id ? 'primary' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}>选择此方案</button>
          </GlassCard>
        ))}
      </section>

      <section className="vip-faq">
        <h2><Star size={16} /> VIP常见问题</h2>
        {[
          { q: '盲盒是什么？', a: '盲盒是平台推出的特价随机匹配服务，每次仅需¥99即可享受价值¥99-¥399的陪伴服务。VIP用户有免费次数。' },
          { q: '如何使用盲盒？', a: '进入盲盒页面，点击开启即可。系统将根据你的偏好随机匹配认证伙伴。' },
          { q: '可以退款吗？', a: '对匹配结果不满意的用户可在24小时内无条件申请退款。' },
        ].map(item => (
          <GlassCard key={item.q} className="faq-item">
            <strong>{item.q}</strong>
            <p>{item.a}</p>
          </GlassCard>
        ))}
      </section>

      <div className="vip-checkout-bar">
        <span>已选：{plans.find(p => p.id === selectedPlan)?.name}</span>
        <PrimaryButton onClick={() => alert('模拟支付成功！')}>立即开通</PrimaryButton>
      </div>

      <CTabBar />
    </main>
  );
}
