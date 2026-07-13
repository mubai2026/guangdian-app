import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, MessageSquare, ShoppingBag, Star, Volume2 } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function CSettingsNotifications() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    orderNotify: true,
    messageNotify: true,
    reviewNotify: true,
    systemNotify: true,
    sound: true,
    vibrate: false,
  });

  const toggle = (key: string) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] });
  };

  const items = [
    { key: 'orderNotify', icon: ShoppingBag, label: '订单通知', desc: '预约、接单、取消等' },
    { key: 'messageNotify', icon: MessageSquare, label: '消息通知', desc: '聊天、系统消息' },
    { key: 'reviewNotify', icon: Star, label: '评价通知', desc: '收到评价提醒' },
    { key: 'systemNotify', icon: Bell, label: '系统通知', desc: '活动、优惠、更新' },
    { key: 'sound', icon: Volume2, label: '声音提醒', desc: '新消息声音提示' },
  ];

  return (
    <main className="mobile-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/c/settings')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">通知设置</h1>
      </div>

      <section className="settings-section">
        {items.map((item) => {
          const Icon = item.icon;
          const enabled = settings[item.key as keyof typeof settings];
          return (
            <GlassCard key={item.key} className="settings-item-card">
              <div className="settings-item-left">
                <div className="settings-item-icon">
                  <Icon size={18} />
                </div>
                <div className="settings-item-info">
                  <span className="settings-item-label">{item.label}</span>
                  <span className="settings-item-desc">{item.desc}</span>
                </div>
              </div>
              <button 
                className={`toggle-switch ${enabled ? 'active' : ''}`}
                onClick={() => toggle(item.key)}
              >
                <div className="toggle-thumb" />
              </button>
            </GlassCard>
          );
        })}
      </section>
    </main>
  );
}
