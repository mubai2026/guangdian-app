import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { ArrowLeft, Shield, Star, TrendingUp, AlertTriangle, Ban, Zap, Award, Save, RotateCcw, MessageSquare } from 'lucide-react';

// 伙伴详情 mock 数据
const partnerDetail = {
  id: 'M20015',
  name: '咖啡达人',
  status: '正常',
  avatar: '/avatars/avatar2.png',
  phone: '139****1234',
  city: '上海·静安区',
  age: 28,
  profession: '咖啡师',
  registerTime: '2025-03-15 10:20:08',
  level: 2, // 1见习 2正式 3资深 4金牌
  certs: {
    realname: { has: true, time: '2025-03-16' },
    realperson: { has: true, time: '2025-03-18' },
    skill: { has: true, time: '2025-03-20' },
    pro: { has: false, time: '' },
  },
  stats: {
    totalOrders: 168,
    completeRate: 96.4,
    avgRating: 4.8,
    monthIncome: 8650,
    cancelRate: 3.6,
    complaints: 1,
  },
  creditScore: 92,
  // 服务项目列表 + 对应技能认证进度
  services: [
    { name: '咖啡探店', certProgress: 100, certified: true },
    { name: '看展同行', certProgress: 80, certified: false },
    { name: '城市徒步', certProgress: 60, certified: false },
    { name: '摄影跟拍', certProgress: 0, certified: false },
  ],
  // 最近 5 笔订单摘要
  recentOrders: [
    { id: 'ORD20250710000868', user: '南希', service: '咖啡探店', amount: 188, time: '2025-07-10 14:30', status: '服务中' },
    { id: 'ORD20250709000123', user: '林夏', service: '咖啡探店', amount: 98, time: '2025-07-09 10:15', status: '已完成' },
    { id: 'ORD20250708000056', user: '小光', service: '看展同行', amount: 128, time: '2025-07-08 15:00', status: '已完成' },
    { id: 'ORD20250707000312', user: '柚子', service: '咖啡探店', amount: 188, time: '2025-07-07 11:20', status: '已完成' },
    { id: 'ORD20250706000444', user: '阿澈', service: '城市徒步', amount: 158, time: '2025-07-06 09:00', status: '已取消' },
  ],
};

const certConfig = [
  { key: 'realname', label: '实', color: '#10B981', name: '实名认证' },
  { key: 'realperson', label: '真', color: '#FF7A45', name: '真人认证' },
  { key: 'skill', label: '技', color: '#A855F7', name: '技能认证' },
  { key: 'pro', label: '职', color: '#3B82F6', name: '职业认证' },
];

// 等级配置：见习/正式/资深/金牌 → 抽成比例
const levelConfig = [
  { level: 1, name: '见习', commission: 85 },
  { level: 2, name: '正式', commission: 90 },
  { level: 3, name: '资深', commission: 92 },
  { level: 4, name: '金牌', commission: 92 },
];

