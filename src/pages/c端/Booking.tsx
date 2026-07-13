import { useState } from 'react';
import { Calendar, Clock, ChevronLeft, Check, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../components/GlassCard';

const services = [
  { id: 1, name: '情感倾听', duration: 120, price: 256, desc: '温暖的陪伴，倾听你的心声' },
  { id: 2, name: '逛街陪购', duration: 120, price: 198, desc: '陪你逛街，给你专业建议' },
  { id: 3, name: '运动健身', duration: 120, price: 158, desc: '专业指导，一起挥洒汗水' },
  { id: 4, name: '美食探店', duration: 120, price: 258, desc: '发现城市美食，分享快乐' },
];

interface TimeSlot {
  time: string;
  period: string;
  available: boolean;
  booked: boolean;
}

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const periods = [
    { start: 9, end: 12, label: '上午' },
    { start: 14, end: 18, label: '下午' },
    { start: 19, end: 22, label: '晚间' },
  ];

  periods.forEach((period) => {
    for (let h = period.start; h < period.end; h += 2) {
      slots.push({
        time: `${h.toString().padStart(2, '0')}:00-${(h + 2).toString().padStart(2, '0')}:00`,
        period: period.label,
        available: Math.random() > 0.3,
        booked: !(Math.random() > 0.3),
      });
    }
  });

  return slots;
};

// 生成15天日期
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 15; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    if (i === 0) {
      dates.push('今天');
    } else if (i === 1) {
      dates.push('明天');
    } else {
      dates.push(`${date.getMonth() + 1}/${date.getDate()}`);
    }
  }
  return dates;
};

const getPeriodColor = (period: string) => {
  switch (period) {
    case '上午': return '#FF8A00';
    case '下午': return '#FF6B00';
    case '晚间': return '#A855F7';
    default: return '#8E8E93';
  }
};

