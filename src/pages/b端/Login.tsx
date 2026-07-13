import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ShieldCheck, ChevronLeft, Eye, EyeOff } from 'lucide-react';

export default function BLogin() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [usePassword, setUsePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const sendCode = () => {
    if (phone.length !== 11) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(timer); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  const handleLogin = () => {
    if (!phone || !agreed) return;
    if (usePassword) {
      if (!password) return;
      if (phone === '13800138000' && password === '123456') {
        navigate('/b/dashboard');
      } else {
        alert('账号或密码错误！虚拟账号：13800138000，密码：123456');
      }
    } else {
      if (!code) return;
      if (code === '123456') {
        navigate('/b/dashboard');
      } else {
        alert('验证码错误！虚拟验证码：123456');
      }
    }
  };

  return (
    <main className="mobile-page" style={{ paddingTop: 0 }}>
      <div className="b-login-bg" />
      <div className="b-login-content">
        <button className="b-login-back" onClick={() => navigate('/')}>
          <ChevronLeft size={20} />
        </button>

        <div className="b-login-logo">
          <span className="b-login-logo-text">光</span>
        </div>
        <h1 className="b-login-title">光点伙伴</h1>
        <p className="b-login-subtitle">欢迎回来，请登录你的伙伴账号</p>

        <div className="b-login-form">
          <div className="b-input-group">
            <Phone size={18} style={{ color: '#8E8E93' }} />
            <input
              type="tel"
              maxLength={11}
              placeholder="请输入手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            />
          </div>

          {usePassword ? (
            <div className="b-input-group">
              <ShieldCheck size={18} style={{ color: '#8E8E93' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="b-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          ) : (
            <div className="b-input-group">
              <ShieldCheck size={18} style={{ color: '#8E8E93' }} />
              <input
                type="text"
                maxLength={6}
                placeholder="请输入验证码"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              />
              <button
                className="b-code-btn"
                disabled={phone.length !== 11 || countdown > 0}
                onClick={sendCode}
              >
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </button>
            </div>
          )}
        </div>

        <button className="b-login-switch" onClick={() => setUsePassword(!usePassword)}>
          {usePassword ? '使用验证码登录' : '使用密码登录'}
        </button>

        <div className="login-tip">
          虚拟账号：13800138000，密码：123456，验证码：123456
        </div>

        <div className="b-login-agreement">
          <button
            className={`b-check-box ${agreed ? 'checked' : ''}`}
            onClick={() => setAgreed(!agreed)}
          />
          <span>
            我已阅读并同意 <a style={{ color: 'var(--color-primary)' }}>《伙伴协议》</a> 和 <a style={{ color: 'var(--color-primary)' }}>《隐私政策》</a>
          </span>
        </div>

        <button
          className="b-login-btn"
          disabled={!phone || (usePassword ? !password : !code) || !agreed}
          onClick={handleLogin}
        >
          登录
        </button>

        <p className="b-login-register" onClick={() => navigate('/c/become-partner')}>
          还没有账号？<span style={{ color: 'var(--color-primary)' }}>立即注册</span>
        </p>
      </div>
    </main>
  );
}
