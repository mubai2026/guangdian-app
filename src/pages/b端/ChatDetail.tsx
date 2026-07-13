import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Phone, MoreVertical, Send, Image, PlusCircle } from 'lucide-react';

const mockMessages = [
  { id: 1, sender: 'user', text: '你好，请问明天下午的看展可以约吗？', time: '14:20' },
  { id: 2, sender: 'me', text: '可以的，请问您想看哪个展览呢？', time: '14:22' },
  { id: 3, sender: 'user', text: '西岸美术馆那个当代艺术展，我想找人讲解一下', time: '14:23' },
  { id: 4, sender: 'me', text: '没问题！我学艺术史的，对这个展很熟悉，可以给你讲展品背后的故事', time: '14:25' },
  { id: 5, sender: 'user', text: '太棒了！那就约明天下午2点？', time: '14:28' },
  { id: 6, sender: 'user', text: '请问明天可以约吗？', time: '14:30' },
];

export default function BChatDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, {
      id: messages.length + 1,
      sender: 'me',
      text: inputText,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInputText('');
  };

  return (
    <main className="mobile-page chat-page">
      <header className="chat-header">
        <button className="back-btn" onClick={() => navigate('/b/messages')}>
          <ChevronLeft size={20} />
        </button>
        <div className="chat-header-info">
          <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=user2" alt="" />
          <div>
            <span className="chat-header-name">小光</span>
            <span className="chat-header-status">在线</span>
          </div>
        </div>
        <div className="chat-header-actions">
          <button><Phone size={20} /></button>
          <button><MoreVertical size={20} /></button>
        </div>
      </header>

      <div className="chat-messages" ref={scrollRef}>
        <div className="chat-date-divider">今天</div>
        {messages.map(msg => (
          <div key={msg.id} className={`chat-msg-row ${msg.sender === 'me' ? 'mine' : 'other'}`}>
            {msg.sender === 'other' && <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=user2" alt="" className="chat-avatar" />}
            <div className="chat-bubble-wrap">
              <div className="chat-bubble">{msg.text}</div>
              <span className="chat-msg-time">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-bar">
        <button className="chat-input-btn"><PlusCircle size={22} /></button>
        <button className="chat-input-btn"><Image size={22} /></button>
        <input
          className="chat-input"
          placeholder="输入消息..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="chat-send-btn" onClick={handleSend}>
          <Send size={18} />
        </button>
      </div>
    </main>
  );
}
