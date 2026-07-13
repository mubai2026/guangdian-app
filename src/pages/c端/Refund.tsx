import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';

const refundReasons = [
  '伙伴未按时到达',
  '服务质量不满意',
  '临时有事无法前往',
  '与描述不符',
  '其他原因',
];

export default function CRefund() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedReason, setSelectedReason] = useState('');
  const [detail, setDetail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate('/c/orders'), 2000);
  };

  if (submitted) {
    return (
      <main className="mobile-page center-content">
        <div className="success-animation">
          <CheckCircle size={64} style={{ color: '#10B981' }} />
        </div>
        <h2 className="success-title">退款申请已提交</h2>
        <p className="success-desc">客服将在24小时内处理您的申请</p>
      </main>
    );
  }

  return (
    <main className="mobile-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">申请退款</h1>
      </div>

      <div className="refund-notice">
        <AlertCircle size={16} style={{ color: '#F59E0B' }} />
        <span>订单金额将在审核通过后原路退回</span>
      </div>

      {/* 退款金额 */}
      <section className="detail-section">
        <h2 className="section-title">退款金额</h2>
        <GlassCard className="refund-amount-card">
          <span className="refund-amount">¥153.80</span>
          <span className="refund-service">看展同行</span>
        </GlassCard>
      </section>

      {/* 退款原因 */}
      <section className="detail-section">
        <h2 className="section-title">退款原因</h2>
        <div className="refund-reasons">
          {refundReasons.map((reason) => (
            <button
              key={reason}
              className={`refund-reason-btn ${selectedReason === reason ? 'active' : ''}`}
              onClick={() => setSelectedReason(reason)}
            >
              {reason}
            </button>
          ))}
        </div>
      </section>

      {/* 详细说明 */}
      <section className="detail-section">
        <h2 className="section-title">详细说明（选填）</h2>
        <textarea
          className="refund-textarea"
          placeholder="请描述您遇到的问题..."
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          rows={4}
        />
      </section>

      <div className="detail-actions">
        <PrimaryButton className="full-width" onClick={handleSubmit}>
          提交申请
        </PrimaryButton>
      </div>
    </main>
  );
}
