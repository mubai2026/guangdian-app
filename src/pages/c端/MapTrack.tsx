import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../components/GlassCard';

const timelineData = [
  { time: '14:30', location: '起点 - 静安寺地铁站', type: 'driving', color: '#FF6B00' },
  { time: '14:45', location: '途径 - 南京西路商业街', type: 'driving', color: '#FF6B00' },
  { time: '15:00', location: '到达 - 西岸美术馆', type: 'walking', color: '#A855F7' },
  { time: '15:30', location: '参观 - 展览大厅', type: 'walking', color: '#A855F7' },
  { time: '16:30', location: '休息 - 咖啡厅', type: 'walking', color: '#A855F7' },
  { time: '17:00', location: '离开 - 美术馆', type: 'cycling', color: '#FF8A00' },
];

export default function MapTrack() {
  const navigate = useNavigate();

  return (
    <main className="mobile-page" style={{ paddingTop: 12 }}>
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
        >
          <ChevronRight size={20} className="rotate-180" />
        </button>
        <h1 className="font-bold text-lg">服务轨迹</h1>
      </div>

      <section className="grid grid-cols-2 gap-3 mb-4">
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-[var(--color-primary)] mb-1">12.8</div>
          <div className="text-xs text-gray-500">总里程 (km)</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-[var(--color-primary)] mb-1">3</div>
          <div className="text-xs text-gray-500">总订单</div>
        </GlassCard>
      </section>

      <section className="card-3d mb-4" style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
        <svg viewBox="0 0 340 200" className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
            </pattern>
            <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#FF8A00" />
            </linearGradient>
            <linearGradient id="walkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#9333EA" />
            </linearGradient>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          <polyline
            points="30,170 80,170 80,90 150,90 150,50 220,50 220,100 280,100"
            fill="none"
            stroke="url(#roadGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <polyline
            points="280,100 300,100 300,70"
            fill="none"
            stroke="url(#walkGradient)"
            strokeWidth="4"
            strokeDasharray="6,4"
            strokeLinecap="round"
          />
          
          <circle cx="30" cy="170" r="6" fill="#FF6B00" />
          <circle cx="30" cy="170" r="10" fill="none" stroke="#FF6B00" strokeWidth="2" opacity="0.5" />
          
          <circle cx="80" cy="170" r="6" fill="#FF6B00" />
          <circle cx="80" cy="90" r="6" fill="#FF6B00" />
          <circle cx="150" cy="90" r="6" fill="#FF6B00" />
          <circle cx="150" cy="50" r="6" fill="#FF6B00" />
          <circle cx="220" cy="50" r="6" fill="#FF6B00" />
          <circle cx="220" cy="100" r="6" fill="#FF6B00" />
          
          <circle cx="280" cy="100" r="8" fill="#A855F7" />
          <circle cx="280" cy="100" r="14" fill="none" stroke="#A855F7" strokeWidth="2" opacity="0.5" />
          <circle cx="300" cy="100" r="6" fill="#A855F7" />
          <circle cx="300" cy="70" r="8" fill="#A855F7" />
          
          <text x="30" y="185" textAnchor="middle" fontSize="10" fill="#6C6C70">起点</text>
          <text x="280" y="115" textAnchor="middle" fontSize="10" fill="#6C6C70">终点</text>
        </svg>
        
        <div className="absolute bottom-3 left-3 flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8A00]" />
            <span className="text-gray-600">驾车</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-gradient-to-r from-[#A855F7] to-[#9333EA] border-dashed" style={{ background: 'repeating-linear-gradient(90deg, #A855F7, #A855F7 4px, transparent 4px, transparent 8px)' }} />
            <span className="text-gray-600">步行</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-bold text-lg mb-3">时间轴</h2>
        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-200" />
          
          {timelineData.map((item, idx) => (
            <div key={idx} className="flex gap-4 mb-4 last:mb-0">
              <div className="relative flex-shrink-0">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: item.color }}
                >
                  {idx + 1}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold" style={{ color: item.color }}>{item.time}</span>
                  <span className="tag-3d tag-3d-glass text-xs">
                    {item.type === 'driving' ? '驾车' : item.type === 'walking' ? '步行' : '骑行'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
