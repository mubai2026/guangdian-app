import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Check, ChevronRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const skills = [
  '情感倾听', '户外运动', '咖啡社交', '美食探店',
  '逛街陪购', '看展同行', '摄影摄像', '学习陪伴',
];

const timeSlots = ['工作日', '周末', '全天'];

export default function ApplyPartner() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '138****8888',
    selectedSkills: [] as string[],
    selectedTimes: [] as string[],
    intro: '',
    avatar: null,
    idCard: null,
  });

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skill)
        ? prev.selectedSkills.filter((s) => s !== skill)
        : [...prev.selectedSkills, skill],
    }));
  };

  const handleTimeToggle = (time: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTimes: prev.selectedTimes.includes(time)
        ? prev.selectedTimes.filter((t) => t !== time)
        : [...prev.selectedTimes, time],
    }));
  };

  const handleSubmit = () => {
    navigate('/c/partner-reviewing');
  };

  return (
    <main className="mobile-page">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
        >
          <ChevronRight size={20} className="rotate-180" />
        </button>
        <h1 className="font-bold text-lg">申请成为伙伴</h1>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center">
          {['资料', '审核', '完成'].map((step, idx) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                idx === 0 ? 'bg-gradient-to-r from-[var(--color-primary)] to-[#A855F7] text-white' : 
                idx === 1 ? 'bg-gray-200 text-gray-500' : 'bg-gray-200 text-gray-500'
              }`}>
                {idx === 0 ? '1' : idx === 1 ? '2' : '3'}
              </div>
              <span className={`ml-2 text-sm ${idx === 0 ? 'font-bold text-[var(--color-primary)]' : 'text-gray-400'}`}>
                {step}
              </span>
              {idx < 2 && (
                <div className="w-12 h-0.5 bg-gray-200 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-4 mb-6">
        <GlassCard className="p-4">
          <label className="block text-sm font-medium mb-2">真实姓名</label>
          <input
            type="text"
            placeholder="请输入您的真实姓名"
            className="glass-input w-full"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </GlassCard>

        <GlassCard className="p-4">
          <label className="block text-sm font-medium mb-2">手机号</label>
          <input
            type="text"
            readOnly
            className="glass-input w-full bg-gray-100"
            value={formData.phone}
          />
        </GlassCard>

        <GlassCard className="p-4">
          <label className="block text-sm font-medium mb-2">技能与兴趣</label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <button
                key={skill}
                className={`tag-3d text-sm px-4 py-2 transition-all ${
                  formData.selectedSkills.includes(skill)
                    ? 'tag-3d-orange'
                    : 'tag-3d-glass'
                }`}
                onClick={() => handleSkillToggle(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <label className="block text-sm font-medium mb-2">可服务时间</label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                className={`tag-3d text-sm px-4 py-2 transition-all ${
                  formData.selectedTimes.includes(time)
                    ? 'tag-3d-orange'
                    : 'tag-3d-glass'
                }`}
                onClick={() => handleTimeToggle(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <label className="block text-sm font-medium mb-2">个人介绍</label>
          <textarea
            placeholder="请介绍一下自己，不少于50字"
            className="glass-textarea w-full h-24 resize-none"
            value={formData.intro}
            onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
          />
        </GlassCard>

        <GlassCard className="p-4">
          <label className="block text-sm font-medium mb-3">上传资料</label>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-2">上传头像</label>
              <button className="w-full h-24 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 hover:border-[var(--color-primary)] transition-colors">
                <Upload size={20} className="text-gray-400" />
                <span className="text-xs text-gray-400">点击上传</span>
              </button>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-2">上传证件</label>
              <button className="w-full h-24 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 hover:border-[var(--color-primary)] transition-colors">
                <Upload size={20} className="text-gray-400" />
                <span className="text-xs text-gray-400">点击上传</span>
              </button>
            </div>
          </div>
        </GlassCard>
      </section>

      <button 
        className="btn-3d-primary w-full py-4 text-lg"
        onClick={handleSubmit}
      >
        提交申请
      </button>
    </main>
  );
}
