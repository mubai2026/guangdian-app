import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Search, Check, X, Eye, FileText, ShieldCheck, Zap } from 'lucide-react';

// 认证类型配置 - 技能认证为自动认证，不需人工审核
const certTypes = [
  { key: '实名认证', label: '实名认证', short: '实', color: '#10B981', auto: false },
  { key: '真人认证', label: '真人认证', short: '真', color: '#FF7A45', auto: false },
  { key: '技能认证', label: '技能认证', short: '技', color: '#A855F7', auto: true },
  { key: '职业认证', label: '职业认证', short: '职', color: '#3B82F6', auto: false },
];

// mock数据 - 技能认证状态只有"已通过"和"认证中"
const mockCerts = [
  { id: 'C001', applicant: '晨光伙伴', phone: '138****1001', type: '实名认证', submitTime: '2025-07-10 09:12', status: '待审核' },
  { id: 'C002', applicant: '咖啡达人', phone: '139****1002', type: '真人认证', submitTime: '2025-07-10 09:30', status: '待审核' },
  { id: 'C003', applicant: '健身Lily', phone: '136****1004', type: '职业认证', submitTime: '2025-07-10 10:48', status: '待审核' },
  { id: 'C004', applicant: '瑜伽小筑', phone: '135****1005', type: '实名认证', submitTime: '2025-07-10 11:20', status: '待审核' },
  { id: 'C005', applicant: '摄影大狮', phone: '134****1006', type: '真人认证', submitTime: '2025-07-10 11:55', status: '待审核' },
  { id: 'C006', applicant: '美食家', phone: '132****1008', type: '职业认证', submitTime: '2025-07-10 13:00', status: '待审核' },
  { id: 'C007', applicant: '林夏', phone: '131****1009', type: '实名认证', submitTime: '2025-07-10 08:20', status: '已通过' },
  { id: 'C008', applicant: '阿杰', phone: '130****1010', type: '真人认证', submitTime: '2025-07-09 16:40', status: '已通过' },
  // 技能认证 - 自动认证记录
  { id: 'C009', applicant: '晨光伙伴', phone: '138****1001', type: '技能认证', submitTime: '2025-07-09 14:15', status: '已通过', autoDetail: '看展同行 满10单五星好评 自动认证' },
  { id: 'C010', applicant: '咖啡达人', phone: '139****1002', type: '技能认证', submitTime: '2025-07-08 11:08', status: '已通过', autoDetail: '咖啡探店 满10单五星好评 自动认证' },
  { id: 'C011', applicant: '徒步老王', phone: '137****1003', type: '技能认证', submitTime: '2025-07-10 09:50', status: '认证中', autoDetail: '城市徒步 7/10单五星好评 认证进度70%' },
  { id: 'C012', applicant: '健身Lily', phone: '136****1004', type: '技能认证', submitTime: '2025-07-09 18:22', status: '认证中', autoDetail: '健身指导 5/10单五星好评 认证进度50%' },
  { id: 'C013', applicant: '柚子', phone: '137****1013', type: '实名认证', submitTime: '2025-07-09 09:50', status: '已拒绝' },
  { id: 'C014', applicant: '阿澈', phone: '136****1014', type: '真人认证', submitTime: '2025-07-08 18:22', status: '已拒绝' },
  { id: 'C015', applicant: '南希', phone: '135****1015', type: '职业认证', submitTime: '2025-07-08 15:30', status: '已拒绝' },
];

