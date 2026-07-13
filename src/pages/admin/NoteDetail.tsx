import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import {
  ArrowLeft,
  Eye,
  ThumbsUp,
  MessageCircle,
  Heart,
  Share2,
  ShoppingBag,
  Check,
  X,
  Ban,
  RefreshCw,
  Trash2,
  User,
  Clock,
  AlertTriangle,
} from 'lucide-react';

// 笔记详情 mock 数据
const noteDetailData = {
  id: 'NOTE001',
  title: '晨跑打卡第30天｜魔都滨江跑道全攻略',
  cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=morning%20run%20along%20river%20sunrise%20city%20skyline%20athletic%20wide&image_size=landscape_16_9',
  category: '运动健身',
  status: '待审核',
  publishTime: '2025-07-08 07:30:00',
  content: `坚持晨跑一个月了，今天想跟大家分享一下上海滨江最美的5条跑道，从杨浦大桥到徐汇滨江，每一段都有不同的风景和体验。

【杨浦大桥段】
从杨浦滨江开始，这里的跑道视野最开阔，可以看到杨浦大桥的全貌。早上6点左右，太阳从江面升起，金色的阳光洒在水面上，非常治愈。跑道全长约3公里，人流量相对较少，适合喜欢安静跑步的朋友。

【北外滩段】
北外滩的跑道是我最喜欢的，对面就是陆家嘴三件套，跑起来特别有都市感。这里的跑道比较新，设施也很完善，沿途有很多休息座椅和直饮水站。推荐傍晚来跑，夜景非常棒。

【外滩段】
外滩段游客比较多，建议早一点来跑。从外白渡桥到十六铺码头，全程约2公里。虽然人多，但能在晨雾中看到外滩的万国建筑博览群，那种感觉真的很特别。

【徐汇滨江段】
徐汇滨江应该是上海最成熟的跑步圣地了，跑道又宽又平整，沿途有很多咖啡馆和艺术空间。周末会有很多跑团在这里活动，氛围特别好。而且西岸美术馆、龙美术馆都在附近，跑完步还能去看个展。

【前滩段】
前滩是最近发现的宝藏跑道，人少景美，还有专门的骑行道和跑步道分离。旁边就是前滩太古里，跑完可以去吃个早餐补充能量。

【跑步小贴士】
1. 夏天跑步一定要注意补水，建议每20分钟补充一次水分
2. 早上跑步前可以吃根香蕉或者一片面包，不要空腹跑
3. 选择专业的跑步鞋，保护好膝盖
4. 跑前热身和跑后拉伸都很重要，不要省略
5. 循序渐进，不要一开始就追求距离和速度

希望这篇攻略对喜欢跑步的朋友有帮助，欢迎在评论区分享你们的私藏跑道！`,
  images: [
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanghai%20riverfront%20running%20path%20morning%20sunrise%20cityscape&image_size=square_hd',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bund%20shanghai%20morning%20fog%20historic%20buildings%20peaceful&image_size=square_hd',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=xuhui%20riverside%20art%20district%20running%20path%20modern&image_size=square_hd',
  ],
  stats: {
    views: 2856,
    likes: 186,
    comments: 42,
    favorites: 128,
    shares: 56,
    orders: 8,
  },
  author: {
    id: 'M20015',
    name: '晨光伙伴',
    avatar: '/avatars/avatar1.png',
    level: 2,
    levelName: '正式伙伴',
    certTags: ['实名', '真人', '技能'],
    totalNotes: 36,
  },
};

// 评论列表 mock 数据
const mockComments = [
  {
    id: 'C001',
    user: '跑步小白',
    avatar: '/avatars/avatar2.png',
    content: '太实用了！周末就去徐汇滨江试试，请问早上几点人最少呀？',
    time: '2025-07-08 09:15',
    reports: 0,
  },
  {
    id: 'C002',
    user: '马拉松爱好者',
    avatar: '/avatars/avatar3.png',
    content: '前滩那段确实不错，我经常去跑。推荐大家可以试试夜跑，灯光特别美。',
    time: '2025-07-08 10:30',
    reports: 0,
  },
  {
    id: 'C003',
    user: '健身达人',
    avatar: '/avatars/avatar4.png',
    content: '请问楼主一般配速是多少？我刚开始跑步，5分30秒算快吗？',
    time: '2025-07-08 11:20',
    reports: 1,
  },
  {
    id: 'C004',
    user: '咖啡与跑',
    avatar: '/avatars/avatar5.png',
    content: '跑完步去旁边的咖啡店坐坐，简直是周末最完美的打开方式！',
    time: '2025-07-08 14:05',
    reports: 0,
  },
  {
    id: 'C005',
    user: '减肥进行时',
    avatar: '/avatars/avatar1.png',
    content: '坚持跑步一个月瘦了8斤，大家一起加油！！！',
    time: '2025-07-08 16:40',
    reports: 2,
  },
];

