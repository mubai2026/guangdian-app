import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Briefcase, Camera, Check } from 'lucide-react';
import PrimaryButton from '../../components/PrimaryButton';

export default function CertificationPro() {
  const navigate = useNavigate();
  const [certName, setCertName] = useState('');
  const [certImage, setCertImage] = useState<string | null>(null);

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/b/profile')}><ChevronLeft size={20} /></button>
        <h1 className="page-title">职业认证</h1>
        <div style={{ width: 32 }} />
      </header>
      <section className="certification-section">
        <div className="certification-header">
          <Briefcase size={40} style={{ color: '#3B82F6' }} />
          <h2>职业认证</h2>
          <p>上传你的职业证书，提升用户信任度</p>
        </div>
        <div className="certification-form">
          <div className="form-group">
            <label>证书名称</label>
            <input type="text" placeholder="如：社会体育指导员证书" value={certName} onChange={(e) => setCertName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>上传证书照片</label>
            <div className={`id-card-item ${certImage ? 'has-image' : ''}`} onClick={() => setCertImage('/certs/pro-cert.png')}>
              {certImage ? <img src={certImage} alt="证书" /> : (
                <div className="upload-placeholder"><Camera size={24} /><span>点击上传证书</span></div>
              )}
            </div>
          </div>
        </div>
        <PrimaryButton onClick={() => navigate('/b/profile')}>提交认证</PrimaryButton>
      </section>
    </main>
  );
}
