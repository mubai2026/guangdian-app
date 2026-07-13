import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock, Key, Smartphone, ChevronRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function BSettingsSecurity() {
  const navigate = useNavigate();

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/b/settings')}>
          <ChevronLeft size={20} />
        </button>
        <h1 className="page-title">安全设置</h1>
        <div style={{ width: 32 }} />
      </header>

      <section className="settings-section">
        <div className="menu-list">
          <GlassCard className="menu-item" onClick={() => navigate('/b/settings/password')}>
            <div className="menu-icon">
              <Key size={20} />
            </div>
            <div className="menu-content">
              <span className="menu-label">修改密码</span>
              <span className="menu-desc">定期更换密码更安全</span>
            </div>
            <ChevronRight size={18} className="menu-arrow" />
          </GlassCard>

          <GlassCard className="menu-item">
            <div className="menu-icon">
              <Smartphone size={20} />
            </div>
            <div className="menu-content">
              <span className="menu-label">绑定手机</span>
              <span className="menu-desc">138****8888</span>
            </div>
            <ChevronRight size={18} className="menu-arrow" />
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
