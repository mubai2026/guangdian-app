import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Heart, MessageCircle, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { BTabBar } from '../../components/FloatingTabBar';

const notesData = [
  { id: 1, title: '周末看展好去处推荐', cover: 'activities/activity1.png', views: 1280, likes: 86, comments: 12, status: '已发布', date: '2024-07-01', service: '看展同行' },
  { id: 2, title: '城市骑行路线分享', cover: 'scenes/scene2.png', views: 856, likes: 52, comments: 8, status: '已发布', date: '2024-06-28', service: '城市骑行' },
  { id: 3, title: '咖啡探店｜藏在巷子里的好店', cover: 'scenes/scene3.png', views: 2100, likes: 128, comments: 24, status: '已发布', date: '2024-06-25', service: '咖啡探店' },
  { id: 4, title: '瑜伽入门小贴士', cover: 'activities/activity2.png', views: 560, likes: 34, comments: 5, status: '审核中', date: '2024-06-20', service: '瑜伽课程' },
  { id: 5, title: '摄影技巧分享｜如何拍出氛围感', cover: 'activities/activity5.png', views: 1560, likes: 98, comments: 18, status: '已发布', date: '2024-06-15', service: '摄影跟拍' },
  { id: 6, title: '徒步装备清单', cover: 'scenes/scene1.png', views: 920, likes: 65, comments: 9, status: '草稿', date: '2024-06-10', service: '户外徒步' },
];

const tabs = ['全部', '已发布', '审核中', '草稿'];

export default function BNotes() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('全部');
  const [moreMenu, setMoreMenu] = useState<number | null>(null);

  const filteredNotes = notesData.filter(n => {
    if (activeTab === '已发布') return n.status === '已发布';
    if (activeTab === '审核中') return n.status === '审核中';
    if (activeTab === '草稿') return n.status === '草稿';
    return true;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '已发布': return { bg: 'rgba(16,185,129,0.1)', color: '#10B981' };
      case '审核中': return { bg: 'rgba(245,158,11,0.1)', color: '#F59E0B' };
      case '草稿': return { bg: 'rgba(142,142,147,0.1)', color: '#8E8E93' };
      default: return { bg: '#f5f5f5', color: '#8E8E93' };
    }
  };

  return (
    <main className="mobile-page">
      <div className="b-page-header">
        <h1 className="b-page-title">我的笔记</h1>
        <button className="b-page-action" onClick={() => navigate('/b/publish-note')}>
          <Plus size={18} />
        </button>
      </div>

      <section style={{ padding: '0 16px 16px' }}>
        <div className="b-order-tabs" style={{ marginBottom: 16 }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`b-order-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              <span className="b-tab-count">
                {tab === '全部' ? notesData.length : notesData.filter(n => {
                  if (tab === '已发布') return n.status === '已发布';
                  if (tab === '审核中') return n.status === '审核中';
                  if (tab === '草稿') return n.status === '草稿';
                  return false;
                }).length}
              </span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredNotes.map((note) => (
            <GlassCard key={note.id} style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', position: 'relative' }}>
                <img src={note.cover} alt="" style={{ width: 100, height: 100, objectFit: 'cover' }} />
                <div style={{ flex: 1, padding: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 500, margin: 0, lineHeight: 1.4, flex: 1, marginRight: 8 }}>{note.title}</h3>
                    <button
                      onClick={(e) => { e.stopPropagation(); setMoreMenu(moreMenu === note.id ? null : note.id); }}
                      style={{ border: 0, background: 'none', cursor: 'pointer', padding: 4 }}
                    >
                      <MoreHorizontal size={16} color="#8E8E93" />
                    </button>
                  </div>
                  <div style={{ fontSize: 12, color: '#8E8E93', marginBottom: 6 }}>关联服务：{note.service}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#8E8E93' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Eye size={12} />{note.views}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Heart size={12} />{note.likes}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <MessageCircle size={12} />{note.comments}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: getStatusStyle(note.status).bg, color: getStatusStyle(note.status).color }}>
                      {note.status}
                    </span>
                    <span style={{ fontSize: 11, color: '#C7C7CC' }}>{note.date}</span>
                  </div>
                </div>
                {moreMenu === note.id && (
                  <div style={{
                    position: 'absolute',
                    top: 32,
                    right: 8,
                    background: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    zIndex: 10,
                    overflow: 'hidden',
                  }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', border: 0, background: 'none', cursor: 'pointer', fontSize: 13, whiteSpace: 'nowrap' }}
                      onClick={() => navigate(`/b/publish-note?edit=${note.id}`)}>
                      <Edit size={14} />编辑
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', border: 0, background: 'none', cursor: 'pointer', fontSize: 13, color: '#EF4444', whiteSpace: 'nowrap' }}>
                      <Trash2 size={14} />删除
                    </button>
                  </div>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <div style={{ height: 20 }} />
      <BTabBar />
    </main>
  );
}
