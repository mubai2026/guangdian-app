import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ThumbsUp, MessageSquare } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function MyReviews() {
  const navigate = useNavigate();
  const reviews = [
    {
      id: 1,
      service: '看展同行',
      partner: '林夏',
      partnerAvatar: '/avatars/avatar1.png',
      rating: 5,
      text: '非常愉快的体验，林夏很专业！对展品的讲解很深入，拍照技术也很棒，下次还会再约～',
      date: '2026-07-01',
      tags: ['讲解专业', '拍照好看', '准时守约'],
      likes: 12,
      images: ['/activities/activity1.png', '/activities/activity2.png'],
    },
    {
      id: 2,
      service: '咖啡探店',
      partner: '阿澈',
      partnerAvatar: '/avatars/avatar2.png',
      rating: 4,
      text: '推荐的咖啡店很有特色，环境安静适合聊天。老板人也很好，下次还想去～',
      date: '2026-06-28',
      tags: ['推荐用心', '氛围好'],
      likes: 8,
      images: ['/activities/activity3.png'],
    },
    {
      id: 3,
      service: '晨跑搭子',
      partner: '南希',
      partnerAvatar: '/avatars/avatar3.png',
      rating: 5,
      text: '南希真的很专业，跑步节奏把控得很好，还教了我很多热身和拉伸的动作，收获满满！',
      date: '2026-06-20',
      tags: ['专业负责', '节奏好', '很有耐心'],
      likes: 24,
      images: [],
    },
  ];

  return (
    <main className="mobile-page">
      <header className="publish-header">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h1>我的评价</h1>
        <div style={{ width: 24 }} />
      </header>

      {/* 评价统计概览 */}
      <div className="reviews-overview">
        <div className="reviews-overview-left">
          <span className="reviews-overview-score">4.8</span>
          <div className="reviews-overview-stars">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />
            ))}
          </div>
          <span className="reviews-overview-count">{reviews.length}条评价</span>
        </div>
        <div className="reviews-overview-right">
          <div className="review-stat-row">
            <span className="review-stat-label">好评率</span>
            <span className="review-stat-value">98%</span>
          </div>
          <div className="review-stat-row">
            <span className="review-stat-label">有图评价</span>
            <span className="review-stat-value">{reviews.filter(r => r.images.length > 0).length}条</span>
          </div>
        </div>
      </div>

      {/* 评价列表 */}
      <section className="reviews-list">
        {reviews.map((r) => (
          <GlassCard key={r.id} className="review-card-v2">
            {/* 顶部：服务+伙伴信息 */}
            <div className="review-top">
              <div className="review-partner">
                <img src={r.partnerAvatar} alt="" />
                <div className="review-partner-info">
                  <span className="review-partner-name">{r.partner}</span>
                  <span className="review-service-tag">{r.service}</span>
                </div>
              </div>
              <span className="review-date">{r.date}</span>
            </div>

            {/* 评分 */}
            <div className="review-rating-row">
              <div className="review-stars">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={16} fill={i <= r.rating ? '#F59E0B' : 'none'} color={i <= r.rating ? '#F59E0B' : '#E5E7EB'} />
                ))}
              </div>
              <span className="review-score">{r.rating}.0</span>
            </div>

            {/* 标签 */}
            <div className="review-tags">
              {r.tags.map(tag => (
                <span key={tag} className="review-tag">{tag}</span>
              ))}
            </div>

            {/* 评价内容 */}
            <p className="review-text">{r.text}</p>

            {/* 图片 */}
            {r.images.length > 0 && (
              <div className="review-images">
                {r.images.map((img, i) => (
                  <img key={i} src={img} alt="" className="review-image" />
                ))}
              </div>
            )}

            {/* 底部操作 */}
            <div className="review-footer">
              <button className="review-action">
                <ThumbsUp size={14} /> {r.likes}
              </button>
              <button className="review-action">
                <MessageSquare size={14} /> 回复
              </button>
            </div>
          </GlassCard>
        ))}
      </section>
    </main>
  );
}
