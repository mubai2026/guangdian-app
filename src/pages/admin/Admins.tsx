import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Search, Plus, Edit2, KeyRound, Ban, CheckCircle, Shield, User, X, Crown } from 'lucide-react';

// 7个模块
const allModules = ['数据总览', '用户管理', '伙伴管理', '订单监控', '盲盒管理', '服务笔记', '系统配置'];

const mockAdmins = [
  { id: 'A001', avatar: '/avatars/avatar1.png', account: 'admin', name: '超级管理员', role: '高级管理员', modules: allModules, lastLogin: '2025-07-10 09:12:35', status: '正常' },
  { id: 'A002', avatar: '/avatars/avatar2.png', account: 'user_op', name: '林用户', role: '运维管理员', modules: ['用户管理'], lastLogin: '2025-07-10 08:45:11', status: '正常' },
  { id: 'A003', avatar: '/avatars/avatar3.png', account: 'order_op', name: '陈订单', role: '运维管理员', modules: ['订单监控'], lastLogin: '2025-07-09 22:08:54', status: '正常' },
  { id: 'A004', avatar: '/avatars/avatar4.png', account: 'partner_op', name: '王伙伴', role: '运维管理员', modules: ['伙伴管理'], lastLogin: '2025-07-10 10:22:08', status: '正常' },
  { id: 'A005', avatar: '/avatars/avatar5.png', account: 'box_op', name: '李盲盒', role: '运维管理员', modules: ['盲盒管理'], lastLogin: '2025-07-08 18:30:00', status: '正常' },
  { id: 'A006', avatar: '/avatars/avatar1.png', account: 'content_op', name: '赵内容', role: '运维管理员', modules: ['服务笔记'], lastLogin: '2025-06-30 14:00:00', status: '已禁用' },
];

