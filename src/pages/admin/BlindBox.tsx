import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Gift, Search, Eye, RefreshCw } from 'lucide-react';

const mockBlindBox = Array.from({ length: 20 }, (_, i) => ({
  id: `BLIND${String(50001 + i).padStart(5, '0')}`,
  user: ['小光', '南希', '阿澈', '柚子', '晴天'][i % 5],
  mentor: i % 3 === 0 ? '待匹配' : ['晨光伙伴', '咖啡达人', '徒步老王'][i % 3],
  amount: [99, 129, 159, 199][i % 4],
  time: `2025-07-${String((i % 30) + 1).padStart(2, '0')} ${String(10 + i % 10).padStart(2, '0')}:00`,
  status: ['匹配中', '进行中', '已匹配', '已完成', '已退款'][i % 5],
}));

const stats = [
  { label: '盲盒总订单', value: 486, icon: Gift, color: '#EC4899' },
  { label: '本月订单', value: 128, icon: Gift, color: '#FF7A45' },
  { label: '匹配成功率', value: '94.2%', icon: RefreshCw, color: '#10B981' },
  { label: '盲盒收入', value: '¥52,840', icon: Gift, color: '#F59E0B' },
];

export default function AdminBlindBox() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('全部');
  const pageSize = 10;

  let filtered = mockBlindBox;
  if (search) filtered = filtered.filter(o => o.id.includes(search) || o.user.includes(search));
  if (tab !== '全部') filtered = filtered.filter(o => o.status === tab);

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const getStatusStyle = (s: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      '匹配中': { bg: '#FCE7F3', color: '#EC4899' },
      '进行中': { bg: '#FEF3C7', color: '#F59E0B' },
      '已匹配': { bg: '#DBEAFE', color: '#3B82F6' },
      '已完成': { bg: '#D1FAE5', color: '#10B981' },
      '已退款': { bg: '#FEE2E2', color: '#EF4444' },
    };
    return map[s] || { bg: '#F3F4F6', color: '#6B7280' };
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page-header">
          <h1 className="admin-page-title">盲盒管理</h1>
          <span className="admin-page-count">共 {total} 笔盲盒订单</span>
        </div>

        <div className="admin-stats-grid">
          {stats.map(s => {
            const I = s.icon;
            return (
              <div className="admin-stat-card" key={s.label}>
                <div className="admin-stat-icon" style={{ background: `${s.color}15` }}><I size={22} style={{ color: s.color }} /></div>
                <div className="admin-stat-content">
                  <span className="admin-stat-label">{s.label}</span>
                  <span className="admin-stat-value">{s.value}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="admin-toolbar">
          <div className="admin-search-wrap">
            <Search size={18} style={{ color: '#8E8E93' }} />
            <input className="admin-search-input" placeholder="搜索订单号、用户" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
        </div>

        <div className="admin-filter-tabs">
          {['全部', '匹配中', '进行中', '已匹配', '已完成', '已退款'].map(t => (
            <button key={t} className={tab === t ? 'active' : ''} onClick={() => { setTab(t); setPage(1); }}>{t}</button>
          ))}
        </div>

        <div className="admin-table">
          <table>
            <thead><tr><th>订单号</th><th>用户</th><th>匹配伙伴</th><th>金额</th><th>下单时间</th><th>状态</th><th>操作</th></tr></thead>
            <tbody>
              {pageData.map(o => (
                <tr key={o.id}>
                  <td style={{ fontFamily: 'monospace', color: '#8E8E93' }}>{o.id}</td>
                  <td>{o.user}</td>
                  <td>{o.mentor}</td>
                  <td style={{ color: '#FF7A45', fontWeight: 600 }}>¥{o.amount}</td>
                  <td style={{ color: '#8E8E93' }}>{o.time}</td>
                  <td><span className="admin-status-tag" style={{ background: getStatusStyle(o.status).bg, color: getStatusStyle(o.status).color }}>{o.status}</span></td>
                  <td><button className="admin-action-btn view" onClick={() => alert('查看盲盒订单详情')}><Eye size={14} /></button></td>
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
