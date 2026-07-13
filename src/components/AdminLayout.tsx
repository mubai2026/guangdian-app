import { LayoutDashboard, UsersRound, UserCheck, ClipboardList, Gift, FileText, Settings, LogOut, ShieldCheck, UserCog, Wallet } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const items = [
    { to: '/admin/dashboard', label: '数据总览', icon: LayoutDashboard },
    { to: '/admin/users', label: '用户管理', icon: UsersRound },
    { to: '/admin/mentors', label: '伙伴管理', icon: UserCheck },
    { to: '/admin/certifications', label: '认证审核', icon: ShieldCheck },
    { to: '/admin/orders', label: '订单监控', icon: ClipboardList },
    { to: '/admin/wallet', label: '钱包管理', icon: Wallet },
    { to: '/admin/blindbox', label: '盲盒管理', icon: Gift },
    { to: '/admin/notes', label: '服务笔记', icon: FileText },
    { to: '/admin/admins', label: '管理员', icon: UserCog },
    { to: '/admin/settings', label: '系统配置', icon: Settings },
  ];
  return (
    <div className="admin-layout">
      <aside>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">光</div>
          <h1>光点后台</h1>
        </div>
        <nav className="admin-sidebar-nav">
          {items.map((item) => {
            const Icon = item.icon;
            return <NavLink to={item.to} key={item.to}><Icon size={18} />{item.label}</NavLink>;
          })}
        </nav>
        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=user1" alt="" />
            <div>
              <span>超级管理员</span>
              <span>admin@guangdian</span>
            </div>
          </div>
          <button className="admin-logout-btn" onClick={() => navigate('/admin/login')}>
            <LogOut size={16} /> 退出
          </button>
        </div>
      </aside>
      <main>{children}</main>
    </div>
  );
}
