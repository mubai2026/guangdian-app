import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MessageCircle, Bell, FileText, ChevronRight, Star, Trash2, MoreVertical } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { BTabBar } from '../../components/FloatingTabBar';

const initialChatList = [
  { id: 1, user: '小光', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user2', lastMsg: '请问明天可以约吗？', time: '14:30', unread: 2, pinned: false },
  { id: 2, user: '阿澈', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user3', lastMsg: '好的，那就世纪公园见', time: '12:15', unread: 0, pinned: true },
  { id: 3, user: '南希', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user4', lastMsg: '服务结束后在哪里评价？', time: '昨天', unread: 1, pinned: false },
];

const initialNotifications = [
  { id: 1, type: 'order', title: '用户指定下单', content: '用户「晴天」指定您提供瑜伽冥想服务，订单号：ORD20250713001', time: '刚刚', urgent: true, read: false, pinned: false },
  { id: 2, type: 'platform', title: '平台公告', content: '本周盲盒任务奖励提升20%，快来参与', time: '10分钟前', urgent: false, read: false, pinned: false },
  { id: 3, type: 'order', title: '订单即将开始', content: '您的「咖啡探店」订单还有30分钟开始，请准时到达', time: '1小时前', urgent: false, read: true, pinned: false },
  { id: 4, type: 'platform', title: '等级提升', content: '恭喜！您已晋升为金牌伙伴，抽成提升至90%', time: '3小时前', urgent: false, read: true, pinned: false },
];

export default function BMessages() {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState(initialChatList);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showChatMenu, setShowChatMenu] = useState<number | null>(null);
  const [showNotifyMenu, setShowNotifyMenu] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifyCollapsed, setNotifyCollapsed] = useState(false);

  const handleChatPin = (id: number) => {
    setChatList(chatList.map(c => c.id === id ? { ...c, pinned: !c.pinned } : c));
    setShowChatMenu(null);
  };

  const handleChatDelete = (id: number) => {
    setChatList(chatList.filter(c => c.id !== id));
    setShowChatMenu(null);
  };

  const handleNotifyPin = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
    setShowNotifyMenu(null);
  };

  const handleNotifyDelete = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    setShowNotifyMenu(null);
  };

  const handleNotifyClick = (item: typeof initialNotifications[0]) => {
    setNotifications(notifications.map(n => n.id === item.id ? { ...n, read: true } : n));
    navigate('/b/messages/system');
  };

  const sortedChats = [...chatList].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return 0;
  });

  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    if (a.read !== b.read) return a.read ? 1 : -1;
    return 0;
  });

  return (
    <main className="mobile-page">
      <header className="messages-header">
        <h1>消息</h1>
        <div className="messages-search">
          <Search size={16} />
          <input placeholder="搜索用户消息..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </header>

      <section className="message-section">
        <div className="section-header" onClick={() => setNotifyCollapsed(!notifyCollapsed)}>
          <h2>平台通知</h2>
          <div className="section-right">
            <span className="section-more" onClick={(e) => { e.stopPropagation(); navigate('/b/messages/system'); }}>查看全部</span>
            <ChevronRight size={16} className={`section-arrow ${notifyCollapsed ? 'rotated' : ''}`} />
          </div>
        </div>
        {!notifyCollapsed && (
          <div className="notification-list">
            {sortedNotifications.map((item) => (
              <GlassCard 
                key={item.id} 
                className={`notification-card ${item.urgent ? 'notification-priority-high' : ''} ${item.read ? 'read' : ''} ${item.pinned ? 'pinned' : ''}`}
                onClick={() => handleNotifyClick(item)}
              >
                <div className="notification-icon" style={{ background: item.type === 'order' ? 'rgba(59,130,246,0.1)' : 'rgba(255,122,69,0.1)' }}>
                  {item.type === 'order' ? <FileText size={16} style={{ color: '#3B82F6' }} /> : <Bell size={16} style={{ color: '#FF7A45' }} />}
                </div>
                <div className="notification-content">
                  <div className="notification-title-row">
                    <h3>{item.title}</h3>
                    {item.pinned && <Star size={14} style={{ color: '#F59E0B', fill: '#F59E0B' }} />}
                  </div>
                  <p>{item.content}</p>
                </div>
                <div className="notification-meta">
                  <span className="notification-time">{item.time}</span>
                  <div className="notification-actions">
                    <button 
                      className="notify-more-btn"
                      onClick={(e) => { e.stopPropagation(); setShowNotifyMenu(showNotifyMenu === item.id ? null : item.id); }}
                    >
                      <MoreVertical size={14} />
                    </button>
                    {showNotifyMenu === item.id && (
                      <div className="notify-menu">
                        <button onClick={(e) => { e.stopPropagation(); handleNotifyPin(item.id); }}>
                          {item.pinned ? '取消置顶' : '置顶'}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleNotifyDelete(item.id); }}>删除</button>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </section>

      <section className="messages-list">
        {sortedChats.map(chat => (
          <GlassCard key={chat.id} className={`message-chat-item ${chat.pinned ? 'pinned' : ''}`}>
            <div className="chat-main" onClick={() => navigate(`/b/chat/${chat.id}`)}>
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
            </div>
            <div className="chat-actions">
              <button className="chat-more-btn" onClick={() => setShowChatMenu(showChatMenu === chat.id ? null : chat.id)}>
                <MoreVertical size={16} />
              </button>
              {showChatMenu === chat.id && (
                <div className="chat-menu">
                  <button onClick={() => handleChatPin(chat.id)}>
                    {chat.pinned ? '取消置顶' : '置顶'}
                  </button>
                  <button onClick={() => handleChatDelete(chat.id)}>删除</button>
                </div>
              )}
            </div>
          </GlassCard>
        ))}
      </section>
      <BTabBar />
    </main>
  );
}
