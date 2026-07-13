import { CalendarCheck, Compass, Home, MessageCircle, Plus, UserRound, WalletCards } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

export function CTabBar() {
  const navigate = useNavigate();
  const items = [
    { to: '/c/home', label: '首页', icon: Home },
    { to: '/c/discover', label: '发现', icon: Compass },
    { to: '/c/publish', label: '', icon: Plus, publish: true },
    { to: '/c/messages', label: '消息', icon: MessageCircle },
    { to: '/c/profile', label: '我的', icon: UserRound },
  ];
  return <TabBar items={items} />;
}

export function BTabBar() {
  const items = [
    { to: '/b/dashboard', label: '工作台', icon: Home },
    { to: '/b/orders', label: '订单', icon: CalendarCheck },
    { to: '/b/publish-note', label: '', icon: Plus, publish: true },
    { to: '/b/messages', label: '消息', icon: MessageCircle, badge: 3 },
    { to: '/b/profile', label: '我的', icon: UserRound },
  ];
  return <TabBar items={items} />;
}

function TabBar({ items }: { items: { to: string; label: string; icon: React.ElementType; publish?: boolean; badge?: number }[] }) {
  const navigate = useNavigate();
  return (
    <nav className="floating-tab-bar">
      {items.map((item) => {
        const Icon = item.icon;
        if (item.publish) {
          return (
            <button key={item.to} className="publish-btn" onClick={() => navigate(item.to)}>
              <div className="publish-icon-wrapper"><Icon size={24} color="#fff" /></div>
            </button>
          );
        }
        return (
          <NavLink to={item.to} key={item.to} className="tab-item">
            <div className="tab-icon-wrap">
              <Icon size={20} />
              {item.badge && item.badge > 0 && <span className="tab-badge">{item.badge}</span>}
            </div>
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
