import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { ArrowLeft, MapPin, Phone, Navigation, Star, Clock, DollarSign, Download, FileText } from 'lucide-react';

// 订单详情 mock 数据
const orderDetail = {
  id: 'ORD20250710000868',
  status: '服务中',
  service: '咖啡探店',
  createTime: '2025-07-10 14:30:22',
  duration: 120,
  amount: 188,
  payMethod: '微信支付',
  user: {
    avatar: '/avatars/avatar1.png',
    name: '南希',
    phone: '138****5678',
    city: '上海·徐汇区',
  },
  partner: {
    avatar: '/avatars/avatar2.png',
    name: '咖啡达人',
    phone: '139****1234',
    level: 3,
    certs: { realname: true, realperson: true, skill: true, pro: false },
  },
  // 状态时间轴：已下单→已接单→已出发→已到达→服务中→已完成
  timeline: [
    { step: '已下单', time: '2025-07-10 14:30:22', done: true },
    { step: '已接单', time: '2025-07-10 14:35:08', done: true },
    { step: '已出发', time: '2025-07-10 14:52:41', done: true },
    { step: '已到达', time: '2025-07-10 15:08:15', done: true },
    { step: '服务中', time: '2025-07-10 15:10:00', done: true },
    { step: '已完成', time: '待完成', done: false },
  ],
  location: {
    lat: 31.1843,
    lng: 121.4365,
    distance: 1.2,
    lastUpdate: '2025-07-10 15:42:08',
  },
  // 费用明细
  fee: {
    serviceFee: 188,
    commission: 18.8, // 平台抽成 10%
    partnerIncome: 169.2,
    coupon: 20,
    paid: 168,
  },
  // 评价信息
  reviewUserToPartner: { rating: 0, comment: '', anonymous: false, has: false },
  reviewPartnerToUser: { rating: 0, comment: '', anonymous: false, has: false },
};

const certConfig = [
  { key: 'realname', label: '实', color: '#10B981' },
  { key: 'realperson', label: '真', color: '#FF7A45' },
  { key: 'skill', label: '技', color: '#A855F7' },
  { key: 'pro', label: '职', color: '#3B82F6' },
];

