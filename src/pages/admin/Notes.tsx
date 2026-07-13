import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { Search, Eye, Check, X, Ban, RefreshCw, EyeOff } from 'lucide-react';

// 笔记分类
const categories = ['全部', '运动健身', '看展同行', '咖啡探店', '城市徒步', '其他'];
// 笔记状态
const statusTabs = ['待审核', '已发布', '已下架'];

// 12条mock数据，混合多种状态和分类
const mockNotes = [
  {
    id: 'NOTE001',
    title: '晨跑打卡第30天｜魔都滨江跑道全攻略',
    summary: '坚持晨跑一个月，整理了上海滨江5条最美跑道，从杨浦大桥到徐汇滨江，每一段都有不同的风景...',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=morning%20run%20along%20river%20sunrise%20city%20skyline%20athletic&image_size=landscape_4_3',
    author: '晨光伙伴',
    authorAvatar: '/avatars/avatar1.png',
    category: '运动健身',
    views: 2856,
    likes: 186,
    publishTime: '2025-07-08 07:30',
    status: '已发布',
  },
  {
    id: 'NOTE002',
    title: '武康路探店｜藏在老洋房里的手冲咖啡',
    summary: '今天带大家打卡一家藏在武康路老洋房里的小众咖啡店，店主是一位有着10年经验的咖啡师...',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cozy%20coffee%20shop%20vintage%20shanghai%20old%20town%20latte%20art&image_size=landscape_4_3',
    author: '咖啡达人',
    authorAvatar: '/avatars/avatar2.png',
    category: '咖啡探店',
    views: 0,
    likes: 0,
    publishTime: '2025-07-09 14:20',
    status: '待审核',
  },
  {
    id: 'NOTE003',
    title: '浦东美术馆看展指南｜这几幅作品一定要看',
    summary: '周末去了浦东美术馆的新展，整理了最值得驻足的8件作品，附带拍照机位推荐...',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=art%20museum%20gallery%20exhibition%20modern%20paintings%20visitors&image_size=landscape_4_3',
    author: '文艺小鹿',
    authorAvatar: '/avatars/avatar3.png',
    category: '看展同行',
    views: 1523,
    likes: 98,
    publishTime: '2025-07-05 10:15',
    status: '已发布',
  },
  {
    id: 'NOTE004',
    title: '佘山徒步｜上海唯一的山，周末吸氧好去处',
    summary: '佘山国家森林公园徒步路线分享，东佘山+西佘山全程约8公里，适合新手的入门级徒步...',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hiking%20mountain%20trail%20forest%20green%20nature%20outdoor&image_size=landscape_4_3',
    author: '徒步老王',
    authorAvatar: '/avatars/avatar4.png',
    category: '城市徒步',
    views: 892,
    likes: 67,
    publishTime: '2025-07-03 16:45',
    status: '已下架',
  },
  {
    id: 'NOTE005',
    title: '瑜伽入门｜在家也能练的10个基础动作',
    summary: '很多朋友问我瑜伽入门应该练什么，今天分享10个最基础的瑜伽动作，每天15分钟...',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=yoga%20practice%20home%20workout%20wellness%20calm%20peaceful&image_size=landscape_4_3',
    author: '健身Lily',
    authorAvatar: '/avatars/avatar5.png',
    category: '运动健身',
    views: 3421,
    likes: 245,
    publishTime: '2025-07-01 09:00',
    status: '已发布',
  },
  {
    id: 'NOTE006',
    title: '苏州河citywalk｜从外滩到梦清园',
    summary: '苏州河畔的citywalk路线推荐，沿途经过历史建筑、创意园区、网红咖啡馆...',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=city%20walk%20riverside%20shanghai%20historic%20buildings%20street&image_size=landscape_4_3',
    author: '城市漫游者',
    authorAvatar: '/avatars/avatar1.png',
    category: '城市徒步',
    views: 0,
    likes: 0,
    publishTime: '2025-07-10 11:30',
    status: '待审核',
  },
  {
    id: 'NOTE007',
    title: '上海当代艺术博物馆｜双年展深度解析',
    summary: '今年的双年展主题是"水体"，用了3个小时慢慢看完，整理了我的观展心得...',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=contemporary%20art%20museum%20installation%20exhibition%20creative&image_size=landscape_4_3',
    author: '文艺小鹿',
    authorAvatar: '/avatars/avatar3.png',
    category: '看展同行',
    views: 0,
    likes: 0,
    publishTime: '2025-07-09 18:00',
    status: '待审核',
  },
  {
    id: 'NOTE008',
    title: '静安寺周边5家小众咖啡馆测评',
    summary: '静安寺商圈藏着很多宝藏咖啡馆，今天测评5家小众但品质在线的店...',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coffee%20shop%20interior%20design%20cafe%20aesthetic%20modern&image_size=landscape_4_3',
    author: '咖啡达人',
    authorAvatar: '/avatars/avatar2.png',
    category: '咖啡探店',
    views: 4128,
    likes: 312,
    publishTime: '2025-06-28 13:20',
    status: '已发布',
  },
  {
    id: 'NOTE009',
    title: '健身房小白入门指南｜器械使用全攻略',
    summary: '第一次去健身房不知道从哪开始？这篇攻略带你认识所有常见器械...',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=gym%20fitness%20equipment%20workout%20training%20modern%20interior&image_size=landscape_4_3',
    author: '健身Lily',
    authorAvatar: '/avatars/avatar5.png',
    category: '运动健身',
    views: 2156,
    likes: 178,
    publishTime: '2025-07-02 20:00',
    status: '已下架',
  },
  {
    id: 'NOTE010',
    title: '复兴公园周边的法式浪漫｜周末散步路线',
    summary: '复兴公园一带有着浓郁的法式风情，思南路、皋兰路、香山路...每一条路都值得慢慢走...',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=french%20concession%20shanghai%20tree%20lined%20street%20historic%20villa&image_size=landscape_4_3',
    author: '城市漫游者',
    authorAvatar: '/avatars/avatar1.png',
    category: '城市徒步',
    views: 1876,
    likes: 134,
    publishTime: '2025-07-06 15:30',
    status: '已发布',
  },
  {
    id: 'NOTE011',
    title: '手冲咖啡入门｜在家也能冲出好喝的咖啡',
    summary: '分享我的手冲咖啡入门心得，从器具选择到研磨度、水温、注水手法...',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pour%20over%20coffee%20hand%20drip%20barista%20brewing%20aesthetic&image_size=landscape_4_3',
    author: '咖啡达人',
    authorAvatar: '/avatars/avatar2.png',
    category: '咖啡探店',
    views: 0,
    likes: 0,
    publishTime: '2025-07-10 09:00',
    status: '待审核',
  },
  {
    id: 'NOTE012',
    title: '周末去哪儿｜上海周边小众古镇推荐',
    summary: '周末想远离城市喧嚣？推荐3个上海周边的小众古镇，人少景美...',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20chinese%20water%20town%20canal%20traditional%20architecture%20peaceful&image_size=landscape_4_3',
    author: '徒步老王',
    authorAvatar: '/avatars/avatar4.png',
    category: '其他',
    views: 5234,
    likes: 389,
    publishTime: '2025-06-25 10:00',
    status: '已发布',
  },
];

