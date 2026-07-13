import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, CreditCard, Wallet, CheckCircle } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';

export default function CPayment() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('wechat');
  const [agreed, setAgreed] = useState(false);

  const paymentMethods = [
    { id: 'wechat', name: '微信支付', icon: '💚' },
    { id: 'alipay', name: '支付宝', icon: '💙' },
    { id: 'balance', name: '余额支付', icon: '💰', desc: '可用余额 ¥128.00' },
  ];

  return (
    <main className="mobile-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">确认支付</h1>
      </div>

      {/* 金额展示 */}
      <div className="payment-amount-section">
        <span className="payment-amount-label">支付金额</span>
        <div className="payment-amount-value">
          <span className="payment-currency">¥</span>
          <span className="payment-number">153.80</span>
        </div>
        <span className="payment-desc">看展同行 · 2小时</span>
      </div>

      {/* 支付方式 */}
      <section className="payment-methods-section">
        <h2 className="section-title">支付方式</h2>
        <div className="payment-methods-list">
          {paymentMethods.map((method) => (
            <GlassCard 
              key={method.id} 
              className={`payment-method-card ${selectedMethod === method.id ? 'selected' : ''}`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="payment-method-left">
                <span className="payment-method-icon">{method.icon}</span>
                <div className="payment-method-info">
                  <span className="payment-method-name">{method.name}</span>
                  {method.desc && <span className="payment-method-desc">{method.desc}</span>}
                </div>
              </div>
              <div className={`payment-method-check ${selectedMethod === method.id ? 'active' : ''}`}>
                {selectedMethod === method.id && <CheckCircle size={20} />}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 安全提示 */}
      <div className="payment-security">
        <Shield size={14} />
        <span>支付环境安全，信息已加密</span>
      </div>

      {/* 协议确认 */}
      <div className="payment-agreement">
        <button 
          className={`agreement-checkbox ${agreed ? 'checked' : ''}`}
          onClick={() => setAgreed(!agreed)}
        >
          {agreed && <CheckCircle size={14} />}
        </button>
        <span className="agreement-text">
          我已阅读并同意 <a>《服务协议》</a> 和 <a>《隐私政策》</a>
        </span>
      </div>

      {/* 支付按钮 */}
      <div className="payment-footer">
        <PrimaryButton className="full-width" disabled={!agreed}>
          确认支付 ¥153.80
        </PrimaryButton>
      </div>
    </main>
  );
}
