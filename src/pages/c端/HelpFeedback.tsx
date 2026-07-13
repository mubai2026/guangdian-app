import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Phone, FileText, ChevronRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function HelpFeedback() {
  const navigate = useNavigate();
  return (
    <main className="mobile-page">
      <header className="publish-header">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h1>帮助与反馈</h1>
        <div style={{ width: 24 }} />
      </header>
      <section className="list-stack">
        <GlassCard className="order-card-v2">
          <FileText size={20} style={{ color: '#FF7A45', marginBottom: 8 }} />
          <h3>常见问题</h3>
          <p style={{ color: '#6C6C70' }}>查看使用中的常见问题解答</p>
        </GlassCard>
        <GlassCard className="order-card-v2">
          <MessageCircle size={20} style={{ color: '#FF7A45', marginBottom: 8 }} />
          <h3>在线客服</h3>
          <p style={{ color: '#6C6C70' }}>联系在线客服获取帮助</p>
        </GlassCard>
        <GlassCard className="order-card-v2">
          <Phone size={20} style={{ color: '#FF7A45', marginBottom: 8 }} />
          <h3>客服电话</h3>
          <p style={{ color: '#6C6C70' }}>400-888-8888</p>
        </GlassCard>
      </section>
      <div style={{ marginTop: 20 }}>
        <h3 style={{ marginBottom: 10 }}>意见反馈</h3>
        <textarea placeholder="请描述你遇到的问题或建议..." rows={4} style={{ width: '100%', border: 0, borderRadius: 12, background: '#F5F7FA', padding: 12, resize: 'none', fontFamily: 'inherit' }} />
        <button className="primary-button" style={{ width: '100%', marginTop: 10 }}>提交反馈</button>
      </div>
          <section className="profile-section">
        <div className="section-header">
          <h2>常见问题</h2>
          <span className="section-more" onClick={() => navigate('/c/help/detail')}>
            查看更多 <ChevronRight size={14} />
          </span>
        </div>
        <GlassCard className="help-faq-card" onClick={() => navigate('/c/help/detail')}>
          <span className="help-faq-title">如何预约伙伴？</span>
          <ChevronRight size={16} className="text-gray-400" />
        </GlassCard>
        <GlassCard className="help-faq-card" onClick={() => navigate('/c/help/detail')}>
          <span className="help-faq-title">如何取消订单？</span>
          <ChevronRight size={16} className="text-gray-400" />
        </GlassCard>
        <GlassCard className="help-faq-card" onClick={() => navigate('/c/help/detail')}>
          <span className="help-faq-title">如何申请退款？</span>
          <ChevronRight size={16} className="text-gray-400" />
        </GlassCard>
      </section>
    </main>
  );
}
