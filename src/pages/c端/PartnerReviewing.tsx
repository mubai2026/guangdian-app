import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

export default function PartnerReviewing() {
  const navigate = useNavigate();

  const links = [
    { title: '服务规范', path: '/c/help' },
    { title: '安全须知', path: '/c/help' },
    { title: '提现指南', path: '/c/wallet' },
  ];

  return (
    <main className="mobile-page">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
        >
          <ChevronRight size={20} className="rotate-180" />
        </button>
        <h1 className="font-bold text-lg">审核进度</h1>
      </div>

      <section className="card-3d p-8 text-center mb-6">
        <div className="relative inline-block mb-6">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#reviewGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset="71"
              className="animate-spin"
              style={{ animationDuration: '2s' }}
            />
            <defs>
              <linearGradient id="reviewGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF8A00" />
                <stop offset="100%" stopColor="#FF6B00" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">⏳</span>
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-2">审核中</h2>
        <p className="text-gray-500 mb-6">我们正在审核您的资料，请耐心等待</p>
        
        <div className="flex justify-center gap-2">
          {[0, 1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="w-2 h-2 rounded-full bg-[var(--color-primary)]"
              style={{
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: `${idx * 0.2}s`,
              }}
            />
          ))}
        </div>
        
        <p className="text-sm text-gray-400 mt-4">预计24小时内完成审核</p>
      </section>

      <section className="grid grid-cols-3 gap-3">
        {links.map((link) => (
          <GlassCard 
            key={link.title} 
            className="p-4 text-center cursor-pointer"
            onClick={() => navigate(link.path)}
          >
            <div className="text-lg mb-2">📋</div>
            <h3 className="font-bold text-sm">{link.title}</h3>
          </GlassCard>
        ))}
      </section>
    </main>
  );
}
