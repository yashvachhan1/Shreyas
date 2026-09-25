import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, MessageSquare, CheckSquare, FileText, Phone, Download, TrendingUp, AlertTriangle, X, Printer } from 'lucide-react';

const StudentProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportType, setReportType] = useState('monthly');

  // Dummy Student Data
  const student = {
    id: id,
    name: 'Rahul Sharma',
    image: 'https://i.pravatar.cc/150?u=rahul',
    grNumber: 'GR-101',
    class: '10',
    section: 'A',
    rollNo: '45',
    parent: 'Ramesh Sharma',
    whatsapp: '9876543210',
    address: '123, Civil Lines, City',
    admissionDate: '12-Apr-2023',
    attendance: '92%',
    avgMarks: '85%',
    strongSubject: 'Science (95%)',
    weakSubject: 'Mathematics (65%)',
    teacherRemark: 'Rahul is highly engaged in Science experiments but needs more practice in solving complex Math equations. Extra attention required in Algebra.'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="student-profile relative">
      <header className="page-header">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/students" className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1>Student Profile</h1>
            <p className="text-secondary">View detailed history, attendance, and marks.</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setIsReportModalOpen(true)} style={{ backgroundColor: '#10b981' }}>
          <Download size={18} /> Generate Report
        </button>
      </header>

      {/* Top Profile Card */}
      <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', marginBottom: '2rem' }}>
        <img src={student.image} alt={student.name} style={{ width: '120px', height: '120px', borderRadius: '1rem', objectFit: 'cover', border: '2px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }} />
        
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{student.name}</h2>
              <span style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--accent-primary)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 600 }}>
                {student.grNumber}
              </span>
            </div>
            <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Edit size={16} /> Edit Profile
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Class & Section</p>
              <p style={{ fontWeight: 600 }}>Class {student.class} - {student.section}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Roll Number</p>
              <p style={{ fontWeight: 600 }}>{student.rollNo}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Parent's Name</p>
              <p style={{ fontWeight: 600 }}>{student.parent}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>WhatsApp (Alerts)</p>
              <p style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)' }}>
                <Phone size={16} /> +91 {student.whatsapp}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Tabs */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--bg-primary)' }}>
          {['overview', 'attendance', 'marks', 'communications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '1rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                color: activeTab === tab ? 'var(--accent-primary)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab ? '2px solid var(--accent-primary)' : '2px solid transparent',
                backgroundColor: activeTab === tab ? 'var(--bg-secondary)' : 'transparent',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab === 'overview' && <FileText size={18} />}
              {tab === 'attendance' && <CheckSquare size={18} />}
              {tab === 'marks' && <FileText size={18} />}
              {tab === 'communications' && <MessageSquare size={18} />}
              {tab}
            </button>
          ))}
        </div>

        <div style={{ padding: '2rem' }}>
          {activeTab === 'overview' && (
            <div>
              <h3>Quick Stats</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
                <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#e0e7ff', borderRadius: '50%', color: 'var(--accent-primary)' }}><CheckSquare size={24} /></div>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Overall Attendance</p>
                    <h2 style={{ fontSize: '1.5rem' }}>{student.attendance}</h2>
                  </div>
                </div>
                <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#dcfce7', borderRadius: '50%', color: 'var(--success)' }}><FileText size={24} /></div>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Average Marks</p>
                    <h2 style={{ fontSize: '1.5rem' }}>{student.avgMarks}</h2>
                  </div>
                </div>
              </div>

              <h3 style={{ marginTop: '2.5rem' }}>Academic Insights (Professional AI Analysis)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
                <div style={{ backgroundColor: '#f0fdf4', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #bbf7d0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', fontWeight: 600, marginBottom: '0.5rem' }}>
                    <TrendingUp size={20} /> Strongest Area
                  </div>
                  <h4 style={{ fontSize: '1.25rem', color: '#15803d' }}>{student.strongSubject}</h4>
                  <p style={{ color: '#166534', fontSize: '0.875rem', marginTop: '0.5rem' }}>Consistent top performer. Excellent grasp of concepts.</p>
                </div>
                <div style={{ backgroundColor: '#fef2f2', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #fecaca' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991b1b', fontWeight: 600, marginBottom: '0.5rem' }}>
                    <AlertTriangle size={20} /> Needs Attention
                  </div>
                  <h4 style={{ fontSize: '1.25rem', color: '#b91c1c' }}>{student.weakSubject}</h4>
                  <p style={{ color: '#991b1b', fontSize: '0.875rem', marginTop: '0.5rem' }}>Marks dropping over the last 3 weekly tests. Needs focused revision.</p>
                </div>
              </div>
              
              <div style={{ marginTop: '1.5rem', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', borderLeft: '4px solid var(--accent-primary)' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Teacher's Recommendation</h4>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{student.teacherRemark}"</p>
              </div>
            </div>
          )}

          {/* Other tabs remain similar... (Attendance, Marks, Comms) */}
          {activeTab === 'attendance' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>Recent Absences</h3>
                <span style={{ fontSize: '0.875rem', color: 'var(--danger)', fontWeight: 600 }}>Total Absent: 4 Days</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-light)' }}>
                      <th style={{ padding: '0.75rem' }}>Date</th>
                      <th style={{ padding: '0.75rem' }}>Status</th>
                      <th style={{ padding: '0.75rem' }}>WhatsApp Alert Sent?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '0.75rem' }}>14-Sep-2023</td>
                      <td style={{ padding: '0.75rem', color: 'var(--danger)', fontWeight: 500 }}>Absent</td>
                      <td style={{ padding: '0.75rem', color: 'var(--success)' }}>Yes (Delivered)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'marks' && <div><h3>Marks History</h3><p>Detailed marks will appear here.</p></div>}
          {activeTab === 'communications' && <div><h3>WhatsApp Log</h3><p>Message logs will appear here.</p></div>}
        </div>
      </div>

      {/* Report Generator Modal */}
      {isReportModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem' }}>Generate PDF Report Card</h2>
              <button onClick={() => setIsReportModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="var(--text-secondary)" /></button>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <select className="input-field" value={reportType} onChange={(e) => setReportType(e.target.value)} style={{ width: '200px' }}>
                <option value="weekly">Weekly Report</option>
                <option value="monthly">Monthly Report</option>
                <option value="yearly">Yearly Report</option>
              </select>
              <button className="btn btn-primary" onClick={handlePrint}>
                <Printer size={18} /> Print / Save as PDF
              </button>
            </div>

            {/* Printable Area - Premium Report Card UI */}
            <div style={{ border: '1px solid var(--border-light)', padding: '3rem', borderRadius: 'var(--radius-md)', backgroundColor: '#fff', position: 'relative' }}>
              {/* School Header */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid var(--accent-primary)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--accent-primary)', margin: 0, fontSize: '2rem' }}>EduAdmin International School</h1>
                <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0' }}>Academic Performance Report ({reportType.toUpperCase()})</p>
              </div>

              {/* Student Info */}
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                <img src={student.image} alt="Student" style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div><strong>Student Name:</strong> {student.name}</div>
                  <div><strong>GR Number:</strong> {student.grNumber}</div>
                  <div><strong>Class & Section:</strong> {student.class} - {student.section}</div>
                  <div><strong>Roll No:</strong> {student.rollNo}</div>
                  <div><strong>Parent Name:</strong> {student.parent}</div>
                  <div><strong>Attendance:</strong> {student.attendance}</div>
                </div>
              </div>

              {/* Marks Table */}
              <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Scholastic Performance</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', minWidth: '500px' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)' }}>
                      <th style={{ padding: '0.75rem', border: '1px solid var(--border-light)', textAlign: 'left' }}>Subject</th>
                      <th style={{ padding: '0.75rem', border: '1px solid var(--border-light)', textAlign: 'center' }}>Total Marks</th>
                      <th style={{ padding: '0.75rem', border: '1px solid var(--border-light)', textAlign: 'center' }}>Marks Obtained</th>
                      <th style={{ padding: '0.75rem', border: '1px solid var(--border-light)', textAlign: 'center' }}>Grade</th>
                    </tr>
                  </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--border-light)' }}>Mathematics</td>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--border-light)', textAlign: 'center' }}>100</td>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--border-light)', textAlign: 'center', color: '#b91c1c' }}>65</td>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--border-light)', textAlign: 'center' }}>C</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--border-light)' }}>Science</td>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--border-light)', textAlign: 'center' }}>100</td>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--border-light)', textAlign: 'center', color: '#15803d' }}>95</td>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--border-light)', textAlign: 'center' }}>A+</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--border-light)' }}>English</td>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--border-light)', textAlign: 'center' }}>100</td>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--border-light)', textAlign: 'center' }}>82</td>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--border-light)', textAlign: 'center' }}>B+</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Insights */}
              <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Teacher's Remarks</h3>
              <p style={{ fontStyle: 'italic', color: '#444', lineHeight: 1.6 }}>{student.teacherRemark}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4rem' }}>
                <div style={{ borderTop: '1px solid #000', paddingTop: '0.5rem', width: '200px', textAlign: 'center' }}>Class Teacher Signature</div>
                <div style={{ borderTop: '1px solid #000', paddingTop: '0.5rem', width: '200px', textAlign: 'center' }}>Principal Signature</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for printing */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .card > div:last-child, .card > div:last-child * { visibility: visible; }
          .card > div:last-child { position: absolute; left: 0; top: 0; width: 100%; padding: 0 !important; border: none !important; }
        }
      `}</style>
    </div>
  );
};

export default StudentProfile;