export default function Booking() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('今天');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [currentStep, setCurrentStep] = useState(1);
  const [showParticles, setShowParticles] = useState(false);

  const dates = generateDates();
  const timeSlots = generateTimeSlots();

  const totalPrice = selectedService.price;

  const getSlotClass = (slot: TimeSlot) => {
    if (!slot.available || slot.booked) return 'slot-booked';
    if (selectedTime === slot.time) return 'slot-selected';
    return 'slot-available';
  };

  return (
    <main className="mobile-page">
      {/* 顶部导航 */}
      <div className="booking-header">
        <button onClick={() => navigate(-1)} className="booking-back">
          <ChevronLeft size={20} />
        </button>
        <h1>预约服务</h1>
        <div style={{ width: 36 }} />
      </div>

      {/* 步骤指示器 */}
      <div className="booking-steps">
        {[
          { num: 1, label: '服务' },
          { num: 2, label: '时间' },
          { num: 3, label: '支付' },
        ].map((step, idx) => (
          <div key={step.num} className="booking-step-wrapper">
            <div className={`booking-step ${currentStep === step.num ? 'active' : currentStep > step.num ? 'completed' : ''}`}>
              {currentStep > step.num ? <Check size={14} /> : step.num}
            </div>
            <span className="booking-step-label">{step.label}</span>
            {idx < 2 && <div className="booking-step-line" />}
          </div>
        ))}
      </div>

      {/* 步骤1：选择服务 */}
      {currentStep === 1 && (
        <section className="booking-section">
          <h2 className="booking-section-title">选择服务类型</h2>
          <div className="booking-services">
            {services.map((service) => (
              <div
                key={service.id}
                className={`booking-service-card ${selectedService.id === service.id ? 'active' : ''}`}
                onClick={() => setSelectedService(service)}
              >
                <div className="service-card-header">
                  <div className="service-card-icon">
                    <Calendar size={20} />
                  </div>
                  <div className="service-card-info">
                    <h3>{service.name}</h3>
                    <p>{service.desc}</p>
                  </div>
                  <div className="service-card-check">
                    {selectedService.id === service.id && (
                      <div className="check-circle">
                        <Check size={14} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="service-card-footer">
                  <div className="service-duration">
                    <Clock size={12} />
                    <span>{service.duration / 60}小时</span>
                  </div>
                  <div className="service-price">
                    <span className="currency">¥</span>
                    <span className="amount">{service.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 步骤2：选择时间 */}
      {currentStep === 2 && (
        <>
          <section className="booking-section">
            <h2 className="booking-section-title">选择日期 (15天内)</h2>
            <div className="booking-dates">
              {dates.map((date) => (
                <button
                  key={date}
                  className={`booking-date-btn ${selectedDate === date ? 'active' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span>{date}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="booking-section">
            <h2 className="booking-section-title">选择时段 (2小时/次)</h2>
            {['上午', '下午', '晚间'].map((period) => (
              <div key={period} className="booking-period">
                <div className="period-header">
                  <div className="period-dot" style={{ backgroundColor: getPeriodColor(period) }} />
                  <span style={{ color: getPeriodColor(period) }}>{period}</span>
                </div>
                <div className="booking-slots">
                  {timeSlots
                    .filter((slot) => slot.period === period)
                    .map((slot) => (
                      <button
                        key={slot.time}
                        className={`booking-slot ${getSlotClass(slot)}`}
                        onClick={() => slot.available && !slot.booked && setSelectedTime(slot.time)}
                        disabled={!slot.available || slot.booked}
                      >
                        {slot.time}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </section>
        </>
      )}

      {/* 步骤3：确认支付 */}
      {currentStep === 3 && (
        <section className="booking-section">
          <h2 className="booking-section-title">订单确认</h2>
          <GlassCard className="booking-summary">
            <div className="summary-row">
              <span>服务类型</span>
              <strong>{selectedService.name}</strong>
            </div>
            <div className="summary-row">
              <span>服务时长</span>
              <span>{selectedService.duration}分钟</span>
            </div>
            <div className="summary-row">
              <span>预约日期</span>
              <span>{selectedDate}</span>
            </div>
            <div className="summary-row">
              <span>预约时间</span>
              <span>{selectedTime}</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total">
              <span>实付金额</span>
              <div className="total-price">
                <span className="currency">¥</span>
                <span className="amount">{totalPrice}</span>
              </div>
            </div>
          </GlassCard>

          <div className="booking-notice">
            <Shield size={14} />
            <span>平台担保交易，服务不满意可申请退款</span>
          </div>
        </section>
      )}

      {/* 底部操作栏 */}
      <footer className="booking-footer">
        <div className="booking-price">
          <span className="price-label">实付</span>
          <div className="price-value">
            <span className="currency">¥</span>
            <span className="amount">{totalPrice}</span>
          </div>
        </div>
        {currentStep < 3 ? (
          <button
            className="booking-next-btn"
            onClick={() => {
              if (currentStep === 2 && !selectedTime) return;
              if (currentStep === 2) {
                setShowParticles(true);
                setTimeout(() => {
                  setShowParticles(false);
                  setCurrentStep(currentStep + 1);
                }, 1500);
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
            disabled={currentStep === 2 && !selectedTime}
          >
            {currentStep === 1 ? '下一步' : '确认预约'}
          </button>
        ) : (
          <button className="booking-pay-btn" onClick={() => navigate('/c/payment')}>
            立即支付
          </button>
        )}
      </footer>

      {/* 粒子爆炸动画 */}
      {showParticles && (
        <div className="particle-container">
          {[...Array(24)].map((_, i) => {
            const x = (Math.random() - 0.5) * 200;
            const y = (Math.random() - 0.5) * 200;
            const size = Math.random() * 12 + 4;
            const color = i % 2 === 0 ? '#FF7A45' : '#A855F7';
            return (
              <div
                key={i}
                className="particle"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: color,
                  boxShadow: `0 0 12px ${color}`,
                  animationDelay: `${Math.random() * 0.3}s`,
                  ['--tx' as string]: `${x}px`,
                  ['--ty' as string]: `${y}px`,
                }}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
