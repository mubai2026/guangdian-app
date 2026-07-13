import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Clock, ChevronRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { BTabBar } from '../../components/FloatingTabBar';

const servicesData = [
  { id: 1, name: '看展同行', desc: '带你欣赏艺术展览，讲解展品', time: '2小时', price: 158, enabled: true, orders: 86 },
  { id: 2, name: '咖啡探店', desc: '寻找城市隐藏的咖啡店', time: '2小时', price: 98, enabled: true, orders: 64 },
  { id: 3, name: '城市徒步', desc: '探索城市角落，发现美好', time: '3小时', price: 188, enabled: true, orders: 42 },
  { id: 4, name: '摄影跟拍', desc: '专业跟拍服务', time: '2小时', price: 258, enabled: false, orders: 18 },
  { id: 5, name: '艺术导览', desc: '专业艺术讲解服务', time: '2小时', price: 168, enabled: true, orders: 35 },
];

export default function BServices() {
  const navigate = useNavigate();
  const [services, setServices] = useState(servicesData);

  const toggleService = (id: number) => {
    setServices(services.map(s =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  return (
    <main className="mobile-page">
      <div className="b-page-header">
        <h1 className="b-page-title">服务管理</h1>
        <span className="b-page-desc">{services.filter(s => s.enabled).length}/{services.length} 项上架中</span>
      </div>

      {/* 服务列表 */}
      <section className="b-service-list">
        {services.map((service) => (
          <GlassCard
            key={service.id}
            className={`b-service-card ${!service.enabled ? 'disabled' : ''}`}
            onClick={() => navigate(`/b/services/${service.id}`)}
          >
            <div className="b-service-top">
              <div className="b-service-name-row">
                <h3 className="b-service-name">{service.name}</h3>
                <span className={`b-service-status-tag ${service.enabled ? 'on' : 'off'}`}>
                  {service.enabled ? '上架中' : '已下架'}
                </span>
              </div>
              <ChevronRight size={16} style={{ color: '#C7C7CC' }} />
            </div>
            <p className="b-service-desc">{service.desc}</p>
            <div className="b-service-bottom">
              <div className="b-service-meta">
                <Clock size={13} style={{ color: '#8E8E93' }} />
                <span>{service.time}</span>
                <span className="b-service-dot">·</span>
                <span>{service.orders}单</span>
              </div>
              <span className="b-service-price">¥{service.price}</span>
            </div>
          </GlassCard>
        ))}
      </section>

      {/* 添加服务 */}
      <div className="b-service-add">
        <button className="b-service-add-btn" onClick={() => navigate('/b/services/new')}>
          <Plus size={18} />
          <span>添加新服务</span>
        </button>
      </div>

      <div style={{ height: 20 }} />
      <BTabBar />
    </main>
  );
}
