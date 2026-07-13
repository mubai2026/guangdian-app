import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Search, Wallet, Coins, ArrowUpCircle, ArrowDownCircle, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';

// 模拟用户列表
const userList = ['全部用户', '小光', '南希', '阿澈', '柚子', '晴天', '林夏', '晨光伙伴', '咖啡达人', '徒步老王'];

// 充值记录 mock 数据（20条）
const rechargeRecords = Array.from({ length: 20 }, (_, i) => ({
  id: `RECH2025${String(710000 + i).padStart(6, '0')}`,
  user: ['小光', '南希', '阿澈', '柚子', '晴天'][i % 5],
  amount: [50, 100, 200, 500, 1000, 50, 300, 800, 150, 600][i % 10],
  payMethod: ['微信支付', '支付宝', '银行卡'][i % 3],
  status: ['成功', '处理中', '失败'][i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 2],
  arriveTime: `2025-07-${String((i % 28) + 1).padStart(2, '0')} ${String(9 + (i % 12)).padStart(2, '0')}:${String((i * 13) % 60).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`,
}));

// 消费记录 mock 数据（20条）
const consumeRecords = Array.from({ length: 20 }, (_, i) => ({
  id: `CONS2025${String(710000 + i).padStart(6, '0')}`,
  user: ['小光', '南希', '阿澈', '柚子', '晴天'][i % 5],
  amount: [88, 98, 128, 158, 188, 258, 99, 66, 199, 299][i % 10],
  type: ['下单', '盲盒', '退款'][i % 3],
  relatedOrder: `ORD2025${String(710000 + i * 2).padStart(6, '0')}`,
  time: `2025-07-${String((i % 28) + 1).padStart(2, '0')} ${String(10 + (i % 10)).padStart(2, '0')}:${String((i * 11) % 60).padStart(2, '0')}`,
}));

// 积分明细 mock 数据（20条）
const pointsRecords = Array.from({ length: 20 }, (_, i) => ({
  user: ['小光', '南希', '阿澈', '柚子', '晴天'][i % 5],
  points: [10, 20, 50, 100, -30, -50, 5, 30, 80, -20][i % 10],
  type: ['签到', '下单', '评价', '兑换', '活动'][i % 5],
  description: [
    '每日签到奖励',
    '订单完成赠送积分',
    '服务评价奖励积分',
    '积分兑换优惠券',
    '邀请好友活动奖励',
  ][i % 5],
  time: `2025-07-${String((i % 28) + 1).padStart(2, '0')} ${String(8 + (i % 14)).padStart(2, '0')}:${String((i * 9) % 60).padStart(2, '0')}`,
}));

