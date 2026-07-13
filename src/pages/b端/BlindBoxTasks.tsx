import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, CheckCircle, Lock, Trophy } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { BTabBar } from '../../components/FloatingTabBar';

const myBlindTasks = [
  { id: 201, user: '匿名用户', type: '城市漫步', amount: 128, status: 'pending', deadline: '2025-07-11' },
  { id: 202, user: '匿名用户', type: '咖啡探店', amount: 88, status: 'accepted', deadline: '2025-07-12' },
  { id: 203, user: '匿名用户', type: '瑜伽入门', amount: 158, status: 'completed', deadline: '-' },
];

const levelRequirements = [
  { level: 1, name: '见习伙伴', range: 'L1~L3', required: 5, reward: '经验值+50 + 抽成80%' },
  { level: 2, name: '金牌伙伴', range: 'L4~L8', required: 20, reward: '经验值+200 + 抽成90% + 专属推荐位' },
  { level: 3, name: '首席同行', range: 'L9', required: 50, reward: '经验值+500 + 抽成95% + VIP优先接单' },
];

export default function BlindBoxTasks() {
  const navigate = useNavigate();
  const [myCompleted, setMyCompleted] = useState(12);

  return (
    <main className="mobile-page">
      <header className="bb-task-header">
        <h1><Target size={22} /> 盲盒任务</h1>
        <p>完成指定数量盲盒订单，获取更多权益</p>
      </header>

      <GlassCard className="bb-progress-card">
        <div className="bb-progress-top">
          <h3>本月进度</h3>
          <span className="bb-count">{myCompleted}/20 单</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${Math.min(100, myCompleted / 20 * 100)}%` }} />
        </div>
        <p className="bb-hint">再完成 {Math.max(0, 20 - myCompleted)} 单即可升级为「金牌伙伴」</p>
      </GlassCard>

      <section className="bb-level-section">
        <h2><Trophy size={18} /> 等级权益</h2>
        {levelRequirements.map(lvl => (
          <GlassCard key={lvl.level} className={`bb-level-card ${myCompleted >= lvl.required ? 'unlocked' : ''}`}>
            <div className="bb-level-left">
              <span className="bb-lv-num">{lvl.range}</span>
              <div>
                <strong>{lvl.name}</strong>
                <span>需完成 {lvl.required} 单/月</span>
              </div>
            </div>
            <div className="bb-reward">
              {myCompleted >= lvl.required ? <CheckCircle size={18} style={{color:'#10B981'}} /> : <Lock size={18} style={{color:'#C7C7CC'}} />}
              <span>{lvl.reward}</span>
            </div>
          </GlassCard>
        ))}
      </section>

      <section className="bb-mytasks">
        <h2>我的盲盒任务</h2>
        {myBlindTasks.map(task => (
          <GlassCard key={task.id} className="bb-task-item">
            <div className="bb-task-status-dot" style={{
              background: task.status === 'pending' ? '#FF6B00' : task.status === 'accepted' ? '#3B82F6' : '#10B981'
            }} />
            <div className="bb-task-body">
              <span className="bb-task-type">{task.type}</span>
              <span className="bb-task-user">{task.user}</span>
            </div>
            <div className="bb-task-right">
              <span className="bb-task-amt">¥{task.amount}</span>
              <span className="bb-task-sts">{task.status === 'pending' ? '待接单' : task.status === 'accepted' ? '进行中' : '已完成'}</span>
            </div>
          </GlassCard>
        ))}
      </section>

      <BTabBar />
    </main>
  );
}
