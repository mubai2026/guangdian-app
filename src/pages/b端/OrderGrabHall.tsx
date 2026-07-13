import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Clock, MapPin, User, Zap } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { BTabBar } from '../../components/FloatingTabBar';

const myServices = ['晨跑', '看展', '咖啡', '徒步', '瑜伽'];

const demands = [
  { id: 101, user: '小光', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user2', type: '找搭子运动', budget: '80-120', time: '明天下午', location: '上海世纪公园', urgent: true, vip: true, distance: 2.5, matchScore: 0, desc: '想找人一起打羽毛球' },
  { id: 102, user: '南希', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user3', type: '看展', budget: '100-150', time: '周六上午', location: '西岸美术馆', urgent: false, vip: true, distance: 3.8, matchScore: 100, desc: '当代艺术展想有人讲解' },
  { id: 103, user: '阿澈', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user4', type: '咖啡探店', budget: '50-80', time: '今天晚上', location: '静安寺附近', urgent: true, vip: false, distance: 1.2, matchScore: 100, desc: '新开的一家精品咖啡想去试试' },
  { id: 104, user: '柚子', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user5', type: '城市徒步', budget: '60-100', time: '周日', location: '武康路安福路', urgent: false, vip: true, distance: 4.2, matchScore: 100, desc: '老城区citywalk' },
  { id: 105, user: '晴天', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user6', type: '健身陪练', budget: '200-300', time: '周一到周五晚', location: '浦东某健身房', urgent: false, vip: false, distance: 5.0, matchScore: 0, desc: '需要固定教练带练一个月' },
  { id: 106, user: '小鱼', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user7', type: '瑜伽冥想', budget: '100-180', time: '周末', location: '线上/线下均可', urgent: true, vip: true, distance: 0, matchScore: 100, desc: '零基础想学瑜伽入门' },
  { id: 107, user: '阿泽', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user8', type: '晨跑搭子', budget: '40-60', time: '明天早晨', location: '陆家嘴滨江', urgent: false, vip: false, distance: 2.2, matchScore: 100, desc: '想找人一起晨跑锻炼' },
];

export default function OrderGrabHall() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('');

  const sortedDemands = [...demands].sort((a, b) => {
    if (a.vip !== b.vip) return a.vip ? -1 : 1;
    if (a.urgent !== b.urgent) return a.urgent ? -1 : 1;
    if (a.matchScore !== b.matchScore) return b.matchScore - a.matchScore;
    return a.distance - b.distance;
  });

  const filtered = filterType ? sortedDemands.filter(d => d.type.includes(filterType)) : sortedDemands;

  return (
    <main className="mobile-page">
      <header className="grab-hall-header">
        <h1>抢单大厅</h1>
        <p>用户发布的需求，快来抢单！</p>
        <div className="grab-search-bar">
          <Search size={16} />
          <input placeholder="搜索需求类型、地点..." />
        </div>
      </header>

      <div className="grab-filter-tabs">
        {['全部','运动','看展','咖啡','户外','其他'].map(tab => (
          <span key={tab} className={`grab-tab ${filterType === tab || (tab === '全部' && !filterType) ? 'active' : ''}`}
            onClick={() => setFilterType(tab === '全部' ? '' : tab)}>{tab}</span>
        ))}
      </div>

      <section className="grab-list">
        {filtered.map(demand => (
          <GlassCard key={demand.id} className="grab-card">
            <div className="grab-card-top">
              <div className="grab-user-info">
                <img src={demand.avatar} alt="" />
                <span>{demand.user}</span>
                {demand.vip && <span className="vip-tag">VIP</span>}
              </div>
              <div className="grab-tags">
                {demand.urgent && <span className="urgent-tag"><Zap size={12} /> 急单</span>}
                {demand.matchScore > 0 && <span className="match-tag">匹配服务</span>}
              </div>
            </div>
            <h3 className="grab-demand-type">{demand.type}</h3>
            <p className="grab-demand-desc">{demand.desc}</p>
            <div className="grab-meta-row">
              <span><MapPin size={13} /> {demand.location}</span>
              <span><Clock size={13} /> {demand.time}</span>
            </div>
            <div className="grab-bottom">
              <span className="grab-budget">预算：{demand.budget}</span>
              <button className="grab-btn" onClick={() => navigate(`/b/orders/${demand.id}`)}>立即抢单</button>
            </div>
          </GlassCard>
        ))}
      </section>

      <BTabBar />
    </main>
  );
}
