import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Plus, CheckCircle } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PrimaryButton from '../../components/PrimaryButton';

const initialAddresses = [
  { id: 1, name: '家', detail: '上海市浦东新区世纪大道100号', contact: '用户小明 138****8888', default: true },
  { id: 2, name: '公司', detail: '上海市静安区南京西路1688号', contact: '用户小明 138****8888', default: false },
];

export default function CAddress() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState(initialAddresses);

  const setDefault = (id: number) => {
    setAddresses(addresses.map(a => ({ ...a, default: a.id === id })));
  };

  return (
    <main className="mobile-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">地址管理</h1>
      </div>

      <section className="address-section">
        {addresses.map((addr) => (
          <GlassCard key={addr.id} className={`address-card ${addr.default ? 'default' : ''}`}>
            <div className="address-left">
              <div className="address-icon">
                <MapPin size={18} />
              </div>
              <div className="address-info">
                <div className="address-name-row">
                  <span className="address-name">{addr.name}</span>
                  {addr.default && <span className="address-default-tag">默认</span>}
                </div>
                <span className="address-detail">{addr.detail}</span>
                <span className="address-contact">{addr.contact}</span>
              </div>
            </div>
            {!addr.default && (
              <button className="address-set-default" onClick={() => setDefault(addr.id)}>
                设为默认
              </button>
            )}
          </GlassCard>
        ))}
      </section>

      <div className="address-add-btn">
        <PrimaryButton className="full-width">
          <Plus size={18} />
          <span>添加新地址</span>
        </PrimaryButton>
      </div>
    </main>
  );
}
