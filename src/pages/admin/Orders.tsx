import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const services = ['看展同行', '咖啡探店', '城市徒步', '健身指导', '盲盒惊喜', '晨跑陪练', '瑜伽课程', '摄影跟拍'];
const statuses = ['待接单', '已接单', '进行中', '已完成', '已取消'];
const cities = ['上海', '北京', '广州', '深圳', '杭州', '成都', '南京', '武汉'];
const userLevels = ['普通用户', 'VIP会员', '季度会员', '年度VIP'];

const mockOrders = Array.from({ length: 30 }, (_, i) => ({
  id: `ORD2025${String(710000 + i).padStart(6, '0')}`,
  user: ['小光', '南希', '阿澈', '柚子', '晴天'][i % 5],
  mentor: ['晨光伙伴', '咖啡达人', '徒步老王', '健身Lily', '待匹配'][i % 5],
  service: services[i % services.length],
  duration: [120, 180, 240, 360][i % 4],
  amount: [88, 98, 128, 158, 188, 258, 99][i % 7],
  createTime: `2025-07-${String((i % 30) + 1).padStart(2, '0')} ${String(10 + (i % 10)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`,
  status: statuses[i % statuses.length],
  rating: i % 3 === 0 ? (i % 5) + 1 : 0,
  city: cities[i % cities.length],
  userLevel: userLevels[i % userLevels.length],
}));

export default function AdminOrders() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState('全部');
  const [serviceFilter, setServiceFilter] = useState('全部');
  const [cityFilter, setCityFilter] = useState('全部');
  const [levelFilter, setLevelFilter] = useState('全部');
  const pageSize = 10;

  let filtered = mockOrders;
  if (search) filtered = filtered.filter(o => o.id.includes(search) || o.user.includes(search) || o.mentor.includes(search));
  if (statusTab !== '全部') filtered = filtered.filter(o => o.status === statusTab);
  if (serviceFilter !== '全部') filtered = filtered.filter(o => o.service === serviceFilter);
  if (cityFilter !== '全部') filtered = filtered.filter(o => o.city === cityFilter);
  if (levelFilter !== '全部') filtered = filtered.filter(o => o.userLevel === levelFilter);

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const getStatusStyle = (s: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      '待接单': { bg: '#FEF3C7', color: '#F59E0B' },
      '已接单': { bg: '#E0E7FF', color: '#6366F1' },
      '进行中': { bg: '#DBEAFE', color: '#3B82F6' },
      '已完成': { bg: '#D1FAE5', color: '#10B981' },
      '已取消': { bg: '#F3F4F6', color: '#6B7280' },
    };
    return map[s] || { bg: '#F3F4F6', color: '#6B7280' };
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page-header">
          <h1 className="admin-page-title">订单监控</h1>
          <span className="admin-page-count">共 {total} 笔订单</span>
        </div>

        <div className="admin-toolbar">
          <div className="admin-search-wrap">
            <Search size={18} style={{ color: '#8E8E93' }} />
            <input className="admin-search-input" placeholder="搜索订单号、用户、伙伴" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select className="admin-select" value={serviceFilter} onChange={(e) => { setServiceFilter(e.target.value); setPage(1); }}>
            <option value="全部">全部服务</option>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="admin-select" value={cityFilter} onChange={(e) => { setCityFilter(e.target.value); setPage(1); }}>
            <option value="全部">全部城市</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="admin-select" value={levelFilter} onChange={(e) => { setLevelFilter(e.target.value); setPage(1); }}>
            <option value="全部">全部等级</option>
            {userLevels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <div className="admin-filter-tabs">
          {['全部', ...statuses].map(t => (
            <button key={t} className={statusTab === t ? 'active' : ''} onClick={() => { setStatusTab(t); setPage(1); }}>{t}</button>
          ))}
        </div>

        <div className="admin-table">
          <table>
            <thead><tr>
              <th>订单号</th><th>用户</th><th>城市</th><th>等级</th><th>伙伴</th><th>服务</th><th>时长</th><th>金额</th><th>下单时间</th><th>状态</th><th>评分</th><th>操作</th>
            </tr></thead>
            <tbody>
              {pageData.map(o => (
                <tr key={o.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/orders/${o.id}`)}>
                  <td style={{ fontFamily: 'monospace', color: '#8E8E93' }}>{o.id}</td>
                  <td>{o.user}</td>
                  <td>{o.city}</td>
                  <td><span className="admin-status-tag" style={{ background: '#EEF2FF', color: '#6366F1' }}>{o.userLevel}</span></td>
                  <td>{o.mentor}</td>
                  <td><span className="admin-status-tag" style={{ background: '#FFF7ED', color: '#FF7A45' }}>{o.service}</span></td>
                  <td style={{ color: '#8E8E93' }}>{o.duration / 60}小时</td>
                  <td style={{ color: '#FF7A45', fontWeight: 600 }}>¥{o.amount}</td>
                  <td style={{ color: '#8E8E93' }}>{o.createTime}</td>
                  <td><span className="admin-status-tag" style={{ background: getStatusStyle(o.status).bg, color: getStatusStyle(o.status).color }}>{o.status}</span></td>
                  <td>{o.rating ? <span style={{ color: '#F59E0B' }}>{'★'.repeat(o.rating)}</span> : <span style={{ color: '#E5E5EA' }}>-</span>}</td>
                  <td onClick={(e) => e.stopPropagation()}><button className="admin-action-btn view" onClick={() => navigate(`/admin/orders/${o.id}`)}><Eye size={14} /></button></td>
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