// 关联订单 mock 数据
const mockOrders = [
  {
    id: 'ORD20250710000868',
    user: '小光',
    service: '晨跑陪练',
    amount: 98,
    time: '2025-07-08 10:30',
    status: '已完成',
  },
  {
    id: 'ORD20250709000123',
    user: '南希',
    service: '晨跑陪练',
    amount: 98,
    time: '2025-07-09 06:00',
    status: '服务中',
  },
  {
    id: 'ORD20250708000056',
    user: '阿澈',
    service: '跑步指导',
    amount: 158,
    time: '2025-07-07 15:00',
    status: '已完成',
  },
];

// 下架原因选项
const offlineReasons = [
  '内容违规',
  '图片侵权',
  '虚假宣传',
  '用户举报',
  '其他原因',
];

export default function AdminNoteDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const noteId = params.id || noteDetailData.id;

  // 笔记状态
  const [noteStatus, setNoteStatus] = useState<'pending' | 'published' | 'offline'>('pending');
  // 拒绝原因
  const [rejectReason, setRejectReason] = useState('');
  // 下架原因
  const [offlineReason, setOfflineReason] = useState('');
  // 显示拒绝输入框
  const [showRejectInput, setShowRejectInput] = useState(false);
  // 显示下架原因选择
  const [showOfflineReason, setShowOfflineReason] = useState(false);

  // 状态文本和样式
  const getStatusInfo = (status: string) => {
    const map: Record<string, { text: string; bg: string; color: string }> = {
      pending: { text: '待审核', bg: '#FEF3C7', color: '#F59E0B' },
      published: { text: '已发布', bg: '#D1FAE5', color: '#10B981' },
      offline: { text: '已下架', bg: '#F3F4F6', color: '#6B7280' },
    };
    return map[status] || map.pending;
  };

  const statusInfo = getStatusInfo(noteStatus);

  // 订单状态样式
  const getOrderStatusStyle = (s: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      待接单: { bg: '#FEF3C7', color: '#F59E0B' },
      服务中: { bg: '#DBEAFE', color: '#3B82F6' },
      已完成: { bg: '#D1FAE5', color: '#10B981' },
      已取消: { bg: '#F3F4F6', color: '#6B7280' },
    };
    return map[s] || { bg: '#F3F4F6', color: '#6B7280' };
  };

  // 审核通过
  const handleApprove = () => {
    setNoteStatus('published');
    alert('笔记已通过审核，现已发布');
  };

  // 审核拒绝
  const handleReject = () => {
    if (!showRejectInput) {
      setShowRejectInput(true);
      return;
    }
    if (!rejectReason.trim()) {
      alert('请输入拒绝原因');
      return;
    }
    setNoteStatus('offline');
    setShowRejectInput(false);
    alert(`笔记已拒绝，原因：${rejectReason}`);
    setRejectReason('');
  };

  // 下架
  const handleOffline = () => {
    if (!showOfflineReason) {
      setShowOfflineReason(true);
      return;
    }
    if (!offlineReason) {
      alert('请选择下架原因');
      return;
    }
    setNoteStatus('offline');
    setShowOfflineReason(false);
    alert(`笔记已下架，原因：${offlineReason}`);
    setOfflineReason('');
  };

  // 重新上架
  const handleRepublish = () => {
    setNoteStatus('published');
    alert('笔记已重新上架');
  };

  // 删除评论
  const handleDeleteComment = (commentId: string, content: string) => {
    if (confirm(`确定删除这条评论吗？\n"${content}"`)) {
      alert('评论已删除');
    }
  };

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: 16,
    padding: 20,
    boxShadow: '0 4px 20px rgba(31, 35, 55, 0.05)',
    marginBottom: 16,
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* 顶部：返回按钮 + 笔记标题 + 状态标签 */}
        <div
          className="admin-page-header"
          style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}
        >
          <button
            onClick={() => navigate('/admin/notes')}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: '1px solid #e0e0e0',
              background: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#565a66',
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="admin-page-title" style={{ margin: 0, flex: 1, minWidth: 200 }}>
            笔记详情
          </h1>
          <span style={{ fontFamily: 'monospace', color: '#8E8E93', fontSize: 13 }}>{noteId}</span>
          <span
            className="admin-status-tag"
            style={{
              background: statusInfo.bg,
              color: statusInfo.color,
            }}
          >
            {statusInfo.text}
          </span>
        </div>

        {/* 作者信息卡 */}
        <div style={cardStyle}>
          <h3 className="admin-section-title" style={{ marginTop: 0 }}>
            作者信息
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <img
              src={noteDetailData.author.avatar}
              alt=""
              style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#22242a' }}>
                  {noteDetailData.author.name}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #FF7A45, #A855F7)',
                    color: '#fff',
                    fontWeight: 500,
                  }}
                >
                  {noteDetailData.author.levelName}
                </span>
                {noteDetailData.author.certTags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 11,
                      padding: '2px 6px',
                      borderRadius: 4,
                      background: '#E0E7FF',
                      color: '#6366F1',
                      fontWeight: 500,
                    }}
                  >
                    {tag}认证
                  </span>
                ))}
              </div>
              <div style={{ fontSize: 13, color: '#8E8E93' }}>
                历史笔记：{noteDetailData.author.totalNotes} 篇
              </div>
            </div>
            <button
              onClick={() => navigate(`/admin/partners/${noteDetailData.author.id}`)}
              style={{
                padding: '8px 16px',
                borderRadius: 10,
                border: '1px solid #e0e0e0',
                background: '#fff',
                color: '#565a66',
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <User size={14} />
              查看伙伴主页
            </button>
          </div>
        </div>

        {/* 笔记内容区 */}
        <div style={cardStyle}>
          <h3 className="admin-section-title" style={{ marginTop: 0 }}>
            笔记内容
          </h3>

          {/* 大图封面 */}
          <div style={{ width: '100%', height: 300, borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
            <img
              src={noteDetailData.cover}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* 标题 */}
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#22242a',
              margin: '0 0 12px 0',
              lineHeight: 1.4,
            }}
          >
            {noteDetailData.title}
          </h2>

          {/* 分类和发布时间 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span
              className="admin-status-tag"
              style={{ background: '#DBEAFE', color: '#3B82F6' }}
            >
              {noteDetailData.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#8E8E93' }}>
              <Clock size={14} />
              <span>{noteDetailData.publishTime}</span>
            </div>
          </div>

          {/* 正文段落 */}
          <div
            style={{
              fontSize: 14,
              color: '#565a66',
              lineHeight: 1.8,
              marginBottom: 16,
              whiteSpace: 'pre-wrap',
            }}
          >
            {noteDetailData.content}
          </div>

          {/* 配图 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {noteDetailData.images.map((img, idx) => (
              <div
                key={idx}
                style={{
                  aspectRatio: '1',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={img}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 数据统计 */}
        <div style={cardStyle}>
          <h3 className="admin-section-title" style={{ marginTop: 0 }}>
            数据统计
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
            <StatBox icon={<Eye size={18} />} label="阅读量" value={noteDetailData.stats.views.toLocaleString()} color="#3B82F6" />
            <StatBox icon={<ThumbsUp size={18} />} label="点赞数" value={noteDetailData.stats.likes.toString()} color="#EF4444" />
            <StatBox icon={<MessageCircle size={18} />} label="评论数" value={noteDetailData.stats.comments.toString()} color="#10B981" />
            <StatBox icon={<Heart size={18} />} label="收藏数" value={noteDetailData.stats.favorites.toString()} color="#F59E0B" />
            <StatBox icon={<Share2 size={18} />} label="分享数" value={noteDetailData.stats.shares.toString()} color="#8B5CF6" />
            <StatBox icon={<ShoppingBag size={18} />} label="带来订单" value={noteDetailData.stats.orders.toString()} color="#FF7A45" />
          </div>
        </div>

        {/* 审核操作区 */}
        <div style={cardStyle}>
          <h3 className="admin-section-title" style={{ marginTop: 0 }}>
            <AlertTriangle size={16} style={{ color: '#F59E0B' }} />
            审核操作
          </h3>

          {/* 待审核状态 */}
          {noteStatus === 'pending' && (
            <div>
              <div style={{ display: 'flex', gap: 12, marginBottom: showRejectInput ? 16 : 0 }}>
                <button
                  onClick={handleApprove}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 24px',
                    borderRadius: 12,
                    border: 'none',
                    background: 'linear-gradient(135deg, #10B981, #34D399)',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <Check size={16} />
                  通过审核
                </button>
                <button
                  onClick={handleReject}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 24px',
                    borderRadius: 12,
                    border: '1px solid #EF4444',
                    background: '#fff',
                    color: '#EF4444',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <X size={16} />
                  拒绝
                </button>
              </div>

              {showRejectInput && (
                <div style={{ background: '#FEF2F2', borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 13, color: '#991B1B', fontWeight: 600, marginBottom: 8 }}>
                    请输入拒绝原因
                  </div>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="请详细说明拒绝该笔记的原因..."
                    style={{
                      width: '100%',
                      minHeight: 80,
                      padding: 12,
                      border: '1px solid #FECACA',
                      borderRadius: 8,
                      fontSize: 13,
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
                    <button
                      onClick={() => {
                        setShowRejectInput(false);
                        setRejectReason('');
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        border: '1px solid #e0e0e0',
                        background: '#fff',
                        color: '#565a66',
                        fontSize: 13,
                        cursor: 'pointer',
                      }}
                    >
                      取消
                    </button>
                    <button
                      onClick={handleReject}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        border: 'none',
                        background: '#EF4444',
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      确认拒绝
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 已发布状态 */}
          {noteStatus === 'published' && (
            <div>
              <div style={{ marginBottom: showOfflineReason ? 16 : 0 }}>
                <button
                  onClick={handleOffline}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 24px',
                    borderRadius: 12,
                    border: '1px solid #6B7280',
                    background: '#fff',
                    color: '#6B7280',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <Ban size={16} />
                  下架笔记
                </button>
              </div>

              {showOfflineReason && (
                <div style={{ background: '#F3F4F6', borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 13, color: '#374151', fontWeight: 600, marginBottom: 10 }}>
                    请选择下架原因
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                    {offlineReasons.map((reason) => (
                      <button
                        key={reason}
                        onClick={() => setOfflineReason(reason)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 20,
                          fontSize: 13,
                          border: offlineReason === reason ? '1px solid #FF7A45' : '1px solid #d1d5db',
                          background: offlineReason === reason ? '#FFF7ED' : '#fff',
                          color: offlineReason === reason ? '#FF7A45' : '#565a66',
                          cursor: 'pointer',
                          fontWeight: offlineReason === reason ? 600 : 400,
                        }}
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <button
                      onClick={() => {
                        setShowOfflineReason(false);
                        setOfflineReason('');
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        border: '1px solid #e0e0e0',
                        background: '#fff',
                        color: '#565a66',
                        fontSize: 13,
                        cursor: 'pointer',
                      }}
                    >
                      取消
                    </button>
                    <button
                      onClick={handleOffline}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        border: 'none',
                        background: '#6B7280',
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      确认下架
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 已下架状态 */}
          {noteStatus === 'offline' && (
            <button
              onClick={handleRepublish}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 24px',
                borderRadius: 12,
                border: 'none',
                background: 'linear-gradient(135deg, #10B981, #34D399)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <RefreshCw size={16} />
              重新上架
            </button>
          )}
        </div>

        {/* 评论列表 */}
        <div style={cardStyle}>
          <h3 className="admin-section-title" style={{ marginTop: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>评论列表</span>
            <span style={{ fontSize: 13, fontWeight: 400, color: '#8E8E93' }}>最近 5 条</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {mockComments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '12px 0',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <img
                  src={comment.avatar}
                  alt=""
                  style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#22242a' }}>{comment.user}</span>
                    <span style={{ fontSize: 12, color: '#8E8E93' }}>{comment.time}</span>
                    {comment.reports > 0 && (
                      <span
                        style={{
                          fontSize: 11,
                          padding: '2px 6px',
                          borderRadius: 4,
                          background: '#FEE2E2',
                          color: '#EF4444',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <AlertTriangle size={12} />
                        举报 {comment.reports}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: '#565a66',
                      margin: '0 0 8px 0',
                      lineHeight: 1.5,
                    }}
                  >
                    {comment.content}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleDeleteComment(comment.id, comment.content)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '4px 10px',
                        borderRadius: 6,
                        border: 'none',
                        background: '#FEE2E2',
                        color: '#EF4444',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={12} />
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 关联订单 */}
        <div style={cardStyle}>
          <h3 className="admin-section-title" style={{ marginTop: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>关联订单</span>
            <span style={{ fontSize: 13, fontWeight: 400, color: '#8E8E93' }}>该笔记带来的订单</span>
          </h3>
          <div className="admin-table" style={{ boxShadow: 'none', padding: 0 }}>
            <table>
              <thead>
                <tr>
                  <th>订单号</th>
                  <th>用户</th>
                  <th>服务</th>
                  <th>金额</th>
                  <th>下单时间</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/orders/${order.id}`)}>
                    <td style={{ fontFamily: 'monospace', color: '#8E8E93', fontSize: 12 }}>{order.id}</td>
                    <td>{order.user}</td>
                    <td>
                      <span className="admin-status-tag" style={{ background: '#FFF7ED', color: '#FF7A45' }}>
                        {order.service}
                      </span>
                    </td>
                    <td style={{ color: '#FF7A45', fontWeight: 600 }}>¥{order.amount}</td>
                    <td style={{ color: '#8E8E93', fontSize: 12 }}>{order.time}</td>
                    <td>
                      <span
                        className="admin-status-tag"
                        style={{
                          background: getOrderStatusStyle(order.status).bg,
                          color: getOrderStatusStyle(order.status).color,
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <button
                        className="admin-action-btn view"
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// 统计盒小组件
function StatBox({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: '#f8f9fc',
        borderRadius: 12,
        padding: 14,
        textAlign: 'center',
      }}
    >
      <div style={{ color, marginBottom: 6, display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontSize: 12, color: '#8E8E93', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color }}>{value}</div>
    </div>
  );
}
