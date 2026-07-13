import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const msgData: Record<string, { title: string; list: { text: string; time: string }[] }> = {
  system: {
    title: '系统通知',
    list: [
      { text: '服务保障规则已更新，请查看最新内容', time: '今天 12:00' },
      { text: '您的账号安全等级已提升', time: '昨天 09:30' },
      { text: '新版本已发布，快去体验新功能', time: '7月5日' },
    ],
  },
  orders: {
    title: '订单通知',
    list: [
      { text: '你的预约「看展同行」即将开始', time: '今天 10:30' },
      { text: '订单「咖啡探店」已被伙伴确认', time: '昨天 15:00' },
      { text: '订单「城市徒步」已完成，请评价', time: '7月3日' },
    ],
  },
  interactions: {
    title: '互动消息',
    list: [
      { text: '林夏赞了你的动态', time: '今天 11:20' },
      { text: '阿澈评论了你的笔记', time: '昨天 18:00' },
      { text: '南希关注了你', time: '7月4日' },
    ],
  },
  views: {
    title: '看过我',
    list: [
      { text: '林夏查看了你的主页', time: '今天 09:10' },
      { text: '阿澈查看了你的主页', time: '昨天 20:00' },
      { text: '南希查看了你的主页', time: '7月3日' },
    ],
  },
};

export default function MessageDetail() {
  const { type } = useParams();
  const navigate = useNavigate();
  const data = msgData[type || ''];
  if (!data) return <main className="mobile-page"><p>页面不存在</p></main>;

  return (
    <main className="mobile-page">
      <header className="publish-header">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h1>{data.title}</h1>
        <div style={{ width: 24 }} />
      </header>
      <section className="list-stack">
        {data.list.map((m, i) => (
          <GlassCard key={i} className="chat-card">
            <div style={{ flex: 1 }}>
              <p>{m.text}</p>
              <span style={{ color: '#8E8E93', fontSize: 12 }}>{m.time}</span>
            </div>
          </GlassCard>
        ))}
      </section>
    </main>
  );
}
