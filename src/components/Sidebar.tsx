import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, UserPlus, CheckSquare, FileText, Settings, MessageSquare, Shield, Menu, X } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Staff & Roles', icon: Shield, path: '/staff' },
    { name: 'Students', icon: Users, path: '/students' },
    { name: 'Add Student', icon: UserPlus, path: '/add-student' },
    { name: 'Attendance', icon: CheckSquare, path: '/attendance' },
    { name: 'Tests & Marks', icon: FileText, path: '/tests' },
    { name: 'WhatsApp API', icon: MessageSquare, path: '/whatsapp' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      <div className="mobile-header-toggle">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="logo-icon" style={{ width: '32px', height: '32px' }}>SH</div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Shreyas</h2>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="btn" style={{ padding: '0.5rem', background: 'transparent' }}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-icon">SH</div>
          <h2>Shreyas</h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <item.icon className="nav-icon" size={20} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;
