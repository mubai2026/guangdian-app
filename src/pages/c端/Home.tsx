import { useState, useEffect } from 'react';
import { MapPin, Search, X, ChevronRight, ChevronLeft, Sparkles, Heart, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../components/GlassCard';
import { CTabBar } from '../../components/FloatingTabBar';
import { cards, categories, discoverCards } from '../../mock/data';

const banners = [
  { id: 1, title: '邀请有礼', desc: '邀请得20积分，好友得10积分', bg: 'linear-gradient(135deg,#FF7A45,#FF6B00)', img: '/scenes/scene1.png', route: '/c/invite' },
  { id: 2, title: '夏日限定', desc: '清凉一夏，户外搭子特惠', bg: 'linear-gradient(135deg,#A855F7,#9333EA)', img: '/scenes/scene2.png' },
  { id: 3, title: '技能交换', desc: '用你的技能温暖他人', bg: 'linear-gradient(135deg,#3B82F6,#1D4ED8)', img: '/scenes/scene3.png' },
];

const hotSearches = ['晨跑搭子', '露营', '看展', '咖啡探店', '游泳', '城市骑行', '剧本杀', '健身'];
const searchHistory = ['羽毛球', '咖啡', '跑步'];

export default function Home() {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [showAllSubs, setShowAllSubs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBanner, setCurrentBanner] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleCatClick = (name: string) => {
    setActiveCat(activeCat === name ? null : name);
    setShowAllSubs(false);
  };

  const handleSubClick = (sub: string) => {
    navigate(`/c/discover?cat=${encodeURIComponent(sub)}`);
    setActiveCat(null);
    setShowAllSubs(false);
  };

  const activeSubs = categories.find((c) => c.name === activeCat)?.subs || [];
  const visibleSubs = showAllSubs ? activeSubs : activeSubs.slice(0, 4);
  const hasMore = activeSubs.length > 4;

  const allSearchResults = searchQuery.trim()
    ? [
        ...cards.filter(c =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(c => ({ type: 'activity', id: c.id, name: c.title, desc: c.desc, avatar: c.avatar, image: c.image, price: c.price })),
        ...discoverCards.filter(p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        ).map(p => ({ type: 'partner', id: p.id, name: p.name, desc: p.job, avatar: p.avatar, image: p.cover, price: p.price })),
      ]
    : [];

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  const handleSearch = (keyword: string) => {
    setSearchQuery(keyword);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleBannerClick = () => {
    const banner = banners[currentBanner];
    if (banner.route) {
      navigate(banner.route);
    }
  };

  return (
    <main className="mobile-page">
      <div className="home-header">
        <div className="location-tag">
          <MapPin size={14} />
          <span>上海</span>
        </div>
        <div className={`search-bar ${searchFocused ? 'focused' : ''}`}>
          <Search size={16} color="#8E8E93" />
          <input
            type="text"
            placeholder="搜索搭子、活动、地点"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={clearSearch}>
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {searchFocused && (
        <div className="search-panel">
          {searchQuery.trim() ? (
            <>
              <div className="search-panel-title">搜索结果 ({allSearchResults.length})</div>
              <div className="search-results">
                {allSearchResults.length > 0 ? (
                  allSearchResults.map((item, i) => (
                    <div
                      key={`${item.type}-${item.id}`}
                      className="search-result-item"
                      onClick={() => {
                        if (item.type === 'partner') navigate(`/c/partner/${item.name}`);
                        else navigate(`/c/service/${item.id}`);
                        setSearchFocused(false);
                      }}
                    >
                      <img src={item.avatar} alt="" className="search-result-avatar" />
                      <div className="search-result-info">
                        <div className="search-result-name">
                          {item.name}
                          <span className="search-result-type">{item.type === 'partner' ? '伙伴' : '活动'}</span>
                        </div>
                        <div className="search-result-desc">{item.desc}</div>
                      </div>
                      <span className="search-result-price">¥{item.price}/次起</span>
                    </div>
                  ))
                ) : (
                  <div className="search-empty">
                    <p>未找到相关结果</p>
                    <span>换个关键词试试</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {searchHistory.length > 0 && (
                <div className="search-history-section">
                  <div className="search-panel-title">
                    最近搜索
                    <button className="search-clear-all">清除</button>
                  </div>
                  <div className="search-tags">
                    {searchHistory.map((h) => (
                      <button key={h} className="search-tag" onClick={() => handleSearch(h)}>{h}</button>
                    ))}
                  </div>
                </div>
              )}
              <div className="search-hot-section">
                <div className="search-panel-title">热门搜索</div>
                <div className="search-tags">
                  {hotSearches.map((h, i) => (
                    <button key={h} className="search-tag hot" onClick={() => handleSearch(h)}>
                      <span className="search-hot-rank">{i + 1}</span>
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {!searchFocused && (
        <section className="banner-section" onClick={handleBannerClick}>
          <div className="banner-container" style={{ background: banners[currentBanner].bg }}>
            <img
              src={banners[currentBanner].img}
              alt={banners[currentBanner].title}
              className="banner-bg-img"
            />
            <div className="banner-overlay" />

            <button onClick={(e) => { e.stopPropagation(); prevBanner(); }} className="banner-nav-btn banner-prev">
              <ChevronLeft size={18} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextBanner(); }} className="banner-nav-btn banner-next">
              <ChevronRight size={18} />
            </button>

            <div className="banner-content">
              <h2>{banners[currentBanner].title}</h2>
              <p>{banners[currentBanner].desc}</p>
            </div>

            <div className="banner-indicators">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  className={idx === currentBanner ? 'active' : ''}
                  onClick={(e) => { e.stopPropagation(); setCurrentBanner(idx); }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {!searchFocused && (
        <section className="category-section">
          <div className="category-grid">
            {categories.map((item) => (
              <button
                key={item.name}
                className={`cat-item ${activeCat === item.name ? 'active' : ''}`}
                onClick={() => handleCatClick(item.name)}
              >
                <div className="cat-icon-wrapper">
                  <img src={item.image} alt={item.name} />
                </div>
                <span className="cat-label">{item.name}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {activeCat && !searchFocused && (
        <section className="submenu-section">
          <div className="submenu-header">
            <span className="submenu-title">{activeCat}</span>
            <button className="submenu-close" onClick={() => { setActiveCat(null); setShowAllSubs(false); }}>
              <X size={16} />
            </button>
          </div>
          <div className="submenu-grid">
            {visibleSubs.map((sub) => (
              <button key={sub} onClick={() => handleSubClick(sub)} className="submenu-btn">
                {sub}
              </button>
            ))}
            {!showAllSubs && hasMore && (
              <button onClick={() => setShowAllSubs(true)} className="submenu-btn more-btn">
                更多<ChevronRight size={12} />
              </button>
            )}
          </div>
        </section>
      )}

      {!searchFocused && (
        <section className="partner-guide-section" onClick={() => navigate('/c/become-partner')}>
          <div className="partner-guide-card">
            <div className="partner-guide-icon">
              <Sparkles size={24} color="#fff" />
            </div>
            <div className="partner-guide-content">
              <h3>用你的兴趣，温暖他人</h3>
              <p>成为伙伴，即刻同行</p>
            </div>
            <ArrowRight size={20} color="var(--color-primary)" />
          </div>
        </section>
      )}

      {!searchFocused && (
        <section className="content-section">
          <div className="section-header">
            <h3 className="section-title">附近推荐</h3>
            <button className="section-more" onClick={() => navigate('/c/discover')}>
              查看更多
            </button>
          </div>
          <div className="waterfall">
            {cards.map((item) => (
              <GlassCard className="feed-card" key={item.id} onClick={() => navigate(`/c/service/${item.id}`)}>
                <div className="feed-cover">
                  <img src={item.image} alt={item.title} />
                  <div className="feed-price-tag">¥{item.price}<span>/次</span></div>
                </div>
                <div className="feed-content">
                  <h4 className="feed-title">{item.title}</h4>
                  <div className="feed-meta">
                    <span className="feed-location">
                      <MapPin size={12} />{item.place}
                    </span>
                  </div>
                  <div className="feed-user">
                    <img src={item.avatar} alt={item.name} />
                    <span className="feed-username">{item.name}</span>
                    <span className="feed-likes">
                      <Heart size={12} />128
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      )}

      <CTabBar />
    </main>
  );
}
