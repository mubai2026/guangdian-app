import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell } from 'lucide-react';

export default function BSettingsNotifications() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    orderNotify: true,
    messageNotify: true,
    reviewNotify: true,
    systemNotify: false,
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof settings] }));
  };

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/b/settings')}>
          <ChevronLeft size={20} />
        </button>
        <h1 className="page-title">通知设置</h1>
        <div style={{ width: 32 }} />
      </header>

      <section className="settings-list">
        {[
          { key: 'orderNotify', title: '订单通知', desc: '新订单、订单状态变更提醒' },
          { key: 'messageNotify', title: '消息通知', desc: '用户咨询、聊天消息提醒' },
          { key: 'reviewNotify', title: '评价通知', desc: '用户评价、好评提醒' },
          { key: 'systemNotify', title: '系统通知', desc: '平台公告、活动通知' },
        ].map((item) => (
          <div key={item.key} className="setting-item">
            <div className="setting-content">
              <span className="setting-title">{item.title}</span>
              <span className="setting-desc">{item.desc}</span>
            </div>
            <div
              className={`toggle-switch ${settings[item.key as keyof typeof settings] ? 'on' : 'off'}`}
              onClick={() => toggleSetting(item.key)}
            >
              <div className="toggle-ball" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
