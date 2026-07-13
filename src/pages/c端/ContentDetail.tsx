import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Heart, Share2, Star, MessageCircle, Phone, BadgeCheck, ChevronRight, Clock, Users } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';
import { cards } from '../../mock/data';

export default function ContentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = cards.find((c) => c.id === id);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(128);

  if (!item) return <main className="mobile-page"><button onClick={() => navigate(-1)}><ArrowLeft /></button><p>内容不存在</p></main>;

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <main className="mobile-page" style={{ padding: 0, paddingBottom: 80 }}>
      <div className="content-hero">
        <img src={item.image} alt={item.title} />
        <button className="content-back" onClick={() => navigate(-1)}><ArrowLeft size={24} color="#fff" /></button>
        <div className="content-actions">
          <button onClick={handleLike}>
            <Heart size={22} color="#fff" fill={liked ? '#FF3B30' : 'none'} />
          </button>
          <button><Share2 size={22} color="#fff" /></button>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <h1 style={{ fontSize: 22, margin: '0 0 10px', fontWeight: 700, lineHeight: 1.4 }}>{item.title}</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#8E8E93', fontSize: 13 }}>
            <MapPin size={14} />{item.place}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#8E8E93', fontSize: 13 }}>
            <Heart size={14} />{likeCount}
          </span>
        </div>

        <GlassCard style={{ marginBottom: 16 }} className="content-author-card" onClick={() => navigate(`/c/partner/${item.name}`)}>
          <img src={item.avatar} alt={item.name} className="content-author-avatar" />
          <div className="content-author-info">
            <div className="content-author-name-row">
              <span className="content-author-name">{item.name}</span>
              {item.price > 80 && <BadgeCheck size={14} className="verified-badge" />}
            </div>
            <span className="content-author-desc">{item.category} · 资深从业者</span>
          </div>
          <ChevronRight size={18} style={{ color: '#C7C7CC' }} />
        </GlassCard>

        <div className="content-body">
          <p className="content-text">
            {item.desc}
          </p>
          <p className="content-text">
            大家好，我是{item.name}，从事这个行业已经有5年多的时间了。我相信每一次相遇都是缘分，希望能用我的专业和热情，为你的生活带来一份温暖和美好。
          </p>
          <p className="content-text">
            如果你也对{item.category}感兴趣，或者想找一个志同道合的伙伴一起探索，欢迎随时联系我。我们可以一起聊聊天、看看风景、分享生活中的小确幸。
          </p>

          <div className="content-tags">
            <span className="content-tag">#{item.category}</span>
            <span className="content-tag">#同城搭子</span>
            <span className="content-tag">#品质生活</span>
          </div>
        </div>

        <div className="content-section">
          <h3 className="content-section-title">服务项目</h3>
          <div className="content-service-list">
            <GlassCard className="content-service-item">
              <div className="content-service-info">
                <h4>{item.title}</h4>
                <div className="content-service-meta">
                  <span><Clock size={12} /> 约2小时</span>
                  <span><Users size={12} /> 1v1</span>
                </div>
              </div>
              <div className="content-service-price">
                <span className="price-symbol">¥</span>
                <span className="price-value">{item.price}</span>
                <span className="price-unit">/次</span>
              </div>
            </GlassCard>
          </div>
        </div>

        <div className="content-section">
          <h3 className="content-section-title">用户评价</h3>
          <div className="content-review-list">
            <GlassCard className="content-review-item">
              <div className="review-header">
                <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=review1" alt="" className="review-avatar" />
                <div className="review-user">
                  <span className="review-name">小光</span>
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                </div>
                <span className="review-date">3天前</span>
              </div>
              <p className="review-text">非常棒的体验！{item.name}人很nice，专业又有耐心，整个过程很愉快，下次还会再来～</p>
            </GlassCard>
            <GlassCard className="content-review-item">
              <div className="review-header">
                <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=review2" alt="" className="review-avatar" />
                <div className="review-user">
                  <span className="review-name">晴天</span>
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                </div>
                <span className="review-date">1周前</span>
              </div>
              <p className="review-text">第一次尝试这种服务，本来还有点紧张，结果完全放松下来了。性价比很高，推荐！</p>
            </GlassCard>
          </div>
        </div>
      </div>

      <div className="content-bottom-bar">
        <div className="bottom-bar-left">
          <button className="bar-action-btn" onClick={() => navigate(`/c/messages/chat/${item.name}`)}>
            <MessageCircle size={20} />
            <span>私聊</span>
          </button>
          <button className="bar-action-btn">
            <Phone size={20} />
            <span>电话</span>
          </button>
        </div>
        <div className="bottom-bar-right">
          <div className="bar-price">
            <span className="price-symbol">¥</span>
            <span className="price-value">{item.price}</span>
            <span className="price-unit">/次起</span>
          </div>
          <PrimaryButton onClick={() => navigate(`/c/booking/${item.id}`)} className="bar-book-btn">
            立即预约
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
}
