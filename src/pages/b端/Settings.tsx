import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, Lock, Eye, Moon, ChevronRight, Phone, Smartphone } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function BSettings() {
  const navigate = useNavigate();

  const settingsItems = [
    { title: '通知设置', desc: '订单提醒、消息通知', icon: Bell, route: '/b/settings/notifications' },
    { title: '隐私设置', desc: '谁可以看到我的资料', icon: Eye, route: '' },
    { title: '安全设置', desc: '修改密码、登录管理', icon: Lock, route: '/b/settings/security' },
    { title: '深色模式', desc: '夜间护眼模式', icon: Moon, route: '' },
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
