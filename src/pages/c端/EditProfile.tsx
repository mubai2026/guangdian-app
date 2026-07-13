import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import { useState } from 'react';

export default function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nickname: '用户小明',
    gender: '男',
    birthday: '1998-06-15',
    city: '上海',
    bio: '遇见同行的搭子',
    tags: '晨跑, 游泳, 露营, 看展, 咖啡, 骑行',
  });

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  return (
    <main className="mobile-page" style={{ padding: 0 }}>
      <header className="publish-header" style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0,0,0,.06)' }}>
        <button onClick={() => navigate(-1)} style={{ border: 0, background: 'none', cursor: 'pointer' }}><ArrowLeft size={24} /></button>
        <h1 style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 600 }}>编辑资料</h1>
        <button onClick={() => navigate(-1)} style={{ border: 0, background: 'none', color: 'var(--color-primary)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>保存</button>
      </header>

      <div style={{ padding: 20 }}>
        {/* 头像 */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=user1" alt="avatar" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-primary)' }} />
            <div style={{ position: 'absolute', bottom: 0, right: -4, width: 28, height: 28, borderRadius: '50%', background: 'var(--color-primary)', display: 'grid', placeItems: 'center', border: '2px solid #fff' }}>
              <Camera size={14} color="#fff" />
            </div>
          </div>
        </div>

        {/* 表单 */}
        <div className="edit-form-group">
          <label>昵称</label>
          <input type="text" value={form.nickname} onChange={(e) => update('nickname', e.target.value)} />
        </div>

        <div className="edit-form-group">
          <label>性别</label>
          <div style={{ display: 'flex', gap: 12 }}>
            {['男', '女', '其他'].map((g) => (
              <button key={g} className={`gender-btn ${form.gender === g ? 'active' : ''}`} onClick={() => update('gender', g)}>{g}</button>
            ))}
          </div>
        </div>

        <div className="edit-form-group">
          <label>生日</label>
          <input type="date" value={form.birthday} onChange={(e) => update('birthday', e.target.value)} />
        </div>

        <div className="edit-form-group">
          <label>所在城市</label>
          <input type="text" value={form.city} onChange={(e) => update('city', e.target.value)} />
        </div>

        <div className="edit-form-group">
          <label>个人简介</label>
          <textarea value={form.bio} onChange={(e) => update('bio', e.target.value)} rows={3} placeholder="介绍一下自己吧" />
        </div>

        <div className="edit-form-group">
          <label>兴趣标签（逗号分隔）</label>
          <input type="text" value={form.tags} onChange={(e) => update('tags', e.target.value)} placeholder="如：晨跑, 游泳, 露营" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {form.tags.split(',').map((t) => t.trim() && (
              <span key={t.trim()} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 12, background: 'rgba(255,122,69,0.1)', color: 'var(--color-primary)' }}>{t.trim()}</span>
            ))}
          </div>
        </div>

        <button className="btn-3d-primary" style={{ width: '100%', marginTop: 24 }} onClick={() => navigate(-1)}>保存修改</button>
      </div>
    </main>
  );
}
