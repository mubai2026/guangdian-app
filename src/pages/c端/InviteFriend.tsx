import { useState } from 'react';
import { ArrowLeft, Copy, Check, Gift, Users, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../components/GlassCard';

export default function InviteFriend() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [invitedCount, setInvitedCount] = useState(3);
  const [showSuccess, setShowSuccess] = useState(false);

  const inviteCode = '123456';
  const inviteLink = `http://guangdian.com/invite?code=${inviteCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mockInviteSuccess = () => {
    setInvitedCount(invitedCount + 1);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const benefits = [
    { icon: Gift, title: '新用户奖励', desc: '新用户注册即得10积分' },
    { icon: Users, title: '邀请奖励', desc: '好友完成首单，你得20积分' },
    { icon: Sparkles, title: '校园达人', desc: '邀请满10人解锁专属称号' },
  ];

  return (
    <main className="mobile-page">
      <header className="publish-header">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h1>邀请好友</h1>
        <div style={{ width: 24 }} />
      </header>

      {/* 邀请统计 */}
      <GlassCard className="invite-stat-card">
        <div className="invite-stat-left">
          <div className="invite-stat-icon" style={{ background: 'rgba(255,122,69,0.1)' }}>
            <Users size={24} style={{ color: '#FF7A45' }} />
          </div>
          <div className="invite-stat-info">
            <span className="invite-stat-value">{invitedCount}</span>
            <span className="invite-stat-label">已邀请好友</span>
          </div>
        </div>
        <div className="invite-stat-right">
          <span className="invite-stat-title">邀请码</span>
          <span className="invite-stat-code">{inviteCode}</span>
        </div>
      </GlassCard>

      {/* 邀请链接 */}
      <GlassCard className="invite-link-card">
        <h3 className="invite-link-title">分享你的专属邀请链接</h3>
        <div className="invite-link-content">
          <span className="invite-link-text">{inviteLink}</span>
          <button 
            className={`invite-link-copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? '已复制' : '复制'}</span>
          </button>
        </div>
      </GlassCard>

      {/* 邀请奖励 */}
      <section className="invite-benefits">
        <h3 className="invite-benefits-title">邀请奖励</h3>
        <div className="invite-benefits-list">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <GlassCard key={idx} className="invite-benefit-card">
                <div className="invite-benefit-icon" style={{ background: 'rgba(255,122,69,0.1)' }}>
                  <Icon size={18} style={{ color: '#FF7A45' }} />
                </div>
                <div className="invite-benefit-info">
                  <span className="invite-benefit-title">{benefit.title}</span>
                  <span className="invite-benefit-desc">{benefit.desc}</span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 模拟邀请按钮 */}
      <div className="invite-action">
        <button className="invite-simulate-btn" onClick={mockInviteSuccess}>
          模拟邀请成功（演示）
        </button>
      </div>

      {/* 邀请成功提示 */}
      {showSuccess && (
        <div className="invite-success-overlay">
          <div className="invite-success-modal">
            <div className="invite-success-icon">
              <Check size={48} style={{ color: '#10B981' }} />
            </div>
            <h3>邀请成功</h3>
            <p>好友完成首单后，你将获得20积分</p>
          </div>
        </div>
      )}
    </main>
  );
}
