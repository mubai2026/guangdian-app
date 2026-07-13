import { useState } from 'react';
import { ArrowLeft, Gift, Crown, Tag, Zap, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../components/GlassCard';

interface ShopItem {
  id: number;
  name: string;
  description: string;
  points: number;
  icon: typeof Gift;
  category: string;
  color: string;
  bgColor: string;
}

const shopItems: ShopItem[] = [
  { id: 1, name: '限定头像框', description: '星光璀璨头像框', points: 50, icon: Crown, category: '头像框', color: '#F59E0B', bgColor: 'rgba(245,158,11,0.1)' },
  { id: 2, name: '专属标签前缀', description: '[星光]专属称号', points: 30, icon: Tag, category: '标签', color: '#EC4899', bgColor: 'rgba(236,72,153,0.1)' },
  { id: 3, name: '优先曝光体验卡', description: '获得24小时优先曝光', points: 40, icon: Zap, category: '体验卡', color: '#3B82F6', bgColor: 'rgba(59,130,246,0.1)' },
  { id: 4, name: '彩虹头像框', description: '缤纷彩虹头像框', points: 60, icon: Crown, category: '头像框', color: '#A855F7', bgColor: 'rgba(168,85,247,0.1)' },
  { id: 5, name: '[VIP]专属标签', description: 'VIP专属称号', points: 50, icon: Tag, category: '标签', color: '#FF7A45', bgColor: 'rgba(255,122,69,0.1)' },
  { id: 6, name: '双倍积分卡', description: '24小时双倍积分', points: 80, icon: Zap, category: '体验卡', color: '#10B981', bgColor: 'rgba(16,185,129,0.1)' },
];

export default function PointsShop() {
  const navigate = useNavigate();
  const [points, setPoints] = useState(100);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successItem, setSuccessItem] = useState<ShopItem | null>(null);

  const categories = ['全部', '头像框', '标签', '体验卡'];
  const filteredItems = selectedCategory === '全部' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

  const handleExchange = (item: ShopItem) => {
    if (points < item.points) return;
    
    setPoints(points - item.points);
    setSuccessItem(item);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setSuccessItem(null);
    }, 2000);
  };

  return (
    <main className="mobile-page">
      <header className="publish-header">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h1>积分商城</h1>
        <div style={{ width: 24 }} />
      </header>

      {/* 积分余额 */}
      <GlassCard className="points-shop-balance">
        <div className="points-shop-balance-left">
          <div className="points-shop-balance-icon" style={{ background: 'rgba(255,122,69,0.1)' }}>
            <Gift size={20} style={{ color: '#FF7A45' }} />
          </div>
          <div className="points-shop-balance-info">
            <span className="points-shop-balance-label">当前积分</span>
            <span className="points-shop-balance-value">{points}</span>
          </div>
        </div>
        <button className="points-shop-earn-btn" onClick={() => navigate('/c/points')}>
          去赚取
        </button>
      </GlassCard>

      {/* 分类筛选 */}
      <div className="points-shop-categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={`points-shop-category ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 商品列表 */}
      <div className="points-shop-list">
        {filteredItems.map(item => {
          const Icon = item.icon;
          const canExchange = points >= item.points;
          return (
            <GlassCard key={item.id} className="points-shop-item">
              <div className="points-shop-item-left">
                <div className="points-shop-item-icon" style={{ background: item.bgColor }}>
                  <Icon size={22} style={{ color: item.color }} />
                </div>
                <div className="points-shop-item-info">
                  <h3 className="points-shop-item-name">{item.name}</h3>
                  <p className="points-shop-item-desc">{item.description}</p>
                </div>
              </div>
              <div className="points-shop-item-right">
                <span className="points-shop-item-price" style={{ color: canExchange ? '#FF7A45' : '#C7C7CC' }}>
                  {item.points}积分
                </span>
                <button
                  className={`points-shop-exchange-btn ${canExchange ? '' : 'disabled'}`}
                  onClick={() => handleExchange(item)}
                  disabled={!canExchange}
                >
                  {canExchange ? '兑换' : '积分不足'}
                </button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* 兑换成功弹窗 */}
      {showSuccess && successItem && (
        <div className="points-shop-success-overlay">
          <div className="points-shop-success-modal">
            <div className="points-shop-success-icon">
              <Check size={48} style={{ color: '#10B981' }} />
            </div>
            <h3>兑换成功</h3>
            <p>恭喜获得 {successItem.name}</p>
            <p className="points-shop-success-remaining">剩余积分: {points}</p>
          </div>
        </div>
      )}
    </main>
  );
}
