import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Wallet, Star, Calendar, MessageCircle, AlertCircle, ArrowRight, ChevronRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { BTabBar } from '../../components/FloatingTabBar';

const quickActions = [
  { title: '抢单大厅', icon: ArrowRight, color: '#FF7A45', badge: 6, route: '/b/grab-hall' },
  { title: '盲盒任务', icon: TrendingUp, color: '#3B82F6', badge: 3, route: '/b/blindbox-tasks' },
  { title: '收益中心', icon: Wallet, color: '#10B981', badge: 0, route: '/b/earnings' },
  { title: '日程管理', icon: Calendar, color: '#3B82F6', badge: 0, route: '/b/schedule' },
];

const recentOrders = [
  { id: 1, service: '看展同行', user: '小光', avatar: '/avatars/avatar2.png', time: '14:30', status: '待接单', amount: 158 },
  { id: 2, service: '咖啡探店', user: '阿澈', avatar: '/avatars/avatar3.png', time: '15:00', status: '进行中', amount: 98 },
  { id: 3, service: '城市徒步', user: '南希', avatar: '/avatars/avatar4.png', time: '昨天', status: '已完成', amount: 188 },
];

export default function BDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ orders: 0, income: 0, rating: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ orders: 3, income: 536, rating: 98 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '待接单': return { bg: 'rgba(255,107,0,0.1)', color: '#FF6B00' };
      case '进行中': return { bg: 'rgba(59,130,246,0.1)', color: '#3B82F6' };
      case '已完成': return { bg: 'rgba(16,185,129,0.1)', color: '#10B981' };
      default: return { bg: '#f5f5f5', color: '#8E8E93' };
    }
  };

  return (
    <main className="mobile-page">
      {/* 顶部头部 */}
      <div className="b-dash-header">
        <div>
          <h1 className="b-dash-title">早安，晨光伙伴</h1>
          <p className="b-dash-subtitle">今天也要加油哦</p>
        </div>
        <div className="b-dash-avatar" onClick={() => navigate('/b/profile')}>
          <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=user1" alt="avatar" />
        </div>
      </div>

      {/* 数据指标 */}
      <section className="b-dash-metrics">
        <GlassCard className="b-metric-card">
          <div className="b-metric-icon" style={{ background: 'rgba(255,122,69,0.1)' }}>
            <TrendingUp size={20} style={{ color: '#FF7A45' }} />
          </div>
          <span className="b-metric-value">{stats.orders}</span>
          <span className="b-metric-label">新订单</span>
        </GlassCard>
        <GlassCard className="b-metric-card">
          <div className="b-metric-icon" style={{ background: 'rgba(16,185,129,0.1)' }}>
            <Wallet size={20} style={{ color: '#10B981' }} />
          </div>
          <span className="b-metric-value">¥{stats.income}</span>
          <span className="b-metric-label">今日收入</span>
        </GlassCard>
        <GlassCard className="b-metric-card">
          <div className="b-metric-icon" style={{ background: 'rgba(245,158,11,0.1)' }}>
            <Star size={20} style={{ color: '#F59E0B' }} />
          </div>
          <span className="b-metric-value">{stats.rating}%</span>
          <span className="b-metric-label">好评率</span>
        </GlassCard>
      </section>

      {/* 快捷操作 */}
      <section className="b-dash-section">
        <h2 className="b-section-title">快捷操作</h2>
        <div className="b-actions-grid">
          {quickActions.map((item) => {
            const Icon = item.icon;
            return (
              <GlassCard key={item.title} className="b-action-card" onClick={() => navigate(item.route)}>
                <div className="b-action-icon" style={{ background: `${item.color}15` }}>
                  <Icon size={22} style={{ color: item.color }} />
                  {item.badge > 0 && <span className="b-action-badge">{item.badge}</span>}
                </div>
                <span className="b-action-label">{item.title}</span>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 待处理提醒 */}
      <section className="b-dash-section">
        <h2 className="b-section-title">待处理</h2>
        <GlassCard className="b-alert-card" onClick={() => navigate('/b/orders')}>
          <div className="b-alert-icon" style={{ background: 'rgba(255,107,0,0.1)' }}>
            <AlertCircle size={18} style={{ color: '#FF6B00' }} />
          </div>
          <div className="b-alert-content">
            <span className="b-alert-title">3个订单待处理</span>
            <span className="b-alert-desc">请尽快确认接单或拒绝</span>
          </div>
          <ArrowRight size={16} style={{ color: '#C7C7CC' }} />
        </GlassCard>
      </section>

      {/* 最近订单 */}
      <section className="b-dash-section">
        <div className="b-section-header">
          <h2 className="b-section-title">最近订单</h2>
          <span className="b-section-more" onClick={() => navigate('/b/orders')}>全部</span>
        </div>
        <div className="b-dash-order-list">
          {recentOrders.map((order) => (
            <GlassCard key={order.id} className="b-dash-order-item" onClick={() => navigate(`/b/orders/${order.id}`)}>
              <img src={order.avatar} alt="" className="b-dash-order-avatar" />
              <div className="b-dash-order-info">
                <span className="b-dash-order-service">{order.service}</span>
                <span className="b-dash-order-meta">{order.user} · {order.time}</span>
              </div>
              <div className="b-dash-order-right">
                <span className="b-dash-order-amount">¥{order.amount}</span>
                <span className="b-dash-order-status" style={{ background: getStatusStyle(order.status).bg, color: getStatusStyle(order.status).color }}>
                  {order.status}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <div style={{ height: 20 }} />
      <BTabBar />
    </main>
  );
}
