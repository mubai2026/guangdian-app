import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { Search, Eye, Check, X, Ban, ShieldOff, RotateCcw, Star } from 'lucide-react';

const mockMentors = Array.from({ length: 25 }, (_, i) => ({
  id: `M${String(20001 + i).padStart(5, '0')}`,
  name: ['晨光伙伴', '咖啡达人', '徒步老王', '健身Lily', '瑜伽小筑', '摄影大狮', '看展向导', '美食家'][i % 8] + (i > 7 ? i : ''),
  avatar: `/avatars/avatar${(i % 5) + 1}.png`,
  phone: `139${String(i).padStart(4, '0')}6666`,
  city: ['上海', '北京', '深圳', '杭州', '广州'][i % 5],
  certs: { realname: true, realperson: i % 3 !== 0, skill: i % 2 === 0, pro: i % 4 === 0 },
  level: (i % 4) + 1,
  orders: Math.floor(Math.random() * 200) + i * 5,
  rating: (4 + Math.random()).toFixed(1),
  creditScore: 60 + Math.floor(Math.random() * 40),
  applyTime: `2025-0${(i % 6) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
  status: i % 5 === 0 ? '待审核' : i % 7 === 0 ? '已拒绝' : i % 9 === 0 ? '已关停' : i % 11 === 0 ? '限制接单' : '正常',
  priority: i % 6 === 0, // 是否优先推荐
}));

const certConfig = [
  { key: 'realname', label: '实', color: '#10B981' },
  { key: 'realperson', label: '真', color: '#FF7A45' },
  { key: 'skill', label: '技', color: '#A855F7' },
  { key: 'pro', label: '职', color: '#3B82F6' },
];

const levelNames = ['见习', '正式', '资深', '金牌'];

export default function AdminMentors() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('全部');
  const pageSize = 10;

  let filtered = mockMentors;
  if (search) filtered = filtered.filter(m => m.name.includes(search) || m.phone.includes(search));
  if (tab !== '全部') filtered = filtered.filter(m => m.status === tab);

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const getStatusStyle = (s: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      '正常': { bg: '#D1FAE5', color: '#10B981' },
      '待审核': { bg: '#FEF3C7', color: '#F59E0B' },
      '已拒绝': { bg: '#FEE2E2', color: '#EF4444' },
      '已关停': { bg: '#F3F4F6', color: '#6B7280' },
      '限制接单': { bg: '#FED7AA', color: '#EA580C' },
    };
    return map[s] || { bg: '#F3F4F6', color: '#6B7280' };
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page-header">
          <h1 className="admin-page-title">伙伴管理</h1>
          <span className="admin-page-count">共 {total} 位伙伴</span>
        </div>

        <div className="admin-toolbar">
          <div className="admin-search-wrap">
            <Search size={18} style={{ color: '#8E8E93' }} />
            <input className="admin-search-input" placeholder="搜索姓名、手机号" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <div className="admin-filter-tabs">
            {['全部', '正常', '限制接单', '已关停', '待审核', '已拒绝'].map(t => (
              <button key={t} className={tab === t ? 'active' : ''} onClick={() => { setTab(t); setPage(1); }}>{t}</button>
            ))}
          </div>
        </div>

        {/* 认证统计条 */}
        <div className="admin-cert-stats">
          <div className="admin-cert-stat-item"><span className="admin-cert-badge" style={{ background: '#10B98115', color: '#10B981' }}>实</span><span>实名认证 {mockMentors.filter(m => m.certs.realname).length}人</span></div>
          <div className="admin-cert-stat-item"><span className="admin-cert-badge" style={{ background: '#FF7A4515', color: '#FF7A45' }}>真</span><span>真人认证 {mockMentors.filter(m => m.certs.realperson).length}人</span></div>
          <div className="admin-cert-stat-item"><span className="admin-cert-badge" style={{ background: '#A855F715', color: '#A855F7' }}>技</span><span>技能认证 {mockMentors.filter(m => m.certs.skill).length}人</span></div>
          <div className="admin-cert-stat-item"><span className="admin-cert-badge" style={{ background: '#3B82F615', color: '#3B82F6' }}>职</span><span>职业认证 {mockMentors.filter(m => m.certs.pro).length}人</span></div>
        </div>

        <div className="admin-table">
          <table>
            <thead><tr>
              <th>伙伴</th><th>手机号</th><th>城市</th><th>认证</th><th>等级</th><th>信用分</th><th>订单</th><th>评分</th><th>优先</th><th>状态</th><th>操作</th>
            </tr></thead>
            <tbody>
              {pageData.map(m => (
                <tr key={m.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/partners/${m.id}`)}>
                  <td><div className="admin-user-cell"><img src={m.avatar} alt="" /><span>{m.name}</span></div></td>
                  <td style={{ color: '#8E8E93' }}>{m.phone}</td>
                  <td>{m.city}</td>
                  <td><div className="admin-cert-icons">
                    {certConfig.map(c => (
                      <span key={c.key} className="admin-cert-mini" style={{
                        background: (m.certs as any)[c.key] ? `${c.color}15` : 'transparent',
                        color: (m.certs as any)[c.key] ? c.color : '#E5E5EA',
                        borderColor: (m.certs as any)[c.key] ? c.color : '#E5E5EA',
                      }}>{c.label}</span>
                    ))}
                  </div></td>
                  <td style={{ color: '#F59E0B', fontWeight: 600 }}>Lv.{m.level} {levelNames[m.level - 1]}</td>
                  <td><span style={{ color: m.creditScore >= 80 ? '#10B981' : m.creditScore >= 60 ? '#F59E0B' : '#EF4444', fontWeight: 600 }}>{m.creditScore}</span></td>
                  <td>{m.orders}</td>
                  <td style={{ color: '#F59E0B' }}>★ {m.rating}</td>
                  <td>{m.priority ? <Star size={14} fill="#F59E0B" color="#F59E0B" /> : <span style={{ color: '#E5E5EA' }}>-</span>}</td>
                  <td><span className="admin-status-tag" style={{ background: getStatusStyle(m.status).bg, color: getStatusStyle(m.status).color }}>{m.status}</span></td>
                  <td onClick={(e) => e.stopPropagation()}><div className="admin-action-btns">
                    <button className="admin-action-btn view" title="查看详情" onClick={() => navigate(`/admin/partners/${m.id}`)}><Eye size={14} /></button>
                    {m.status === '待审核' && <><button className="admin-action-btn approve" title="通过"><Check size={14} /></button><button className="admin-action-btn reject" title="拒绝"><X size={14} /></button></>}
                    {m.status === '正常' && <button className="admin-action-btn freeze" title="限制接单"><ShieldOff size={14} /></button>}
                    {m.status === '限制接单' && <button className="admin-action-btn unfreeze" title="恢复正常"><RotateCcw size={14} /></button>}
                    {m.status !== '已关停' && m.status !== '待审核' && <button className="admin-action-btn reject" title="关停账号"><Ban size={14} /></button>}
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-pagination">
          <span className="admin-page-info">第 {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)} 条，共 {total} 条</span>
          <div className="admin-page-btns">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} className={p === page ? 'active' : ''} onClick={() => setPage(p)}>{p}</button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>›</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
