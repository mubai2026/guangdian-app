import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Shield, UserRound, Award, Briefcase as Brief, CheckCircle, Clock } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const certItems = [
  { key: 'realname', label: '实名认证', desc: '身份信息验证', status: '已认证', verified: true, color: '#10B981', Icon: Shield, route: '/b/certification/realname' },
  { key: 'realperson', label: '真人认证', desc: '真人照片比对', status: '未认证', verified: false, color: '#FF7A45', Icon: UserRound, route: '/b/certification/realperson' },
  { key: 'skill', label: '技能认证', desc: '专业技能资质', status: '2/3项', verified: true, color: '#A855F7', Icon: Award, route: '/b/certification/skills' },
  { key: 'pro', label: '职业认证', desc: '职业资格证明', status: '已上传', verified: true, color: '#3B82F6', Icon: Brief, route: '/b/certification/pro' },
];

export default function CertificationCenter() {
  const navigate = useNavigate();
  const verifiedCount = certItems.filter(c => c.verified).length;

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/b/profile')}>
          <ChevronLeft size={20} />
        </button>
        <h1 className="page-title">认证中心</h1>
        <div style={{ width: 32 }} />
      </header>

      <div className="cert-center-summary">
        <div className="cert-summary-circle">
          <div className="cert-summary-num">{verifiedCount}/{certItems.length}</div>
          <div className="cert-summary-label">已完成</div>
        </div>
        <p className="cert-summary-tip">完成全部认证可提升信任度，获得更多订单推荐</p>
      </div>

      <section className="cert-center-list">
        {certItems.map((item) => {
          const I = item.Icon;
          return (
            <GlassCard key={item.key} className="cert-center-item" onClick={() => navigate(item.route)}>
              <div className="cert-item-icon" style={{ background: item.verified ? `${item.color}15` : '#f5f5f5' }}>
                <I size={22} style={{ color: item.verified ? item.color : '#C7C7CC' }} />
              </div>
              <div className="cert-item-info">
                <span className="cert-item-label">{item.label}</span>
                <span className="cert-item-desc">{item.desc}</span>
              </div>
              <div className="cert-item-right">
                {item.verified ? (
                  <span className="cert-item-status verified">
                    <CheckCircle size={14} /> {item.status}
                  </span>
                ) : (
                  <span className="cert-item-status pending">
                    <Clock size={14} /> {item.status}
                  </span>
                )}
                <ChevronRight size={16} color="#C7C7CC" />
              </div>
            </GlassCard>
          );
        })}
      </section>

      <div className="cert-center-benefits">
        <h3>认证权益</h3>
        <div className="benefit-item">
          <CheckCircle size={16} color="#10B981" />
          <span>实名认证：基础信任标识，接单必需</span>
        </div>
        <div className="benefit-item">
          <CheckCircle size={16} color="#10B981" />
          <span>真人认证：提升曝光率，优先推荐</span>
        </div>
        <div className="benefit-item">
          <CheckCircle size={16} color="#10B981" />
          <span>技能认证：展示专业能力，提高客单价</span>
        </div>
        <div className="benefit-item">
          <CheckCircle size={16} color="#10B981" />
          <span>职业认证：解锁高级订单，享专属权益</span>
        </div>
      </div>
    </main>
  );
}
