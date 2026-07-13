import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { ArrowLeft, User, Star, TrendingUp, AlertTriangle, Ban, Zap, Crown, Save, MessageSquare, Tag } from 'lucide-react';

// C端用户详情 mock 数据
const userDetail = {
  id: 'U10015',
  name: '南希',
  status: '正常',
  avatar: '/avatars/avatar1.png',
  phone: '138****8888',
  city: '上海·静安区',
  registerTime: '2025-03-15 10:20:08',
  userType: 'VIP用户', // 普通用户 / VIP用户
  vipLevel: 2, // 0无 1体验卡 2月度会员 3季度会员 4年度VIP
  stats: {
    totalOrders: 86,
    completedOrders: 79,
    totalSpent: 12680,
    avgRating: 4.7, // 作为下单方的平均评分
    cancelRate: 8.1,
    complaints: 2,
  },
  creditScore: 88,
  // 用户标签
  tags: ['优质用户', '高频用户'],
  // 最近 5 笔订单摘要
  recentOrders: [
    { id: 'ORD20250710000868', partner: '咖啡达人', service: '咖啡探店', amount: 188, time: '2025-07-10 14:30', status: '服务中' },
    { id: 'ORD20250709000123', partner: '林夏', service: '看展同行', amount: 128, time: '2025-07-09 10:15', status: '已完成' },
    { id: 'ORD20250708000056', partner: '小光', service: '城市徒步', amount: 158, time: '2025-07-08 15:00', status: '已完成' },
    { id: 'ORD20250707000312', partner: '柚子', service: '咖啡探店', amount: 188, time: '2025-07-07 11:20', status: '已完成' },
    { id: 'ORD20250706000444', partner: '阿澈', service: '摄影跟拍', amount: 268, time: '2025-07-06 09:00', status: '已取消' },
  ],
};

// VIP等级配置：无 / 体验卡 / 月度会员 / 季度会员 / 年度VIP
const vipLevelConfig = [
  { level: 0, name: '无', color: '#8E8E93' },
  { level: 1, name: '体验卡', color: '#3B82F6' },
  { level: 2, name: '月度会员', color: '#A855F7' },
  { level: 3, name: '季度会员', color: '#FF7A45' },
  { level: 4, name: '年度VIP', color: '#F59E0B' },
];

// 可选标签池
const tagPool = ['优质用户', '高频用户', '投诉用户', '退款用户', '新用户', '高消费用户'];

