import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { BTabBar } from '../../components/FloatingTabBar';

const monthlyStats = [
  { month: '1月', income: 3200 },
  { month: '2月', income: 2800 },
  { month: '3月', income: 4100 },
  { month: '4月', income: 3500 },
  { month: '5月', income: 4800 },
  { month: '6月', income: 5300 },
];

const recentRecords = [
  { type: 'income', title: '看展同行', amount: '+158', time: '今天 14:30', color: '#10B981' },
  { type: 'income', title: '咖啡探店', amount: '+98', time: '今天 15:00', color: '#10B981' },
  { type: 'withdraw', title: '提现到银行卡', amount: '-500', time: '昨天 10:20', color: '#8B5CF6' },
  { type: 'income', title: '城市徒步', amount: '+188', time: '昨天 16:45', color: '#10B981' },
];

export default function BEarnings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('month');
  const maxIncome = Math.max(...monthlyStats.map(m => m.income));

  return (
    <main className="mobile-page">
      {/* 余额卡片 */}
      <div className="b-earn-hero">
        <div className="b-earn-hero-bg" />
        <div className="b-earn-hero-content">
          <span className="b-earn-label">账户余额（元）</span>
          <span className="b-earn-amount">28,640.00</span>
          <div className="b-earn-actions">
            <button className="b-earn-btn-primary" onClick={() => alert('提现功能：余额将提现到绑定银行卡')}>提现</button>
            <button className="b-earn-btn-ghost">收支明细</button>
          </div>
        </div>
      </div>

      {/* 统计概览 */}
      <section className="b-earn-stats">
        <div className="b-earn-stat">
          <span className="b-earn-stat-value">¥5,360</span>
          <span className="b-earn-stat-label">本月收入</span>
          <span className="b-earn-stat-trend up">+12%</span>
        </div>
        <div className="b-earn-stat">
          <span className="b-earn-stat-value">40</span>
          <span className="b-earn-stat-label">本月订单</span>
          <span className="b-earn-stat-trend up">+8%</span>
        </div>
        <div className="b-earn-stat">
          <span className="b-earn-stat-value">¥134</span>
          <span className="b-earn-stat-label">平均单价</span>
          <span className="b-earn-stat-trend down">-2%</span>
        </div>
      </section>

      {/* 收益趋势 */}
      <section className="b-earn-section">
        <div className="b-section-header">
          <h2 className="b-section-title">收益趋势</h2>
          <div className="b-earn-tabs">
            <button className={activeTab === 'month' ? 'active' : ''} onClick={() => setActiveTab('month')}>月度</button>
            <button className={activeTab === 'week' ? 'active' : ''} onClick={() => setActiveTab('week')}>周度</button>
          </div>
        </div>
        <GlassCard className="b-earn-chart">
          <div className="b-chart-bars">
            {monthlyStats.map((m) => (
              <div key={m.month} className="b-chart-item">
                <span className="b-chart-value">¥{(m.income / 1000).toFixed(0)}k</span>
                <div className="b-chart-bar-track">
                  <div className="b-chart-bar-fill" style={{ height: `${(m.income / maxIncome) * 100}%` }} />
                </div>
                <span className="b-chart-label">{m.month}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* 收益明细 */}
      <section className="b-earn-section">
        <div className="b-section-header">
          <h2 className="b-section-title">收益明细</h2>
          <span className="b-section-more" onClick={() => alert('查看全部收支明细')}>全部</span>
        </div>
        <div className="b-earn-records">
          {recentRecords.map((record, idx) => (
            <div key={idx} className="b-earn-record">
              <div className="b-earn-record-icon" style={{ background: `${record.color}15` }}>
                {record.type === 'income'
                  ? <ArrowUpCircle size={18} style={{ color: record.color }} />
                  : <ArrowDownCircle size={18} style={{ color: record.color }} />}
              </div>
              <div className="b-earn-record-info">
                <span className="b-earn-record-title">{record.title}</span>
                <span className="b-earn-record-time">{record.time}</span>
              </div>
              <span className="b-earn-record-amount" style={{ color: record.color }}>{record.amount}</span>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: 20 }} />
      <BTabBar />
    </main>
  );
}