export default function AdminOrderDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const orderId = params.id || orderDetail.id;

  const [showExportTip, setShowExportTip] = useState(false);

  const getStatusStyle = (s: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      '待接单': { bg: '#FEF3C7', color: '#F59E0B' },
      '已接单': { bg: '#E0E7FF', color: '#6366F1' },
      '进行中': { bg: '#DBEAFE', color: '#3B82F6' },
      '服务中': { bg: '#DBEAFE', color: '#3B82F6' },
      '已完成': { bg: '#D1FAE5', color: '#10B981' },
      '已取消': { bg: '#F3F4F6', color: '#6B7280' },
    };
    return map[s] || { bg: '#F3F4F6', color: '#6B7280' };
  };

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: 16,
    padding: 20,
    boxShadow: '0 4px 20px rgba(31, 35, 55, 0.05)',
    marginBottom: 16,
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    color: '#22242a',
    margin: '0 0 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  };

  const infoRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px dashed #f0f0f0',
    fontSize: 14,
  };

  const labelStyle: React.CSSProperties = { color: '#8E8E93' };
  const valueStyle: React.CSSProperties = { color: '#22242a', fontWeight: 500 };

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* 顶部：返回按钮 + 订单号 + 状态标签 */}
        <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/admin/orders')}
            style={{
              width: 36, height: 36, borderRadius: 10, border: '1px solid #e0e0e0',
              background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#565a66',
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="admin-page-title" style={{ margin: 0 }}>订单详情</h1>
          <span style={{ fontFamily: 'monospace', color: '#8E8E93', fontSize: 13 }}>{orderId}</span>
          <span className="admin-status-tag" style={{
            background: getStatusStyle(orderDetail.status).bg,
            color: getStatusStyle(orderDetail.status).color,
          }}>{orderDetail.status}</span>
        </div>

        {/* 订单信息卡片 */}
        <div className="admin-section">
          <h3 className="admin-section-title"><FileText size={16} style={{ color: '#FF7A45' }} />订单信息</h3>
          <div style={infoRowStyle}><span style={labelStyle}>服务类型</span><span style={valueStyle}>{orderDetail.service}</span></div>
          <div style={infoRowStyle}><span style={labelStyle}>下单时间</span><span style={valueStyle}>{orderDetail.createTime}</span></div>
          <div style={infoRowStyle}><span style={labelStyle}>服务时长</span><span style={valueStyle}>{orderDetail.duration / 60}小时</span></div>
          <div style={infoRowStyle}><span style={labelStyle}>订单金额</span><span style={{ ...valueStyle, color: '#FF7A45', fontWeight: 600 }}>¥{orderDetail.amount}</span></div>
          <div style={{ ...infoRowStyle, borderBottom: 'none' }}><span style={labelStyle}>支付方式</span><span style={valueStyle}>{orderDetail.payMethod}</span></div>
        </div>

        {/* 用户信息卡片 */}
        <div className="admin-section">
          <h3 className="admin-section-title">用户信息</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={orderDetail.user.avatar} alt="" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '12px 32px' }}>
              <div><div style={{ fontSize: 12, color: '#8E8E93' }}>昵称</div><div style={{ fontWeight: 600 }}>{orderDetail.user.name}</div></div>
              <div><div style={{ fontSize: 12, color: '#8E8E93' }}>手机号</div><div style={{ color: '#565a66' }}>{orderDetail.user.phone}</div></div>
              <div><div style={{ fontSize: 12, color: '#8E8E93' }}>城市</div><div style={{ color: '#565a66' }}>{orderDetail.user.city}</div></div>
            </div>
          </div>
        </div>

        {/* 伙伴信息卡片 */}
        <div className="admin-section">
          <h3 className="admin-section-title">伙伴信息</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={orderDetail.partner.avatar} alt="" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '12px 32px', alignItems: 'center' }}>
              <div><div style={{ fontSize: 12, color: '#8E8E93' }}>昵称</div><div style={{ fontWeight: 600 }}>{orderDetail.partner.name}</div></div>
              <div><div style={{ fontSize: 12, color: '#8E8E93' }}>手机号</div><div style={{ color: '#565a66' }}>{orderDetail.partner.phone}</div></div>
              <div><div style={{ fontSize: 12, color: '#8E8E93' }}>等级</div><div style={{ color: '#F59E0B', fontWeight: 600 }}>Lv.{orderDetail.partner.level}</div></div>
              <div>
                <div style={{ fontSize: 12, color: '#8E8E93', marginBottom: 4 }}>认证</div>
                <div className="admin-cert-icons">
                  {certConfig.map(c => (
                    <span key={c.key} className="admin-cert-mini" style={{
                      background: (orderDetail.partner.certs as any)[c.key] ? `${c.color}15` : 'transparent',
                      color: (orderDetail.partner.certs as any)[c.key] ? c.color : '#E5E5EA',
                      borderColor: (orderDetail.partner.certs as any)[c.key] ? c.color : '#E5E5EA',
                    }}>{c.label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 订单状态时间轴 */}
        <div className="admin-section">
          <h3 className="admin-section-title"><Clock size={16} style={{ color: '#3B82F6' }} />订单状态时间轴</h3>
          <div className="admin-timeline">
            {orderDetail.timeline.map((t, idx) => (
              <div className="admin-timeline-item" key={idx}>
                <div className="admin-timeline-dot" style={{
                  background: t.done ? '#FF7A45' : '#E5E5EA',
                  boxShadow: t.done ? '0 0 0 4px rgba(255,122,69,0.15)' : 'none',
                }} />
                <div className="admin-timeline-content">
                  <span style={{ color: t.done ? '#22242a' : '#8E8E93', fontWeight: t.done ? 600 : 400 }}>{t.step}</span>
                  <span className="admin-timeline-time">{t.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 实时定位卡片 */}
        <div className="admin-section">
          <h3 className="admin-section-title"><Navigation size={16} style={{ color: '#10B981' }} />实时定位</h3>
          {/* 简易地图占位框，模拟实时位置与路径轨迹 */}
          <div style={{
            position: 'relative',
            height: 200,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #E8F5E9 0%, #E3F2FD 100%)',
            border: '1px dashed #A855F7',
            overflow: 'hidden',
            marginBottom: 12,
          }}>
            {/* 网格背景模拟地图 */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '24px 24px', opacity: 0.6,
            }} />
            {/* 路径轨迹 - SVG 折线 */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <polyline points="20,160 80,140 130,100 180,80 240,60 300,40"
                fill="none" stroke="#FF7A45" strokeWidth="3" strokeDasharray="6 4" />
            </svg>
            {/* 用户位置点 */}
            <div style={{ position: 'absolute', left: 20, bottom: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#3B82F6', border: '2px solid #fff', boxShadow: '0 0 0 3px rgba(59,130,246,0.3)' }} />
              <span style={{ fontSize: 11, color: '#3B82F6', fontWeight: 600, marginTop: 2 }}>用户位置</span>
            </div>
            {/* 伙伴实时位置点 */}
            <div style={{ position: 'absolute', right: 60, top: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#FF7A45', border: '2px solid #fff', boxShadow: '0 0 0 4px rgba(255,122,69,0.3)' }} />
              <span style={{ fontSize: 11, color: '#FF7A45', fontWeight: 600, marginTop: 2 }}>实时位置</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={14} style={{ color: '#FF7A45' }} />
              <span style={{ color: '#8E8E93' }}>坐标：</span>
              <span style={{ fontFamily: 'monospace', color: '#22242a' }}>{orderDetail.location.lat}, {orderDetail.location.lng}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Navigation size={14} style={{ color: '#3B82F6' }} />
              <span style={{ color: '#8E8E93' }}>距离用户：</span>
              <span style={{ color: '#3B82F6', fontWeight: 600 }}>{orderDetail.location.distance} km</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={14} style={{ color: '#8E8E93' }} />
              <span style={{ color: '#8E8E93' }}>最后更新：</span>
              <span style={{ color: '#565a66' }}>{orderDetail.location.lastUpdate}</span>
            </div>
          </div>
        </div>

        {/* 费用明细卡片 */}
        <div className="admin-section">
          <h3 className="admin-section-title"><DollarSign size={16} style={{ color: '#FF7A45' }} />费用明细</h3>
          <div style={infoRowStyle}><span style={labelStyle}>服务费</span><span style={valueStyle}>¥{orderDetail.fee.serviceFee.toFixed(2)}</span></div>
          <div style={infoRowStyle}><span style={labelStyle}>平台抽成 (10%)</span><span style={{ ...valueStyle, color: '#EF4444' }}>-¥{orderDetail.fee.commission.toFixed(2)}</span></div>
          <div style={infoRowStyle}><span style={labelStyle}>伙伴收入</span><span style={{ ...valueStyle, color: '#10B981' }}>¥{orderDetail.fee.partnerIncome.toFixed(2)}</span></div>
          <div style={infoRowStyle}><span style={labelStyle}>优惠券</span><span style={{ ...valueStyle, color: '#EF4444' }}>-¥{orderDetail.fee.coupon.toFixed(2)}</span></div>
          <div style={{ ...infoRowStyle, borderBottom: 'none' }}>
            <span style={{ ...labelStyle, fontWeight: 600, color: '#22242a' }}>实付金额</span>
            <span style={{ color: '#FF7A45', fontWeight: 700, fontSize: 18 }}>¥{orderDetail.fee.paid.toFixed(2)}</span>
          </div>
        </div>

        {/* 评价信息卡片 */}
        <div className="admin-section">
          <h3 className="admin-section-title"><Star size={16} style={{ color: '#F59E0B' }} />评价信息</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* 用户对伙伴评价 */}
            <div style={{ background: '#f8f9fc', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 13, color: '#8E8E93', marginBottom: 8 }}>用户 → 伙伴</div>
              {!orderDetail.reviewUserToPartner.has ? (
                <div style={{ color: '#8E8E93', fontSize: 13 }}>暂未评价（订单完成后可评价）</div>
              ) : (
                <>
                  <div style={{ color: '#F59E0B', marginBottom: 6 }}>{'★'.repeat(orderDetail.reviewUserToPartner.rating)}</div>
                  <div style={{ fontSize: 13, color: '#565a66' }}>{orderDetail.reviewUserToPartner.comment}</div>
                  {orderDetail.reviewUserToPartner.anonymous && <div style={{ fontSize: 11, color: '#8E8E93', marginTop: 4 }}>（匿名评价）</div>}
                </>
              )}
            </div>
            {/* 伙伴对用户评价 */}
            <div style={{ background: '#f8f9fc', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 13, color: '#8E8E93', marginBottom: 8 }}>伙伴 → 用户</div>
              {!orderDetail.reviewPartnerToUser.has ? (
                <div style={{ color: '#8E8E93', fontSize: 13 }}>暂未评价（订单完成后可评价）</div>
              ) : (
                <>
                  <div style={{ color: '#F59E0B', marginBottom: 6 }}>{'★'.repeat(orderDetail.reviewPartnerToUser.rating)}</div>
                  <div style={{ fontSize: 13, color: '#565a66' }}>{orderDetail.reviewPartnerToUser.comment}</div>
                  {orderDetail.reviewPartnerToUser.anonymous && <div style={{ fontSize: 11, color: '#8E8E93', marginTop: 4 }}>（匿名评价）</div>}
                </>
              )}
            </div>
          </div>
        </div>

        {/* 底部操作按钮 */}
        <div style={{
          position: 'sticky', bottom: 0, background: '#fff',
          borderRadius: 16, padding: '16px 20px', boxShadow: '0 -4px 20px rgba(31, 35, 55, 0.08)',
          display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap',
        }}>
          <button style={bottomBtnStyle('#3B82F6', '#EFF6FF')} onClick={() => alert('正在呼叫用户...' + orderDetail.user.phone)}>
            <Phone size={16} />联系用户
          </button>
          <button style={bottomBtnStyle('#FF7A45', '#FFF7ED')} onClick={() => alert('正在呼叫伙伴...' + orderDetail.partner.phone)}>
            <Phone size={16} />联系伙伴
          </button>
          <button style={bottomBtnStyle('#EF4444', '#FEE2E2')} onClick={() => { if (confirm('确认关闭此订单？')) alert('订单已关闭'); }}>
            <FileText size={16} />关闭订单
          </button>
          <button style={bottomBtnStyle('#10B981', '#D1FAE5')} onClick={() => { setShowExportTip(true); setTimeout(() => setShowExportTip(false), 2000); }}>
            <Download size={16} />导出报表
          </button>
          {showExportTip && <span style={{ alignSelf: 'center', fontSize: 12, color: '#10B981' }}>报表已导出 ✓</span>}
        </div>
      </div>
    </AdminLayout>
  );
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
