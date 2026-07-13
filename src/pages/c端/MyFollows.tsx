import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { peers } from '../../mock/data';

export default function MyFollows() {
  const navigate = useNavigate();
  return (
    <main className="mobile-page">
      <header className="publish-header">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h1>我的关注</h1>
        <div style={{ width: 24 }} />
      </header>
      <section className="list-stack">
        {peers.map((p) => (
          <GlassCard className="peer-card" key={p.name} onClick={() => navigate(`/c/partner/${p.name}`)}>
            <div className="peer-card-cover">
              <img src={p.avatar} alt={p.name} />
              <div className="peer-card-overlay" />
              <div className="peer-card-top-info">
                {p.verified && <span className="verified-badge">已认证</span>}
              </div>
            </div>
            <div className="peer-card-body">
              <div className="peer-card-header">
                <div className="peer-avatar">
                  <img src={p.avatar} alt={p.name} />
                </div>
                <div className="peer-info">
                  <h3>{p.name} · {p.age}岁</h3>
                  <p>{p.job}</p>
                </div>
              </div>
              <div className="peer-tags">
                {p.tags.slice(0, 4).map((t) => (
                  <span key={t} className="peer-tag">{t}</span>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </section>
    </main>
  );
}
