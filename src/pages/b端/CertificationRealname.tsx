import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield, BadgeCheck, Camera } from 'lucide-react';
import PrimaryButton from '../../components/PrimaryButton';

export default function CertificationRealname() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (name && idNumber && frontImage && backImage) {
      navigate('/b/profile');
    }
  };

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/b/profile')}>
          <ChevronLeft size={20} />
        </button>
        <h1 className="page-title">实名认证</h1>
        <div style={{ width: 32 }} />
      </header>

      <section className="certification-section">
        <div className="certification-header">
          <Shield size={40} style={{ color: '#10B981' }} />
          <h2>实名认证</h2>
          <p>完成实名认证可提升信用等级，获得更多服务机会</p>
        </div>

        <div className="certification-form">
          <div className="form-group">
            <label>真实姓名</label>
            <input
              type="text"
              placeholder="请输入真实姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>身份证号</label>
            <input
              type="text"
              placeholder="请输入身份证号"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              maxLength={18}
            />
          </div>

          <div className="form-group">
            <label>身份证照片</label>
            <div className="id-card-upload">
              <div className={`id-card-item ${frontImage ? 'has-image' : ''}`} onClick={() => setFrontImage('/idcards/front.png')}>
                {frontImage ? (
                  <img src={frontImage} alt="正面" />
                ) : (
                  <div className="upload-placeholder">
                    <Camera size={24} />
                    <span>正面照片</span>
                  </div>
                )}
              </div>
              <div className={`id-card-item ${backImage ? 'has-image' : ''}`} onClick={() => setBackImage('/idcards/back.png')}>
                {backImage ? (
                  <img src={backImage} alt="背面" />
                ) : (
                  <div className="upload-placeholder">
                    <Camera size={24} />
                    <span>背面照片</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="certification-tips">
          <BadgeCheck size={16} style={{ color: '#10B981' }} />
          <span>信息仅用于身份验证，我们将严格保护您的隐私</span>
        </div>

        <PrimaryButton onClick={handleSubmit}>提交认证</PrimaryButton>
      </section>
    </main>
  );
}