export default function AdminUserDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id || userDetail.id;

  // 账号状态：正常 / 限制下单 / 关停账号
  const [accountStatus, setAccountStatus] = useState<'normal' | 'limited' | 'closed'>('normal');
  const [limitReason, setLimitReason] = useState('');
  const [limitDays, setLimitDays] = useState(7); // 限制天数
  const [priorityMatch, setPriorityMatch] = useState(false); // 订单优先匹配
  const [creditScore, setCreditScore] = useState(userDetail.creditScore);
  const [vipLevel, setVipLevel] = useState(userDetail.vipLevel);
  const [tags, setTags] = useState<string[]>(userDetail.tags);
  const [tagInput, setTagInput] = useState('');

  // 添加标签
  const handleAddTag = (tag: string) => {
    const t = tag.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
    }
    setTagInput('');
  };

  // 移除标签
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
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
        {/* 顶部：返回按钮 + 用户姓名 + 账号状态标签 */}
        <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/admin/users')}
            style={{
              width: 36, height: 36, borderRadius: 10, border: '1px solid #e0e0e0',
              background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#565a66',
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="admin-page-title" style={{ margin: 0 }}>用户详情</h1>
          <span style={{ fontFamily: 'monospace', color: '#8E8E93', fontSize: 13 }}>{userId}</span>
          <span className="admin-status-tag" style={{
            background: accountStatus === 'normal' ? '#D1FAE5' : accountStatus === 'limited' ? '#FEF3C7' : '#FEE2E2',
            color: accountStatus === 'normal' ? '#10B981' : accountStatus === 'limited' ? '#F59E0B' : '#EF4444',
          }}>
            {accountStatus === 'normal' ? '正常' : accountStatus === 'limited' ? '限制下单' : '已关停'}
          </span>
        </div>

        {/* 基本信息卡 */}
        <div className="admin-section">
          <h3 className="admin-section-title"><User size={16} style={{ color: '#3B82F6' }} />基本信息</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <img src={userDetail.avatar} alt="" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 36px' }}>
              <InfoItem label="姓名" value={userDetail.name} />
              <InfoItem label="手机号" value={userDetail.phone} />
              <InfoItem label="城市" value={userDetail.city} />
              <InfoItem label="注册时间" value={userDetail.registerTime} />
              <InfoItem
                label="用户类型"
                value={userDetail.userType}
                valueColor={userDetail.userType === 'VIP用户' ? '#F59E0B' : '#22242a'}
              />
              <InfoItem
                label="VIP等级"
                value={vipLevelConfig[vipLevel].name}
                valueColor={vipLevelConfig[vipLevel].color}
              />
            </div>
          </div>
        </div>

        {/* 数据统计卡 */}
        <div className="admin-section">
          <h3 className="admin-section-title"><TrendingUp size={16} style={{ color: '#FF7A45' }} />数据统计</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
            <StatBox label="总订单" value={`${userDetail.stats.totalOrders}`} color="#3B82F6" />
            <StatBox label="已完成" value={`${userDetail.stats.completedOrders}`} color="#10B981" />
            <StatBox label="总消费" value={`¥${userDetail.stats.totalSpent.toLocaleString()}`} color="#FF7A45" />
            <StatBox label="平均评分" value={`★ ${userDetail.stats.avgRating}`} color="#F59E0B" />
            <StatBox label="取消率" value={`${userDetail.stats.cancelRate}%`} color="#F59E0B" />
            <StatBox label="投诉次数" value={`${userDetail.stats.complaints}`} color="#EF4444" />
          </div>
        </div>

        {/* 账号管理卡（核心功能） */}
        <div className="admin-section">
          <h3 className="admin-section-title"><AlertTriangle size={16} style={{ color: '#EF4444' }} />账号管理</h3>

          {/* 账号状态切换：正常 / 限制下单 / 关停账号 */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#8E8E93', marginBottom: 8 }}>账号状态</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { key: 'normal', label: '正常', color: '#10B981' },
                { key: 'limited', label: '限制下单', color: '#F59E0B' },
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
                  {s.key === 'closed' ? <Ban size={14} /> : s.key === 'limited' ? <AlertTriangle size={14} /> : <User size={14} />}
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* 限制下单：限制原因 + 限制天数 */}
          {accountStatus === 'limited' && (
            <div style={{ background: '#FEF3C7', borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: '#F59E0B', fontWeight: 600, marginBottom: 10 }}>限制下单设置</div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, color: '#565a66' }}>限制天数</span>
                  <input type="number" min={1} max={365} value={limitDays}
                    onChange={(e) => setLimitDays(Number(e.target.value))}
                    style={{ width: 80, padding: '8px 10px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13, outline: 'none' }} />
                  <span style={{ fontSize: 13, color: '#8E8E93' }}>天</span>
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

          {/* 订单优先匹配：开关（开启后该用户优先匹配高评分伙伴） */}
          <div style={settingRowStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={16} style={{ color: '#A855F7' }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#22242a' }}>订单优先匹配</div>
                <div style={{ fontSize: 12, color: '#8E8E93' }}>开启后该用户下单时优先匹配高评分伙伴</div>
              </div>
            </div>
            <button onClick={() => setPriorityMatch(!priorityMatch)} style={{
              width: 44, height: 24, borderRadius: 12, border: 'none', position: 'relative',
              cursor: 'pointer', background: priorityMatch ? '#10B981' : '#e0e0e0', transition: 'background 0.2s',
            }}>
              <span style={{
                position: 'absolute', top: 2, width: 20, height: 20, borderRadius: '50%',
                background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'left 0.2s', left: priorityMatch ? 22 : 2,
              }} />
            </button>
          </div>

          {/* 信用分：显示当前信用分(0-100) + 调整按钮(+/-) */}
          <div style={settingRowStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Star size={16} style={{ color: '#F59E0B' }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#22242a' }}>信用分</div>
                <div style={{ fontSize: 12, color: '#8E8E93' }}>范围 0-100，低于 60 分将自动限制下单</div>
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

          {/* VIP等级管理：无 / 体验卡 / 月度会员 / 季度会员 / 年度VIP */}
          <div style={settingRowStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Crown size={16} style={{ color: '#F59E0B' }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#22242a' }}>VIP等级管理</div>
                <div style={{ fontSize: 12, color: '#8E8E93' }}>切换用户的会员等级</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {vipLevelConfig.map(l => (
                <button key={l.level} onClick={() => setVipLevel(l.level)} style={{
                  padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                  border: vipLevel === l.level ? `1px solid ${l.color}` : '1px solid #e0e0e0',
                  background: vipLevel === l.level ? l.color : '#fff',
                  color: vipLevel === l.level ? '#fff' : '#8E8E93',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>{l.name}</button>
              ))}
            </div>
          </div>

          {/* 用户标签：可添加标签 */}
          <div style={{ ...settingRowStyle, alignItems: 'flex-start', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
              <Tag size={16} style={{ color: '#3B82F6' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#22242a' }}>用户标签</div>
                <div style={{ fontSize: 12, color: '#8E8E93' }}>为用户添加标签便于分类管理</div>
              </div>
            </div>
            {/* 已添加标签展示 */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {tags.map(t => (
                <span key={t} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '4px 10px', borderRadius: 14, fontSize: 12, fontWeight: 500,
                  background: '#EFF6FF', color: '#3B82F6', border: '1px solid #BFDBFE',
                }}>
                  {t}
                  <button onClick={() => handleRemoveTag(t)} style={{
                    border: 'none', background: 'transparent', color: '#3B82F6',
                    cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: 0, display: 'flex',
                  }}>×</button>
                </span>
              ))}
              {tags.length === 0 && <span style={{ fontSize: 12, color: '#8E8E93' }}>暂无标签</span>}
            </div>
            {/* 标签输入 + 快捷标签池 */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
              <input type="text" value={tagInput} placeholder="输入标签后回车添加"
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddTag(tagInput); }}
                style={{ flex: 1, minWidth: 200, padding: '8px 12px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13, outline: 'none' }} />
              <button onClick={() => handleAddTag(tagInput)} style={{
                padding: '8px 16px', borderRadius: 8, border: 'none',
                background: '#3B82F6', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>添加</button>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: '#8E8E93', lineHeight: '24px' }}>快捷选择：</span>
              {tagPool.map(t => (
                <button key={t} onClick={() => handleAddTag(t)} disabled={tags.includes(t)} style={{
                  padding: '2px 10px', borderRadius: 12, fontSize: 12,
                  border: '1px solid #e0e0e0', background: tags.includes(t) ? '#f0f0f0' : '#fff',
                  color: tags.includes(t) ? '#bbb' : '#565a66',
                  cursor: tags.includes(t) ? 'not-allowed' : 'pointer',
                }}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        {/* 最近订单列表（最近5笔订单摘要） */}
        <div className="admin-section">
          <h3 className="admin-section-title">最近订单（最近 5 笔）</h3>
          <div className="admin-table" style={{ boxShadow: 'none' }}>
            <table>
              <thead><tr>
                <th>订单号</th><th>伙伴</th><th>服务</th><th>金额</th><th>时间</th><th>状态</th>
              </tr></thead>
              <tbody>
                {userDetail.recentOrders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontFamily: 'monospace', color: '#8E8E93', fontSize: 12 }}>{o.id}</td>
                    <td>{o.partner}</td>
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

        {/* 底部操作：保存设置 / 查看聊天记录 / 查看评价 */}
        <div style={{
          position: 'sticky', bottom: 0, background: '#fff',
          borderRadius: 16, padding: '16px 20px', boxShadow: '0 -4px 20px rgba(31, 35, 55, 0.08)',
          display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap',
        }}>
          <button style={bottomBtnStyle('#3B82F6', '#EFF6FF')} onClick={() => alert('查看 ' + userDetail.name + ' 的聊天记录')}>
            <MessageSquare size={16} />查看聊天记录
          </button>
          <button style={bottomBtnStyle('#F59E0B', '#FEF3C7')} onClick={() => alert('查看 ' + userDetail.name + ' 的评价')}>
            <Star size={16} />查看评价
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 24px', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg, #FF7A45, #A855F7)', color: '#fff',
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }} onClick={() => alert('设置已保存：\n状态=' + accountStatus + '\n信用分=' + creditScore + '\nVIP等级=' + vipLevelConfig[vipLevel].name + '\n优先匹配=' + priorityMatch + '\n标签=' + tags.join('、'))}>
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
