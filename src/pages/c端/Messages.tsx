import { useNavigate } from 'react-router-dom';
import { Bell, FileText, Heart, Eye, ChevronRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { CTabBar } from '../../components/FloatingTabBar';
import { chats } from '../../mock/data';

export default function Messages() {
  const navigate = useNavigate();
  
  const shortcuts = [
    { key: 'system', label: '系统通知', icon: Bell, badge: 1, color: '#FF7A45', priority: 'high' },
    { key: 'orders', label: '订单通知', icon: FileText, badge: 2, color: '#3B82F6', priority: 'high' },
    { key: 'interactions', label: '互动消息', icon: Heart, badge: 0, color: '#EC4899', priority: 'medium' },
    { key: 'views', label: '看过我', icon: Eye, badge: 0, color: '#8B5CF6', priority: 'low' },
  ];

  const systemNotifications = [
    { id: 1, title: '订单即将结束', content: '您的「咖啡探店」订单还有10分钟结束，请及时评价', time: '刚刚', type: 'urgent', priority: 'high' },
    { id: 2, title: '伙伴申请已通过', content: '您现在可以查看订单并接单了', time: '10分钟前', type: 'success', priority: 'high' },
    { id: 3, title: '新人专享福利', content: '首单立减20元，快来体验吧', time: '1小时前', type: 'promotion', priority: 'medium' },
  ];

  // 聊天消息按优先级排序并添加底色
  const chatListWithPriority = chats.filter(c => c.name !== '系统通知' && c.name !== '订单通知').map(c => ({
    ...c,
    priority: c.unread > 0 ? 'high' : 'normal'
  }));

  return (
    <main className="mobile-page">
      {/* 顶部标题 */}
      <div className="page-header">
        <h1>消息</h1>
      </div>

      {/* 消息分类入口 */}
      <section className="message-shortcuts">
        {shortcuts.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.key} className="shortcut-item" onClick={() => navigate(`/c/messages/${s.key}`)}>
              <div className="shortcut-icon" style={{ background: `${s.color}15` }}>
                <Icon size={22} style={{ color: s.color }} />
                {s.badge > 0 && <span className="shortcut-badge">{s.badge}</span>}
              </div>
              <span className="shortcut-label">{s.label}</span>
            </div>
          );
        })}
      </section>

      {/* 系统通知 - 高优先级带底色 */}
      <section className="message-section">
        <div className="section-header">
          <h2>系统通知</h2>
          <span className="section-more" onClick={() => navigate('/c/messages/system')}>查看全部</span>
        </div>
        <div className="notification-list">
          {systemNotifications.map((item) => (
            <GlassCard
              key={item.id}
              className={`notification-card notification-priority-${item.priority}`}
              onClick={() => navigate(`/c/messages/${item.type === 'success' ? 'system' : 'orders'}`)}
            >
              <div className="notification-content">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
              <div className="notification-meta">
                <span className="notification-time">{item.time}</span>
                <ChevronRight size={16} className="notification-arrow" />
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 聊天消息列表 - 未读带底色 */}
      <section className="message-section">
        <div className="section-header">
          <h2>聊天消息</h2>
        </div>
        <div className="chat-list">
          {chatListWithPriority.map((item) => (
            <GlassCard
              key={item.name}
              className={`chat-item chat-priority-${item.priority}`}
              onClick={() => navigate(`/c/messages/chat/${encodeURIComponent(item.name)}`)}
            >
              <div className="chat-avatar">
                <img src={item.avatar} alt={item.name} />
                {item.unread > 0 && <span className="unread-dot" />}
              </div>
              <div className="chat-info">
                <div className="chat-header">
                  <h3>{item.name}</h3>
                  <span className="chat-time">{item.time}</span>
                </div>
                <p className="chat-text">{item.text}</p>
              </div>
              {item.unread > 0 && (
                <span className="unread-badge">{item.unread}</span>
              )}
            </GlassCard>
          ))}
        </div>
      </section>

      <CTabBar />
    </main>
  );
}
