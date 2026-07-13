import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Heart, Share2, Star, MessageCircle, Phone, BadgeCheck, Clock, Users, ChevronRight, Shield } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';
import { peers, cards } from '../../mock/data';

const serviceReviews = [
  { user: '小光', avatar: '/avatars/avatar2.png', rating: 5, text: '非常棒的体验，服务很专业，整个过程很愉快！', date: '2024-07-01', images: [] },
  { user: '阿澈', avatar: '/avatars/avatar3.png', rating: 5, text: '伙伴人很nice，专业又有耐心，下次还会再来。', date: '2024-06-28', images: [] },
  { user: '南希', avatar: '/avatars/avatar4.png', rating: 4, text: '整体体验不错，就是时间有点短，希望能有更长的套餐。', date: '2024-06-25', images: [] },
  { user: '晴天', avatar: '/avatars/avatar5.png', rating: 5, text: '第一次尝试这种服务，本来还有点紧张，结果完全放松下来了。性价比很高，推荐！', date: '2024-06-20', images: [] },
  { user: '小鹿', avatar: '/avatars/avatar6.png', rating: 5, text: '服务态度很好，过程很愉快，学到了很多东西。', date: '2024-06-15', images: [] },
];

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const peer = peers[0];
  const card = cards.find(c => c.id === id) || cards[0];

  const serviceInfo = {
    name: card.title,
    price: card.price,
    duration: '2小时',
    category: card.category,
    description: card.desc,
    cover: card.image,
  };

  return (
    <main className="mobile-page" style={{ padding: 0, paddingBottom: 80 }}>
      <div className="content-hero">
        <img src={serviceInfo.cover} alt={serviceInfo.name} />
        <button className="content-back" onClick={() => navigate(-1)}><ArrowLeft size={24} color="#fff" /></button>
        <div className="content-actions">
          <button onClick={() => setLiked(!liked)}>
            <Heart size={22} color="#fff" fill={liked ? '#FF3B30' : 'none'} />
          </button>
          <button><Share2 size={22} color="#fff" /></button>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.4, margin: '0 0 10px' }}>{serviceInfo.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#8E8E93', fontSize: 13 }}>
              <Clock size={14} /> {serviceInfo.duration}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#8E8E93', fontSize: 13 }}>
              <MapPin size={14} /> {card.place}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#8E8E93', fontSize: 13 }}>
              <Users size={14} /> 1v1服务
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#FF7A45' }}>
            <span style={{ fontSize: 16 }}>¥</span>
            {serviceInfo.price}
            <span style={{ fontSize: 14, color: '#8E8E93', fontWeight: 400 }}>/次</span>
          </div>
          <span style={{ fontSize: 12, color: '#8E8E93' }}>2小时起订</span>
        </div>

        <GlassCard style={{ marginBottom: 16 }} className="content-author-card" onClick={() => navigate(`/c/partner/${peer.name}`)}>
          <img src={peer.avatar} alt={peer.name} className="content-author-avatar" />
          <div className="content-author-info">
            <div className="content-author-name-row">
              <span className="content-author-name">{peer.name}</span>
              <BadgeCheck size={14} className="verified-badge" />
            </div>
            <span className="content-author-desc">{peer.job} · 资深从业者</span>
          </div>
          <ChevronRight size={18} style={{ color: '#C7C7CC' }} />
        </GlassCard>

        <div className="content-section">
          <h3 className="content-section-title">服务介绍</h3>
          <div className="content-body">
            <p className="content-text">{serviceInfo.description}</p>
            <p className="content-text">
              大家好，我是{peer.name}，从事{serviceInfo.category}相关服务已经有5年多的时间了。
              我相信每一次相遇都是缘分，希望能用我的专业和热情，为你的生活带来一份温暖和美好。
            </p>
            <p className="content-text">
              如果你也对{serviceInfo.category}感兴趣，或者想找一个志同道合的伙伴一起探索，欢迎随时预约我的服务。
              我们可以一起聊聊天、看看风景、分享生活中的小确幸。
            </p>
          </div>
        </div>

        <div className="content-section">
          <h3 className="content-section-title">服务保障</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            <GlassCard style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={18} style={{ color: '#10B981' }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>实名认证</div>
                <div style={{ fontSize: 11, color: '#8E8E93' }}>身份信息已验证</div>
              </div>
            </GlassCard>
            <GlassCard style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BadgeCheck size={18} style={{ color: '#3B82F6' }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>真人认证</div>
                <div style={{ fontSize: 11, color: '#8E8E93' }}>照片本人验证</div>
              </div>
            </GlassCard>
            <GlassCard style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(168,85,247,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star size={18} style={{ color: '#A855F7' }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>技能认证</div>
                <div style={{ fontSize: 11, color: '#8E8E93' }}>专业技能认证</div>
              </div>
            </GlassCard>
            <GlassCard style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={18} style={{ color: '#F59E0B' }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>准时守约</div>
                <div style={{ fontSize: 11, color: '#8E8E93' }}>迟到免单保障</div>
              </div>
            </GlassCard>
          </div>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h3 className="content-section-title">用户评价</h3>
            <span className="section-more" onClick={() => navigate(`/c/reviews/${peer.name}`)}>查看全部</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#F59E0B' }}>4.9</div>
              <div style={{ fontSize: 12, color: '#8E8E93' }}>综合评分</div>
            </div>
            <div style={{ flex: 1 }}>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: '#8E8E93', width: 20 }}>{star}星</span>
                  <div style={{ flex: 1, height: 6, background: '#F2F2F7', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : star === 3 ? '3%' : '1%', height: '100%', background: '#F59E0B', borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 12, color: '#8E8E93', width: 30, textAlign: 'right' }}>{star === 5 ? '80%' : star === 4 ? '15%' : star === 3 ? '3%' : '1%'}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="content-review-list">
            {serviceReviews.slice(0, 3).map((review, idx) => (
              <GlassCard key={idx} className="content-review-item">
                <div className="review-header">
                  <img src={review.avatar} alt="" className="review-avatar" />
                  <div className="review-user">
                    <span className="review-name">{review.user}</span>
                    <div className="review-rating">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>
                  </div>
                  <span className="review-date">{review.date}</span>
                </div>
                <p className="review-text">{review.text}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      <div className="content-bottom-bar">
        <div className="bottom-bar-left">
          <button className="bar-action-btn" onClick={() => navigate(`/c/messages/chat/${peer.name}`)}>
            <MessageCircle size={20} />
            <span>咨询</span>
          </button>
          <button className="bar-action-btn">
            <Phone size={20} />
            <span>电话</span>
          </button>
        </div>
        <div className="bottom-bar-right">
          <div className="bar-price">
            <span className="price-symbol">¥</span>
            <span className="price-value">{serviceInfo.price}</span>
            <span className="price-unit">/次</span>
          </div>
          <PrimaryButton onClick={() => navigate(`/c/booking/${id}`)} className="bar-book-btn">
            立即预约
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
}
