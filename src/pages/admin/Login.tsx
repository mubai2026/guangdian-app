import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = () => {
    if (account === 'admin' && password === '123456') {
      navigate('/admin/dashboard');
    } else {
      alert('账号或密码错误！虚拟账号：admin，密码：123456');
    }
  };

  return (
    <main className="admin-login">
      <section className="admin-login-brand">
        <div className="brand-logo">光</div>
        <h1>光点后台</h1>
        <p>运营管理平台</p>
      </section>
      <section className="admin-login-form">
        <h2>运营登录</h2>
        <div className="admin-input-wrap">
          <User size={18} style={{ color: '#8E8E93' }} />
          <input placeholder="请输入账号" value={account} onChange={(e) => setAccount(e.target.value)} />
        </div>
        <div className="admin-input-wrap">
          <Lock size={18} style={{ color: '#8E8E93' }} />
          <input type={showPwd ? 'text' : 'password'} placeholder="请输入密码" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
          <button className="admin-pwd-toggle" onClick={() => setShowPwd(!showPwd)}>
            {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <label className="admin-remember"><input type="checkbox" />记住我</label>
        <button className="admin-login-btn" onClick={handleLogin}>登录</button>
        <p className="admin-login-tip">虚拟账号：admin，密码：123456</p>
      </section>
    </main>
  );
}
