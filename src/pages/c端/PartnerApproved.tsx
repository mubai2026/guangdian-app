import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowRight, CheckCircle, FileText, Settings, Calendar } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const permissions = [
  {
    icon: FileText,
    title: '查看订单并接单',
    description: '接收用户预约，安排服务时间',
    color: '#10B981',
  },
  {
    icon: Settings,
    title: '设置服务项目和价格',
    description: '自定义您提供的服务内容',
    color: '#3B82F6',
  },
  {
    icon: Calendar,
    title: '管理个人档期',
    description: '灵活安排可服务时间',
    color: '#A855F7',
  },
];

export default function PartnerApproved() {
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
              background: 'linear-gradient(135deg, #10B981, #34D399)',
              boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          >
            <CheckCircle size={48} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-green-600 mb-2">审核通过</h2>
        <p className="text-gray-500">恭喜！您已成功成为伙伴</p>
      </section>

      <section className="space-y-3 mb-6">
        <h2 className="font-bold text-lg">您现在可以</h2>
        {permissions.map((perm, idx) => (
          <GlassCard key={idx} className="p-4 flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${perm.color}20` }}
            >
              <perm.icon size={24} style={{ color: perm.color }} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{perm.title}</h3>
              <p className="text-sm text-gray-500">{perm.description}</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </GlassCard>
        ))}
      </section>

      <section className="card-3d p-6 mb-6">
        <button className="btn-3d-primary w-full flex items-center justify-center gap-2 text-lg">
          下载「有你·伙伴版」
          <ArrowRight size={20} />
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          使用同一账号登录即可
        </p>
      </section>
    </main>
  );
}
