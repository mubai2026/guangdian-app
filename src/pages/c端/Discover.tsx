import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, X, MapPin, Star, Search, BadgeCheck, ChevronDown } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { CTabBar } from '../../components/FloatingTabBar';
import { categories, cityOptions, distanceOptions, priceOptions, scheduleOptions, discoverCards } from '../../mock/data';

export default function Discover() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initCat = searchParams.get('cat') || '';
  
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistance, setSelectedDistance] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedCat, setSelectedCat] = useState(initCat);
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [moreOpen, setMoreOpen] = useState(false);
  const [filters, setFilters] = useState({ gender: '', age: '', verified: '' });

  const getFilterLabel = (key: string, value: string) => {
    if (!value) return key;
    return value;
  };

  const filtersBar = [
    { key: '城市', value: selectedCity },
    { key: '距离', value: selectedDistance },
    { key: '价格', value: selectedPrice },
    { key: '类目', value: selectedCat },
    { key: '档期', value: selectedSchedule },
    { key: '更多', value: '' },
  ];

  const closeAllFilters = () => {
    setActiveFilter(null);
    setMoreOpen(false);
  };

  const handleFilterClick = (filter: string) => {
    if (filter === '更多') {
      setMoreOpen(!moreOpen);
      setActiveFilter(null);
    } else {
      setActiveFilter(activeFilter === filter ? null : filter);
      setMoreOpen(false);
    }
  };

  const handleSelectCity = (city: string) => {
    setSelectedCity(selectedCity === city ? '' : city);
    if (selectedCity !== city) setActiveFilter(null);
  };

  const handleSelectDistance = (dist: string) => {
    setSelectedDistance(selectedDistance === dist ? '' : dist);
    if (selectedDistance !== dist) setActiveFilter(null);
  };

  const handleSelectPrice = (price: string) => {
    setSelectedPrice(selectedPrice === price ? '' : price);
    if (selectedPrice !== price) setActiveFilter(null);
  };

  const handleSelectCat = (cat: string) => {
    setSelectedCat(selectedCat === cat ? '' : cat);
    if (selectedCat !== cat) setActiveFilter(null);
  };

  const handleSelectSchedule = (schedule: string) => {
    setSelectedSchedule(selectedSchedule === schedule ? '' : schedule);
    if (selectedSchedule !== schedule) setActiveFilter(null);
  };

  const filteredCards = discoverCards.filter(card => {
    if (selectedCat && !card.tags.some(tag => tag.includes(selectedCat) || selectedCat.includes(tag))) {
      const catMatch = categories.find(c => c.name === selectedCat);
      if (catMatch && !catMatch.subs.some(sub => card.tags.includes(sub) || sub.includes(card.tags[0]))) {
        if (!card.services.some(s => s.includes(selectedCat) || selectedCat.includes(s))) {
          return false;
        }
      }
    }
    if (selectedCity && card.city !== selectedCity) return false;
    if (selectedDistance) {
      const distNum = parseFloat(selectedDistance);
      if (!isNaN(distNum) && card.dist > distNum) return false;
    }
    if (selectedPrice) {
      const priceMatch = selectedPrice.match(/(\d+)-(\d+)/);
      const belowMatch = selectedPrice.match(/(\d+)以下/);
      const aboveMatch = selectedPrice.match(/(\d+)以上/);
      if (priceMatch) {
        const [, min, max] = priceMatch;
        if (card.price < parseInt(min) || card.price > parseInt(max)) return false;
      } else if (belowMatch) {
        if (card.price > parseInt(belowMatch[1])) return false;
      } else if (aboveMatch) {
        if (card.price < parseInt(aboveMatch[1])) return false;
      }
    }
    if (filters.gender && filters.gender !== 'all') {
    }
    if (filters.verified === 'realperson' && !card.verified) return false;
    return true;
  });

  return (
    <main className="mobile-page">
      <header className="discover-header">
        <div className="discover-title-group">
          <h1 className="discover-title">发现</h1>
          <span className="discover-subtitle">找到你的搭子</span>
        </div>
        <div className="discover-search">
          <Search size={16} />
          <input placeholder="搜索伙伴、服务" />
        </div>
      </header>

      <div className="discover-filters-bar">
        {filtersBar.map((item) => (
          <button
            key={item.key}
            onClick={() => handleFilterClick(item.key)}
            className={`filter-chip ${activeFilter === item.key || item.value ? 'active' : ''}`}
          >
            <span className="filter-chip-text">{getFilterLabel(item.key, item.value)}</span>
            {item.key !== '更多' && (
              <ChevronDown
                size={14}
                className={`filter-chip-arrow ${activeFilter === item.key ? 'rotated' : ''}`}
              />
            )}
          </button>
        ))}
      </div>

      {activeFilter === '城市' && (
        <div className="filter-panel">
          <div className="filter-panel-header">
            <span className="filter-panel-title">选择城市</span>
            <button className="filter-close" onClick={closeAllFilters}><X size={16} /></button>
          </div>
          <div className="filter-options-grid">
            {cityOptions.map((city) => (
              <button
                key={city}
                onClick={() => handleSelectCity(city)}
                className={selectedCity === city ? 'active' : ''}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeFilter === '距离' && (
        <div className="filter-panel">
          <div className="filter-panel-header">
            <span className="filter-panel-title">距离范围</span>
            <button className="filter-close" onClick={closeAllFilters}><X size={16} /></button>
          </div>
          <div className="filter-options-grid">
            {distanceOptions.map((dist) => (
              <button
                key={dist}
                onClick={() => handleSelectDistance(dist)}
                className={selectedDistance === dist ? 'active' : ''}
              >
                {dist}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeFilter === '类目' && (
        <div className="filter-panel">
          <div className="filter-panel-header">
            <span className="filter-panel-title">服务类目</span>
            <button className="filter-close" onClick={closeAllFilters}><X size={16} /></button>
          </div>
          <div className="filter-options-grid">
            <button onClick={() => handleSelectCat('')} className={selectedCat === '' ? 'active' : ''}>全部</button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleSelectCat(cat.name)}
                className={selectedCat === cat.name ? 'active' : ''}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeFilter === '价格' && (
        <div className="filter-panel">
          <div className="filter-panel-header">
            <span className="filter-panel-title">价格区间</span>
            <button className="filter-close" onClick={closeAllFilters}><X size={16} /></button>
          </div>
          <div className="filter-options-grid">
            {priceOptions.map((price) => (
              <button
                key={price}
                onClick={() => handleSelectPrice(price)}
                className={selectedPrice === price ? 'active' : ''}
              >
                {price}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeFilter === '档期' && (
        <div className="filter-panel">
          <div className="filter-panel-header">
            <span className="filter-panel-title">服务档期</span>
            <button className="filter-close" onClick={closeAllFilters}><X size={16} /></button>
          </div>
          <div className="filter-options-grid">
            {scheduleOptions.map((schedule) => (
              <button
                key={schedule}
                onClick={() => handleSelectSchedule(schedule)}
                className={selectedSchedule === schedule ? 'active' : ''}
              >
                {schedule}
              </button>
            ))}
          </div>
        </div>
      )}

      {moreOpen && (
        <div className="filter-panel">
          <div className="filter-panel-header">
            <span className="filter-panel-title">更多筛选</span>
            <button className="filter-close" onClick={closeAllFilters}><X size={16} /></button>
          </div>
          <div className="more-filter-content">
            <div className="more-filter-row">
              <span className="more-filter-label">性别偏好</span>
              <div className="more-filter-options">
                <button onClick={() => setFilters({ ...filters, gender: '' })} className={filters.gender === '' ? 'active' : ''}>不限</button>
                <button onClick={() => setFilters({ ...filters, gender: 'male' })} className={filters.gender === 'male' ? 'active' : ''}>男</button>
                <button onClick={() => setFilters({ ...filters, gender: 'female' })} className={filters.gender === 'female' ? 'active' : ''}>女</button>
              </div>
            </div>
            <div className="more-filter-row">
              <span className="more-filter-label">认证标签</span>
              <div className="more-filter-options">
                <button onClick={() => setFilters({ ...filters, verified: '' })} className={filters.verified === '' ? 'active' : ''}>不限</button>
                <button onClick={() => setFilters({ ...filters, verified: 'unverified' })} className={filters.verified === 'unverified' ? 'active' : ''}>未认证</button>
                <button onClick={() => setFilters({ ...filters, verified: 'realperson' })} className={filters.verified === 'realperson' ? 'active' : ''}>真人认证</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="discover-content">
        {filteredCards.length === 0 ? (
          <div className="discover-empty">
            <p>暂无匹配的伙伴</p>
            <button className="empty-reset-btn" onClick={() => {
              setSelectedCity('');
              setSelectedDistance('');
              setSelectedPrice('');
              setSelectedCat('');
              setSelectedSchedule('');
              setFilters({ gender: '', age: '', verified: '' });
            }}>重置筛选</button>
          </div>
        ) : (
          filteredCards.map((card) => (
            <GlassCard key={card.id} className="discover-card" onClick={() => navigate(`/c/partner/${card.name}`)}>
              <div className="discover-card-left">
                <img src={card.cover} alt="" className="discover-card-cover" />
              </div>
              <div className="discover-card-right">
                <div className="discover-card-header">
                  <div className="discover-card-info">
                    <h3 className="discover-card-name">{card.name}</h3>
                    <div className="discover-card-tags">
                      {card.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="discover-card-tag">{tag}</span>
                      ))}
                      {card.verified && <BadgeCheck size={12} className="verified-badge" />}
                    </div>
                  </div>
                  <div className="discover-card-price">
                    <span className="price-symbol">¥</span>
                    <span className="price-value">{card.price}</span>
                    <span className="price-unit">/次</span>
                  </div>
                </div>
                <div className="discover-card-meta">
                  <span className="discover-card-rating">
                    <Star size={12} fill="#F59E0B" color="#F59E0B" />
                    {card.rating}
                  </span>
                  <span className="discover-card-orders">{card.orders}单</span>
                  <span className="discover-card-dist">{card.dist}km</span>
                </div>
                <div className="discover-card-services">
                  {card.services.slice(0, 3).map((service) => (
                    <span key={service} className="discover-card-service">{service}</span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))
        )}
      </div>

      <CTabBar />
    </main>
  );
}
