import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PrimaryButton from '../../components/PrimaryButton';

export default function BecomePartnerGuide() {
  const navigate = useNavigate();

  return (
    <main className="mobile-page" style={{ paddingTop: 0 }}>
      {/* 可替换广告图 */}
      <div className="partner-ad-banner" onClick={() => navigate('/c/apply-partner')}>
        <img src="/scenes/scene5.png" alt="成为伙伴" />
      </div>

      {/* 申请入口 */}
      <div className="partner-apply-section">
        <PrimaryButton onClick={() => navigate('/c/apply-partner')}>
          立即申请 <ArrowRight size={16} />
        </PrimaryButton>
      </div>
    </main>
  );
}
