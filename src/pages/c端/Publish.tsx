import { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Clock, Users, Tag, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../components/GlassCard';
import { categories } from '../../mock/data';

const tagOptions = [
  { id: 'realname', label: '实名认证' },
  { id: 'realperson', label: '真人认证' },
  { id: 'star', label: '星级认证' },
  { id: 'level', label: '等级认证' },
];

const ageRanges = ['不限', '18-22', '23-26', '27-30', '31-35', '36-40', '40+'];
const paymentModes = ['AA制', '我请客', '对方请'];

export default function Publish() {
  const navigate = useNavigate();
  const [cat, setCat] = useState('');
  const [subCat, setSubCat] = useState('');
  const [date, setDate] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [loc, setLoc] = useState('');
  const [gender, setGender] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [education, setEducation] = useState('');
  const [people, setPeople] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [desc, setDesc] = useState('');
  const [imgs, setImgs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [showSubCats, setShowSubCats] = useState(false);
  const [paymentMode, setPaymentMode] = useState('');
  const [showPaymentMode, setShowPaymentMode] = useState(false);

  const activeCategory = categories.find((c) => c.name === cat);
  const subCats = activeCategory?.subs || [];

  const toggleTag = (id: string) => {
    setSelectedTags((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]);
  };

  const addImg = () => {
    const pool = ['/personas/persona1.jpg', '/personas/persona2.jpg', '/personas/persona3.png', '/personas/persona4.png', '/personas/persona5.png'];
    if (imgs.length < 6) setImgs([...imgs, pool[imgs.length % pool.length]]);
  };
  const rmImg = (i: number) => setImgs(imgs.filter((_, idx) => idx !== i));

  const submit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/c/home'); }, 1500);
  };

  return (
    <main className="mobile-page">
      <header className="publish-header">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h1>发布需求</h1>
        <div style={{ width: 24 }} />
      </header>

      <div className="publish-form">
        <GlassCard className="publish-card">
          <label>类目</label>
          <div className="cat-select-grid">
            {categories.map((c) => (
              <button key={c.name} className={cat === c.name ? 'active' : ''} onClick={() => { setCat(c.name); setSubCat(''); setShowSubCats(false); }}>
                {c.name}
              </button>
            ))}
          </div>
          {cat && (
            <div className="subcat-dropdown-wrapper">
              <button
                className="subcat-dropdown-trigger"
                onClick={() => setShowSubCats(!showSubCats)}
              >
                <span>{subCat || '选择子类目'}</span>
                {showSubCats ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {showSubCats && (
                <div className="subcat-dropdown-menu">
                  {subCats.map((s) => (
                    <button
                      key={s}
                      className={subCat === s ? 'active' : ''}
                      onClick={() => { setSubCat(s); setShowSubCats(false); }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </GlassCard>

        <GlassCard className="publish-card">
          <label><Clock size={16} /> 日期时间</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="选择日期" />
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="time" value={timeStart} onChange={(e) => setTimeStart(e.target.value)} style={{ flex: 1 }} />
            <span style={{ alignSelf: 'center', color: '#8E8E93' }}>至</span>
            <input type="time" value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)} style={{ flex: 1 }} />
          </div>
        </GlassCard>

        <GlassCard className="publish-card">
          <label><MapPin size={16} /> 地点</label>
          <input value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="输入或选择地点" />
        </GlassCard>

        <GlassCard className="publish-card">
          <label><Users size={16} /> 性别偏好</label>
          <div className="cat-select-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {['不限', '仅男', '仅女'].map((g) => (
              <button key={g} className={gender === g ? 'active' : ''} onClick={() => setGender(g)}>{g}</button>
            ))}
          </div>

          <label style={{ marginTop: 12 }}>年龄范围</label>
          <div className="age-range-grid">
            {ageRanges.map((a) => (
              <button key={a} className={ageRange === a ? 'active' : ''} onClick={() => setAgeRange(a)}>{a}</button>
            ))}
          </div>

          <button
            className="more-filters-toggle"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
          >
            {showMoreFilters ? '收起更多筛选' : '展开更多筛选'}
            {showMoreFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showMoreFilters && (
            <div className="more-filters-content">
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <label>身高（可选）</label>
                  <input value={height} onChange={(e) => setHeight(e.target.value)} placeholder="如 170cm" />
                </div>
                <div style={{ flex: 1 }}>
                  <label>体重（可选）</label>
                  <input value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="如 60kg" />
                </div>
              </div>
              <label>学历（可选）</label>
              <div className="cat-select-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
                {['不限', '高中', '大专', '本科', '硕士', '博士'].map((e) => (
                  <button key={e} className={education === e ? 'active' : ''} onClick={() => setEducation(e)}>{e}</button>
                ))}
              </div>
            </div>
          )}
        </GlassCard>

        <GlassCard className="publish-card">
          <label><Users size={16} /> 人数</label>
          <div className="cat-select-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            {['1对1', '2-3人', '4-6人', '7人+'].map((p) => (
              <button key={p} className={people === p ? 'active' : ''} onClick={() => setPeople(p)}>{p}</button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="publish-card">
          <label>支付方式</label>
          <div className="subcat-dropdown-wrapper">
            <button
              className="subcat-dropdown-trigger"
              onClick={() => setShowPaymentMode(!showPaymentMode)}
            >
              <span>{paymentMode || '选择支付方式'}</span>
              {showPaymentMode ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {showPaymentMode && (
              <div className="subcat-dropdown-menu">
                {paymentModes.map((m) => (
                  <button
                    key={m}
                    className={paymentMode === m ? 'active' : ''}
                    onClick={() => { setPaymentMode(m); setShowPaymentMode(false); }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
        </GlassCard>

        <GlassCard className="publish-card">
          <label><Tag size={16} /> 认证标签（可选）</label>
          <div className="cat-select-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
            {tagOptions.map((t) => (
              <button key={t.id} className={selectedTags.includes(t.id) ? 'active' : ''} onClick={() => toggleTag(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="publish-card">
          <label>需求描述</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="请详细描述你的需求..." rows={4} />
        </GlassCard>

        <GlassCard className="publish-card">
          <label>需求图片</label>
          <div className="img-upload-grid">
            {imgs.map((img, i) => (
              <div key={i} className="img-preview">
                <img src={img} alt="" />
                <button onClick={() => rmImg(i)}><X size={14} /></button>
              </div>
            ))}
            {imgs.length < 6 && (
              <button className="img-upload-btn" onClick={addImg}>
                <Camera size={20} /><span>添加</span>
              </button>
            )}
          </div>
        </GlassCard>

        <button className="primary-button publish-submit" onClick={submit} disabled={loading}>
          {loading ? '发布中...' : '发布需求'}
        </button>
      </div>
    </main>
  );
}
