import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, MessageCircle, CheckCircle, Navigation, Timer, Star, EyeOff, Truck } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';
import { orders } from '../../mock/data';

const orderFlowSteps = [
  { key: 'accepted', label: '已接单', desc: '伙伴已确认接单' },
  { key: 'departed', label: '已出发', desc: '伙伴正在前往服务地点' },
  { key: 'arrived', label: '已到达', desc: '伙伴已到达指定地点' },
  { key: 'serving', label: '服务中', desc: '服务正在进行中' },
  { key: 'extended', label: '已续单', desc: '已续单30分钟' },
  { key: 'completed', label: '服务结束', desc: '服务已完成' },
  { key: 'reviewed', label: '已评价', desc: '双方已完成评价' },
];

export default function COrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const order = orders.find((o: any) => o.service === id) || orders[0];
  const [currentStep, setCurrentStep] = useState(3); // C端视角，默认服务中
  const [countdown, setCountdown] = useState(1800); // 秒
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [showExtend, setShowExtend] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [showCancelPolicy, setShowCancelPolicy] = useState(false);

  const handleNextStep = () => {
    if (currentStep < orderFlowSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (orderFlowSteps[currentStep + 1].key === 'completed') {
        setShowReview(true);
      }
    }
  };

  const openNavigation = () => {
    const url = `https://uri.amap.com/navigation?to=${encodeURIComponent(order.place || '上海市徐汇区龙腾大道2600号')}&mode=car&coordinate=gaode`;
    window.open(url, '_blank');
  };

  const callPartner = () => {
    window.location.href = 'tel:13800138000';
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const currentFlow = orderFlowSteps[currentStep];

  return (
    <main className="mobile-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/c/orders')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">订单详情</h1>
      </div>

      {/* 订单流程时间轴 */}
      <GlassCard className="order-flow-card">
        <div className="order-flow-steps">
          {orderFlowSteps.map((step, idx) => (
            <div key={step.key} className={`order-flow-step ${idx <= currentStep ? 'active' : ''} ${idx === currentStep ? 'current' : ''}`}>
              <div className="order-flow-dot" />
              <div className="order-flow-info">
                <span className="order-flow-label">{step.label}</span>
                {idx === currentStep && <span className="order-flow-desc">{step.desc}</span>}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* 倒计时（服务中时显示） */}
      {currentFlow.key === 'serving' && (
        <GlassCard className="countdown-card">
          <Timer size={24} style={{ color: '#FF7A45' }} />
          <span className="countdown-time">{formatTime(countdown)}</span>
          <span className="countdown-label">剩余服务时间</span>
        </GlassCard>
      )}

      {/* 伙伴信息 */}
      <section className="detail-section">
        <h2 className="section-title">伙伴</h2>
        <GlassCard className="partner-mini-card" onClick={() => navigate('/c/partner/林夏')}>
          <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=user1" alt="" className="partner-mini-avatar" />
          <div className="partner-mini-info">
            <span className="partner-mini-name">林夏</span>
            <span className="partner-mini-level">预约了{order.service}</span>
          </div>
          <div className="partner-mini-actions">
            <button className="mini-action-btn" onClick={(e) => { e.stopPropagation(); callPartner(); }}><Phone size={16} /></button>
            <button className="mini-action-btn" onClick={(e) => { e.stopPropagation(); navigate('/c/messages/chat/林夏'); }}><MessageCircle size={16} /></button>
          </div>
        </GlassCard>
      </section>

      {/* 服务信息 */}
      <section className="detail-section">
        <h2 className="section-title">服务信息</h2>
        <GlassCard className="detail-card">
          <div className="detail-row">
            <span className="detail-label">服务类型</span>
            <span className="detail-value">{order.service}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">预约时间</span>
            <span className="detail-value">{order.time}</span>
          </div>
          <div className="detail-row nav-row" onClick={openNavigation}>
            <span className="detail-label">服务地点</span>
            <span className="detail-value nav-value">
              <MapPin size={12} /> {order.place}
              <Navigation size={14} style={{ color: '#3B82F6', marginLeft: 4 }} />
            </span>
          </div>
        </GlassCard>
      </section>

      {/* 费用明细 */}
      <section className="detail-section">
        <h2 className="section-title">费用明细</h2>
        <GlassCard className="detail-card">
          <div className="detail-row">
            <span className="detail-label">服务费用</span>
            <span className="detail-value">¥158</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">平台服务费</span>
            <span className="detail-value">¥15.8</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">优惠券</span>
            <span className="detail-value" style={{ color: '#10B981' }}>-¥20</span>
          </div>
          <div className="detail-divider" />
          <div className="detail-row total">
            <span className="detail-label">实付金额</span>
            <span className="detail-value" style={{ fontSize: '18px', color: 'var(--color-primary)', fontWeight: 700 }}>¥153.8</span>
          </div>
        </GlassCard>
      </section>

      {/* 操作按钮 */}
      <div className="detail-actions">
        {(currentFlow.key === 'accepted' || currentFlow.key === 'departed') && (
          <button className="btn-outline full-width" onClick={() => setShowCancelPolicy(true)}>取消订单</button>
        )}
        {currentFlow.key === 'serving' && (
          <>
            <PrimaryButton className="full-width" onClick={() => setShowExtend(true)}>发起续单</PrimaryButton>
            <button className="btn-outline full-width" onClick={handleNextStep}>结束服务</button>
          </>
        )}
        {currentFlow.key === 'extended' && (
          <PrimaryButton className="full-width" onClick={handleNextStep}>确认结束服务</PrimaryButton>
        )}
        {currentFlow.key === 'completed' && (
          <PrimaryButton className="full-width" onClick={() => setShowReview(true)}>去评价</PrimaryButton>
        )}
      </div>

      {/* 取消政策页面 */}
      {showCancelPolicy && (
        <div className="review-modal">
          <div className="review-modal-content cancel-policy-modal">
            <h3>取消订单政策</h3>
            <div className="cancel-policy-body">
              <div className="cancel-policy-item">
                <span className="cancel-policy-time">接单后5分钟内</span>
                <span className="cancel-policy-fee free">免费取消</span>
              </div>
              <div className="cancel-policy-item">
                <span className="cancel-policy-time">接单5分钟后·伙伴未出发</span>
                <span className="cancel-policy-fee">收取¥5违约金</span>
              </div>
              <div className="cancel-policy-item">
                <span className="cancel-policy-time">伙伴已出发·未到达</span>
                <span className="cancel-policy-fee">收取¥10违约金</span>
              </div>
              <div className="cancel-policy-item">
                <span className="cancel-policy-time">伙伴已到达</span>
                <span className="cancel-policy-fee warn">需支付¥20上门费</span>
              </div>
              <div className="cancel-policy-item">
                <span className="cancel-policy-time">服务中</span>
                <span className="cancel-policy-fee ban">不可取消</span>
              </div>
            </div>
            <p className="cancel-policy-tip">频繁取消可能影响您的信用评分</p>
            <PrimaryButton onClick={() => { setShowCancelPolicy(false); setShowCancel(true); }}>我要取消</PrimaryButton>
            <button className="btn-outline full-width" onClick={() => setShowCancelPolicy(false)} style={{ marginTop: 8 }}>暂不取消</button>
          </div>
        </div>
      )}

      {/* 取消订单弹窗 */}
      {showCancel && (
        <div className="review-modal">
          <div className="review-modal-content">
            <h3>取消订单</h3>
            <p style={{ color: '#8E8E93', fontSize: 13, marginBottom: 16 }}>请选择取消原因</p>
            <div className="cancel-reason-list">
              {['计划有变，暂时不需要', '找到了更合适的伙伴', '等待时间过长', '伙伴沟通态度不佳', '临时有事走不开', '其他原因'].map(reason => (
                <label key={reason} className={`cancel-reason-item ${cancelReason === reason ? 'selected' : ''}`}>
                  <input type="radio" name="cancelReason" checked={cancelReason === reason} onChange={() => setCancelReason(reason)} />
                  <span>{reason}</span>
                </label>
              ))}
            </div>
            <PrimaryButton onClick={() => {
              if (!cancelReason) { alert('请选择取消原因'); return; }
              setShowCancel(false); setShowCancelPolicy(false);
              alert('订单已取消，违约金¥5将从原路退回');
              navigate('/c/orders');
            }}>确认取消</PrimaryButton>
            <button className="btn-outline full-width" onClick={() => setShowCancel(false)} style={{ marginTop: 8 }}>再想想</button>
          </div>
        </div>
      )}

      {/* 续单弹窗 */}
      {showExtend && (
        <div className="review-modal">
          <div className="review-modal-content">
            <h3>发起续单</h3>
            <p style={{ color: '#8E8E93', marginBottom: 16 }}>确认续单30分钟？费用 ¥79</p>
            <PrimaryButton onClick={() => { setShowExtend(false); setCurrentStep(currentStep + 1); }}>确认续单</PrimaryButton>
            <button className="btn-outline full-width" onClick={() => setShowExtend(false)} style={{ marginTop: 8 }}>取消</button>
          </div>
        </div>
      )}

      {/* 评价弹窗 */}
      {showReview && (
        <div className="review-modal">
          <div className="review-modal-content">
            <h3>服务评价</h3>
            <div className="review-stars">
              {[1,2,3,4,5].map(star => (
                <Star key={star} size={28} fill={star <= rating ? '#F59E0B' : 'none'} color={star <= rating ? '#F59E0B' : '#E5E5EA'} onClick={() => setRating(star)} />
              ))}
            </div>
            <textarea className="review-textarea" rows={3} placeholder="说说这次服务的体验..." value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
            <label className="review-anonymous">
              <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
              <EyeOff size={14} /> 匿名评价
            </label>
            <PrimaryButton onClick={() => { setShowReview(false); setCurrentStep(currentStep + 1); }}>提交评价</PrimaryButton>
          </div>
        </div>
      )}
    </main>
  );
}
