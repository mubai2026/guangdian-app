import os
import re

BASE_DIR = r"C:\Users\18090\Desktop\光点-TRAE版\V2\光点新版完整项目\src"

# 1. Modify FloatingTabBar.tsx
floating_tab_bar_path = os.path.join(BASE_DIR, "components", "FloatingTabBar.tsx")
with open(floating_tab_bar_path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    """  const items = [
    { to: '/b/dashboard', label: '工作台', icon: Home },
    { to: '/b/orders', label: '订单', icon: CalendarCheck },
    { to: '/b/earnings', label: '收益', icon: WalletCards },
    { to: '/b/profile', label: '我的', icon: UserRound },
  ];""",
    """  const items = [
    { to: '/b/dashboard', label: '工作台', icon: Home },
    { to: '/b/orders', label: '订单', icon: CalendarCheck },
    { to: '/b/messages', label: '消息', icon: MessageCircle },
    { to: '/b/profile', label: '我的', icon: UserRound },
  ];"""
)

with open(floating_tab_bar_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Modified: FloatingTabBar.tsx")

# 2. Create pages/b端/Messages.tsx
messages_content = """import { useNavigate } from 'react-router-dom';
import { Search, MessageCircle } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { BTabBar } from '../../components/FloatingTabBar';

const chatList = [
  { id: 1, user: '小光', avatar: '/avatars/avatar2.png', lastMsg: '请问明天可以约吗？', time: '14:30', unread: 2 },
  { id: 2, user: '阿澈', avatar: '/avatars/avatar3.png', lastMsg: '好的，那就世纪公园见', time: '12:15', unread: 0 },
  { id: 3, user: '南希', avatar: '/avatars/avatar4.png', lastMsg: '服务结束后在哪里评价？', time: '昨天', unread: 1 },
];

export default function BMessages() {
  const navigate = useNavigate();
  return (
    <main className="mobile-page">
      <header className="messages-header">
        <h1>消息</h1>
        <div className="messages-search">
          <Search size={16} />
          <input placeholder="搜索用户消息..." />
        </div>
      </header>
      <section className="messages-list">
        {chatList.map(chat => (
          <GlassCard key={chat.id} className="message-chat-item" onClick={() => navigate(`/b/chat/${chat.id}`)}>
            <img src={chat.avatar} alt="" />
            <div className="message-chat-body">
              <div className="message-chat-top">
                <span className="chat-name">{chat.user}</span>
                <span className="chat-time">{chat.time}</span>
              </div>
              <div className="message-chat-bottom">
                <span className="chat-last">{chat.lastMsg}</span>
                {chat.unread > 0 && <span className="chat-unread">{chat.unread}</span>}
              </div>
            </div>
          </GlassCard>
        ))}
      </section>
      <BTabBar />
    </main>
  );
}
"""
messages_path = os.path.join(BASE_DIR, "pages", "b端", "Messages.tsx")
with open(messages_path, "w", encoding="utf-8") as f:
    f.write(messages_content)
print("Created: pages/b端/Messages.tsx")

# 3. Rewrite pages/b端/Profile.tsx
profile_content = """import { useNavigate } from 'react-router-dom';
import { ChevronRight, Settings, LogOut, Star, Calendar, Wallet, Edit3, MapPin, Briefcase, Clock, Layers } from 'lucide-react';
import { BTabBar } from '../../components/FloatingTabBar';

const certBadges = [
  { key: 'realname', label: '实', verified: true, color: '#10B981' },
  { key: 'realperson', label: '真', verified: false, color: '#FF7A45' },
  { key: 'skill', label: '技', verified: true, color: '#A855F7' },
  { key: 'pro', label: '职', verified: true, color: '#3B82F6' },
];

const serviceTags = ['晨跑', '看展', '咖啡', '徒步', '瑜伽'];

const skillProgress = [
  { name: '晨跑陪练', orders: 12, fiveStar: 11, certified: true },
  { name: '看展同行', orders: 8, fiveStar: 7, certified: false },
  { name: '咖啡探店', orders: 15, fiveStar: 14, certified: true },
];

const menuItems = [
  { title: '实名认证', desc: '已认证', route: '/b/certification/realname', icon: 'shield' },
  { title: '真人认证', desc: '未认证，去认证', route: '/b/certification/realperson', icon: 'user' },
  { title: '技能认证', desc: '2/3项已认证', route: '/b/certification/skills', icon: 'award' },
  { title: '职业认证', desc: '已上传证书', route: '/b/certification/pro', icon: 'briefcase' },
  { title: '服务管理', desc: '管理你的服务笔记', route: '/b/services', icon: 'layers' },
  { title: '编辑资料', desc: '修改个人简介和标签', route: '/b/profile/edit', icon: 'edit' },
  { title: '账号设置', desc: '密码、通知、隐私', route: '/b/settings', icon: 'settings' },
];

export default function BProfile() {
  const navigate = useNavigate();

  return (
    <main className="mobile-page">
      <section className="b-profile-hero">
        <div className="b-profile-cover-wrap" onClick={() => navigate('/b/profile/edit')}>
          <img src="/banners/banner1.png" alt="背景" className="b-profile-cover-img" />
          <div className="b-profile-cover-mask" />
        </div>
        <div className="b-profile-hero-content">
          <button className="b-profile-edit-top" onClick={() => navigate('/b/profile/edit')}>
            <Edit3 size={16} />
          </button>
          <div className="b-profile-avatar-wrap" onClick={() => navigate('/b/profile/edit')}>
            <img src="/avatars/avatar1.png" alt="晨光伙伴" />
          </div>
          <h1 className="b-profile-name">晨光伙伴</h1>
          <div className="b-profile-meta-row">
            <span><Clock size={12} /> 26岁</span>
            <span><MapPin size={12} /> 上海</span>
            <span><Briefcase size={12} /> 户外领队</span>
          </div>
          <div className="b-cert-badges">
            {certBadges.map((c) => (
              <span key={c.key} className={`b-cert-badge ${c.verified ? 'verified' : ''}`} style={{ borderColor: c.color, color: c.verified ? c.color : '#C7C7CC', background: c.verified ? `${c.color}15` : 'transparent' }}>
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 服务项目 */}
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

      {/* 技能认证进度 */}
      <section className="b-skill-progress-section">
        <h3>技能认证进度</h3>
        <p className="b-skill-hint">每项技能满10单五星好评即可自动认证</p>
        {skillProgress.map(s => (
          <div key={s.name} className="b-skill-progress-item">
            <div className="b-skill-progress-top">
              <span>{s.name}</span>
              <span className={s.certified ? 'certified' : ''}>
                {s.certified ? '已认证' : `${s.fiveStar}/10单五星`}
              </span>
            </div>
            <div className="b-skill-progress-bar">
              <div className="b-skill-progress-fill" style={{ width: `${Math.min(100, s.fiveStar / 10 * 100)}%`, background: s.certified ? '#10B981' : '#FF7A45' }} />
            </div>
          </div>
        ))}
      </section>

      {/* 数据统计 */}
      <section className="b-profile-stats-section">
        {[
          { icon: Calendar, label: '服务订单', value: '156', color: '#FF7A45' },
          { icon: Star, label: '服务评分', value: '4.9', color: '#F59E0B' },
          { icon: Wallet, label: '总收入', value: '¥28,640', color: '#10B981' },
        ].map((s) => {
          const I = s.icon;
          return (
            <div key={s.label} className="b-stat-item">
              <I size={16} style={{ color: s.color }} />
              <span className="b-stat-val">{s.value}</span>
              <span className="b-stat-lbl">{s.label}</span>
            </div>
          );
        })}
      </section>

      {/* 功能菜单 */}
      <section className="profile-section">
        <div className="menu-list">
          {menuItems.map((item) => (
            <div key={item.title} className="menu-item" onClick={() => navigate(item.route)}>
              <div className="menu-icon"><Layers size={20} /></div>
              <div className="menu-content">
                <span className="menu-label">{item.title}</span>
                <span className="menu-desc">{item.desc}</span>
              </div>
              <ChevronRight size={18} className="menu-arrow" />
            </div>
          ))}
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
"""
profile_path = os.path.join(BASE_DIR, "pages", "b端", "Profile.tsx")
with open(profile_path, "w", encoding="utf-8") as f:
    f.write(profile_content)
print("Rewritten: pages/b端/Profile.tsx")

# 4. Rewrite pages/b端/OrderDetail.tsx
b_order_detail_content = """import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, MessageCircle, CheckCircle, Navigation, Timer, Star, EyeOff } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';

const orderFlowSteps = [
  { key: 'accepted', label: '已接单', desc: '用户订单已确认' },
  { key: 'departed', label: '已出发', desc: '正在前往服务地点' },
  { key: 'arrived', label: '已到达', desc: '已到达指定地点' },
  { key: 'serving', label: '服务中', desc: '正在提供服务' },
  { key: 'extended', label: '已续单', desc: '用户续单30分钟' },
  { key: 'completed', label: '服务结束', desc: '服务已完成' },
  { key: 'reviewed', label: '已评价', desc: '双方已完成评价' },
];

export default function BOrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(2); // 0=接单, 1=出发, 2=到达...
  const [countdown, setCountdown] = useState(3600); // 秒
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const order = {
    id: id || 'ORD001',
    service: '看展同行',
    user: '小光',
    avatar: '/avatars/avatar2.png',
    phone: '13800138000',
    time: '今天 14:30',
    place: '西岸美术馆',
    address: '上海市徐汇区龙腾大道2600号',
    status: '进行中',
    amount: 158,
    duration: '2小时',
    note: '希望能详细讲解展品背后的故事',
  };

  const handleNextStep = () => {
    if (currentStep < orderFlowSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (orderFlowSteps[currentStep + 1].key === 'completed') {
        setShowReview(true);
      }
    }
  };

  const openNavigation = () => {
    const url = `https://uri.amap.com/navigation?to=${encodeURIComponent(order.address)}&mode=car&coordinate=gaode`;
    window.open(url, '_blank');
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const currentFlow = orderFlowSteps[currentStep];

  return (
    <main className="mobile-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/b/orders')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">订单详情</h1>
      </div>

      {/* 订单流程时间轴 */}
      <GlassCard className="order-flow-card">
        <div className="order-flow-steps">
          {orderFlowSteps.map((step, idx) => (
            <div key={step.key} className={`order-flow-step ${idx <= currentStep ? 'active' : ''} ${idx === currentStep ? 'current' : ''}`}>
              <div className="order-flow-dot" />
              <div className="order-flow-info">
                <span className="order-flow-label">{step.label}</span>
                {idx === currentStep && <span className="order-flow-desc">{step.desc}</span>}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* 倒计时（服务中时显示） */}
      {currentFlow.key === 'serving' && (
        <GlassCard className="countdown-card">
          <Timer size={24} style={{ color: '#FF7A45' }} />
          <span className="countdown-time">{formatTime(countdown)}</span>
          <span className="countdown-label">剩余服务时间</span>
        </GlassCard>
      )}

      {/* 用户信息 */}
      <section className="detail-section">
        <h2 className="section-title">用户信息</h2>
        <GlassCard className="partner-mini-card">
          <img src={order.avatar} alt="" className="partner-mini-avatar" />
          <div className="partner-mini-info">
            <span className="partner-mini-name">{order.user}</span>
            <span className="partner-mini-level">预约了{order.service}</span>
          </div>
          <div className="partner-mini-actions">
            <a href={`tel:${order.phone}`} className="mini-action-btn"><Phone size={16} /></a>
            <button className="mini-action-btn" onClick={() => navigate(`/b/chat/1`)}><MessageCircle size={16} /></button>
          </div>
        </GlassCard>
      </section>

      {/* 服务信息 */}
      <section className="detail-section">
        <h2 className="section-title">服务信息</h2>
        <GlassCard className="detail-card">
          <div className="detail-row">
            <span className="detail-label">服务类型</span>
            <span className="detail-value">{order.service}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">服务时长</span>
            <span className="detail-value">{order.duration}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">预约时间</span>
            <span className="detail-value">{order.time}</span>
          </div>
          <div className="detail-row nav-row" onClick={openNavigation}>
            <span className="detail-label">服务地点</span>
            <span className="detail-value nav-value">
              <MapPin size={12} /> {order.place}
              <Navigation size={14} style={{ color: '#3B82F6', marginLeft: 4 }} />
            </span>
          </div>
        </GlassCard>
      </section>

      {/* 费用明细 */}
      <section className="detail-section">
        <h2 className="section-title">费用明细</h2>
        <GlassCard className="detail-card">
          <div className="detail-row">
            <span className="detail-label">服务费用</span>
            <span className="detail-value">¥{order.amount}</span>
          </div>
          <div className="detail-divider" />
          <div className="detail-row total">
            <span className="detail-label">预计收入</span>
            <span className="detail-value" style={{ fontSize: '18px', color: '#10B981', fontWeight: 700 }}>¥{(order.amount * 0.9).toFixed(1)}</span>
          </div>
        </GlassCard>
      </section>

      {/* 操作按钮 */}
      <div className="detail-actions">
        {currentFlow.key === 'accepted' && (
          <PrimaryButton className="full-width" onClick={handleNextStep}>确认出发</PrimaryButton>
        )}
        {currentFlow.key === 'departed' && (
          <>
            <PrimaryButton className="full-width" onClick={handleNextStep}>我已到达</PrimaryButton>
            <button className="btn-outline full-width" onClick={openNavigation}>
              <Navigation size={16} /> 导航到目的地
            </button>
          </>
        )}
        {currentFlow.key === 'arrived' && (
          <PrimaryButton className="full-width" onClick={handleNextStep}>开始服务</PrimaryButton>
        )}
        {currentFlow.key === 'serving' && (
          <>
            <PrimaryButton className="full-width" onClick={handleNextStep}>用户续单</PrimaryButton>
            <button className="btn-outline full-width" onClick={handleNextStep}>服务结束</button>
          </>
        )}
        {currentFlow.key === 'extended' && (
          <PrimaryButton className="full-width" onClick={handleNextStep}>确认结束服务</PrimaryButton>
        )}
      </div>

      {/* 评价弹窗 */}
      {showReview && (
        <div className="review-modal">
          <div className="review-modal-content">
            <h3>服务评价</h3>
            <div className="review-stars">
              {[1,2,3,4,5].map(star => (
                <Star key={star} size={28} fill={star <= rating ? '#F59E0B' : 'none'} color={star <= rating ? '#F59E0B' : '#E5E5EA'} onClick={() => setRating(star)} />
              ))}
            </div>
            <textarea className="review-textarea" rows={3} placeholder="说说这次服务的体验..." value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
            <label className="review-anonymous">
              <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
              <EyeOff size={14} /> 匿名评价
            </label>
            <PrimaryButton onClick={() => { setShowReview(false); setCurrentStep(currentStep + 1); }}>提交评价</PrimaryButton>
          </div>
        </div>
      )}
    </main>
  );
}
"""
b_order_detail_path = os.path.join(BASE_DIR, "pages", "b端", "OrderDetail.tsx")
with open(b_order_detail_path, "w", encoding="utf-8") as f:
    f.write(b_order_detail_content)
print("Rewritten: pages/b端/OrderDetail.tsx")

# 5. Rewrite pages/c端/OrderDetail.tsx
c_order_detail_content = """import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, MessageCircle, CheckCircle, Navigation, Timer, Star, EyeOff, Truck } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';
import { orders } from '../../mock/data';

const orderFlowSteps = [
  { key: 'accepted', label: '已接单', desc: '陪伴师已确认接单' },
  { key: 'departed', label: '已出发', desc: '陪伴师正在前往服务地点' },
  { key: 'arrived', label: '已到达', desc: '陪伴师已到达指定地点' },
  { key: 'serving', label: '服务中', desc: '服务正在进行中' },
  { key: 'extended', label: '已续单', desc: '已续单30分钟' },
  { key: 'completed', label: '服务结束', desc: '服务已完成' },
  { key: 'reviewed', label: '已评价', desc: '双方已完成评价' },
];

export default function COrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const order = orders.find((o: any) => o.service === id) || orders[0];
  const [currentStep, setCurrentStep] = useState(3); // C端视角，默认服务中
  const [countdown, setCountdown] = useState(1800); // 秒
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [showExtend, setShowExtend] = useState(false);

  const handleNextStep = () => {
    if (currentStep < orderFlowSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (orderFlowSteps[currentStep + 1].key === 'completed') {
        setShowReview(true);
      }
    }
  };

  const openNavigation = () => {
    const url = `https://uri.amap.com/navigation?to=${encodeURIComponent(order.place || '上海市徐汇区龙腾大道2600号')}&mode=car&coordinate=gaode`;
    window.open(url, '_blank');
  };

  const callPartner = () => {
    window.location.href = 'tel:13800138000';
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const currentFlow = orderFlowSteps[currentStep];

  return (
    <main className="mobile-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/c/orders')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">订单详情</h1>
      </div>

      {/* 订单流程时间轴 */}
      <GlassCard className="order-flow-card">
        <div className="order-flow-steps">
          {orderFlowSteps.map((step, idx) => (
            <div key={step.key} className={`order-flow-step ${idx <= currentStep ? 'active' : ''} ${idx === currentStep ? 'current' : ''}`}>
              <div className="order-flow-dot" />
              <div className="order-flow-info">
                <span className="order-flow-label">{step.label}</span>
                {idx === currentStep && <span className="order-flow-desc">{step.desc}</span>}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* 倒计时（服务中时显示） */}
      {currentFlow.key === 'serving' && (
        <GlassCard className="countdown-card">
          <Timer size={24} style={{ color: '#FF7A45' }} />
          <span className="countdown-time">{formatTime(countdown)}</span>
          <span className="countdown-label">剩余服务时间</span>
        </GlassCard>
      )}

      {/* 陪伴师信息 */}
      <section className="detail-section">
        <h2 className="section-title">陪伴师</h2>
        <GlassCard className="partner-mini-card" onClick={() => navigate('/c/partner/林夏')}>
          <img src="/avatars/avatar1.png" alt="" className="partner-mini-avatar" />
          <div className="partner-mini-info">
            <span className="partner-mini-name">林夏</span>
            <span className="partner-mini-level">预约了{order.service}</span>
          </div>
          <div className="partner-mini-actions">
            <button className="mini-action-btn" onClick={(e) => { e.stopPropagation(); callPartner(); }}><Phone size={16} /></button>
            <button className="mini-action-btn" onClick={(e) => { e.stopPropagation(); navigate('/c/messages/chat/林夏'); }}><MessageCircle size={16} /></button>
          </div>
        </GlassCard>
      </section>

      {/* 服务信息 */}
      <section className="detail-section">
        <h2 className="section-title">服务信息</h2>
        <GlassCard className="detail-card">
          <div className="detail-row">
            <span className="detail-label">服务类型</span>
            <span className="detail-value">{order.service}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">预约时间</span>
            <span className="detail-value">{order.time}</span>
          </div>
          <div className="detail-row nav-row" onClick={openNavigation}>
            <span className="detail-label">服务地点</span>
            <span className="detail-value nav-value">
              <MapPin size={12} /> {order.place}
              <Navigation size={14} style={{ color: '#3B82F6', marginLeft: 4 }} />
            </span>
          </div>
        </GlassCard>
      </section>

      {/* 费用明细 */}
      <section className="detail-section">
        <h2 className="section-title">费用明细</h2>
        <GlassCard className="detail-card">
          <div className="detail-row">
            <span className="detail-label">服务费用</span>
            <span className="detail-value">¥158</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">平台服务费</span>
            <span className="detail-value">¥15.8</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">优惠券</span>
            <span className="detail-value" style={{ color: '#10B981' }}>-¥20</span>
          </div>
          <div className="detail-divider" />
          <div className="detail-row total">
            <span className="detail-label">实付金额</span>
            <span className="detail-value" style={{ fontSize: '18px', color: 'var(--color-primary)', fontWeight: 700 }}>¥153.8</span>
          </div>
        </GlassCard>
      </section>

      {/* 操作按钮 */}
      <div className="detail-actions">
        {currentFlow.key === 'serving' && (
          <>
            <PrimaryButton className="full-width" onClick={() => setShowExtend(true)}>发起续单</PrimaryButton>
            <button className="btn-outline full-width" onClick={handleNextStep}>结束服务</button>
          </>
        )}
        {currentFlow.key === 'extended' && (
          <PrimaryButton className="full-width" onClick={handleNextStep}>确认结束服务</PrimaryButton>
        )}
        {currentFlow.key === 'completed' && (
          <PrimaryButton className="full-width" onClick={() => setShowReview(true)}>去评价</PrimaryButton>
        )}
      </div>

      {/* 续单弹窗 */}
      {showExtend && (
        <div className="review-modal">
          <div className="review-modal-content">
            <h3>发起续单</h3>
            <p style={{ color: '#8E8E93', marginBottom: 16 }}>确认续单30分钟？费用 ¥79</p>
            <PrimaryButton onClick={() => { setShowExtend(false); setCurrentStep(currentStep + 1); }}>确认续单</PrimaryButton>
            <button className="btn-outline full-width" onClick={() => setShowExtend(false)} style={{ marginTop: 8 }}>取消</button>
          </div>
        </div>
      )}

      {/* 评价弹窗 */}
      {showReview && (
        <div className="review-modal">
          <div className="review-modal-content">
            <h3>服务评价</h3>
            <div className="review-stars">
              {[1,2,3,4,5].map(star => (
                <Star key={star} size={28} fill={star <= rating ? '#F59E0B' : 'none'} color={star <= rating ? '#F59E0B' : '#E5E5EA'} onClick={() => setRating(star)} />
              ))}
            </div>
            <textarea className="review-textarea" rows={3} placeholder="说说这次服务的体验..." value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
            <label className="review-anonymous">
              <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
              <EyeOff size={14} /> 匿名评价
            </label>
            <PrimaryButton onClick={() => { setShowReview(false); setCurrentStep(currentStep + 1); }}>提交评价</PrimaryButton>
          </div>
        </div>
      )}
    </main>
  );
}
"""
c_order_detail_path = os.path.join(BASE_DIR, "pages", "c端", "OrderDetail.tsx")
with open(c_order_detail_path, "w", encoding="utf-8") as f:
    f.write(c_order_detail_content)
print("Rewritten: pages/c端/OrderDetail.tsx")

# 6. Rewrite pages/b端/Settings.tsx
b_settings_content = """import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, Lock, Eye, Moon, ChevronRight, Phone, Smartphone } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function BSettings() {
  const navigate = useNavigate();

  const settingsItems = [
    { title: '通知设置', desc: '订单提醒、消息通知', icon: Bell, route: '/b/settings/notifications' },
    { title: '隐私设置', desc: '谁可以看到我的资料', icon: Eye, route: '/b/settings/privacy' },
    { title: '安全设置', desc: '修改密码、登录管理', icon: Lock, route: '/b/settings/security' },
    { title: '深色模式', desc: '夜间护眼模式', icon: Moon, route: '/b/settings/theme' },
  ];

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/b/profile')}><ChevronLeft size={20} /></button>
        <h1 className="page-title">账号设置</h1>
        <div style={{ width: 32 }} />
      </header>

      {/* 一键呼叫 */}
      <section className="settings-section">
        <div className="one-tap-call-card">
          <div className="one-tap-call-left">
            <Phone size={24} style={{ color: '#FF7A45' }} />
            <div>
              <h3>一键呼叫</h3>
              <p>添加到手机桌面，紧急情况快速联系平台</p>
            </div>
          </div>
          <button className="one-tap-call-btn" onClick={() => alert('长按浏览器菜单 → 添加到主屏幕 → 即可完成一键呼叫快捷方式设置')}>去设置</button>
        </div>
      </section>

      <section className="settings-section">
        <div className="menu-list">
          {settingsItems.map((item) => {
            const Icon = item.icon;
            return (
              <GlassCard key={item.title} className="menu-item" onClick={() => navigate(item.route)}>
                <div className="menu-icon"><Icon size={20} /></div>
                <div className="menu-content">
                  <span className="menu-label">{item.title}</span>
                  <span className="menu-desc">{item.desc}</span>
                </div>
                <ChevronRight size={18} className="menu-arrow" />
              </GlassCard>
            );
          })}
        </div>
      </section>
    </main>
  );
}
"""
b_settings_path = os.path.join(BASE_DIR, "pages", "b端", "Settings.tsx")
with open(b_settings_path, "w", encoding="utf-8") as f:
    f.write(b_settings_content)
print("Rewritten: pages/b端/Settings.tsx")

# 7. Create pages/b端/CertificationPro.tsx
cert_pro_content = """import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Briefcase, Camera, Check } from 'lucide-react';
import PrimaryButton from '../../components/PrimaryButton';

export default function CertificationPro() {
  const navigate = useNavigate();
  const [certName, setCertName] = useState('');
  const [certImage, setCertImage] = useState<string | null>(null);

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/b/profile')}><ChevronLeft size={20} /></button>
        <h1 className="page-title">职业认证</h1>
        <div style={{ width: 32 }} />
      </header>
      <section className="certification-section">
        <div className="certification-header">
          <Briefcase size={40} style={{ color: '#3B82F6' }} />
          <h2>职业认证</h2>
          <p>上传你的职业证书，提升用户信任度</p>
        </div>
        <div className="certification-form">
          <div className="form-group">
            <label>证书名称</label>
            <input type="text" placeholder="如：社会体育指导员证书" value={certName} onChange={(e) => setCertName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>上传证书照片</label>
            <div className={`id-card-item ${certImage ? 'has-image' : ''}`} onClick={() => setCertImage('/certs/pro-cert.png')}>
              {certImage ? <img src={certImage} alt="证书" /> : (
                <div className="upload-placeholder"><Camera size={24} /><span>点击上传证书</span></div>
              )}
            </div>
          </div>
        </div>
        <PrimaryButton onClick={() => navigate('/b/profile')}>提交认证</PrimaryButton>
      </section>
    </main>
  );
}
"""
cert_pro_path = os.path.join(BASE_DIR, "pages", "b端", "CertificationPro.tsx")
with open(cert_pro_path, "w", encoding="utf-8") as f:
    f.write(cert_pro_content)
print("Created: pages/b端/CertificationPro.tsx")

# 8. Modify Dashboard.tsx - quickActions change
dashboard_path = os.path.join(BASE_DIR, "pages", "b端", "Dashboard.tsx")
with open(dashboard_path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    """const quickActions = [
  { title: '抢单大厅', icon: ArrowRight, color: '#FF7A45', badge: 6, route: '/b/grab-hall' },
  { title: '服务笔记', icon: Star, color: '#A855F7', badge: 0, route: '/b/services/new' },
  { title: '盲盒任务', icon: TrendingUp, color: '#3B82F6', badge: 3, route: '/b/blindbox-tasks' },
  { title: '收益中心', icon: Wallet, color: '#10B981', badge: 0, route: '/b/earnings' },
];""",
    """const quickActions = [
  { title: '抢单大厅', icon: ArrowRight, color: '#FF7A45', badge: 6, route: '/b/grab-hall' },
  { title: '盲盒任务', icon: TrendingUp, color: '#3B82F6', badge: 3, route: '/b/blindbox-tasks' },
  { title: '我的消息', icon: MessageCircle, color: '#A855F7', badge: 2, route: '/b/messages' },
  { title: '日程管理', icon: Calendar, color: '#10B981', badge: 0, route: '/b/schedule' },
];"""
)

with open(dashboard_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Modified: pages/b端/Dashboard.tsx")

# 9. Update App.tsx - add imports and routes
app_path = os.path.join(BASE_DIR, "App.tsx")
with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add imports
if "import BMessages from './pages/b端/Messages';" not in content:
    content = content.replace(
        "import BBlindBoxTasks from './pages/b端/BlindBoxTasks';",
        "import BBlindBoxTasks from './pages/b端/BlindBoxTasks';\nimport BMessages from './pages/b端/Messages';\nimport CertificationPro from './pages/b端/CertificationPro';"
    )

# Add routes
if '<Route path="/b/messages" element={<BMessages />} />' not in content:
    content = content.replace(
        '<Route path="/b/blindbox-tasks" element={<BBlindBoxTasks />} />',
        '<Route path="/b/blindbox-tasks" element={<BBlindBoxTasks />} />\n      <Route path="/b/messages" element={<BMessages />} />\n      <Route path="/b/certification/pro" element={<CertificationPro />} />'
    )

with open(app_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Modified: App.tsx")

print("\n所有文件修改完成！")
