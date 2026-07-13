import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, MapPin, Clock, Send } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';
import { CTabBar } from '../../components/FloatingTabBar';

const needTypes = ['找搭子运动', '找人看展', '咖啡探店', '城市徒步', '健身陪练', '瑜伽冥想', '摄影跟拍', '其他'];
const budgetOptions = ['50以下','50-100','100-200','200-500','500以上'];
const timeSlots = ['今天上午','今天下午','明天全天','周末','下周','随时'];

export default function DemandPublish() {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [budget, setBudget] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [location, setLocation] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = () => {
    if (type && budget && timeSlot && location) {
      alert('需求发布成功！等待伙伴抢单');
      navigate('/c/orders');
    }
  };

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/c/home')}><ChevronLeft size={20} /></button>
        <h1 className="page-title">发布需求</h1>
        <div style={{ width: 32 }} />
      </header>

      <section className="demand-publish-section">
        <GlassCard className="demand-card">
          <h3>你需要什么类型的陪伴？</h3>
          <div className="cat-chips-row">
            {needTypes.map((t) => (
              <span key={t} className={`cat-chip ${type === t ? 'active' : ''}`} onClick={() => setType(t)}>{t}</span>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="demand-card">
          <h3>预算范围</h3>
          <div className="cat-chips-row">
            {budgetOptions.map((b) => (
              <span key={b} className={`cat-chip ${budget === b ? 'active' : ''}`} onClick={() => setBudget(b)}>{b}</span>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="demand-card">
          <h3>期望时间</h3>
          <div className="cat-chips-row">
            {timeSlots.map((ts) => (
              <span key={ts} className={`cat-chip ${timeSlot === ts ? 'active' : ''}`} onClick={() => setTimeSlot(ts)}>{ts}</span>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="demand-card">
          <h3><MapPin size={16} /> 服务地点</h3>
          <input className="demand-input" placeholder="请输入期望的服务地点" value={location} onChange={(e) => setLocation(e.target.value)} />
        </GlassCard>

        <GlassCard className="demand-card">
          <h3>补充说明</h3>
          <textarea className="demand-textarea" rows={4} placeholder="说说你的具体需求、偏好或特殊要求..." value={desc} onChange={(e) => setDesc(e.target.value)} />
        </GlassCard>

        <div className="demand-tips">
          发布后伙伴会主动抢单，你也可以在发现页直接挑选心仪的伙伴下单
        </div>

        <PrimaryButton onClick={handleSubmit}>发布需求，等待接单</PrimaryButton>
      </section>

      <CTabBar />
    </main>
  );
}