export default function AdminPartnerDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const partnerId = params.id || partnerDetail.id;

  // 账号状态：正常 / 限制接单 / 关停账号
  const [accountStatus, setAccountStatus] = useState<'normal' | 'limited' | 'closed'>('normal');
  const [dailyLimit, setDailyLimit] = useState(5);
  const [limitReason, setLimitReason] = useState('');
  const [priorityRecommend, setPriorityRecommend] = useState(false);
  const [weight, setWeight] = useState(50); // 账号权重 0-100
  const [creditScore, setCreditScore] = useState(partnerDetail.creditScore);
  const [level, setLevel] = useState(partnerDetail.level);
  const [commission, setCommission] = useState(levelConfig[level - 1].commission);

  // 切换等级时自动更新抽成比例
  const handleLevelChange = (newLevel: number) => {
    setLevel(newLevel);
    setCommission(levelConfig[newLevel - 1].commission);
  };

  const cardStyle: React.CSSProperties = {
    background: '#fff', borderRadius: 16, padding: 20,
    boxShadow: '0 4px 20px rgba(31, 35, 55, 0.05)', marginBottom: 16,
  };

  const getStatusStyle = (s: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      '正常': { bg: '#D1FAE5', color: '#10B981' },
      '服务中': { bg: '#DBEAFE', color: '#3B82F6' },
      '已完成': { bg: '#D1FAE5', color: '#10B981' },
      '已取消': { bg: '#F3F4F6', color: '#6B7280' },
    };
    return map[s] || { bg: '#F3F4F6', color: '#6B7280' };
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* 顶部：返回按钮 + 伙伴姓名 + 账号状态标签 */}
        <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/admin/mentors')}
            style={{
              width: 36, height: 36, borderRadius: 10, border: '1px solid #e0e0e0',
              background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#565a66',
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="admin-page-title" style={{ margin: 0 }}>伙伴详情</h1>
          <span style={{ fontFamily: 'monospace', color: '#8E8E93', fontSize: 13 }}>{partnerId}</span>
          <span className="admin-status-tag" style={{
            background: accountStatus === 'normal' ? '#D1FAE5' : accountStatus === 'limited' ? '#FEF3C7' : '#FEE2E2',
            color: accountStatus === 'normal' ? '#10B981' : accountStatus === 'limited' ? '#F59E0B' : '#EF4444',
          }}>
            {accountStatus === 'normal' ? '正常' : accountStatus === 'limited' ? '限制接单' : '已关停'}
          </span>
        </div>

        {/* 基本信息卡 */}
        <div className="admin-section">
          <h3 className="admin-section-title">基本信息</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <img src={partnerDetail.avatar} alt="" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 36px' }}>
              <InfoItem label="姓名" value={partnerDetail.name} />
              <InfoItem label="手机号" value={partnerDetail.phone} />
              <InfoItem label="城市" value={partnerDetail.city} />
              <InfoItem label="年龄" value={`${partnerDetail.age} 岁`} />
              <InfoItem label="职业" value={partnerDetail.profession} />
              <InfoItem label="注册时间" value={partnerDetail.registerTime} />
              <InfoItem label="等级" value={`${levelConfig[level - 1].name} (Lv.${level})`} valueColor="#F59E0B" />
            </div>
          </div>
        </div>

        {/* 认证状态卡 */}
        <div className="admin-section">
          <h3 className="admin-section-title"><Shield size={16} style={{ color: '#10B981' }} />认证状态</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {certConfig.map(c => {
              const cert = (partnerDetail.certs as any)[c.key];
              return (
                <div key={c.key} style={{
                  background: cert.has ? `${c.color}10` : '#f8f9fc',
                  borderRadius: 12, padding: 14,
                  border: `1px solid ${cert.has ? c.color : '#e0e0e0'}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span className="admin-cert-mini" style={{
                      width: 28, height: 28, fontSize: 13,
                      background: cert.has ? c.color : 'transparent',
                      color: cert.has ? '#fff' : '#8E8E93',
                      borderColor: cert.has ? c.color : '#E5E5EA',
                    }}>{c.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: cert.has ? c.color : '#8E8E93' }}>{c.name}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#8E8E93', marginBottom: 8 }}>
                    {cert.has ? `认证时间：${cert.time}` : '未认证'}
                  </div>
                  {cert.has && (
                    <button onClick={() => alert(`已撤销 ${partnerDetail.name} 的${c.name}`)} style={{
                      padding: '4px 10px', fontSize: 11, borderRadius: 6, border: 'none',
                      background: '#FEE2E2', color: '#EF4444', cursor: 'pointer',
                    }}>撤销认证</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 数据统计卡 */}
        <div className="admin-section">
          <h3 className="admin-section-title"><TrendingUp size={16} style={{ color: '#FF7A45' }} />数据统计</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
            <StatBox label="总订单" value={`${partnerDetail.stats.totalOrders}`} color="#3B82F6" />
            <StatBox label="完成率" value={`${partnerDetail.stats.completeRate}%`} color="#10B981" />
            <StatBox label="平均评分" value={`★ ${partnerDetail.stats.avgRating}`} color="#F59E0B" />
            <StatBox label="本月收入" value={`¥${partnerDetail.stats.monthIncome.toLocaleString()}`} color="#FF7A45" />
            <StatBox label="取消率" value={`${partnerDetail.stats.cancelRate}%`} color="#F59E0B" />
            <StatBox label="投诉次数" value={`${partnerDetail.stats.complaints}`} color="#EF4444" />
          </div>
        </div>

        {/* 账号管理卡（核心功能） */}
        <div className="admin-section">
          <h3 className="admin-section-title"><AlertTriangle size={16} style={{ color: '#EF4444' }} />账号管理</h3>

          {/* 账号状态切换 */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#8E8E93', marginBottom: 8 }}>账号状态</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { key: 'normal', label: '正常', color: '#10B981' },
                { key: 'limited', label: '限制接单', color: '#F59E0B' },
                { key: 'closed', label: '关停账号', color: '#EF4444' },
              ].map(s => (
                <button key={s.key} onClick={() => setAccountStatus(s.key as any)} style={{
                  padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                  border: accountStatus === s.key ? `1px solid ${s.color}` : '1px solid #e0e0e0',
                  background: accountStatus === s.key ? `${s.color}15` : '#fff',
                  color: accountStatus === s.key ? s.color : '#8E8E93',
                  cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  {s.key === 'closed' ? <Ban size={14} /> : s.key === 'limited' ? <AlertTriangle size={14} /> : <Shield size={14} />}
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* 限制接单：每日接单上限 + 限制原因 */}
          {accountStatus === 'limited' && (
            <div style={{ background: '#FEF3C7', borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: '#F59E0B', fontWeight: 600, marginBottom: 10 }}>限制接单设置</div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, color: '#565a66' }}>每日接单上限</span>
                  <input type="number" min={1} max={50} value={dailyLimit}
                    onChange={(e) => setDailyLimit(Number(e.target.value))}
                    style={{ width: 80, padding: '8px 10px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13, outline: 'none' }} />
                  <span style={{ fontSize: 13, color: '#8E8E93' }}>单/天</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 240 }}>
                  <span style={{ fontSize: 13, color: '#565a66' }}>限制原因</span>
                  <input type="text" value={limitReason} placeholder="请输入限制原因"
                    onChange={(e) => setLimitReason(e.target.value)}
                    style={{ flex: 1, padding: '8px 10px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13, outline: 'none' }} />
                </div>
              </div>
            </div>
          )}

          {/* 订单优先推荐：开关 */}
          <div style={settingRowStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={16} style={{ color: '#A855F7' }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#22242a' }}>订单优先推荐</div>
                <div style={{ fontSize: 12, color: '#8E8E93' }}>开启后该伙伴在 C 端推荐列表优先展示</div>
              </div>
            </div>
            <button onClick={() => setPriorityRecommend(!priorityRecommend)} style={{
              width: 44, height: 24, borderRadius: 12, border: 'none', position: 'relative',
              cursor: 'pointer', background: priorityRecommend ? '#10B981' : '#e0e0e0', transition: 'background 0.2s',
            }}>
              <span style={{
                position: 'absolute', top: 2, width: 20, height: 20, borderRadius: '50%',
                background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'left 0.2s', left: priorityRecommend ? 22 : 2,
              }} />
            </button>
          </div>

          {/* 账号权重：0-100 影响C端推荐排序和抢单优先级 */}
          <div style={settingRowStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrendingUp size={16} style={{ color: '#3B82F6' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#22242a' }}>账号权重</div>
                <div style={{ fontSize: 12, color: '#8E8E93' }}>影响C端推荐排序和抢单大厅优先级，数值越高越优先</div>
                <div style={{ marginTop: 8, height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${weight}%`, height: '100%', background: weight >= 70 ? 'linear-gradient(90deg, #10B981, #34D399)' : weight >= 40 ? 'linear-gradient(90deg, #F59E0B, #FBBF24)' : 'linear-gradient(90deg, #EF4444, #F87171)', borderRadius: 4, transition: 'width 0.3s' }} />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => setWeight(Math.max(0, weight - 10))} style={adjustBtnStyle('-')} disabled={weight <= 0}>-</button>
              <span style={{ fontSize: 18, fontWeight: 700, minWidth: 40, textAlign: 'center', color: weight >= 70 ? '#10B981' : weight >= 40 ? '#F59E0B' : '#EF4444' }}>{weight}</span>
              <button onClick={() => setWeight(Math.min(100, weight + 10))} style={adjustBtnStyle('+')} disabled={weight >= 100}>+</button>
            </div>
          </div>

          {/* 违规记录说明 */}
          <div style={{ padding: 12, background: '#FEF3C7', borderRadius: 10, fontSize: 12, color: '#92400E', lineHeight: 1.6 }}>
            <strong>账号管控规则：</strong><br/>
            • 违规情况：限制接单(降低权重+每日上限) → 严重违规：关停账号<br/>
            • 表现优异：提升权重+优先推荐+等级晋升<br/>
            • 信用分低于60自动限制接单，低于30自动关停<br/>
            • 权重影响：C端推荐排序(权重高优先展示)、抢单大厅派单优先级
          </div>

          {/* 信用分：显示 + 调整按钮 */}
          <div style={settingRowStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Star size={16} style={{ color: '#F59E0B' }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#22242a' }}>信用分</div>
                <div style={{ fontSize: 12, color: '#8E8E93' }}>范围 0-100，低于 60 分将自动限制接单</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => setCreditScore(Math.max(0, creditScore - 5))} style={adjustBtnStyle('-')} disabled={creditScore <= 0}>-</button>
              <span style={{
                fontSize: 18, fontWeight: 700, minWidth: 40, textAlign: 'center',
                color: creditScore >= 80 ? '#10B981' : creditScore >= 60 ? '#F59E0B' : '#EF4444',
              }}>{creditScore}</span>
              <button onClick={() => setCreditScore(Math.min(100, creditScore + 5))} style={adjustBtnStyle('+')} disabled={creditScore >= 100}>+</button>
            </div>
          </div>

          {/* 等级管理：见习/正式/资深/金牌 */}
          <div style={settingRowStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={16} style={{ color: '#FF7A45' }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#22242a' }}>等级管理</div>
                <div style={{ fontSize: 12, color: '#8E8E93' }}>切换等级将自动调整抽成比例</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {levelConfig.map(l => (
                <button key={l.level} onClick={() => handleLevelChange(l.level)} style={{
                  padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                  border: level === l.level ? '1px solid #FF7A45' : '1px solid #e0e0e0',
                  background: level === l.level ? 'linear-gradient(135deg, #FF7A45, #A855F7)' : '#fff',
                  color: level === l.level ? '#fff' : '#8E8E93',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>{l.name}</button>
              ))}
            </div>
          </div>

          {/* 抽成比例：根据等级自动显示，可手动调整 */}
          <div style={settingRowStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrendingUp size={16} style={{ color: '#10B981' }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#22242a' }}>抽成比例（伙伴收入占比）</div>
                <div style={{ fontSize: 12, color: '#8E8E93' }}>
                  当前等级【{levelConfig[level - 1].name}】默认 {levelConfig[level - 1].commission}%，可手动调整
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="number" min={50} max={100} value={commission}
                onChange={(e) => setCommission(Number(e.target.value))}
                style={{ width: 80, padding: '8px 10px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13, outline: 'none', textAlign: 'center' }} />
              <span style={{ fontSize: 14, color: '#565a66' }}>%</span>
            </div>
          </div>
        </div>

        {/* 服务项目列表 */}
        <div className="admin-section">
          <h3 className="admin-section-title">服务项目</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {partnerDetail.services.map(s => (
              <div key={s.name} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px',
                background: '#f8f9fc', borderRadius: 10,
              }}>
                <span style={{ flex: '0 0 120px', fontSize: 14, fontWeight: 500, color: '#22242a' }}>{s.name}</span>
                <div style={{ flex: 1, height: 8, background: '#e0e0e0', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    width: `${s.certProgress}%`, height: '100%',
                    background: s.certified ? 'linear-gradient(90deg, #10B981, #34D399)' : 'linear-gradient(90deg, #FF7A45, #A855F7)',
                    transition: 'width 0.3s',
                  }} />
                </div>
                <span style={{ minWidth: 40, fontSize: 12, color: '#8E8E93', textAlign: 'right' }}>{s.certProgress}%</span>
                <span className="admin-status-tag" style={{
                  background: s.certified ? '#D1FAE5' : '#FEF3C7',
                  color: s.certified ? '#10B981' : '#F59E0B',
                }}>{s.certified ? '已认证' : '认证中'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 最近订单列表 */}
        <div className="admin-section">
          <h3 className="admin-section-title">最近订单（最近 5 笔）</h3>
          <div className="admin-table" style={{ boxShadow: 'none' }}>
            <table>
              <thead><tr>
                <th>订单号</th><th>用户</th><th>服务</th><th>金额</th><th>时间</th><th>状态</th>
              </tr></thead>
              <tbody>
                {partnerDetail.recentOrders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontFamily: 'monospace', color: '#8E8E93', fontSize: 12 }}>{o.id}</td>
                    <td>{o.user}</td>
                    <td><span className="admin-status-tag" style={{ background: '#FFF7ED', color: '#FF7A45' }}>{o.service}</span></td>
                    <td style={{ color: '#FF7A45', fontWeight: 600 }}>¥{o.amount}</td>
                    <td style={{ color: '#8E8E93', fontSize: 12 }}>{o.time}</td>
                    <td><span className="admin-status-tag" style={{
                      background: getStatusStyle(o.status).bg, color: getStatusStyle(o.status).color,
                    }}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 底部操作：保存设置 / 重置为默认 / 查看聊天记录 */}
        <div style={{
          position: 'sticky', bottom: 0, background: '#fff',
          borderRadius: 16, padding: '16px 20px', boxShadow: '0 -4px 20px rgba(31, 35, 55, 0.08)',
          display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap',
        }}>
          <button style={bottomBtnStyle('#3B82F6', '#EFF6FF')} onClick={() => alert('查看 ' + partnerDetail.name + ' 的聊天记录')}>
            <MessageSquare size={16} />查看聊天记录
          </button>
          <button style={bottomBtnStyle('#8E8E93', '#f0f0f0')} onClick={() => {
            setAccountStatus('normal'); setDailyLimit(5); setLimitReason('');
            setPriorityRecommend(false); setCreditScore(partnerDetail.creditScore);
            handleLevelChange(partnerDetail.level);
            alert('已重置为默认设置');
          }}>
            <RotateCcw size={16} />重置为默认
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 24px', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg, #FF7A45, #A855F7)', color: '#fff',
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }} onClick={() => alert('设置已保存：\n状态=' + accountStatus + '\n权重=' + weight + '\n信用分=' + creditScore + '\n等级=' + levelConfig[level - 1].name + '\n抽成=' + commission + '%\n优先推荐=' + priorityRecommend)}>
            <Save size={16} />保存设置
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

// 信息项小组件
function InfoItem({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: '#8E8E93' }}>{label}</div>
      <div style={{ fontWeight: 500, color: valueColor || '#22242a' }}>{value}</div>
    </div>
  );
}

// 统计盒小组件
function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ background: '#f8f9fc', borderRadius: 12, padding: 14, textAlign: 'center' }}>
      <div style={{ fontSize: 12, color: '#8E8E93', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color }}>{value}</div>
    </div>
  );
}

// 设置行通用样式
const settingRowStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '14px 0', borderBottom: '1px dashed #f0f0f0', gap: 16,
};

// 信用分调整按钮样式
function adjustBtnStyle(sign: string): React.CSSProperties {
  return {
    width: 28, height: 28, borderRadius: 8, border: '1px solid #e0e0e0',
    background: '#fff', fontSize: 16, fontWeight: 700, color: '#565a66',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  };
}

// 底部操作按钮通用样式
function bottomBtnStyle(color: string, bg: string): React.CSSProperties {
  return {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '10px 18px', borderRadius: 12, border: 'none',
    background: bg, color, fontSize: 14, fontWeight: 600,
    cursor: 'pointer', transition: 'all 0.2s',
  };
}
