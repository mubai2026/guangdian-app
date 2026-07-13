import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Image, Send } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';
import { orders } from '../../mock/data';

const tagOptions = [
  '服务专业', '态度很好', '准时守约', '聊得开心', '性价比高', '环境不错', '推荐大家', '下次还来',
];

export default function OrderReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const order = orders.find(o => o.id === id) || orders[0];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      navigate('/c/orders');
    }, 1500);
  };

  if (submitted) {
    return (
      <main className="mobile-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Star size={40} fill="#10B981" color="#10B981" />
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>评价成功</h2>
        <p style={{ fontSize: 14, color: '#8E8E93' }}>感谢您的评价，期待再次光临</p>
      </main>
    );
  }

  return (
    <main className="mobile-page">
      <header style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #F2F2F7' }}>
        <button onClick={() => navigate(-1)} style={{ border: 0, background: 'none', cursor: 'pointer', padding: 4 }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 600, margin: 0 }}>发表评价</h1>
        <div style={{ width: 32 }} />
      </header>

      <div style={{ padding: 16 }}>
        <GlassCard style={{ padding: 14, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={order.avatar} alt="" style={{ width: 48, height: 48, borderRadius: '50%', marginRight: 12 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{order.partnerName}</div>
              <div style={{ fontSize: 13, color: '#8E8E93' }}>{order.service} · {order.duration / 60}小时</div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#FF7A45' }}>
              ¥{order.price}
            </div>
          </div>
        </GlassCard>

        <GlassCard style={{ padding: 20, marginBottom: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#8E8E93', marginBottom: 12 }}>服务体验如何？</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                style={{ border: 0, background: 'none', cursor: 'pointer', padding: 4 }}
              >
                <Star
                  size={32}
                fill={(hoverRating || rating) >= star ? '#F59E0B' : 'none'}
                color={(hoverRating || rating) >= star ? '#F59E0B' : '#E5E5EA'}
                />
              </button>
            ))}
          </div>
          <div style={{ fontSize: 13, color: '#F59E0B', fontWeight: 500 }}>
            {rating === 5 ? '非常满意' : rating === 4 ? '满意' : rating === 3 ? '一般' : rating === 2 ? '不满意' : '非常不满意'}
          </div>
        </GlassCard>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 10 }}>选择标签</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {tagOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 16,
                  border: `1px solid ${selectedTags.includes(tag) ? '#FF7A45' : '#E5E5EA'}`,
                  background: selectedTags.includes(tag) ? 'rgba(255,122,69,0.08)' : '#fff',
                  color: selectedTags.includes(tag) ? '#FF7A45' : '#8E8E93',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 10 }}>评价内容</div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="分享您的体验和感受，帮助其他用户更好地了解服务~"
            style={{
              width: '100%',
              minHeight: 120,
              padding: 12,
              borderRadius: 12,
              border: '1px solid #E5E5EA',
              fontSize: 14,
              resize: 'vertical',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 4, border: 0, background: 'none', color: '#8E8E93', fontSize: 13, cursor: 'pointer' }}>
              <Image size={16} />
              添加图片
            </button>
          </div>
        </div>

        <GlassCard style={{ padding: 14, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 14 }}>匿名评价</span>
          <button
            onClick={() => setAnonymous(!anonymous)}
            style={{
              width: 44,
            height: 24,
            borderRadius: 12,
            border: 0,
            background: anonymous ? '#FF7A45' : '#E5E5EA',
            position: 'relative',
            cursor: 'pointer',
            transition: 'background 0.2s',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 2,
              left: anonymous ? 22 : 2,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: '#fff',
              transition: 'left 0.2s',
            }} />
          </button>
        </GlassCard>

        <PrimaryButton onClick={handleSubmit} className="full-width">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Send size={16} />
            提交评价
          </div>
        </PrimaryButton>
      </div>
    </main>
  );
}
