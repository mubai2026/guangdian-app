import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, MapPin, Calendar, Lock } from 'lucide-react';
import PrimaryButton from '../../components/PrimaryButton';

export default function BProfileEdit() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState('https://api.dicebear.com/9.x/avataaars/svg?seed=user1');
  const [nickname, setNickname] = useState('晨光伙伴');
  const [city, setCity] = useState('上海');
  const [district, setDistrict] = useState('浦东新区');
  const [age, setAge] = useState(26);
  const [bio, setBio] = useState('热爱户外运动，擅长城市徒步和看展陪游');
  const [tags, setTags] = useState(['晨跑', '看展', '咖啡', '徒步']);

  const handleSave = () => {
    navigate('/b/profile');
  };

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/b/profile')}>
          <ChevronLeft size={20} />
        </button>
        <h1 className="page-title">编辑资料</h1>
        <div style={{ width: 32 }} />
      </header>

      <section className="edit-section">
        <div className="avatar-edit" onClick={() => setAvatar('https://api.dicebear.com/9.x/avataaars/svg?seed=user2')}>
          <img src={avatar} alt="头像" />
          <div className="avatar-edit-icon">
            <Camera size={16} />
          </div>
        </div>

        <div className="form-group">
          <label>昵称</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={12}
          />
        </div>

        <div className="form-group">
          <label>城市/区域</label>
          <div className="form-row">
            <div className="form-col">
              <div className="form-input-wrap">
                <MapPin size={14} className="form-icon" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="城市"
                />
              </div>
            </div>
            <div className="form-col">
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="区域"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>年龄</label>
          <div className="form-input-wrap">
            <Calendar size={14} className="form-icon" />
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              min={18}
              max={80}
            />
          </div>
        </div>

        <div className="form-group">
          <label>个人简介</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={100}
            rows={3}
          />
          <span className="char-count">{bio.length}/100</span>
        </div>

        <div className="form-group">
          <label>服务标签</label>
          <div className="tags-edit">
            {tags.map((tag) => (
              <span key={tag} className="tag-item">
                {tag}
                <button onClick={() => setTags(tags.filter(t => t !== tag))}>×</button>
              </span>
            ))}
            <input
              type="text"
              placeholder="添加标签"
              className="tag-input"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  setTags([...tags, e.currentTarget.value]);
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>
        </div>

        <PrimaryButton onClick={handleSave}>保存修改</PrimaryButton>
      </section>
    </main>
  );
}
