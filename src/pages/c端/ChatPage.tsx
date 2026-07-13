import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { chatConversations } from '../../mock/data';

export default function ChatPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const msgs = chatConversations;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  return (
    <main className="mobile-page" style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
      <header className="publish-header" style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0,0,0,.06)' }}>
        <button onClick={() => navigate(-1)} style={{ border: 0, background: 'none', cursor: 'pointer' }}><ArrowLeft size={24} /></button>
        <h1 style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 600 }}>{name}</h1>
        <button style={{ border: 0, background: 'none', cursor: 'pointer' }}><MoreVertical size={20} /></button>
      </header>
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 12px' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 11, color: '#8E8E93', background: '#F5F7FA', padding: '2px 10px', borderRadius: 10 }}>今天</span>
        </div>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', marginBottom: 12, alignItems: m.sender === '我' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '75%',
              padding: '10px 14px',
              borderRadius: m.sender === '我' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: m.sender === '我' ? 'linear-gradient(135deg,#FF7A45,#A855F7)' : '#fff',
              color: m.sender === '我' ? '#fff' : '#1C1C1E',
              fontSize: 14,
              lineHeight: 1.5,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              whiteSpace: 'pre-line',
            }}>
              {m.content}
            </div>
            <span style={{ fontSize: 10, color: '#8E8E93', marginTop: 4, padding: '0 4px' }}>{m.time}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '8px 16px 20px', borderTop: '1px solid rgba(0,0,0,.06)', background: '#fff' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入消息..."
          style={{ flex: 1, border: 0, borderRadius: 20, background: '#F5F7FA', padding: '10px 14px', outline: 'none', fontSize: 14 }}
        />
        <button style={{
          border: 0,
          background: text.trim() ? 'linear-gradient(135deg,#FF7A45,#A855F7)' : '#E5E5EA',
          borderRadius: '50%',
          width: 40,
          height: 40,
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}>
          <Send size={18} color={text.trim() ? '#fff' : '#8E8E93'} />
        </button>
      </div>
    </main>
  );
}
