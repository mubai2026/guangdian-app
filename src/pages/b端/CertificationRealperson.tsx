import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BadgeCheck, Camera, Video } from 'lucide-react';
import PrimaryButton from '../../components/PrimaryButton';

export default function CertificationRealperson() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selfie, setSelfie] = useState<string | null>(null);
  const [videoRecorded, setVideoRecorded] = useState(false);

  const handleSubmit = () => {
    if (selfie && videoRecorded) {
      navigate('/b/profile');
    }
  };

  return (
    <main className="mobile-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/b/profile')}>
          <ChevronLeft size={20} />
        </button>
        <h1 className="page-title">真人认证</h1>
        <div style={{ width: 32 }} />
      </header>

      <section className="certification-section">
        <div className="certification-header">
          <BadgeCheck size={40} style={{ color: '#FF7A45' }} />
          <h2>真人认证</h2>
          <p>真人认证可让用户更信任你，增加接单率</p>
        </div>

        <div className="certification-steps">
          <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-text">拍摄正面照片</span>
          </div>
          <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-text">录制验证视频</span>
          </div>
        </div>

        {step === 1 && (
          <div className="certification-content">
            <div className={`selfie-upload ${selfie ? 'has-image' : ''}`} onClick={() => setSelfie('/selfie.png')}>
              {selfie ? (
                <img src={selfie} alt="自拍" />
              ) : (
                <div className="upload-placeholder">
                  <Camera size={32} />
                  <span>点击拍摄正面照片</span>
                </div>
              )}
            </div>
            <PrimaryButton onClick={() => setStep(2)} disabled={!selfie}>
              下一步
            </PrimaryButton>
          </div>
        )}

        {step === 2 && (
          <div className="certification-content">
            <div className={`video-upload ${videoRecorded ? 'recorded' : ''}`} onClick={() => setVideoRecorded(true)}>
              <Video size={32} />
              <span>{videoRecorded ? '已录制验证视频' : '点击录制验证视频'}</span>
            </div>
            <div className="video-tips">
              <p>请在视频中说出："我是晨光伙伴，正在进行真人认证"</p>
            </div>
            <PrimaryButton onClick={handleSubmit} disabled={!videoRecorded}>
              提交认证
            </PrimaryButton>
          </div>
        )}
      </section>
    </main>
  );
}
