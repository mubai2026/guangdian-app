import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Award, Star, CheckCircle, Clock } from 'lucide-react';
import PrimaryButton from '../../components/PrimaryButton';

const skillData = [
  { name: '晨跑陪练', totalOrders: 12, fiveStarOrders: 11, target: 10, certified: true, icon: '🏃' },
  { name: '看展同行', totalOrders: 8, fiveStarOrders: 7, target: 10, certified: false, icon: '🎨' },
  { name: '咖啡探店', totalOrders: 15, fiveStarOrders: 14, target: 10, certified: true, icon: '☕' },
  { name: '城市徒步', totalOrders: 5, fiveStarOrders: 4, target: 10, certified: false, icon: '🚶' },
  { name: '健身指导', totalOrders: 0, fiveStarOrders: 0, target: 10, certified: false, icon: '💪' },
  { name: '瑜伽课程', totalOrders: 3, fiveStarOrders: 2, target: 10, certified: false, icon: '🧘' },
];

export default function CertificationSkills() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'all' | 'certified' | 'pending'>('all');

  const filtered = skillData.filter(s => {
    if (selectedTab === 'certified') return s.certified;
    if (selectedTab === 'pending') return !s.certified;
    return true;
  });

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/b/profile')}>
          <ChevronLeft size={20} />
        </button>
        <h1 className="page-title">技能认证</h1>
        <div style={{ width: 32 }} />
      </header>

      <section className="skill-cert-header">
        <div className="skill-cert-top">
          <Award size={40} style={{ color: '#A855F7' }} />
          <div>
            <h2>{skillData.filter(s => s.certified).length}/{skillData.length}</h2>
            <p>已认证技能</p>
          </div>
        </div>
        <p className="skill-cert-tip">
          每项技能累计完成 <strong>10单五星好评</strong> 即可自动点亮认证
        </p>
      </section>

      <div className="skill-cert-tabs">
        {([['all', '全部'], ['certified', '已认证'], ['pending', '未达标']] as const).map(([key, label]) => (
          <span
            key={key}
            className={`skill-cert-tab ${selectedTab === key ? 'active' : ''}`}
            onClick={() => setSelectedTab(key)}
          >
            {label}
          </span>
        ))}
      </div>

      <section className="skill-cert-list">
        {filtered.map(skill => {
          const progress = Math.min(100, skill.fiveStarOrders / skill.target * 100);
          return (
            <div key={skill.name} className={`skill-cert-card ${skill.certified ? 'certified' : ''}`}>
              <div className="skill-cert-icon">{skill.icon}</div>
              <div className="skill-cert-body">
                <div className="skill-cert-top-row">
                  <span className="skill-cert-name">{skill.name}</span>
                  {skill.certified ? (
                    <span className="skill-cert-badge on">
                      <CheckCircle size={14} /> 已认证
                    </span>
                  ) : (
                    <span className="skill-cert-badge off">
                      <Clock size={14} /> 进行中
                    </span>
                  )}
                </div>
                <div className="skill-cert-progress-bar">
                  <div
                    className="skill-cert-progress-fill"
                    style={{
                      width: `${progress}%`,
                      background: skill.certified
                        ? 'linear-gradient(90deg, #10B981, #34D399)'
                        : 'linear-gradient(90deg, #8E8E93, #C7C7CC)',
                    }}
                  />
                </div>
                <div className="skill-cert-bottom-row">
                  <span>五星订单：{skill.fiveStarOrders}/{skill.target}</span>
                  <span>总订单：{skill.totalOrders}</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="skill-cert-bottom-tip">
        <Award size={14} style={{ color: '#A855F7' }} />
        <span>完成10单五星好评后自动点亮，灰色渐变会变为彩色</span>
      </section>
    </main>
  );
}
