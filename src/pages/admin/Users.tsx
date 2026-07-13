import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Eye, Lock, Unlock } from 'lucide-react';

const mockUsers = Array.from({ length: 30 }, (_, i) => ({
  id: `U${String(10001 + i).padStart(5, '0')}`,
  name: ['小光', '南希', '阿澈', '柚子', '晴天', '林夏', '老王', 'Lily', '阿杰', '小米'][i % 10] + (i > 9 ? i : ''),
  avatar: `/avatars/avatar${(i % 5) + 1}.png`,
  phone: `138${String(i).padStart(4, '0')}8888`,
  city: ['上海', '北京', '深圳', '杭州', '广州'][i % 5],
  type: i % 7 === 0 ? 'VIP用户' : i % 5 === 0 ? '伙伴' : '普通用户',
  level: (i % 5) + 1,
  orders: Math.floor(Math.random() * 50) + i,
  spent: Math.floor(Math.random() * 5000) + 500 + i * 100,
  registerTime: `2025-0${(i % 6) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
  status: i % 11 === 0 ? '冻结' : '正常',
}));

export default function AdminUsers() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');
  const pageSize = 10;

  let filtered = mockUsers;
  if (search) filtered = filtered.filter(u => u.name.includes(search) || u.phone.includes(search) || u.id.includes(search));
  if (statusFilter !== '全部') filtered = filtered.filter(u => u.status === statusFilter);

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const getTypeStyle = (type: string) => {
    if (type === 'VIP用户') return { bg: '#FEF3C7', color: '#F59E0B' };
    if (type === '伙伴') return { bg: '#F3E8FF', color: '#A855F7' };
    return { bg: '#F3F4F6', color: '#6B7280' };
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page-header">
          <h1 className="admin-page-title">用户管理</h1>
          <span className="admin-page-count">共 {total} 位用户</span>
        </div>

        <div className="admin-toolbar">
          <div className="admin-search-wrap">
            <Search size={18} style={{ color: '#8E8E93' }} />
            <input className="admin-search-input" placeholder="搜索用户ID、手机号、姓名" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <div className="admin-filter-tabs">
            {['全部', '正常', '冻结'].map(s => (
              <button key={s} className={statusFilter === s ? 'active' : ''} onClick={() => { setStatusFilter(s); setPage(1); }}>{s}</button>
            ))}
          </div>
        </div>

        <div className="admin-table">
          <table>
            <thead><tr>
              <th>用户信息</th><th>用户ID</th><th>手机号</th><th>城市</th><th>类型</th><th>等级</th><th>订单数</th><th>消费额</th><th>注册时间</th><th>状态</th><th>操作</th>
            </tr></thead>
            <tbody>
              {pageData.map(u => (
                <tr key={u.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/users/${u.id}`)}>
                  <td><div className="admin-user-cell"><img src={u.avatar} alt="" /><span>{u.name}</span></div></td>
                  <td style={{ fontFamily: 'monospace', color: '#8E8E93' }}>{u.id}</td>
                  <td style={{ color: '#8E8E93' }}>{u.phone}</td>
                  <td>{u.city}</td>
                  <td><span className="admin-status-tag" style={{ background: getTypeStyle(u.type).bg, color: getTypeStyle(u.type).color }}>{u.type}</span></td>
                  <td style={{ color: '#F59E0B', fontWeight: 600 }}>LV{u.level}</td>
                  <td>{u.orders}</td>
                  <td style={{ color: '#FF7A45', fontWeight: 600 }}>¥{u.spent.toLocaleString()}</td>
                  <td style={{ color: '#8E8E93' }}>{u.registerTime}</td>
                  <td><span className="admin-status-tag" style={{ background: u.status === '正常' ? '#D1FAE5' : '#FEE2E2', color: u.status === '正常' ? '#10B981' : '#EF4444' }}>{u.status}</span></td>
                  <td onClick={(e) => e.stopPropagation()}><div className="admin-action-btns">
                    <button className="admin-action-btn view"><Eye size={14} /></button>
                    {u.status === '正常'
                      ? <button className="admin-action-btn freeze"><Lock size={14} /></button>
                      : <button className="admin-action-btn unfreeze"><Unlock size={14} /></button>}
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-pagination">
          <span className="admin-page-info">第 {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)} 条，共 {total} 条</span>
          <div className="admin-page-btns">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft size={16} /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} className={p === page ? 'active' : ''} onClick={() => setPage(p)}>{p}</button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