export default function AdminAdmins() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('全部');
  const [authModal, setAuthModal] = useState<any>(null); // 授权弹窗
  const [addModal, setAddModal] = useState(false); // 添加弹窗
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [newAdmin, setNewAdmin] = useState({ account: '', name: '', modules: [] as string[] });

  let filtered = mockAdmins;
  if (search) filtered = filtered.filter(a => a.name.includes(search) || a.account.includes(search));
  if (roleFilter !== '全部') filtered = filtered.filter(a => a.role === roleFilter);

  const openAuthModal = (admin: any) => {
    setAuthModal(admin);
    setSelectedModules(admin.modules);
  };

  const toggleModule = (mod: string) => {
    setSelectedModules(prev => prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]);
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 className="admin-page-title" style={{ margin: 0 }}>管理员账号</h1>
            <span className="admin-page-count">共 {filtered.length} 位管理员</span>
          </div>
          <button className="admin-add-btn" onClick={() => setAddModal(true)}>
            <Plus size={16} />添加管理员
          </button>
        </div>

        <div className="admin-toolbar">
          <div className="admin-search-wrap">
            <Search size={18} style={{ color: '#8E8E93' }} />
            <input className="admin-search-input" placeholder="搜索账号、姓名" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="admin-filter-tabs">
            {['全部', '高级管理员', '运维管理员'].map(t => (
              <button key={t} className={roleFilter === t ? 'active' : ''} onClick={() => setRoleFilter(t)}>{t}</button>
            ))}
          </div>
        </div>

        {/* 角色权限说明 */}
        <div className="admin-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 20 }}>
          <div style={{ background: 'linear-gradient(135deg, #FFF7ED, #F3E8FF)', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Crown size={18} style={{ color: '#FF7A45' }} />
              <strong style={{ fontSize: 15, color: '#22242a' }}>高级管理员</strong>
            </div>
            <p style={{ fontSize: 13, color: '#565a66', margin: 0, lineHeight: 1.6 }}>
              拥有全部7个模块的管理权限，可授权其他管理员、分配模块权限、重置密码、禁用/启用账号。仅1个高级管理员账号。
            </p>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #F0F9FF, #E0F2FE)', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Shield size={18} style={{ color: '#3B82F6' }} />
              <strong style={{ fontSize: 15, color: '#22242a' }}>运维管理员</strong>
            </div>
            <p style={{ fontSize: 13, color: '#565a66', margin: 0, lineHeight: 1.6 }}>
              仅拥有被授权模块的操作权限，可查看全局数据。权限由高级管理员分配，最多5个运维管理员。
            </p>
          </div>
        </div>

        {/* 管理员表格 */}
        <div className="admin-table">
          <table>
            <thead><tr>
              <th>头像</th><th>账号</th><th>姓名</th><th>角色</th><th>负责模块</th><th>最后登录</th><th>状态</th><th>操作</th>
            </tr></thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td><img src={a.avatar} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} /></td>
                  <td style={{ fontFamily: 'monospace', color: '#8E8E93' }}>{a.account}</td>
                  <td style={{ fontWeight: 500 }}>{a.name}</td>
                  <td>
                    {a.role === '高级管理员'
                      ? <span className="admin-status-tag" style={{ background: 'linear-gradient(135deg, #FF7A45, #A855F7)', color: '#fff' }}><Crown size={12} style={{ verticalAlign: 'middle', marginRight: 2 }} />{a.role}</span>
                      : <span className="admin-status-tag" style={{ background: '#DBEAFE', color: '#3B82F6' }}>{a.role}</span>}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {a.modules.length === allModules.length
                        ? <span className="admin-status-tag" style={{ background: '#D1FAE5', color: '#10B981' }}>全部模块</span>
                        : a.modules.map(m => <span key={m} className="admin-status-tag" style={{ background: '#F3F4F6', color: '#6B7280', fontSize: 11 }}>{m}</span>)}
                    </div>
                  </td>
                  <td style={{ color: '#8E8E93' }}>{a.lastLogin}</td>
                  <td><span className="admin-status-tag" style={{ background: a.status === '正常' ? '#D1FAE5' : '#FEE2E2', color: a.status === '正常' ? '#10B981' : '#EF4444' }}>{a.status}</span></td>
                  <td><div className="admin-action-btns">
                    {/* 高级管理员可授权其他运维管理员 */}
                    {a.role === '运维管理员' && (
                      <button className="admin-action-btn view" title="授权权限" onClick={() => openAuthModal(a)}><Edit2 size={14} /></button>
                    )}
                    <button className="admin-action-btn approve" title="重置密码" onClick={() => alert('密码已重置为默认密码')}><KeyRound size={14} /></button>
                    {a.status === '正常'
                      ? <button className="admin-action-btn reject" title="禁用" onClick={() => alert('已禁用')}><Ban size={14} /></button>
                      : <button className="admin-action-btn unfreeze" title="启用" onClick={() => alert('已启用')}><CheckCircle size={14} /></button>}
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 权限矩阵 */}
        <div className="admin-permission-matrix">
          <h3>权限矩阵</h3>
          <table>
            <thead><tr>
              <th style={{ textAlign: 'left' }}>模块</th>
              <th>高级管理员</th>
              {mockAdmins.filter(a => a.role === '运维管理员').map(a => <th key={a.id}>{a.name}</th>)}
            </tr></thead>
            <tbody>
              {allModules.map(mod => (
                <tr key={mod}>
                  <td style={{ textAlign: 'left', fontWeight: 500 }}>{mod}</td>
                  <td><span className="admin-perm-full">● 全权限</span></td>
                  {mockAdmins.filter(a => a.role === '运维管理员').map(a => (
                    <td key={a.id}>
                      {a.modules.includes(mod)
                        ? <span className="admin-perm-partial">● 可操作</span>
                        : <span className="admin-perm-view">○ 仅查看</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 12, fontSize: 12, color: '#8E8E93', display: 'flex', gap: 20 }}>
            <span><span className="admin-perm-full">●</span> 全权限</span>
            <span><span className="admin-perm-partial">●</span> 可操作</span>
            <span><span className="admin-perm-view">○</span> 仅查看</span>
          </div>
        </div>

        {/* 授权弹窗 */}
        {authModal && (
          <div className="review-modal">
            <div className="review-modal-content" style={{ maxWidth: 480 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ margin: 0 }}>授权 - {authModal.name}</h3>
                <button onClick={() => setAuthModal(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#8E8E93' }}><X size={20} /></button>
              </div>
              <p style={{ fontSize: 13, color: '#8E8E93', marginBottom: 16 }}>勾选该管理员可操作的模块，未勾选的模块仅可查看数据</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                {allModules.map(mod => (
                  <label key={mod} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', border: `2px solid ${selectedModules.includes(mod) ? '#FF7A45' : '#e0e0e0'}`, borderRadius: 10, cursor: 'pointer', background: selectedModules.includes(mod) ? '#fff3ed' : '#fff' }}>
                    <input type="checkbox" checked={selectedModules.includes(mod)} onChange={() => toggleModule(mod)} style={{ accentColor: '#FF7A45', width: 18, height: 18 }} />
                    <span style={{ fontSize: 14, fontWeight: 500, color: selectedModules.includes(mod) ? '#FF7A45' : '#22242a' }}>{mod}</span>
                  </label>
                ))}
              </div>
              <button className="admin-add-btn" style={{ width: '100%' }} onClick={() => { alert(`已更新${authModal.name}的权限：${selectedModules.length}个模块`); setAuthModal(null); }}>
                确认授权
              </button>
            </div>
          </div>
        )}

        {/* 添加管理员弹窗 */}
        {addModal && (
          <div className="review-modal">
            <div className="review-modal-content" style={{ maxWidth: 480 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ margin: 0 }}>添加运维管理员</h3>
                <button onClick={() => setAddModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#8E8E93' }}><X size={20} /></button>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: '#8E8E93', display: 'block', marginBottom: 6 }}>登录账号</label>
                <input style={{ width: '100%', padding: '10px 14px', border: '1px solid #e0e0e0', borderRadius: 10, fontSize: 14, outline: 'none' }} placeholder="如：user_op2" value={newAdmin.account} onChange={(e) => setNewAdmin({ ...newAdmin, account: e.target.value })} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: '#8E8E93', display: 'block', marginBottom: 6 }}>姓名</label>
                <input style={{ width: '100%', padding: '10px 14px', border: '1px solid #e0e0e0', borderRadius: 10, fontSize: 14, outline: 'none' }} placeholder="如：张运营" value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: '#8E8E93', display: 'block', marginBottom: 6 }}>授权模块</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {allModules.map(mod => (
                    <label key={mod} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: `1.5px solid ${newAdmin.modules.includes(mod) ? '#FF7A45' : '#e0e0e0'}`, borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>
                      <input type="checkbox" checked={newAdmin.modules.includes(mod)} onChange={() => setNewAdmin({ ...newAdmin, modules: newAdmin.modules.includes(mod) ? newAdmin.modules.filter(m => m !== mod) : [...newAdmin.modules, mod] })} style={{ accentColor: '#FF7A45' }} />
                      {mod}
                    </label>
                  ))}
                </div>
              </div>
              <button className="admin-add-btn" style={{ width: '100%' }} onClick={() => { if (!newAdmin.account || !newAdmin.name) { alert('请填写完整信息'); return; } alert(`管理员${newAdmin.name}已添加，默认密码：123456`); setAddModal(false); setNewAdmin({ account: '', name: '', modules: [] }); }}>
                确认添加
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
