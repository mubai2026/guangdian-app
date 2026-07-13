import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Lock, UserX, Shield } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function CSettingsPrivacy() {
  const navigate = useNavigate();

  const items = [
    { icon: Eye, label: '个人资料可见', desc: '所有人可见', action: '修改' },
    { icon: EyeOff, label: '在线状态', desc: '对关注者可见', action: '修改' },
    { icon: Lock, label: '手机号查找', desc: '已开启', action: '关闭' },
    { icon: UserX, label: '黑名单', desc: '0人', route: '/c/settings/blacklist' },
    { icon: Shield, label: '个人信息收集清单', desc: '', action: '查看' },
  ];

  return (
    <main className="mobile-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/c/settings')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">隐私设置</h1>
      </div>

      <section className="settings-section">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <GlassCard key={idx} className="settings-item-card" onClick={() => item.route && navigate(item.route)}>
              <div className="settings-item-left">
                <div className="settings-item-icon">
                  <Icon size={18} />
                </div>
                <div className="settings-item-info">
                  <span className="settings-item-label">{item.label}</span>
                  {item.desc && <span className="settings-item-desc">{item.desc}</span>}
                </div>
              </div>
              <span className="settings-item-action">{item.action || '>'}</span>
            </GlassCard>
          );
        })}
      </section>
    </main>
  );
}
