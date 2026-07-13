import { useState } from 'react';
import { Check } from 'lucide-react';
import { BTabBar } from '../../components/FloatingTabBar';

const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const timeSlots = [
  '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00',
];

export default function BSchedule() {
  const [currentDay, setCurrentDay] = useState(0);
  const [selectedSlots, setSelectedSlots] = useState<number[]>([3, 4, 5, 10, 11, 12]);

  const toggleSlot = (index: number) => {
    setSelectedSlots(selectedSlots.includes(index)
      ? selectedSlots.filter(i => i !== index)
      : [...selectedSlots, index]
    );
  };

  return (
    <main className="mobile-page">
      <div className="b-page-header">
        <h1 className="b-page-title">档期管理</h1>
        <span className="b-page-desc">设置你的可接单时间</span>
      </div>

      {/* 日期Tab */}
      <div className="b-sched-days">
        {days.map((day, idx) => (
          <button
            key={day}
            className={`b-sched-day ${currentDay === idx ? 'active' : ''}`}
            onClick={() => setCurrentDay(idx)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* 当前日期 */}
      <div className="b-sched-current">
        <span>{days[currentDay]} · 7月{14 + currentDay}日</span>
        <span className="b-sched-selected-count">已选 {selectedSlots.length} 个时段</span>
      </div>

      {/* 时间网格 */}
      <section className="b-sched-grid">
        {timeSlots.map((time, idx) => (
          <button
            key={time}
            className={`b-sched-slot ${selectedSlots.includes(idx) ? 'selected' : ''}`}
            onClick={() => toggleSlot(idx)}
          >
            <span className="b-sched-slot-time">{time}</span>
            {selectedSlots.includes(idx) && (
              <span className="b-sched-slot-check">
                <Check size={12} />
              </span>
            )}
          </button>
        ))}
      </section>

      {/* 图例 */}
      <div className="b-sched-legend">
        <div className="b-sched-legend-item">
          <div className="b-sched-legend-dot selected" />
          <span>可接单</span>
        </div>
        <div className="b-sched-legend-item">
          <div className="b-sched-legend-dot" />
          <span>不可接单</span>
        </div>
      </div>

      {/* 保存按钮 */}
      <div className="b-sched-save">
        <button className="b-sched-save-btn" onClick={() => alert('档期已保存')}>保存档期</button>
      </div>

      <div style={{ height: 20 }} />
      <BTabBar />
    </main>
  );
}
