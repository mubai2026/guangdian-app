import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ShoppingCart, DollarSign, TrendingUp, Gift, UserCheck, ArrowUpRight, ArrowDownRight, AlertTriangle } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, activeUsers: 0, orders: 0, revenue: 0, mentors: 0, blindbox: 0, complaint: 0 });

  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    // 首次加载
    const timer = setTimeout(() => {
      setStats({ users: 12580, activeUsers: 8932, orders: 3652, revenue: 286540, mentors: 1890, blindbox: 486, complaint: 23 });
      setLastUpdate(new Date().toLocaleTimeString('zh-CN'));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // 实时刷新：每30秒更新数据
  useEffect(() => {
    const refreshTimer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        users: prev.users + Math.floor(Math.random() * 3),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5),
        orders: prev.orders + Math.floor(Math.random() * 2),
        revenue: prev.revenue + Math.floor(Math.random() * 200),
        mentors: prev.mentors,
        blindbox: prev.blindbox + (Math.random() > 0.7 ? 1 : 0),
        complaint: Math.max(0, prev.complaint + (Math.random() > 0.5 ? 1 : -1)),
      }));
      setLastUpdate(new Date().toLocaleTimeString('zh-CN'));
    }, 30000);
    return () => clearInterval(refreshTimer);
  }, []);

  const statCards = [
    { label: '注册用户', value: stats.users, icon: Users, color: '#3B82F6', trend: '+12.5%', up: true, link: '/admin/users' },
    { label: '活跃用户', value: stats.activeUsers, icon: UserCheck, color: '#10B981', trend: '+8.2%', up: true, link: '/admin/users' },
    { label: '订单总数', value: stats.orders, icon: ShoppingCart, color: '#FF7A45', trend: '+15.3%', up: true, link: '/admin/orders' },
    { label: '平台收入', value: stats.revenue, icon: DollarSign, color: '#F59E0B', trend: '+22.1%', up: true, prefix: '¥', link: '/admin/orders' },
    { label: '伙伴数', value: stats.mentors, icon: TrendingUp, color: '#A855F7', trend: '+5.6%', up: true, link: '/admin/mentors' },
    { label: '盲盒订单', value: stats.blindbox, icon: Gift, color: '#EC4899', trend: '-3.2%', up: false, link: '/admin/blindbox' },
  ];

  // 投诉工单 - 宽卡片(跨2列)，带进度条
  const complaintData = { pending: 8, processing: 5, done: 10, total: 23 };

  const weekData = [320, 450, 380, 520, 480, 610, 590];
  const lastWeekData = [280, 360, 320, 420, 400, 480, 450]; // 上周数据
  const weekLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const maxBar = Math.max(...weekData);

  const revenueData = [28000, 35000, 32000, 42000, 38000, 48000, 52000];
  const maxRev = Math.max(...revenueData);

  const categories = [
    { name: '运动健身', percent: 28, color: '#FF7A45' },
    { name: '看展同行', percent: 22, color: '#A855F7' },
    { name: '咖啡探店', percent: 18, color: '#3B82F6' },
    { name: '城市徒步', percent: 15, color: '#10B981' },
    { name: '其他', percent: 17, color: '#F59E0B' },
  ];

  const recentOrders = [
    { id: 'ORD20250710001', service: '看展同行', user: '林夏', mentor: '晨光伙伴', amount: 158, status: '进行中', time: '2分钟前' },
    { id: 'ORD20250710002', service: '咖啡探店', user: '阿澈', mentor: '咖啡达人', amount: 98, status: '已完成', time: '15分钟前' },
    { id: 'ORD20250710003', service: '城市徒步', user: '南希', mentor: '徒步老王', amount: 188, status: '待接单', time: '30分钟前' },
    { id: 'ORD20250710004', service: '盲盒惊喜', user: '晴天', mentor: '待匹配', amount: 99, status: '匹配中', time: '1小时前' },
    { id: 'ORD20250710005', service: '健身指导', user: '柚子', mentor: '健身教练Lily', amount: 258, status: '已完成', time: '2小时前' },
  ];

  const activities = [
    { text: '新用户"小光"完成注册', time: '1分钟前', color: '#3B82F6' },
    { text: '伙伴"晨光伙伴"通过真人认证', time: '5分钟前', color: '#10B981' },
    { text: '订单ORD20250710001已接单', time: '10分钟前', color: '#FF7A45' },
    { text: '用户"南希"发布新需求', time: '20分钟前', color: '#A855F7' },
    { text: '盲盒订单#486匹配成功', time: '35分钟前', color: '#EC4899' },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '待接单': return { bg: '#FEF3C7', color: '#F59E0B' };
      case '进行中': return { bg: '#DBEAFE', color: '#3B82F6' };
      case '已完成': return { bg: '#D1FAE5', color: '#10B981' };
      case '匹配中': return { bg: '#FCE7F3', color: '#EC4899' };
      default: return { bg: '#F3F4F6', color: '#6B7280' };
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page-header">
          <h1 className="admin-page-title">数据总览</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 13, color: '#10B981', fontWeight: 600 }}>实时</span>
            <span style={{ fontSize: 12, color: '#8E8E93' }}>最后更新: {lastUpdate || '加载中...'}</span>
          </div>
        </div>

        {/* 核心指标 */}
        <div className="admin-stats-grid">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div className="admin-stat-card" key={card.label} style={{ cursor: 'pointer' }} onClick={() => card.link && navigate(card.link)}>
                <div className="admin-stat-icon" style={{ background: `${card.color}15` }}>
                  <Icon size={22} style={{ color: card.color }} />
                </div>
                <div className="admin-stat-content">
                  <span className="admin-stat-label">{card.label}</span>
                  <span className="admin-stat-value">{card.prefix || ''}{card.value.toLocaleString()}</span>
                  <div className={`admin-stat-trend ${card.up ? 'up' : 'down'}`}>
                    {card.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <span>{card.trend}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {/* 投诉工单宽卡片 - 跨2列 */}
          <div className="admin-stat-card admin-stat-card-wide" style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/users')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
              <div className="admin-stat-icon" style={{ background: '#EF444415' }}>
                <AlertTriangle size={22} style={{ color: '#EF4444' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#8E8E93' }}>投诉工单</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#22242a' }}>{complaintData.total}</div>
              </div>
              <div className="admin-stat-trend down" style={{ marginRight: 8 }}>
                <ArrowDownRight size={14} />
                <span>-8.5%</span>
              </div>
            </div>
            {/* 进度条可视化 */}
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: '#F59E0B' }}>待跟进</span>
                  <span style={{ color: '#F59E0B', fontWeight: 600 }}>{complaintData.pending}</span>
                </div>
                <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${(complaintData.pending / complaintData.total) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #F59E0B, #FBBF24)', borderRadius: 4 }} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: '#3B82F6' }}>处理中</span>
                  <span style={{ color: '#3B82F6', fontWeight: 600 }}>{complaintData.processing}</span>
                </div>
                <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${(complaintData.processing / complaintData.total) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #3B82F6, #60A5FA)', borderRadius: 4 }} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: '#10B981' }}>已处理</span>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>{complaintData.done}</span>
                </div>
                <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${(complaintData.done / complaintData.total) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #10B981, #34D399)', borderRadius: 4 }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 图表区域 */}
        <div className="admin-charts-row">
          {/* 订单趋势柱状图 */}
          <div className="admin-chart-card">
            <h3 className="admin-chart-title">近7天订单趋势</h3>
            <div style={{ marginBottom: 12, display: 'flex', gap: 16, fontSize: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: 'linear-gradient(to top, #FF7A45, #FFB088)' }} />
                <span style={{ color: '#565a66' }}>本周</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: 'linear-gradient(to top, #A855F7, #C084FC)' }} />
                <span style={{ color: '#565a66' }}>上周</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 200, padding: '0 8px' }}>
              {weekData.map((val, i) => {
                const last = lastWeekData[i];
                const maxVal = Math.max(maxBar, ...lastWeekData);
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: 4 }}>
                    <div style={{ fontSize: 10, color: '#8E8E93', fontWeight: 600 }}>{val}</div>
                    <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 160 }}>
                      <div style={{ width: 16, height: `${(val / maxVal) * 140}px`, background: 'linear-gradient(to top, #FF7A45, #FFB088)', borderRadius: '4px 4px 0 0' }} />
                      <div style={{ width: 16, height: `${(last / maxVal) * 140}px`, background: 'linear-gradient(to top, #A855F7, #C084FC)', borderRadius: '4px 4px 0 0', opacity: 0.6 }} />
                    </div>
                    <span style={{ fontSize: 11, color: '#8E8E93' }}>{weekLabels[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 收入趋势 */}
          <div className="admin-chart-card">
            <h3 className="admin-chart-title">近7天收入趋势</h3>
            <div className="admin-line-chart">
              <svg viewBox="0 0 350 200" style={{ width: '100%', height: '200px' }}>
                <polyline
                  points={revenueData.map((v, i) => `${(i / (revenueData.length - 1)) * 320 + 15},${200 - (v / maxRev) * 160 - 20}`).join(' ')}
                  fill="none" stroke="#10B981" strokeWidth="2.5"
                />
                {revenueData.map((v, i) => (
                  <circle key={i} cx={(i / (revenueData.length - 1)) * 320 + 15} cy={200 - (v / maxRev) * 160 - 20} r="4" fill="#10B981" />
                ))}
                {revenueData.map((v, i) => (
                  <text key={i} x={(i / (revenueData.length - 1)) * 320 + 15} y={200 - (v / maxRev) * 160 - 30} textAnchor="middle" fontSize="10" fill="#8E8E93">{(v / 1000).toFixed(1)}k</text>
                ))}
              </svg>
              <div className="admin-line-labels">
                {weekLabels.map(l => <span key={l}>{l}</span>)}
              </div>
            </div>
          </div>

          {/* 订单类别分布 */}
          <div className="admin-chart-card">
            <h3 className="admin-chart-title">订单类别分布</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '10px 0' }}>
              {/* 甜甜圈饼图 - 中间显示总数 */}
              <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: `conic-gradient(${categories.map((c, i) => {
                    const start = categories.slice(0, i).reduce((s: number, x: any) => s + x.percent, 0);
                    return `${c.color} ${start * 3.6}deg ${(start + c.percent) * 3.6}deg`;
                  }).join(', ')})`
                }} />
                {/* 内圆 - 空心效果 */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  width: 90, height: 90, borderRadius: '50%', background: '#fff',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <span style={{ fontSize: 11, color: '#8E8E93' }}>总订单</span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: '#22242a' }}>3,652</span>
                </div>
              </div>
              {/* 图例 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {categories.map(c => (
                  <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#565a66', flex: 1 }}>{c.name}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#22242a' }}>{c.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 服务项目趋势分析 */}
        <div className="admin-section" style={{ padding: 20 }}>
          <h2 className="admin-section-title">服务项目趋势分析</h2>
          <p style={{ fontSize: 13, color: '#8E8E93', margin: '0 0 16px' }}>近30天各服务类目订单量趋势，识别增长项目与冷门项目</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { name: '咖啡探店', count: 386, trend: 28, color: '#FF7A45', spark: [8,12,10,15,18,22,25,28,30,35] },
              { name: '看展同行', count: 312, trend: 15, color: '#A855F7', spark: [10,12,15,14,16,18,20,22,24,25] },
              { name: '城市徒步', count: 285, trend: 8, color: '#3B82F6', spark: [12,14,13,15,16,18,17,20,22,24] },
              { name: '健身指导', count: 220, trend: 5, color: '#10B981', spark: [15,16,15,17,18,19,18,20,21,22] },
              { name: '瑜伽课程', count: 168, trend: -3, color: '#F59E0B', spark: [20,18,19,17,18,16,17,15,16,15] },
              { name: '摄影跟拍', count: 95, trend: -12, color: '#EF4444', spark: [12,10,11,9,10,8,9,7,8,7] },
              { name: '晨跑陪练', count: 62, trend: -8, color: '#EC4899', spark: [8,7,8,6,7,5,6,5,6,5] },
              { name: '美食探店', count: 45, trend: -20, color: '#6B7280', spark: [6,5,6,4,5,4,3,4,3,3] },
            ].concat([{ name: "添加项目", addCard: true, color: "#E5E5EA" } as any]).map(item => {
              const maxSpark = (item as any).spark ? Math.max(...item.spark) : 1;
              const points = (item as any).spark ? item.spark.map((v: number, i: number) => `${(i / (item.spark.length - 1)) * 180 + 10},${50 - (v / maxSpark) * 40}`).join(' ') : '';
              return (
                <div key={item.name} style={(item as any).addCard
                  ? { background: '#FAFAFC', borderRadius: 12, padding: 14, border: '2px dashed #D1D1D6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 140, cursor: 'pointer', transition: 'all 0.2s' }
                  : { background: '#f8f9fc', borderRadius: 12, padding: 14, border: `2px solid ${item.trend > 0 ? item.color + '20' : '#FEE2E2'}` }}
                  onMouseEnter={(e) => { if ((item as any).addCard) { e.currentTarget.style.borderColor = '#FF7A45'; e.currentTarget.style.background = '#FFF7ED'; } }}
                  onMouseLeave={(e) => { if ((item as any).addCard) { e.currentTarget.style.borderColor = '#D1D1D6'; e.currentTarget.style.background = '#FAFAFC'; } }}
                  onClick={() => { if ((item as any).addCard) { alert('跳转到服务类目管理页面'); } }}
                >
                  {(item as any).addCard ? (
                    <>
                      <div style={{ fontSize: 32, color: '#C0C0C5', marginBottom: 8, fontWeight: 300 }}>+</div>
                      <span style={{ fontSize: 13, color: '#8E8E93' }}>添加分析项目</span>
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#22242a' }}>{item.name}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: item.trend > 0 ? '#10B981' : '#EF4444' }}>
                          {item.trend > 0 ? '↗' : '↘'} {Math.abs(item.trend)}%
                        </span>
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: item.color, marginBottom: 8 }}>{item.count}<span style={{ fontSize: 12, color: '#8E8E93', fontWeight: 400 }}> 单</span></div>
                      <svg viewBox="0 0 200 50" style={{ width: '100%', height: 40 }}>
                        <polyline points={points} fill="none" stroke={item.color} strokeWidth="2" />
                        <polyline points={`10,50 ${points} 190,50`} fill={`${item.color}10`} stroke="none" />
                      </svg>
                      <div style={{ fontSize: 11, color: '#8E8E93', marginTop: 4 }}>
                        {item.trend > 15 ? '🔥 热门增长' : item.trend > 0 ? '📈 稳定增长' : item.trend > -10 ? '⚠️ 需关注' : '❄️ 冷门下滑'}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 最近订单 + 实时动态 */}
        <div className="admin-bottom-row">
          <div className="admin-section">
            <h2 className="admin-section-title">最近订单</h2>
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>订单号</th><th>服务类型</th><th>用户</th><th>伙伴</th><th>金额</th><th>状态</th><th>时间</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(o => (
                    <tr key={o.id}>
                      <td>{o.id}</td><td>{o.service}</td><td>{o.user}</td><td>{o.mentor}</td>
                      <td style={{ color: '#FF7A45', fontWeight: 600 }}>¥{o.amount}</td>
                      <td><span className="admin-status-tag" style={{ background: getStatusStyle(o.status).bg, color: getStatusStyle(o.status).color }}>{o.status}</span></td>
                      <td style={{ color: '#8E8E93' }}>{o.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-section">
            <h2 className="admin-section-title">实时动态</h2>
            <div className="admin-timeline">
              {activities.map((a, i) => (
                <div className="admin-timeline-item" key={i}>
                  <div className="admin-timeline-dot" style={{ background: a.color }} />
                  <div className="admin-timeline-content">
                    <span>{a.text}</span>
                    <span className="admin-timeline-time">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
