import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, DollarSign, FileText, Save } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';

export default function BServiceEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id === 'new';

  const [form, setForm] = useState({
    name: isNew ? '' : '看展同行',
    desc: isNew ? '' : '带你欣赏艺术展览，讲解展品背后的故事',
    time: isNew ? '' : '2小时',
    price: isNew ? '' : '158',
    enabled: true,
  });

  const handleSave = () => {
    navigate('/b/services');
  };

  return (
    <main className="mobile-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/b/services')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">{isNew ? '添加服务' : '编辑服务'}</h1>
      </div>

      <section className="form-section">
        <GlassCard className="form-card">
          <div className="form-group">
            <label><FileText size={14} /> 服务名称</label>
            <input 
              type="text" 
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="输入服务名称"
            />
          </div>
          <div className="form-group">
            <label><FileText size={14} /> 服务描述</label>
            <textarea 
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              placeholder="描述你的服务内容"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label><Clock size={14} /> 服务时长</label>
            <input 
              type="text" 
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              placeholder="例如：2小时"
            />
          </div>
          <div className="form-group">
            <label><DollarSign size={14} /> 服务价格（元）</label>
            <input 
              type="number" 
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="输入价格"
            />
          </div>
        </GlassCard>
      </section>

      <div className="form-actions">
        <PrimaryButton className="full-width" onClick={handleSave}>
          <Save size={18} />
          <span>保存</span>
        </PrimaryButton>
      </div>
    </main>
  );
}
