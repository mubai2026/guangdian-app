import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [code, setCode] = useState('');
  const [codeBtnDisabled, setCodeBtnDisabled] = useState(false);
  const [codeBtnText, setCodeBtnText] = useState('获取验证码');

  const handleGetCode = () => {
    if (!phone) return;
    setCodeBtnDisabled(true);
    setCodeBtnText('60s');
    let count = 60;
    const timer = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(timer);
        setCodeBtnDisabled(false);
        setCodeBtnText('获取验证码');
      } else {
        setCodeBtnText(`${count}s`);
      }
    }, 1000);
  };

  const handleSubmit = () => {
    if (isLogin) {
      if (phone && password) {
        if (phone === '13800138000' && password === '123456') {
          navigate('/c/home');
        } else {
          alert('账号或密码错误！虚拟账号：13800138000，密码：123456');
        }
      }
    } else {
      if (phone && code) {
        navigate('/c/home');
      }
    }
  };

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">{isLogin ? '登录' : '注册'}</h1>
        <div style={{ width: 32 }} />
      </header>

      <section className="login-form">
        <GlassCard className="login-card">
          <div className="login-card-header">
            <h2>{isLogin ? '欢迎回来' : '创建账号'}</h2>
            <p>{isLogin ? '登录你的光点账号' : '注册成为光点用户'}</p>
          </div>

          <div className="login-input-group">
            <label>手机号</label>
            <input
              type="tel"
              placeholder="请输入手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={11}
            />
          </div>

          {isLogin ? (
            <div className="login-input-group">
              <label>密码</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          ) : (
            <div className="login-input-group">
              <label>验证码</label>
              <div className="code-input-wrapper">
                <input
                  type="text"
                  placeholder="请输入验证码"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                />
                <button
                  className={`code-btn ${codeBtnDisabled ? 'disabled' : ''}`}
                  onClick={handleGetCode}
                  disabled={codeBtnDisabled}
                >
                  {codeBtnText}
                </button>
              </div>
            </div>
          )}

          {isLogin && (
            <button className="forgot-password" onClick={() => alert('请联系客服重置密码：400-888-8888')}>
              忘记密码？
            </button>
          )}

          <button className="primary-button login-btn" onClick={handleSubmit}>
            {isLogin ? '登录' : '注册'}
          </button>
        </GlassCard>

        <button className="login-switch" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '还没有账号？去注册' : '已有账号？去登录'}
        </button>

        <div className="login-third-party">
          <span className="login-divider">或</span>
          <div className="third-party-btns">
            <button className="third-party-btn" onClick={() => navigate('/c/home')}>
              <span className="third-party-icon wechat">微信</span>
              <span>微信登录</span>
            </button>
            <button className="third-party-btn" onClick={() => navigate('/c/home')}>
              <span className="third-party-icon qq">QQ</span>
              <span>QQ登录</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
