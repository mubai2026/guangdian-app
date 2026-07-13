import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MessageCircle } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { BTabBar } from '../../components/FloatingTabBar';

const reviewData = [
  { id: 1, user: '小光', avatar: '/avatars/avatar2.png', rating: 5, content: '非常棒的体验，服务很专业，整个过程很愉快！', date: '2024-07-01', service: '看展同行', replied: true, reply: '感谢您的认可，期待下次再约！' },
  { id: 2, user: '阿澈', avatar: '/avatars/avatar3.png', rating: 5, content: '伙伴人很nice，专业又有耐心，下次还会再来。', date: '2024-06-28', service: '咖啡探店', replied: false, reply: '' },
  { id: 3, user: '南希', avatar: '/avatars/avatar4.png', rating: 4, content: '整体体验不错，就是时间有点短，希望能有更长的套餐。', date: '2024-06-25', service: '城市徒步', replied: true, reply: '好的，我们后续会推出更长时间的套餐~' },
  { id: 4, user: '晴天', avatar: '/avatars/avatar5.png', rating: 5, content: '第一次尝试这种服务，本来还有点紧张，结果完全放松下来了。性价比很高，推荐！', date: '2024-06-20', service: '瑜伽课程', replied: false, reply: '' },
  { id: 5, user: '小鹿', avatar: '/avatars/avatar6.png', rating: 5, content: '服务态度很好，过程很愉快，学到了很多东西。', date: '2024-06-15', service: '摄影跟拍', replied: true, reply: '很高兴能帮到你，期待下次合作！' },
  { id: 6, user: '柚子', avatar: '/avatars/avatar7.png', rating: 4, content: '整体还不错，服务很到位，价格也合理。', date: '2024-06-10', service: '健身指导', replied: false, reply: '' },
];

const tabs = ['全部评价', '待回复', '已回复', '好评', '中差评'];

export default function BReviews() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('全部评价');

  const stats = {
    average: 4.9,
    total: 86,
    pending: 3,
  };

  const filteredReviews = reviewData.filter(r => {
    if (activeTab === '待回复') return !r.replied;
    if (activeTab === '已回复') return r.replied;
    if (activeTab === '好评') return r.rating >= 4;
    if (activeTab === '中差评') return r.rating <= 3;
    return true;
  });

  return (
    <main className="mobile-page">
      <div className="b-page-header">
        <button onClick={() => navigate(-1)} style={{ border: 0, background: 'none', cursor: 'pointer', padding: 4 }}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="b-page-title">评价管理</h1>
        <div style={{ width: 28 }} />
      </div>

      <section style={{ padding: '0 16px 16px' }}>
        <GlassCard style={{ padding: 16, marginBottom: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#F59E0B', marginBottom: 4 }}>{stats.average}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 4 }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
            ))}
          </div>
          <div style={{ fontSize: 12, color: '#8E8E93' }}>共 {stats.total} 条评价 · {stats.pending} 条待回复</div>
        </GlassCard>

        <div className="b-order-tabs" style={{ marginBottom: 16 }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`b-order-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredReviews.map((review) => (
            <GlassCard key={review.id} style={{ padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <img src={review.avatar} alt="" style={{ width: 36, height: 36, borderRadius: '50%', marginRight: 10 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{review.user}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />
                    ))}
                    <span style={{ fontSize: 11, color: '#8E8E93', marginLeft: 6 }}>{review.service}</span>
                  </div>
                </div>
                <span style={{ fontSize: 12, color: '#C7C7CC' }}>{review.date}</span>
              </div>
              <p style={{ fontSize: 13, color: '#3C3C43', lineHeight: 1.6, margin: '0 0 10px' }}>{review.content}</p>
              {review.replied && review.reply && (
                <div style={{ background: '#F2F2F7', borderRadius: 8, padding: 10, marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: '#FF7A45', fontWeight: 500, marginBottom: 4 }}>我的回复</div>
                  <p style={{ fontSize: 12, color: '#8E8E93', margin: 0, lineHeight: 1.5 }}>{review.reply}</p>
                </div>
              )}
              {!review.replied && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => {}}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '6px 14px',
                      borderRadius: 14,
                      border: 0,
                      background: '#FF7A45',
                      color: '#fff',
                      fontSize: 12,
                      cursor: 'pointer',
                    }}
                  >
                    <MessageCircle size={12} />
                    回复评价
                  </button>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </section>

      <div style={{ height: 20 }} />
      <BTabBar />
    </main>
  );
}
