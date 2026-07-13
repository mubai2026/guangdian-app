import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function AdminSettings() {
  const [platformName, setPlatformName] = useState('光点');
  const [servicePhone, setServicePhone] = useState('400-888-8888');
  const [commission, setCommission] = useState(10);
  const [blindMin, setBlindMin] = useState(99);
  const [blindMax, setBlindMax] = useState(199);
  const [blindMinTask, setBlindMinTask] = useState(15);

  const [categories, setCategories] = useState([
    { name: '晨跑陪练', enabled: true },
    { name: '看展同行', enabled: true },
    { name: '咖啡探店', enabled: true },
    { name: '城市徒步', enabled: true },
    { name: '健身指导', enabled: true },
    { name: '瑜伽课程', enabled: true },
    { name: '摄影跟拍', enabled: false },
  ]);

  const [vipLevels, setVipLevels] = useState([
    { level: 1, name: '体验卡', price: 19, blindCount: 2 },
    { level: 2, name: '月度会员', price: 39, blindCount: 8 },
    { level: 3, name: '季度会员', price: 99, blindCount: 10 },
    { level: 4, name: '年度VIP', price: 299, blindCount: 999 },
  ]);

  return (
    <AdminLayout>
      <div className="admin-page">
        <h1 className="admin-page-title">系统配置</h1>

        {/* 平台基础配置 */}
        <div className="admin-settings-section">
          <h2 className="admin-settings-title">平台基础配置</h2>
          <div className="admin-settings-form">
            <div className="admin-form-row">
              <label>平台名称</label>
              <input value={platformName} onChange={(e) => setPlatformName(e.target.value)} />
            </div>
            <div className="admin-form-row">
              <label>客服电话</label>
              <input value={servicePhone} onChange={(e) => setServicePhone(e.target.value)} />
            </div>
            <div className="admin-form-row">
              <label>平台抽成比例 (%)</label>
              <input type="number" value={commission} onChange={(e) => setCommission(Number(e.target.value))} />
            </div>
            <p style={{ fontSize: 12, color: '#8E8E93', marginTop: -8 }}>默认10%，伙伴等级越高抽成越低：见习15%/正式10%/资深8%/金牌8%</p>
          </div>
        </div>

        {/* 盲盒配置 */}
        <div className="admin-settings-section">
          <h2 className="admin-settings-title">盲盒配置</h2>
          <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 12, padding: 16, marginBottom: 20, fontSize: 13, color: '#075985', lineHeight: 1.8 }}>
            <strong>盲盒配置说明：</strong><br/>
            • <strong>盲盒价格区间</strong>：平台发布的特价盲盒订单随机定价范围（99~199元），低于正常服务价格<br/>
            • <strong>B端每月最低盲盒任务数</strong>：伙伴每月必须完成的盲盒订单数量，未完成影响等级评定<br/>
            • 见习5单/正式15单/资深40单/金牌80单（此为系统默认值，可在此调整）<br/>
            • 盲盒订单双方随机匹配，C端VIP用户每月有免费次数，B端按等级需完成定额
          </div>
          <div className="admin-settings-form">
            <div className="admin-form-row">
              <label>盲盒最低价格 (¥)</label>
              <input type="number" value={blindMin} onChange={(e) => setBlindMin(Number(e.target.value))} />
            </div>
            <div className="admin-form-row">
              <label>盲盒最高价格 (¥)</label>
              <input type="number" value={blindMax} onChange={(e) => setBlindMax(Number(e.target.value))} />
            </div>
            <div className="admin-form-row">
              <label>B端每月最低盲盒任务数</label>
              <input type="number" value={blindMinTask} onChange={(e) => setBlindMinTask(Number(e.target.value))} />
            </div>
          </div>
        </div>

        {/* VIP配置 */}
        <div className="admin-settings-section">
          <h2 className="admin-settings-title">VIP等级配置</h2>
          <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 12, padding: 16, marginBottom: 20, fontSize: 13, color: '#92400E', lineHeight: 1.8 }}>
            <strong>VIP等级配置说明：</strong><br/>
            • <strong>价格（元）</strong>：该VIP等级的月/季/年订阅价格，用户付费购买后享受对应权益<br/>
            • <strong>盲盒次数</strong>：该等级用户每月可免费抽取盲盒的次数（999表示无限次）<br/>
            • <strong>体验卡</strong>：新用户低价体验，每月2次免费盲盒<br/>
            • <strong>月度会员</strong>：主力订阅档，每月8次免费盲盒<br/>
            • <strong>季度会员</strong>：中高端用户，每月10次免费盲盒<br/>
            • <strong>年度VIP</strong>：高价值用户，无限次免费盲盒<br/>
            • 盲盒次数每月1日自动重置，未使用次数不累积
          </div>
          <div className="admin-vip-grid">
            {vipLevels.map((vip, i) => (
              <div className="admin-vip-card" key={vip.level}>
                <span className="admin-vip-level">Lv.{vip.level}</span>
                <input value={vip.name} onChange={(e) => { const v = [...vipLevels]; v[i].name = e.target.value; setVipLevels(v); }} />
                <input type="number" value={vip.price} onChange={(e) => { const v = [...vipLevels]; v[i].price = Number(e.target.value); setVipLevels(v); }} />
                <input type="number" value={vip.blindCount} onChange={(e) => { const v = [...vipLevels]; v[i].blindCount = Number(e.target.value); setVipLevels(v); }} />
              </div>
            ))}
          </div>
        </div>

        {/* 服务类目管理 */}
        <div className="admin-settings-section">
          <h2 className="admin-settings-title">服务类目管理</h2>
          <div className="admin-category-list">
            {categories.map((cat, i) => (
              <div className="admin-category-item" key={cat.name}>
                <span>{cat.name}</span>
                <button className="admin-toggle-btn" style={{ background: cat.enabled ? '#10B981' : '#E5E5EA' }} onClick={() => { const c = [...categories]; c[i].enabled = !c[i].enabled; setCategories(c); }}>
                  <span className="admin-toggle-ball" style={{ left: cat.enabled ? '22px' : '2px' }} />
                </button>
                <button className="admin-action-btn delete" onClick={() => setCategories(categories.filter((_, idx) => idx !== i))}><Trash2 size={14} /></button>
              </div>
            ))}
            <button className="admin-add-category-btn" onClick={() => setCategories([...categories, { name: '新类目', enabled: true }])}>
              <Plus size={16} /> 添加类目
            </button>
          </div>
        </div>

        <button className="admin-save-btn" onClick={() => alert('配置已保存')}>
          <Save size={18} /> 保存全部配置
        </button>
      </div>
    </AdminLayout>
  );
}
