import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Calendar, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { CTabBar } from '../../components/FloatingTabBar';
import { orders, peers } from '../../mock/data';

export default function Orders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('进行中');

  const filteredOrders = orders.filter((o) => o.status === activeTab);
  const activeOrder = orders.find((o) => o.status === '进行中');

  return (
    <main className="mobile-page">
      <div className="top-tabs">
        {['待预约', '进行中', '已完成'].map((item) => (
          <button
            key={item}
            className={activeTab === item ? 'active' : ''}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {activeOrder && activeTab === '进行中' && (
        <section className="order-progress-card">
          <div className="order-progress-bg" />
          <div className="order-progress-content">
            <div className="order-progress-info">
              <span className="order-progress-label">服务进行中</span>
              <span className="order-progress-service">{activeOrder.service}</span>
            </div>
            <div className="order-progress-ring">
              <svg viewBox="0 0 100 100" width="80" height="80">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                <circle
                  cx="50" cy="50" r="42" fill="none" stroke="#fff"
                  strokeWidth="6" strokeLinecap="round"
                  strokeDasharray="264" strokeDashoffset="145"
                  style={{ transition: 'stroke-dashoffset 1s' }}
                />
              </svg>
              <div className="order-progress-text">
                <span className="order-progress-num">45</span>
                <span className="order-progress-unit">分钟</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="orders-list-section">
        {filteredOrders.map((item, idx) => {
          const statusColor =
            item.status === '已完成' ? '#10B981' :
            item.status === '进行中' ? '#3B82F6' :
            '#FF6B00';
          const statusBg =
            item.status === '已完成' ? 'rgba(16,185,129,0.08)' :
            item.status === '进行中' ? 'rgba(59,130,246,0.08)' :
            'rgba(255,107,0,0.08)';
          const cardBg =
            item.status === '已完成' ? 'order-card-completed' :
            item.status === '进行中' ? 'order-card-active' :
            'order-card-pending';

          return (
            <GlassCard key={item.service} className={`order-card-v3 ${cardBg}`}>
              {/* 顶部标题行 */}
              <div className="order-card-header">
                <h3 className="order-card-title">{item.service}</h3>
                <span className="order-status-tag" style={{ background: statusBg, color: statusColor }}>
                  {item.status}
                </span>
              </div>

              {/* 信息行 */}
              <div className="order-card-info">
                <div className="order-info-row">
                  <Calendar size={14} style={{ color: statusColor }} />
                  <span>{item.time}</span>
                </div>
                <div className="order-info-row">
                  <MapPin size={14} style={{ color: statusColor }} />
                  <span>{item.place}</span>
                </div>
              </div>

              {/* 伙伴信息 */}
              <div className="order-partner-row">
                <img className="order-partner-avatar" src={peers[idx % peers.length].avatar} alt="" />
                <div className="order-partner-info">
                  <span className="order-partner-name">{peers[idx % peers.length].name}</span>
                  <span className="order-partner-job">{peers[idx % peers.length].job}</span>
                </div>
                {item.status === '进行中' && (
                  <button
                    className="order-map-btn"
                    onClick={() => navigate('/c/map-track')}
                  >
                    查看轨迹 <ArrowRight size={14} />
                  </button>
                )}
              </div>

              {/* 已完成 - 费用明细 */}
              {item.status === '已完成' && (
                <div className="order-price-detail">
                  <div className="order-price-row">
                    <span>服务费</span>
                    <span>¥158</span>
                  </div>
                  <div className="order-price-row discount">
                    <span>新人优惠</span>
                    <span>-¥20</span>
                  </div>
                  <div className="order-price-row total">
                    <span>实付金额</span>
                    <span>¥138</span>
                  </div>
                </div>
              )}

              {/* 底部按钮 */}
              <div className="order-card-actions">
                <button className="order-btn-secondary">
                  {item.status === '已完成' ? '再次预约' : '取消订单'}
                </button>
                <button className="order-btn-primary">
                  {item.status === '已完成' ? '去评价' : '联系伙伴'}
                </button>
              </div>
            </GlassCard>
          );
        })}
      </section>

      <CTabBar />
    </main>
  );
}
