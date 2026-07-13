import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Calendar, MapPin, Phone, MessageCircle } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';

export default function OrderDetailEdit() {
  const navigate = useNavigate();
  const order = {
    id: 'GD20250710001',
    service: '晨跑陪伴',
    user: { name: '小光', avatar: '/avatars/avatar2.png' },
    time: '2025-07-10 07:30',
    location: '上海世纪公园',
    status: '待接单',
    amount: 158,
    duration: '2小时',
  };

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/b/orders')}>
          <ChevronLeft size={20} />
        </button>
        <h1 className="page-title">订单详情</h1>
        <div style={{ width: 32 }} />
      </header>

      <section className="order-detail-section">
        <GlassCard className="order-status-card">
          <div className="order-status-header">
            <span className="order-status-badge pending">{order.status}</span>
            <span className="order-id">{order.id}</span>
          </div>
          <div className="order-service-info">
            <h3>{order.service}</h3>
            <span className="order-duration">{order.duration}</span>
          </div>
        </GlassCard>

        <GlassCard className="order-user-card">
          <div className="order-user">
            <img src={order.user.avatar} alt={order.user.name} />
            <div className="order-user-info">
              <span className="order-user-name">{order.user.name}</span>
              <span className="order-user-label">预约用户</span>
            </div>
            <button className="order-contact-btn">
              <MessageCircle size={16} />
            </button>
          </div>
        </GlassCard>

        <GlassCard className="order-info-card">
          <div className="order-info-item">
            <Calendar size={16} />
            <span className="order-info-label">服务时间</span>
            <span className="order-info-value">{order.time}</span>
          </div>
          <div className="order-info-item">
            <MapPin size={16} />
            <span className="order-info-label">服务地点</span>
            <span className="order-info-value">{order.location}</span>
          </div>
          <div className="order-info-item">
            <span className="order-info-label">订单金额</span>
            <span className="order-info-value amount">¥{order.amount}</span>
          </div>
        </GlassCard>

        <div className="order-actions">
          <PrimaryButton onClick={() => navigate('/b/orders')}>接单</PrimaryButton>
          <button className="reject-btn" onClick={() => navigate('/b/orders')}>拒绝</button>
        </div>
      </section>
    </main>
  );
}