export default function AdminWallet() {
  // 当前激活的 Tab
  const [activeTab, setActiveTab] = useState<'recharge' | 'consume' | 'points'>('recharge');
  // 搜索关键词
  const [search, setSearch] = useState('');
  // 用户筛选
  const [userFilter, setUserFilter] = useState('全部用户');
  // 分页
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // 根据当前 Tab 获取对应的数据
  const getCurrentData = () => {
    let data: any[] = [];
    if (activeTab === 'recharge') data = rechargeRecords;
    if (activeTab === 'consume') data = consumeRecords;
    if (activeTab === 'points') data = pointsRecords;

    // 搜索过滤
    if (search) {
      if (activeTab === 'recharge') {
        data = data.filter((item: any) => item.id.includes(search) || item.user.includes(search));
      } else if (activeTab === 'consume') {
        data = data.filter((item: any) => item.id.includes(search) || item.user.includes(search) || item.relatedOrder.includes(search));
      } else {
        data = data.filter((item: any) => item.user.includes(search) || item.description.includes(search));
      }
    }

    // 用户筛选
    if (userFilter !== '全部用户') {
      data = data.filter((item: any) => item.user === userFilter);
    }

    return data;
  };

  const filteredData = getCurrentData();
  const total = filteredData.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const pageData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  // Tab 切换时重置页码
  const handleTabChange = (tab: 'recharge' | 'consume' | 'points') => {
    setActiveTab(tab);
    setPage(1);
  };

  // 搜索或筛选变化时重置页码
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleUserFilterChange = (value: string) => {
    setUserFilter(value);
    setPage(1);
  };

  // 获取充值状态样式
  const getRechargeStatusStyle = (status: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      '成功': { bg: '#D1FAE5', color: '#10B981' },
      '处理中': { bg: '#DBEAFE', color: '#3B82F6' },
      '失败': { bg: '#FEE2E2', color: '#EF4444' },
    };
    return map[status] || { bg: '#F3F4F6', color: '#6B7280' };
  };

  // 获取消费类型样式
  const getConsumeTypeStyle = (type: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      '下单': { bg: '#FFF7ED', color: '#FF7A45' },
      '盲盒': { bg: '#FCE7F3', color: '#EC4899' },
      '退款': { bg: '#D1FAE5', color: '#10B981' },
    };
    return map[type] || { bg: '#F3F4F6', color: '#6B7280' };
  };

  // 获取积分变动类型样式
  const getPointsTypeStyle = (type: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      '签到': { bg: '#DBEAFE', color: '#3B82F6' },
      '下单': { bg: '#FFF7ED', color: '#FF7A45' },
      '评价': { bg: '#D1FAE5', color: '#10B981' },
      '兑换': { bg: '#FEE2E2', color: '#EF4444' },
      '活动': { bg: '#FCE7F3', color: '#EC4899' },
    };
    return map[type] || { bg: '#F3F4F6', color: '#6B7280' };
  };

  // 统计卡片数据
  const statCards = [
    { label: '总余额', value: '1,286,540', icon: Wallet, color: '#3B82F6', prefix: '¥' },
    { label: '总积分', value: '856,420', icon: Coins, color: '#F59E0B' },
    { label: '今日充值', value: '12,580', icon: ArrowUpCircle, color: '#10B981', prefix: '¥' },
    { label: '今日消费', value: '8,960', icon: ArrowDownCircle, color: '#EF4444', prefix: '¥' },
  ];

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* 页面标题 */}
        <div className="admin-page-header">
          <h1 className="admin-page-title">钱包管理</h1>
          <span className="admin-page-count">
            {activeTab === 'recharge' && `共 ${total} 条充值记录`}
            {activeTab === 'consume' && `共 ${total} 条消费记录`}
            {activeTab === 'points' && `共 ${total} 条积分明细`}
          </span>
        </div>

        {/* 统计卡片 */}
        <div className="admin-stats-grid">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div className="admin-stat-card" key={card.label}>
                <div className="admin-stat-icon" style={{ background: `${card.color}15` }}>
                  <Icon size={22} style={{ color: card.color }} />
                </div>
                <div className="admin-stat-content">
                  <span className="admin-stat-label">{card.label}</span>
                  <span className="admin-stat-value">
                    {card.prefix || ''}{card.value.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tab 切换 */}
        <div className="admin-filter-tabs">
          <button
            className={activeTab === 'recharge' ? 'active' : ''}
            onClick={() => handleTabChange('recharge')}
          >
            充值记录
          </button>
          <button
            className={activeTab === 'consume' ? 'active' : ''}
            onClick={() => handleTabChange('consume')}
          >
            消费记录
          </button>
          <button
            className={activeTab === 'points' ? 'active' : ''}
            onClick={() => handleTabChange('points')}
          >
            积分明细
          </button>
        </div>

        {/* 工具栏：搜索 + 用户筛选 */}
        <div className="admin-toolbar">
          <div className="admin-search-wrap">
            <Search size={18} style={{ color: '#8E8E93' }} />
            <input
              className="admin-search-input"
              placeholder={
                activeTab === 'recharge'
                  ? '搜索订单号、用户昵称'
                  : activeTab === 'consume'
                  ? '搜索订单号、用户昵称、关联订单'
                  : '搜索用户昵称、说明'
              }
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <select
            className="admin-select"
            value={userFilter}
            onChange={(e) => handleUserFilterChange(e.target.value)}
          >
            {userList.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        {/* 表格区域 */}
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                {activeTab === 'recharge' && (
                  <>
                    <th>订单号</th>
                    <th>用户</th>
                    <th>金额</th>
                    <th>支付方式</th>
                    <th>状态</th>
                    <th>到账时间</th>
                  </>
                )}
                {activeTab === 'consume' && (
                  <>
                    <th>订单号</th>
                    <th>用户</th>
                    <th>金额</th>
                    <th>消费类型</th>
                    <th>关联订单</th>
                    <th>时间</th>
                  </>
                )}
                {activeTab === 'points' && (
                  <>
                    <th>用户</th>
                    <th>积分变动</th>
                    <th>变动类型</th>
                    <th>说明</th>
                    <th>时间</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td
                    colSpan={activeTab === 'points' ? 5 : 6}
                    style={{ textAlign: 'center', color: '#8E8E93', padding: '40px 0' }}
                  >
                    暂无数据
                  </td>
                </tr>
              ) : (
                pageData.map((item: any, index: number) => {
                  if (activeTab === 'recharge') {
                    return (
                      <tr key={item.id}>
                        <td style={{ fontFamily: 'monospace', color: '#8E8E93' }}>{item.id}</td>
                        <td>{item.user}</td>
                        <td style={{ color: '#10B981', fontWeight: 600 }}>+¥{item.amount}</td>
                        <td>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <CreditCard size={14} style={{ color: '#8E8E93' }} />
                            {item.payMethod}
                          </span>
                        </td>
                        <td>
                          <span
                            className="admin-status-tag"
                            style={{
                              background: getRechargeStatusStyle(item.status).bg,
                              color: getRechargeStatusStyle(item.status).color,
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td style={{ color: '#8E8E93' }}>{item.arriveTime}</td>
                      </tr>
                    );
                  }
                  if (activeTab === 'consume') {
                    return (
                      <tr key={item.id}>
                        <td style={{ fontFamily: 'monospace', color: '#8E8E93' }}>{item.id}</td>
                        <td>{item.user}</td>
                        <td
                          style={{
                            color: item.type === '退款' ? '#10B981' : '#EF4444',
                            fontWeight: 600,
                          }}
                        >
                          {item.type === '退款' ? '+' : '-'}¥{item.amount}
                        </td>
                        <td>
                          <span
                            className="admin-status-tag"
                            style={{
                              background: getConsumeTypeStyle(item.type).bg,
                              color: getConsumeTypeStyle(item.type).color,
                            }}
                          >
                            {item.type}
                          </span>
                        </td>
                        <td style={{ fontFamily: 'monospace', color: '#8E8E93' }}>
                          {item.relatedOrder}
                        </td>
                        <td style={{ color: '#8E8E93' }}>{item.time}</td>
                      </tr>
                    );
                  }
                  if (activeTab === 'points') {
                    return (
                      <tr key={index}>
                        <td>{item.user}</td>
                        <td style={{ color: item.points > 0 ? '#10B981' : '#EF4444', fontWeight: 600 }}>
                          {item.points > 0 ? '+' : ''}
                          {item.points}
                        </td>
                        <td>
                          <span
                            className="admin-status-tag"
                            style={{
                              background: getPointsTypeStyle(item.type).bg,
                              color: getPointsTypeStyle(item.type).color,
                            }}
                          >
                            {item.type}
                          </span>
                        </td>
                        <td style={{ color: '#565a66' }}>{item.description}</td>
                        <td style={{ color: '#8E8E93' }}>{item.time}</td>
                      </tr>
                    );
                  }
                  return null;
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        <div className="admin-pagination">
          <span className="admin-page-info">
            第 {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)} 条，共 {total} 条
          </span>
          <div className="admin-page-btns">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={p === page ? 'active' : ''}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
