import { useNavigate } from 'react-router-dom';
import { ChevronRight, XCircle, AlertCircle } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const requirements = [
  {
    title: '清晰的身份证照片',
    description: '请上传清晰的身份证正反面照片',
    status: 'pending',
  },
  {
    title: '个人介绍不少于50字',
    description: '请完善您的个人介绍，让用户更好地了解您',
    status: 'pending',
  },
];

export default function PartnerRejected() {
  const navigate = useNavigate();

  return (
    <main className="mobile-page">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
        >
          <ChevronRight size={20} className="rotate-180" />
        </button>
        <h1 className="font-bold text-lg">审核结果</h1>
      </div>

      <section className="card-3d p-8 text-center mb-6">
        <div className="relative inline-block mb-6">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #EF4444, #F87171)',
              boxShadow: '0 0 40px rgba(239, 68, 68, 0.4)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          >
            <XCircle size={48} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-red-600 mb-2">审核未通过</h2>
        <span className="tag-3d tag-3d-glass">原因：资料不完整</span>
      </section>

      <section className="space-y-3 mb-6">
        <h2 className="font-bold text-lg">请补充以下资料</h2>
        {requirements.map((req, idx) => (
          <GlassCard key={idx} className="p-4 flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertCircle size={16} className="text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{req.title}</h3>
              <p className="text-sm text-gray-500">{req.description}</p>
            </div>
          </GlassCard>
        ))}
      </section>

      <button 
        className="btn-3d-primary w-full py-4 text-lg"
        onClick={() => navigate('/c/apply-partner')}
      >
        重新提交申请
      </button>
    </main>
  );
}