// 统计数据
const statsData = {
  pending: 8,
  published: 156,
  offline: 12,
  totalViews: 28560,
};

export default function AdminNotes() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryTab, setCategoryTab] = useState('全部');
  const [statusTab, setStatusTab] = useState('全部');
  const pageSize = 6;

  // 筛选逻辑
  let filtered = mockNotes;
  if (search) {
    filtered = filtered.filter(
      (n) => n.title.includes(search) || n.author.includes(search) || n.summary.includes(search)
    );
  }
  if (categoryTab !== '全部') {
    filtered = filtered.filter((n) => n.category === categoryTab);
  }
  if (statusTab !== '全部') {
    filtered = filtered.filter((n) => n.status === statusTab);
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  // 状态样式映射
  const getStatusStyle = (s: string) => {
    const map: Record<string, { bg: string; color: string; border: string }> = {
      待审核: { bg: '#FEF3C7', color: '#F59E0B', border: '#F59E0B' },
      已发布: { bg: '#D1FAE5', color: '#10B981', border: '#10B981' },
      已下架: { bg: '#F3F4F6', color: '#6B7280', border: '#6B7280' },
    };
    return map[s] || { bg: '#F3F4F6', color: '#6B7280', border: '#6B7280' };
  };

  // 分类标签颜色
  const getCategoryColor = (c: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      运动健身: { bg: '#DBEAFE', color: '#3B82F6' },
      看展同行: { bg: '#EDE9FE', color: '#8B5CF6' },
      咖啡探店: { bg: '#FEF3C7', color: '#D97706' },
      城市徒步: { bg: '#D1FAE5', color: '#10B981' },
      其他: { bg: '#F3E8FF', color: '#A855F7' },
    };
    return map[c] || { bg: '#F3F4F6', color: '#6B7280' };
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* 顶部标题 + 统计条 */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h1 className="admin-page-title" style={{ margin: 0 }}>服务笔记</h1>
          </div>

          {/* 统计条 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            <div style={statCardStyle('#F59E0B')}>
              <div style={statLabelStyle}>待审核</div>
              <div style={statValueStyle('#F59E0B')}>{statsData.pending}</div>
            </div>
            <div style={statCardStyle('#10B981')}>
              <div style={statLabelStyle}>已发布</div>
              <div style={statValueStyle('#10B981')}>{statsData.published}</div>
            </div>
            <div style={statCardStyle('#6B7280')}>
              <div style={statLabelStyle}>已下架</div>
              <div style={statValueStyle('#6B7280')}>{statsData.offline}</div>
            </div>
            <div style={statCardStyle('#FF7A45')}>
              <div style={statLabelStyle}>总阅读</div>
              <div style={statValueStyle('#FF7A45')}>{statsData.totalViews.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* 搜索框 + 分类Tab + 状态Tab */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 4px 20px rgba(31, 35, 55, 0.05)', marginBottom: 20 }}>
          {/* 搜索框 */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <div className="admin-search-wrap" style={{ flex: 1, maxWidth: 400 }}>
              <Search size={18} style={{ color: '#8E8E93' }} />
              <input
                className="admin-search-input"
                placeholder="搜索笔记标题、作者、内容"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* 分类Tab */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: '#8E8E93', marginBottom: 8 }}>笔记分类</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCategoryTab(c);
                    setPage(1);
                  }}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: categoryTab === c ? 600 : 400,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: categoryTab === c ? 'linear-gradient(135deg, #FF7A45, #A855F7)' : '#f4f3f6',
                    color: categoryTab === c ? '#fff' : '#565a66',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* 状态Tab */}
          <div>
            <div style={{ fontSize: 12, color: '#8E8E93', marginBottom: 8 }}>审核状态</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['全部', ...statusTabs].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setStatusTab(s);
                    setPage(1);
                  }}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: statusTab === s ? 600 : 400,
                    border: statusTab === s ? '1px solid #FF7A45' : '1px solid #e0e0e0',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: statusTab === s ? '#FFF7ED' : '#fff',
                    color: statusTab === s ? '#FF7A45' : '#565a66',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 笔记卡片列表 - 2列网格布局 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 20 }}>
          {pageData.map((note) => (
            <div
              key={note.id}
              onClick={() => navigate(`/admin/notes/${note.id}`)}
              style={{
                background: '#fff',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(31, 35, 55, 0.05)',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(31, 35, 55, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(31, 35, 55, 0.05)';
              }}
            >
              {/* 上半部分：封面图 + 内容 */}
              <div style={{ display: 'flex' }}>
                {/* 左侧封面图 */}
                <div style={{ width: 160, height: 160, flexShrink: 0, position: 'relative' }}>
                  <img
                    src={note.cover}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* 状态标签 */}
                  <span
                    className="admin-status-tag"
                    style={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      background: getStatusStyle(note.status).bg,
                      color: getStatusStyle(note.status).color,
                      fontSize: 11,
                      padding: '2px 8px',
                    }}
                  >
                    {note.status}
                  </span>
                  {/* 分类标签 */}
                  <span
                    className="admin-status-tag"
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      background: getCategoryColor(note.category).bg,
                      color: getCategoryColor(note.category).color,
                      fontSize: 11,
                      padding: '2px 8px',
                    }}
                  >
                    {note.category}
                  </span>
                </div>

                {/* 右侧内容 */}
                <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#22242a',
                      margin: '0 0 6px 0',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {note.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 12,
                      color: '#8E8E93',
                      margin: '0 0 10px 0',
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      flex: 1,
                    }}
                  >
                    {note.summary}
                  </p>

                  {/* 作者信息 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <img
                      src={note.authorAvatar}
                      alt=""
                      style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: 12, color: '#565a66', fontWeight: 500 }}>{note.author}</span>
                    <span style={{ fontSize: 11, color: '#C7C7CC' }}>·</span>
                    <span style={{ fontSize: 11, color: '#8E8E93' }}>{note.publishTime.split(' ')[0]}</span>
                  </div>

                  {/* 阅读量 + 点赞数 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#8E8E93' }}>
                      <Eye size={14} />
                      <span>{note.views.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#EF4444' }}>
                      ♥ {note.likes}
                    </div>
                  </div>
                </div>
              </div>

              {/* 底部操作栏 */}
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 8,
                  padding: '10px 14px',
                  borderTop: '1px solid #f0f0f0',
                  background: '#fafbfc',
                }}
              >
                <button
                  onClick={() => navigate(`/admin/notes/${note.id}`)}
                  style={actionBtnStyle('#3B82F6', '#EFF6FF')}
                >
                  <Eye size={14} />
                  查看
                </button>
                {note.status === '待审核' && (
                  <>
                    <button onClick={() => alert(`已通过笔记「${note.title}」`)} style={actionBtnStyle('#10B981', '#D1FAE5')}>
                      <Check size={14} />
                      通过
                    </button>
                    <button onClick={() => alert(`已拒绝笔记「${note.title}」`)} style={actionBtnStyle('#EF4444', '#FEE2E2')}>
                      <X size={14} />
                      拒绝
                    </button>
                  </>
                )}
                {note.status === '已发布' && (
                  <button onClick={() => alert(`已下架笔记「${note.title}」`)} style={actionBtnStyle('#6B7280', '#F3F4F6')}>
                    <Ban size={14} />
                    下架
                  </button>
                )}
                {note.status === '已下架' && (
                  <button onClick={() => alert(`已重新上架笔记「${note.title}」`)} style={actionBtnStyle('#10B981', '#D1FAE5')}>
                    <RefreshCw size={14} />
                    重新上架
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 分页 */}
        <div className="admin-pagination">
          <span className="admin-page-info">
            共 {total} 篇笔记，第 {page} / {totalPages} 页
          </span>
          <div className="admin-page-btns">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              ‹
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
              ›
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// 统计卡片样式
const statCardStyle = (color: string): React.CSSProperties => ({
  background: '#fff',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 4px 20px rgba(31, 35, 55, 0.05)',
  borderLeft: `3px solid ${color}`,
});

const statLabelStyle: React.CSSProperties = {
  fontSize: 13,
  color: '#8E8E93',
  marginBottom: 6,
};

const statValueStyle = (color: string): React.CSSProperties => ({
  fontSize: 24,
  fontWeight: 700,
  color,
});

// 操作按钮样式
function actionBtnStyle(color: string, bg: string): React.CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '6px 12px',
    borderRadius: 8,
    border: 'none',
    background: bg,
    color,
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  };
}
