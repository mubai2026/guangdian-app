import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Settings, Sparkles } from 'lucide-react';

export default function Splash() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) navigate('/b/login');
    if (isRightSwipe) navigate('/c/login');
  };

  return (
    <main className="splash-swipe-container" ref={containerRef} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className="splash-swipe-content">
        <div className="brand-logo">
          <Sparkles size={28} color="#fff" />
        </div>
        <h1>光点</h1>
        <p>遇见同行的搭子</p>

        <div className="splash-entries">
          <button className="splash-entry-btn c-end" onClick={() => navigate('/c/home')}>
            <div className="entry-icon">
              <User size={24} />
            </div>
            <div className="entry-text">
              <span className="entry-title">用户端</span>
              <span className="entry-desc">发现伙伴，预约服务</span>
            </div>
          </button>

          <button className="splash-entry-btn b-end" onClick={() => navigate('/b/dashboard')}>
            <div className="entry-icon">
              <Briefcase size={24} />
            </div>
            <div className="entry-text">
              <span className="entry-title">伙伴端</span>
              <span className="entry-desc">接单管理，发布笔记</span>
            </div>
          </button>

          <button className="splash-entry-btn admin" onClick={() => navigate('/admin/dashboard')}>
            <div className="entry-icon">
              <Settings size={24} />
            </div>
            <div className="entry-text">
              <span className="entry-title">管理后台</span>
              <span className="entry-desc">数据总览，运营管理</span>
            </div>
          </button>
        </div>

        <div className="splash-swipe-hints">
          <span className="splash-hint-left">← 伙伴端</span>
          <span className="splash-hint-right">用户端 →</span>
        </div>
      </div>
    </main>
  );
}
