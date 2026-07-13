import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image, MapPin, Tag, Eye, Check, X } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';
import { BTabBar } from '../../components/FloatingTabBar';

const categories = ['运动健身', '看展同行', '咖啡探店', '城市徒步', '瑜伽冥想', '摄影跟拍', '美食探店', '其他'];
const serviceItems = [
  { id: 1, name: '看展同行', price: 158, time: '2小时' },
  { id: 2, name: '咖啡探店', price: 98, time: '2小时' },
  { id: 3, name: '城市徒步', price: 188, time: '3小时' },
  { id: 4, name: '运动健身', price: 128, time: '2小时' },
  { id: 5, name: '瑜伽冥想', price: 88, time: '2小时' },
  { id: 6, name: '摄影跟拍', price: 258, time: '2小时' },
];

export default function PublishNote() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  const handleAddImage = () => {
    const newImage = `https://picsum.photos/seed/${Date.now()}/400/300`;
    setImages([...images, newImage]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      alert('请填写标题和内容');
      return;
    }
    alert('笔记发布成功！等待审核');
    navigate('/b/dashboard');
  };

  return (
    <main className="mobile-page">
      <header className="publish-header">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h1>发布笔记</h1>
        <button onClick={() => setShowPreview(!showPreview)} className="publish-preview-btn">
          <Eye size={20} />
          <span>{showPreview ? '编辑' : '预览'}</span>
        </button>
      </header>

      {showPreview ? (
        <section className="note-preview">
          <GlassCard className="note-preview-card">
            {images.length > 0 && (
              <div className="note-preview-images">
                <img src={images[0]} alt="" className="note-preview-main-img" />
                {images.slice(1).length > 0 && (
                  <div className="note-preview-sub-images">
                    {images.slice(1, 3).map((img, i) => (
                      <img key={i} src={img} alt="" />
                    ))}
                    {images.length > 3 && (
                      <div className="note-preview-more">{images.length - 3}</div>
                    )}
                  </div>
                )}
              </div>
            )}
            <div className="note-preview-content">
              <h2 className="note-preview-title">{title || '标题预览'}</h2>
              <div className="note-preview-meta">
                {category && <span className="note-preview-category">{category}</span>}
                {location && <span className="note-preview-location"><MapPin size={12} />{location}</span>}
                {price && <span className="note-preview-price">¥{price}/{duration || '小时'}</span>}
              </div>
              <p className="note-preview-text">{content || '内容预览...'}</p>
              {tags.length > 0 && (
                <div className="note-preview-tags">
                  {tags.map(tag => (
                    <span key={tag} className="note-preview-tag">#{tag}</span>
                  ))}
                </div>
              )}
              {selectedServices.length > 0 && (
                <div className="note-preview-services">
                  <span className="services-label">服务项目</span>
                  <div className="services-list">
                    {selectedServices.map(id => {
                      const service = serviceItems.find(s => s.id === id);
                      return service ? (
                        <span key={id} className="service-badge">{service.name} ¥{service.price}</span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="note-preview-order-bar">
              <div className="order-price">
                <span className="price-symbol">¥</span>
                <span className="price-value">{price || '0'}</span>
                <span className="price-unit">/{duration || '小时'}</span>
              </div>
              <button className="order-btn">立即预约</button>
            </div>
          </GlassCard>
        </section>
      ) : (
        <section className="publish-form">
          <GlassCard className="publish-card">
            <div className="publish-form-item">
              <label className="publish-form-label">标题</label>
              <input
                type="text"
                className="publish-form-input"
                placeholder="输入笔记标题"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
              />
              <span className="publish-form-hint">{title.length}/50</span>
            </div>

            <div className="publish-form-item">
              <label className="publish-form-label">内容</label>
              <textarea
                className="publish-form-textarea"
                placeholder="分享你的体验和感悟..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                maxLength={1000}
              />
              <span className="publish-form-hint">{content.length}/1000</span>
            </div>

            <div className="publish-form-item">
              <label className="publish-form-label">分类</label>
              <div className="publish-category-grid">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`publish-category-item ${category === cat ? 'active' : ''}`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="publish-form-item">
              <label className="publish-form-label">标签</label>
              <div className="publish-tags-container">
                <div className="publish-tags-input-wrap">
                  <input
                    type="text"
                    className="publish-form-input"
                    placeholder="输入标签后回车"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <button className="publish-add-tag-btn" onClick={handleAddTag}>
                    <Tag size={16} />
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="publish-tags-list">
                    {tags.map(tag => (
                      <span key={tag} className="publish-tag-item">
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)}><X size={12} /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="publish-form-item">
              <label className="publish-form-label">位置</label>
              <div className="publish-location-input-wrap">
                <MapPin size={16} style={{ color: '#8E8E93' }} />
                <input
                  type="text"
                  className="publish-form-input"
                  placeholder="添加位置信息"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="publish-form-item">
              <label className="publish-form-label">服务项目</label>
              <div className="publish-service-grid">
                {serviceItems.map(item => (
                  <button
                    key={item.id}
                    className={`publish-service-item ${selectedServices.includes(item.id) ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedServices(selectedServices.includes(item.id)
                        ? selectedServices.filter(id => id !== item.id)
                        : [...selectedServices, item.id]);
                    }}
                  >
                    <span className="service-name">{item.name}</span>
                    <span className="service-price">¥{item.price}/{item.time}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="publish-form-item">
              <label className="publish-form-label">价格设置</label>
              <div className="publish-price-row">
                <div className="publish-price-item">
                  <span className="price-label">服务价格</span>
                  <div className="price-input-wrap">
                    <span className="price-symbol">¥</span>
                    <input
                      type="number"
                      className="publish-form-input price-input"
                      placeholder="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <span className="price-unit">/小时</span>
                  </div>
                </div>
                <div className="publish-price-item">
                  <span className="price-label">服务时长</span>
                  <input
                    type="text"
                    className="publish-form-input"
                    placeholder="如：2小时"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="publish-form-item">
              <label className="publish-form-label">图片</label>
              <div className="publish-images-container">
                {images.map((img, i) => (
                  <div key={i} className="publish-image-item">
                    <img src={img} alt="" />
                    <button className="publish-image-remove" onClick={() => handleRemoveImage(i)}><X size={16} /></button>
                  </div>
                ))}
                {images.length < 9 && (
                  <button className="publish-add-image-btn" onClick={handleAddImage}>
                    <Image size={24} />
                    <span>{images.length + 1}/9</span>
                  </button>
                )}
              </div>
              <span className="publish-form-hint">最多上传9张图片</span>
            </div>
          </GlassCard>

          <div className="publish-form-actions">
            <button className="publish-btn-secondary" onClick={() => navigate(-1)}>
              取消
            </button>
            <PrimaryButton onClick={handlePublish}>发布笔记</PrimaryButton>
          </div>
        </section>
      )}

      <BTabBar />
    </main>
  );
}