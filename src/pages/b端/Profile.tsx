import { useNavigate } from 'react-router-dom';
import { ChevronRight, LogOut, Edit3, MapPin, Briefcase, Clock, Shield, UserRound, Award, Briefcase as Brief, Layers, Settings, CheckCircle, Crown, Star, Zap } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { BTabBar } from '../../components/FloatingTabBar';

const certItems = [
  { key: 'realname', label: '实名认证', desc: '已认证', verified: true, color: '#10B981', Icon: Shield, route: '/b/certification/realname' },
  { key: 'realperson', label: '真人认证', desc: '未认证', verified: false, color: '#FF7A45', Icon: UserRound, route: '/b/certification/realperson' },
  { key: 'skill', label: '技能认证', desc: '2/3项', verified: true, color: '#A855F7', Icon: Award, route: '/b/certification/skills' },
  { key: 'pro', label: '职业认证', desc: '已上传', verified: true, color: '#3B82F6', Icon: Brief, route: '/b/certification/pro' },
];

const serviceTags = ['晨跑', '看展', '咖啡', '徒步', '瑜伽'];

const menuItems = [
  { title: '服务管理', desc: '管理你的服务笔记', route: '/b/services', Icon: Layers, color: '#10B981' },
  { title: '编辑资料', desc: '修改个人简介和标签', route: '/b/profile/edit', Icon: Edit3, color: '#F59E0B' },
  { title: '账号设置', desc: '密码、通知、隐私', route: '/b/settings', Icon: Settings, color: '#8B5CF6' },
];

export default function BProfile() {
  const navigate = useNavigate();
  const avatarUrl = 'https://api.dicebear.com/9.x/avataaars/svg?seed=user1';
  const verifiedCount = certItems.filter(c => c.verified).length;

  return (
    <main className="mobile-page">
      <section className="b-profile-hero">
        <div className="b-profile-cover-wrap" onClick={() => navigate('/b/profile/edit')}>
          <img src={avatarUrl} alt="背景" className="b-profile-cover-img b-profile-cover-blur" />
          <div className="b-profile-cover-mask" />
        </div>
        <div className="b-profile-hero-content">
          <button className="b-profile-edit-top" onClick={() => navigate('/b/profile/edit')}>
            <Edit3 size={16} />
          </button>
          <div className="b-profile-avatar-wrap" onClick={() => navigate('/b/profile/edit')}>
            <img src={avatarUrl} alt="晨光伙伴" />
          </div>
          <h1 className="b-profile-name">晨光伙伴</h1>

          {/* 等级图标展示 */}
          <div className="b-profile-level-icon-badge" onClick={() => navigate('/b/blindbox-tasks')}>
            <div className="level-icon-circle">
              <Crown size={18} color="#fff" />
            </div>
            <div className="level-icon-text">
              <span className="level-num">L5</span>
              <span className="level-label">金牌伙伴</span>
            </div>
            <div className="level-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
          </div>

          <div className="b-profile-meta-row">
            <span><Clock size={12} /> 26岁</span>
            <span><MapPin size={12} /> 上海</span>
            <span><Briefcase size={12} /> 户外领队</span>
          </div>
        </div>
      </section>

      <section className="b-service-tags-section">
        <div className="b-service-tags-header">
          <h3>服务项目</h3>
          <span onClick={() => navigate('/b/certification/skills')}>管理</span>
        </div>
        <div className="b-service-tags-list">
          {serviceTags.map(tag => (
            <span key={tag} className="b-service-tag-item">{tag}</span>
          ))}
        </div>
      </section>

      {/* 认证中心 - 统一入口卡片 */}
      <GlassCard className="b-cert-entry-card" onClick={() => navigate('/b/certification/center')}>
        <div className="b-cert-entry-left">
          <div className="b-cert-entry-icon">
            <Shield size={22} color="#FF7A45" />
          </div>
          <div className="b-cert-entry-info">
            <h3>认证中心</h3>
            <p>{certItems.length}项认证 · 已完成{verifiedCount}项</p>
          </div>
        </div>
        <div className="b-cert-entry-right">
          <div className="b-cert-progress-bar">
            <div className="b-cert-progress-fill" style={{ width: `${(verifiedCount / certItems.length) * 100}%` }} />
          </div>
          <ChevronRight size={18} color="#C7C7CC" />
        </div>
      </GlassCard>

      <section className="profile-section">
        <div className="menu-list">
          {menuItems.map((item) => {
            const I = item.Icon;
            return (
              <div key={item.title} className="menu-item" onClick={() => navigate(item.route)}>
                <div className="menu-icon" style={{ background: `${item.color}15` }}>
                  <I size={20} style={{ color: item.color }} />
                </div>
                <div className="menu-content">
                  <span className="menu-label">{item.title}</span>
                  <span className="menu-desc">{item.desc}</span>
                </div>
                <ChevronRight size={18} className="menu-arrow" />
              </div>
            );
          })}
        </div>
      </section>

      <div className="b-profile-logout">
        <button className="b-logout-btn" onClick={() => navigate('/b/login')}>
          <LogOut size={18} /><span>退出登录</span>
        </button>
      </div>

      <div style={{ height: 20 }} />
      <BTabBar />
    </main>
  );
}