export default function AdminCertifications() {
  const [search, setSearch] = useState('');
  const [typeTab, setTypeTab] = useState('全部');
  const [statusTab, setStatusTab] = useState('待审核');

  let filtered = mockCerts;
  if (search) filtered = filtered.filter(c => c.applicant.includes(search) || c.phone.includes(search));
  if (typeTab !== '全部') filtered = filtered.filter(c => c.type === typeTab);
  if (statusTab !== '全部') filtered = filtered.filter(c => c.status === statusTab);

  const getStatusStyle = (s: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      '待审核': { bg: '#FEF3C7', color: '#F59E0B' },
      '认证中': { bg: '#F3E8FF', color: '#A855F7' },
      '已通过': { bg: '#D1FAE5', color: '#10B981' },
      '已拒绝': { bg: '#FEE2E2', color: '#EF4444' },
    };
    return map[s] || { bg: '#F3F4F6', color: '#6B7280' };
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page-header">
          <h1 className="admin-page-title">认证审核</h1>
          <span className="admin-page-count">共 {filtered.length} 条记录</span>
        </div>

        {/* 技能认证自动认证说明横幅 */}
        <div style={{ background: 'linear-gradient(135deg, #F3E8FF, #FFF7ED)', border: '1px solid #E9D5FF', borderRadius: 14, padding: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Zap size={20} style={{ color: '#A855F7', flexShrink: 0 }} />
          <div>
            <strong style={{ fontSize: 14, color: '#22242a' }}>技能认证为系统自动认证</strong>
            <p style={{ fontSize: 13, color: '#565a66', margin: '4px 0 0', lineHeight: 1.5 }}>
              技能认证无需人工审核，系统自动检测：每个服务子类目满<strong style={{ color: '#A855F7' }}>10单五星好评</strong>即自动通过认证。
              下方仅展示认证记录和进度，不支持人工通过/拒绝操作。
            </p>
          </div>
        </div>

        {/* 统计条 */}
        <div className="admin-cert-stats-row">
          <div className="admin-cert-stat-box"><span>待审核</span><span style={{ color: '#F59E0B' }}>6</span></div>
          <div className="admin-cert-stat-box"><span>今日通过</span><span style={{ color: '#10B981' }}>8</span></div>
          <div className="admin-cert-stat-box"><span>今日拒绝</span><span style={{ color: '#EF4444' }}>2</span></div>
          <div className="admin-cert-stat-box"><span>累计通过</span><span>356</span></div>
        </div>

        {/* 认证统计 */}
        <div className="admin-cert-stats">
          <div className="admin-cert-stat-item"><span className="admin-cert-badge" style={{ background: '#10B98115', color: '#10B981' }}>实</span><span>实名认证 356人</span></div>
          <div className="admin-cert-stat-item"><span className="admin-cert-badge" style={{ background: '#FF7A4515', color: '#FF7A45' }}>真</span><span>真人认证 280人</span></div>
          <div className="admin-cert-stat-item"><span className="admin-cert-badge" style={{ background: '#A855F715', color: '#A855F7' }}>技</span><span>技能认证 195人</span></div>
          <div className="admin-cert-stat-item"><span className="admin-cert-badge" style={{ background: '#3B82F615', color: '#3B82F6' }}>职</span><span>职业认证 120人</span></div>
        </div>

        {/* 搜索+筛选 */}
        <div className="admin-toolbar">
          <div className="admin-search-wrap">
            <Search size={18} style={{ color: '#8E8E93' }} />
            <input className="admin-search-input" placeholder="搜索申请人、手机号" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="admin-filter-tabs">
          {['全部', '实名认证', '真人认证', '技能认证', '职业认证'].map(t => (
            <button key={t} className={typeTab === t ? 'active' : ''} onClick={() => setTypeTab(t)}>{t}</button>
          ))}
        </div>

        <div className="admin-filter-tabs" style={{ marginTop: -8 }}>
          {['全部', '待审核', '认证中', '已通过', '已拒绝'].map(t => (
            <button key={t} className={statusTab === t ? 'active' : ''} onClick={() => setStatusTab(t)}>{t}</button>
          ))}
        </div>

        {/* 审核列表 */}
        <div className="admin-table">
          <table>
            <thead><tr>
              <th>申请人</th><th>手机号</th><th>认证类型</th><th>认证详情</th><th>提交时间</th><th>状态</th><th>操作</th>
            </tr></thead>
            <tbody>
              {filtered.map(c => {
                const isSkill = c.type === '技能认证';
                const isAuto = isSkill; // 技能认证自动
                return (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 500 }}>{c.applicant}</td>
                    <td style={{ color: '#8E8E93' }}>{c.phone}</td>
                    <td>
                      <span className="admin-status-tag" style={{ background: `${certTypes.find(t => t.key === c.type)?.color}15`, color: certTypes.find(t => t.key === c.type)?.color }}>
                        {isAuto && <Zap size={10} style={{ verticalAlign: 'middle', marginRight: 2 }} />}
                        {c.type}
                      </span>
                    </td>
                    <td style={{ fontSize: 13, color: '#565a66' }}>{(c as any).autoDetail || '-'}</td>
                    <td style={{ color: '#8E8E93' }}>{c.submitTime}</td>
                    <td><span className="admin-status-tag" style={{ background: getStatusStyle(c.status).bg, color: getStatusStyle(c.status).color }}>{c.status}</span></td>
                    <td><div className="admin-action-btns">
                      {c.status === '待审核' && !isAuto && (
                        <>
                          <button className="admin-action-btn approve" title="通过" onClick={() => alert('已通过')}><Check size={14} /></button>
                          <button className="admin-action-btn reject" title="拒绝" onClick={() => alert('已拒绝')}><X size={14} /></button>
                        </>
                      )}
                      {isAuto && c.status === '认证中' && (
                        <span style={{ fontSize: 12, color: '#A855F7', display: 'flex', alignItems: 'center', gap: 4 }}><Zap size={12} />自动</span>
                      )}
                      <button className="admin-action-btn view" title="查看详情" onClick={() => alert(`查看认证详情：${c.applicant} - ${c.type}`)}><Eye size={14} /></button>
                    </div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
