import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ImagePlus, X, MapPin, Send } from 'lucide-react';
import PrimaryButton from '../../components/PrimaryButton';

const categories = ['晨跑陪练', '看展同行', '咖啡探店', '城市徒步', '健身指导', '瑜伽课程', '摄影跟拍', '美食探店'];

export default function ServiceNotePublish() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [priceRange, setPriceRange] = useState('50-100');
  const [images, setImages] = useState<string[]>([]);

  const handlePublish = () => {
    if (title && content && selectedCat) {
      alert('服务笔记发布成功！');
      navigate('/b/services');
    }
  };

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/b/services')}><ChevronLeft size={20} /></button>
        <h1 className="page-title">发布服务笔记</h1>
        <div style={{ width: 32 }} />
      </header>

      <section className="publish-note-section">
        <div className="publish-images-area">
          {images.length === 0 && (
            <div className="upload-placeholder" onClick={() => setImages([...images, '/activities/activity1.png'])}>
              <ImagePlus size={32} />
              <span>添加图片（最多9张）</span>
            </div>
          )}
          <div className="image-preview-list">
            {images.map((img, i) => (
              <div key={i} className="preview-img-wrap">
                <img src={img} alt="" />
                <button onClick={() => setImages(images.filter((_, idx) => idx !== i))}><X size={14} /></button>
              </div>
            ))}
            {images.length > 0 && images.length < 9 && (
              <div className="add-more-img" onClick={() => setImages([...images, `/activities/activity${(images.length % 5) + 1}.png`])}>
                <ImagePlus size={24} />
              </div>
            )}
          </div>
        </div>

        <input className="note-title-input" placeholder="给你的服务起个吸引人的标题吧~" value={title} onChange={(e) => setTitle(e.target.value)} />

        <textarea className="note-content-textarea" rows={6} placeholder="详细描述你的服务内容、特色、能带给用户什么体验..." value={content} onChange={(e) => setContent(e.target.value)} />

        <div className="form-group">
          <label>选择类目</label>
          <div className="cat-chips-row">
            {categories.map((cat) => (
              <span key={cat} className={`cat-chip ${selectedCat === cat ? 'active' : ''}`} onClick={() => setSelectedCat(cat)}>
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>价格区间参考</label>
          <div className="price-options">
            {['50以下','50-100','100-200','200以上'].map((p) => (
              <span key={p} className={`cat-chip ${priceRange === p ? 'active' : ''}`} onClick={() => setPriceRange(p)}>{p}</span>
            ))}
          </div>
        </div>

        <PrimaryButton onClick={handlePublish}>发布服务笔记</PrimaryButton>
      </section>
    </main>
  );
}
