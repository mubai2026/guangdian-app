import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Sparkles, ArrowRight, Crown, Lock } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';
import { CTabBar } from '../../components/FloatingTabBar';

const vipTiers = [
  { level: 1, name: '体验卡', price: 19, blindCount: 2, features: ['每月2次盲盒机会', '基础服务浏览'] },
  { level: 2, name: '月度会员', price: 39, blindCount: 8, features: ['每月8次盲盒机会', '优先匹配优质伙伴', '专属客服'] },
  { level: 3, name: '季度会员', price: 99, blindCount: 30, features: ['每月10次盲盒机会', '优先接单', '折扣券礼包', '生日福利'] },
  { level: 4, name: '年度VIP', price: 299, blindCount: 60, features: ['无限次盲盒', '专属定制服务', '线下活动邀请', '平台分红'] },
];

const blindBoxPrices = [99, 129, 159, 199];

export default function BlindBox() {
  const navigate = useNavigate();
  const [userVipLevel] = useState(0);
  const [freeCount, setFreeCount] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(99);
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (freeCount > 0) {
      setFreeCount(freeCount - 1);
    }
    setOpened(true);
    setTimeout(() => {
      alert(`恭喜你抽到了价值 ¥${Math.floor(Math.random() * 300 + 100)} 的陪伴服务！`);
      navigate('/c/orders');
    }, 1500);
  };

  return (
    <main className="mobile-page">
      <header className="blindbox-header">
        <h1><Gift size={24} /> 盲盒惊喜</h1>
        <p>随机匹配专属伙伴 · 特价¥99起</p>
      </header>

      {userVipLevel === 0 && (
        <section className="vip-promo-section">
          <h2><Crown size={18} /> 开通VIP享免费盲盒次数</h2>
          {vipTiers.map(vip => (
            <GlassCard key={vip.level} className={`vip-tier-card ${vip.level === 2 ? 'recommended' : ''}`}>
              {vip.level === 2 && <span className="recommended-badge">推荐</span>}
              <div className="vip-tier-info">
                <h3>{vip.name}</h3>
                <span className="vip-price">¥{vip.price}<small>/月</small></span>
              </div>
              <ul className="vip-features">
                {vip.features.map(f => (<li key={f}><Sparkles size={12} />{f}</li>))}
              </ul>
              <PrimaryButton onClick={() => navigate('/c/vip')}>开通{vip.name}</PrimaryButton>
            </GlassCard>
          ))}
        </section>
      )}

      <section className="blindbox-main">
        <GlassCard className="blindbox-display-card">
          {!opened ? (
            <div className="blindbox-box" onClick={handleOpen}>
              <div className="blindbox-gift-wrap">
                <Gift size={64} />
                <Sparkles size={32} className="blindbox-sparkle" />
              </div>
              <h2>点击开启盲盒</h2>
              <p>随机获得价值 ¥99~¥399 的陪伴服务</p>
              {freeCount > 0 ? (
                <span className="free-count-badge">剩余免费次数：{freeCount}</span>
              ) : (
                <div className="price-select-row">
                  {blindBoxPrices.map(p => (
                    <span key={p} className={`price-option ${selectedPrice === p ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setSelectedPrice(p); }}>
                      ¥{p}
                    </span>
                  ))}
                </div>
              )}
              <PrimaryButton onClick={handleOpen}>{freeCount > 0 ? '免费开启' : `支付¥${selectedPrice}开启`}</PrimaryButton>
            </div>
          ) : (
            <div className="blindbox-opened">
              <div className="opened-animation">
                <Sparkles size={48} />
              </div>
              <h2>正在为你匹配...</h2>
            </div>
          )}
        </GlassCard>

        <div className="blindbox-rules">
          <h3>盲盒规则</h3>
          <ul>
            <li>每次盲盒随机匹配一位经过认证的伙伴</li>
            <li>服务价值范围为 ¥99 ~ ¥399</li>
            <li>VIP用户每月享有不同数量的免费盲盒机会</li>
            <li>不满意可在24小时内申请退款</li>
            <li>B端伙伴每月需完成一定数量盲盒任务以保持等级</li>
          </ul>
        </div>
      </section>

      <CTabBar />
    </main>
  );
}
