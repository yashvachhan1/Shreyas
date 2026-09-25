import { Users, BookOpen, CheckCircle, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Students', value: '1,245', icon: Users, color: '#4f46e5' },
    { title: 'Total Teachers', value: '48', icon: BookOpen, color: '#10b981' },
    { title: "Today's Attendance", value: '94%', icon: CheckCircle, color: '#f59e0b' },
    { title: 'Revenue', value: '$12,400', icon: TrendingUp, color: '#ef4444' },
  ];

  return (
    <div className="dashboard">
      <header className="page-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p className="text-secondary">Welcome back, Admin. Here is what's happening today.</p>
        </div>
      </header>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {stats.map((stat) => (
          <div key={stat.title} className="card stat-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, padding: '1rem', borderRadius: '1rem', color: stat.color }}>
              <stat.icon size={28} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>{stat.title}</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-activity card">
        <h3>Recent Activity</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Student admissions and test reports will appear here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
