import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function SettingsPage() {
  const navigate = useNavigate();
  const items = [
    { label: '账号与安全', route: '/c/settings/security' },
    { label: '隐私设置', route: '/c/settings/privacy' },
    { label: '消息通知', route: '/c/settings/notifications' },
    { label: '清除缓存', route: '' },
    { label: '关于我们', route: '' },
    { label: '退出登录', route: '' },
  ];
  return (
    <main className="mobile-page">
      <header className="publish-header">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h1>设置</h1>
        <div style={{ width: 24 }} />
      </header>
      <section className="list-stack">
        {items.map((item) => (
          <GlassCard key={item.label} className="settings-row" onClick={() => { if (item.route) navigate(item.route); else if (item.label === '清除缓存') alert('缓存已清除'); else if (item.label === '关于我们') alert('光点 v1.0.0'); else if (item.label === '退出登录') { alert('已退出登录'); navigate('/c/login'); } }}>
            <span>{item.label}</span>
            <ChevronRight size={16} color="#8E8E93" />
          </GlassCard>
        ))}
      </section>
    </main>
  );
}
