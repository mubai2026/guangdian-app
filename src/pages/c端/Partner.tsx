import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MessageCircle, ChevronLeft, Heart, MapPin, Shield, Award, BadgeCheck, Verified } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { peers } from '../../mock/data';

const reviews = [
  { user: '小光', rating: 5, text: '非常棒的体验，林夏很专业，推荐了很多好看的展览！', date: '2024-07-01' },
  { user: '阿澈', rating: 5, text: '咖啡探店选的地方都很棒，聊得很开心。', date: '2024-06-28' },
  { user: '南希', rating: 4, text: '城市徒步路线规划得很好，下次还会约。', date: '2024-06-25' },
];

// 认证标签数据
const certifications = [
  { label: '实名认证', icon: Verified, color: '#22c55e' },
  { label: '真人认证', icon: BadgeCheck, color: '#3b82f6' },
  { label: '技能认证', icon: Award, color: '#f59e0b' },
  { label: '官方合作达人', icon: Shield, color: '#A855F7' },
];

export default function Partner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const peer = peers.find((p) => p.name === id) || peers[0];

  const metrics = [
    { label: '接单', value: '128' },
    { label: '好评率', value: '98%' },
    { label: '响应', value: '<5分' },
    { label: '服务', value: '56h' },
  ];

  // 根据陪伴师特性显示认证标签
  const getCertifications = () => {
    const certs = ['实名认证', '真人认证'];
    if (peer.level >= 5) certs.push('技能认证');
    if (peer.verified && peer.level >= 7) certs.push('官方合作达人');
    return certifications.filter(c => certs.includes(c.label));
  };

  const partnerCertifications = getCertifications();

  return (
    <main className="mobile-page" style={{ padding: 0 }}>
      {/* 大图头图 */}
      <section className="partner-hero">
        <img src={peer.avatar} alt={peer.name} className="partner-hero-img" />
        <div className="partner-hero-overlay" />
        
        <button onClick={() => navigate(-1)} className="partner-back-btn">
          <ChevronLeft size={20} />
        </button>
        
        <button className="partner-like-btn">
          <Heart size={20} />
        </button>

        <div className="partner-hero-content">
          <div className="partner-avatar-large">
            <img src={peer.avatar} alt={peer.name} />
            {peer.verified && (
              <div className="partner-verified-badge">
                <Shield size={12} />
              </div>
            )}
          </div>
          <div className="partner-hero-info">
            <div className="partner-name-row">
              <h1>{peer.name}</h1>
              <span className="partner-level-badge">L{peer.level}</span>
            </div>
            <p>{peer.job} · {peer.age}岁 · {peer.city}</p>
          </div>
        </div>
      </section>

      {/* 认证标签 */}
      <section className="partner-certifications">
        {partnerCertifications.map((cert) => (
          <div key={cert.label} className="certification-tag" style={{ borderColor: cert.color }}>
            <cert.icon size={12} style={{ color: cert.color }} />
            <span style={{ color: cert.color }}>{cert.label}</span>
          </div>
        ))}
      </section>

      {/* 评分和指标 */}
      <section className="partner-metrics">
        <div className="partner-rating-big">
          <Star size={20} className="fill-yellow-400 text-yellow-400" />
          <span className="rating-score">{(4.5 + Math.random() * 0.5).toFixed(1)}</span>
          <span className="rating-count">(86条评价)</span>
        </div>
        <div className="partner-metric-grid">
          {metrics.map((metric) => (
            <div key={metric.label} className="partner-metric-item">
              <div className="metric-value">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 服务列表 */}
      <section className="partner-section">
        <div className="section-header">
          <h2>服务项目</h2>
          <span>共{peer.services.length}项</span>
        </div>
        <div className="partner-services">
          {peer.services.map((service, idx) => (
            <div key={service} className="partner-service-item" onClick={() => navigate(`/c/service/${idx + 1}`)} style={{ cursor: 'pointer' }}>
              <div className="service-info">
                <h3>{service}</h3>
                <div className="service-meta">
                  <Clock size={12} />
                  <span>2小时</span>
                  <span className="dot">·</span>
                  <MapPin size={12} />
                  <span>可上门</span>
                </div>
              </div>
              <div className="service-price">
                <span className="currency">¥</span>
                <span className="amount">{100 + idx * 50}</span>
                <span className="unit">/次</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 个人介绍 */}
      <section className="partner-section">
        <div className="section-header">
          <h2>关于我</h2>
        </div>
        <GlassCard className="partner-about">
          <p>
            大家好，我是{peer.name}。热爱生活，喜欢探索城市的每一个角落。
            无论是看展、探店还是运动，我都可以成为你的最佳搭子。
            希望能通过我的陪伴，让你的每一天都充满温暖和快乐！
          </p>
        </GlassCard>
      </section>

      {/* 评价 */}
      <section className="partner-section">
        <div className="section-header">
          <h2>用户评价</h2>
          <span>查看全部</span>
        </div>
        <div className="partner-reviews">
          {reviews.map((review, idx) => (
            <GlassCard key={idx} className="partner-review-item">
              <div className="review-header">
                <div className="review-user">
                  <div className="review-avatar">{review.user[0]}</div>
                  <span>{review.user}</span>
                </div>
                <div className="review-rating">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="review-text">{review.text}</p>
              <span className="review-date">{review.date}</span>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 底部操作栏 */}
      <footer className="partner-footer">
        <button className="partner-chat-btn">
          <MessageCircle size={20} />
          <span>咨询</span>
        </button>
        <button 
          className="partner-book-btn"
          onClick={() => navigate(`/c/booking/${id}`)}
        >
          立即预约
        </button>
      </footer>
    </main>
  );
}
