import { useNavigate } from 'react-router-dom';
import { ChevronRight, Settings, Wallet, FileText, Heart, Award, Calendar, User, Edit3, CreditCard, Users, Star } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { CTabBar } from '../../components/FloatingTabBar';
import { orders } from '../../mock/data';

export default function Profile() {
  const navigate = useNavigate();

  const user = {
    name: '用户小明',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user1',
    level: 3,
    balance: 128.00,
    orders: 5,
    following: 12,
    points: 360,
  };

  const serviceTags = ['晨跑', '游泳', '露营', '看展', '咖啡', '骑行'];

  const menuItems = [
    { key: 'wallet', label: '我的钱包', icon: Wallet, desc: `余额 ¥${user.balance.toFixed(2)}`, route: '/c/wallet' },
    { key: 'cardCollection', label: '卡片收藏', icon: Star, desc: '收集角色卡片', route: '/c/card-collection' },
    { key: 'invite', label: '邀请有礼', icon: Users, desc: '邀请得积分', route: '/c/invite' },
    { key: 'reviews', label: '我的评价', icon: Calendar, desc: '查看历史评价', route: '/c/reviews' },
    { key: 'settings', label: '设置', icon: Settings, desc: '账号与安全', route: '/c/settings' },
  ];

  return (
    <main className="mobile-page">
      <section className="profile-header">
        <div className="profile-card">
          <div className="profile-avatar">
            <img src={user.avatar} alt={user.name} />
          </div>
          <div className="profile-info">
            <div className="profile-name-row">
              <h1>{user.name}</h1>
              <span className="profile-level">L{user.level}</span>
            </div>
            <div className="profile-service-tags">
              {serviceTags.map((tag) => (
                <span key={tag} className="profile-service-tag">{tag}</span>
              ))}
            </div>
          </div>
          <button className="profile-edit" onClick={() => navigate('/c/profile/edit')}>
            <Edit3 size={16} />
            <span>编辑</span>
          </button>
        </div>
        
        <div className="profile-stats">
          <div className="stat-item" onClick={() => navigate('/c/orders')}>
            <span className="stat-value">{user.orders}</span>
            <span className="stat-label">订单</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item" onClick={() => navigate('/c/follows')}>
            <span className="stat-value">{user.following}</span>
            <span className="stat-label">关注</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item" onClick={() => navigate('/c/points')}>
            <span className="stat-value">{user.points}</span>
            <span className="stat-label">积分</span>
          </div>
        </div>
      </section>

      <section className="profile-section">
        <div className="menu-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="menu-item" onClick={() => navigate(item.route)}>
                <div className="menu-icon">
                  <Icon size={20} />
                </div>
                <div className="menu-content">
                  <span className="menu-label">{item.label}</span>
                  <span className="menu-desc">{item.desc}</span>
                </div>
                <ChevronRight size={18} className="menu-arrow" />
              </div>
            );
          })}
        </div>
      </section>

      <CTabBar />
    </main>
  );
}
