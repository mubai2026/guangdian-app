import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ThumbsUp } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { peers } from '../../mock/data';

const allReviews = [
  { id: 1, user: '小光', avatar: '/avatars/avatar2.png', rating: 5, text: '非常棒的体验，服务很专业，整个过程很愉快！', date: '2024-07-01', service: '看展同行', helpful: 12, images: [] },
  { id: 2, user: '阿澈', avatar: '/avatars/avatar3.png', rating: 5, text: '伙伴人很nice，专业又有耐心，下次还会再来。', date: '2024-06-28', service: '咖啡探店', helpful: 8, images: [] },
  { id: 3, user: '南希', avatar: '/avatars/avatar4.png', rating: 4, text: '整体体验不错，就是时间有点短，希望能有更长的套餐。', date: '2024-06-25', service: '城市徒步', helpful: 5, images: [] },
  { id: 4, user: '晴天', avatar: '/avatars/avatar5.png', rating: 5, text: '第一次尝试这种服务，本来还有点紧张，结果完全放松下来了。性价比很高，推荐！', date: '2024-06-20', service: '瑜伽课程', helpful: 15, images: [] },
  { id: 5, user: '小鹿', avatar: '/avatars/avatar6.png', rating: 5, text: '服务态度很好，过程很愉快，学到了很多东西。', date: '2024-06-15', service: '摄影跟拍', helpful: 7, images: [] },
  { id: 6, user: '柚子', avatar: '/avatars/avatar7.png', rating: 4, text: '整体还不错，服务很到位，价格也合理。', date: '2024-06-10', service: '健身指导', helpful: 4, images: [] },
  { id: 7, user: '小雨', avatar: '/avatars/avatar8.png', rating: 5, text: '超出预期的体验，伙伴很专业，聊得也很开心！', date: '2024-06-05', service: '英语学习', helpful: 10, images: [] },
  { id: 8, user: '星辰', avatar: '/avatars/avatar1.png', rating: 5, text: '已经是第三次预约了，每次都很满意，强烈推荐！', date: '2024-06-01', service: '看展同行', helpful: 20, images: [] },
];

const filterTabs = ['全部', '好评', '中评', '差评', '有图'];

export default function ReviewList() {
  const { partnerId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('全部');
  const [helpfulMap, setHelpfulMap] = useState<Record<number, boolean>>({});

  const peer = peers.find(p => p.name === partnerId) || peers[0];

  const stats = {
    average: 4.9,
    total: 86,
    fiveStar: 80,
    fourStar: 15,
    threeStar: 3,
    twoStar: 1,
    oneStar: 1,
  };

  const toggleHelpful = (id: number) => {
    setHelpfulMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredReviews = allReviews;

  return (
    <main className="mobile-page">
      <header style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #F2F2F7' }}>
        <button onClick={() => navigate(-1)} style={{ border: 0, background: 'none', cursor: 'pointer', padding: 4 }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 600, margin: 0 }}>用户评价</h1>
        <div style={{ width: 32 }} />
      </header>

      <div style={{ padding: 16 }}>
        <GlassCard style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#F59E0B' }}>{stats.average}</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 4 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <div style={{ fontSize: 12, color: '#8E8E93', marginTop: 4 }}>共{stats.total}条评价</div>
            </div>
            <div style={{ flex: 1 }}>
              {[
                { star: 5, count: stats.fiveStar, percent: 80 },
                { star: 4, count: stats.fourStar, percent: 15 },
                { star: 3, count: stats.threeStar, percent: 3 },
                { star: 2, count: stats.twoStar, percent: 1 },
                { star: 1, count: stats.oneStar, percent: 1 },
              ].map((item) => (
                <div key={item.star} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: '#8E8E93', width: 20 }}>{item.star}星</span>
                  <div style={{ flex: 1, height: 6, background: '#F2F2F7', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${item.percent}%`, height: '100%', background: '#F59E0B', borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 12, color: '#8E8E93', width: 30, textAlign: 'right' }}>{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 14px',
                borderRadius: 16,
                border: 0,
                fontSize: 13,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                background: activeTab === tab ? '#FF7A45' : '#F2F2F7',
                color: activeTab === tab ? '#fff' : '#8E8E93',
                fontWeight: activeTab === tab ? 600 : 400,
              }}
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
              <p style={{ fontSize: 13, color: '#3C3C43', lineHeight: 1.6, margin: 0 }}>{review.text}</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <button
                  onClick={() => toggleHelpful(review.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '4px 10px',
                    borderRadius: 12,
                    border: 0,
                    fontSize: 12,
                    cursor: 'pointer',
                    background: helpfulMap[review.id] ? 'rgba(255,122,69,0.1)' : '#F2F2F7',
                    color: helpfulMap[review.id] ? '#FF7A45' : '#8E8E93',
                  }}
                >
                  <ThumbsUp size={12} />
                  <span>有用 {review.helpful + (helpfulMap[review.id] ? 1 : 0)}</span>
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </main>
  );
}
