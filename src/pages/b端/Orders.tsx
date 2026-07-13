import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, CheckCircle } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { BTabBar } from '../../components/FloatingTabBar';

const ordersData = [
  { id: 1, service: '看展同行', user: '小光', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user2', time: '今天 14:30', place: '西岸美术馆', status: '待接单', amount: 158, urgent: false, vip: false, distance: 2.5 },
  { id: 2, service: '咖啡探店', user: '阿澈', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user3', time: '今天 15:00', place: '静安寺', status: '进行中', amount: 98, urgent: false, vip: true, distance: 1.2 },
  { id: 3, service: '城市徒步', user: '南希', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user4', time: '昨天 09:00', place: '西湖周边', status: '已完成', amount: 188, urgent: false, vip: false, distance: 5.0 },
  { id: 4, service: '摄影跟拍', user: '小鹿', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user5', time: '昨天 16:00', place: '外滩', status: '已完成', amount: 258, urgent: true, vip: true, distance: 3.8 },
  { id: 5, service: '瑜伽冥想', user: '晴天', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user6', time: '今天 16:30', place: '徐汇滨江', status: '待接单', amount: 128, urgent: true, vip: false, distance: 1.8 },
  { id: 6, service: '健身陪练', user: '小鱼', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user7', time: '明天 09:00', place: '世纪公园', status: '待接单', amount: 288, urgent: false, vip: true, distance: 4.2 },
  { id: 7, service: '剧本杀', user: '阿泽', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user8', time: '明天 14:00', place: '人民广场', status: '待接单', amount: 168, urgent: false, vip: false, distance: 3.0 },
  { id: 8, service: '晨跑搭子', user: '晨曦', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user2', time: '明天 06:30', place: '陆家嘴', status: '已完成', amount: 68, urgent: false, vip: false, distance: 2.2 },
];

const tabs = ['待接单', '进行中', '已完成'];

export default function BOrders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('待接单');

  const filteredOrders = ordersData.filter(o => o.status === activeTab);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '待接单': return { bg: 'rgba(255,107,0,0.08)', color: '#FF6B00', btn: '接单', btnBg: '#FF6B00' };
      case '进行中': return { bg: 'rgba(59,130,246,0.08)', color: '#3B82F6', btn: '联系用户', btnBg: '#3B82F6' };
      case '已完成': return { bg: 'rgba(16,185,129,0.08)', color: '#10B981', btn: '查看评价', btnBg: '#10B981' };
      default: return { bg: '#f5f5f5', color: '#8E8E93', btn: '查看', btnBg: '#8E8E93' };
    }
  };

  return (
    <main className="mobile-page">
      <div className="b-page-header">
        <h1 className="b-page-title">订单管理</h1>
      </div>

      {/* Tab */}
      <div className="b-order-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`b-order-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            <span className="b-tab-count">{ordersData.filter(o => o.status === tab).length}</span>
          </button>
        ))}
      </div>

      {/* 订单列表 */}
      <section className="b-order-list-section">
        {filteredOrders.length > 0 ? (
          <div className="b-order-list">
            {filteredOrders.map((order) => {
              const style = getStatusStyle(order.status);
              return (
                <GlassCard key={order.id} className="b-order-card" onClick={() => navigate(`/b/orders/${order.id}`)}>
                  <div className="b-order-card-top">
                    <img src={order.avatar} alt="" className="b-order-card-avatar" />
                    <div className="b-order-card-info">
                      <span className="b-order-card-name">{order.user}</span>
                      <span className="b-order-card-service">{order.service}</span>
                    </div>
                    <span className="b-order-card-status" style={{ background: style.bg, color: style.color }}>
                      {order.status}
                    </span>
                  </div>
                  <div className="b-order-card-details">
                    <div className="b-order-card-row">
                      <Clock size={13} style={{ color: '#8E8E93' }} />
                      <span>{order.time}</span>
                    </div>
                    <div className="b-order-card-row">
                      <MapPin size={13} style={{ color: '#8E8E93' }} />
                      <span>{order.place}</span>
                    </div>
                  </div>
                  <div className="b-order-card-bottom">
                    <span className="b-order-card-price">¥{order.amount}</span>
                    <button
                      className="b-order-card-btn"
                      style={{ background: style.btnBg }}
                      onClick={(e) => { e.stopPropagation(); navigate(`/b/orders/${order.id}`); }}
                    >
                      {style.btn}
                    </button>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        ) : (
          <div className="b-empty-state">
            <CheckCircle size={48} style={{ color: '#E5E5EA' }} />
            <p>暂无{activeTab}订单</p>
          </div>
        )}
      </section>

      <div style={{ height: 20 }} />
      <BTabBar />
    </main>
  );
}
