import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, FileText, Star, Trash2, Filter, ChevronRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { BTabBar } from '../../components/FloatingTabBar';

const notifications = [
  { id: 1, type: 'order', title: '用户指定下单', content: '用户「晴天」指定您提供瑜伽冥想服务，订单号：ORD20250713001', time: '刚刚', urgent: true, read: false, pinned: false },
  { id: 2, type: 'platform', title: '平台公告', content: '本周盲盒任务奖励提升20%，快来参与', time: '10分钟前', urgent: false, read: false, pinned: false },
  { id: 3, type: 'order', title: '订单即将开始', content: '您的「咖啡探店」订单还有30分钟开始，请准时到达', time: '1小时前', urgent: false, read: true, pinned: false },
  { id: 4, type: 'platform', title: '等级提升', content: '恭喜！您已晋升为金牌伙伴，抽成提升至90%', time: '3小时前', urgent: false, read: true, pinned: false },
  { id: 5, type: 'order', title: '订单完成通知', content: '您的「城市徒步」订单已完成，等待用户评价', time: '昨天', urgent: false, read: true, pinned: false },
  { id: 6, type: 'platform', title: '规则更新', content: '服务协议已更新，请及时查看', time: '昨天', urgent: false, read: true, pinned: false },
  { id: 7, type: 'order', title: '用户评价', content: '用户「小光」对您的服务给出了5星好评！', time: '2天前', urgent: false, read: true, pinned: false },
];

export default function SystemNotifications() {
  const navigate = useNavigate();
  const [notifyList, setNotifyList] = useState(notifications);
  const [filterType, setFilterType] = useState('all');

  const handlePin = (id: number) => {
    setNotifyList(notifyList.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  const handleDelete = (id: number) => {
    setNotifyList(notifyList.filter(n => n.id !== id));
  };

  const handleRead = (id: number) => {
    setNotifyList(notifyList.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filtered = notifyList.filter(n => {
    if (filterType === 'all') return true;
    if (filterType === 'order') return n.type === 'order';
    if (filterType === 'platform') return n.type === 'platform';
    if (filterType === 'unread') return !n.read;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    if (a.read !== b.read) return a.read ? 1 : -1;
    return 0;
  });

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/b/messages')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">平台通知</h1>
        <button className="header-action-btn" onClick={() => setNotifyList(notifyList.map(n => ({ ...n, read: true })))}>
          全部已读
        </button>
      </header>

      <div className="notification-filter-bar">
        {[
          { key: 'all', label: '全部' },
          { key: 'order', label: '订单通知' },
          { key: 'platform', label: '平台公告' },
          { key: 'unread', label: '未读' },
        ].map(item => (
          <button
            key={item.key}
            className={`filter-tab ${filterType === item.key ? 'active' : ''}`}
            onClick={() => setFilterType(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="notification-detail-list">
        {sorted.map((item) => (
          <GlassCard
            key={item.id}
            className={`notification-detail-card ${item.read ? 'read' : ''} ${item.pinned ? 'pinned' : ''}`}
            onClick={() => handleRead(item.id)}
          >
            <div className="notification-detail-left">
              <div className="notification-detail-icon" style={{ background: item.type === 'order' ? 'rgba(59,130,246,0.1)' : 'rgba(255,122,69,0.1)' }}>
                {item.type === 'order' ? <FileText size={18} style={{ color: '#3B82F6' }} /> : <Bell size={18} style={{ color: '#FF7A45' }} />}
              </div>
            </div>
            <div className="notification-detail-content">
              <div className="notification-detail-title-row">
                <h3>{item.title}</h3>
                <span className="notification-detail-time">{item.time}</span>
              </div>
              <p>{item.content}</p>
              <div className="notification-detail-tags">
                {item.type === 'order' && <span className="tag-order">订单相关</span>}
                {item.type === 'platform' && <span className="tag-platform">平台公告</span>}
                {item.urgent && <span className="tag-urgent">紧急</span>}
              </div>
            </div>
            <div className="notification-detail-actions">
              <button className="detail-action-btn" onClick={(e) => { e.stopPropagation(); handlePin(item.id); }}>
                <Star size={16} style={{ color: item.pinned ? '#F59E0B' : '#C7C7CC', fill: item.pinned ? '#F59E0B' : 'none' }} />
              </button>
              <button className="detail-action-btn" onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}>
                <Trash2 size={16} style={{ color: '#EF4444' }} />
              </button>
              <ChevronRight size={16} style={{ color: '#C7C7CC' }} />
            </div>
          </GlassCard>
        ))}
      </div>

      <BTabBar />
    </main>
  );
}
