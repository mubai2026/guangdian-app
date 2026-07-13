import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Smartphone, Mail, Key, Fingerprint } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function CSettingsSecurity() {
  const navigate = useNavigate();

  const items = [
    { icon: Smartphone, label: '手机号', desc: '138****8888', status: '已绑定', action: '更换' },
    { icon: Mail, label: '邮箱', desc: '未绑定', status: '', action: '绑定' },
    { icon: Key, label: '登录密码', desc: '建议定期更换', status: '已设置', action: '修改' },
    { icon: Fingerprint, label: '指纹/面容登录', desc: '快速安全登录', status: '未开启', action: '开启' },
    { icon: Shield, label: '实名认证', desc: '已认证', status: '', action: '查看' },
  ];

  return (
    <main className="mobile-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/c/settings')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">账户安全</h1>
      </div>

      <section className="settings-section">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <GlassCard key={idx} className="settings-item-card">
              <div className="settings-item-left">
                <div className="settings-item-icon">
                  <Icon size={18} />
                </div>
                <div className="settings-item-info">
                  <span className="settings-item-label">{item.label}</span>
                  <span className="settings-item-desc">{item.desc}</span>
                </div>
              </div>
              <div className="settings-item-right">
                {item.status && <span className="settings-item-status">{item.status}</span>}
                <span className="settings-item-action">{item.action}</span>
              </div>
            </GlassCard>
          );
        })}
      </section>
    </main>
  );
}
