import { useState } from 'react';
import { Calendar, Check, X, Clock, AlertCircle, Save, ChevronLeft } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

interface Student {
  id: number;
  name: string;
  rollNo: string;
  image: string;
  status: 'present' | 'absent' | 'late' | 'halfday' | null;
}

const mockStudents = [
  { id: 101, name: 'Aarav Patel', rollNo: '10A-01', image: 'https://i.pravatar.cc/150?u=aarav', status: null },
  { id: 102, name: 'Diya Sharma', rollNo: '10A-02', image: 'https://i.pravatar.cc/150?u=diya', status: null },
  { id: 103, name: 'Kabir Singh', rollNo: '10A-03', image: 'https://i.pravatar.cc/150?u=kabir', status: null },
  { id: 104, name: 'Neha Gupta', rollNo: '10A-04', image: 'https://i.pravatar.cc/150?u=neha', status: null },
  { id: 105, name: 'Rohan Verma', rollNo: '10A-05', image: 'https://i.pravatar.cc/150?u=rohan', status: null },
] as Student[];

const Attendance = () => {
  // Demo purpose role toggle
  const [currentUserRole, setCurrentUserRole] = useState<'Admin' | 'Teacher'>('Admin');
  
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [students, setStudents] = useState<Student[]>([]);
  const [isClassSelected, setIsClassSelected] = useState(false);

  // Mock data for classes
  const adminClasses = [
    { class: '9', section: 'A' }, { class: '9', section: 'B' },
    { class: '10', section: 'A' }, { class: '10', section: 'B' },
  ];
  
  const teacherClasses = [
    { class: '10', section: 'A' } // Teacher is only assigned to 10 A
  ];

  const availableClasses = currentUserRole === 'Admin' ? adminClasses : teacherClasses;

  const handleSelectClass = (c: string, s: string) => {
    setSelectedClass(c);
    setSelectedSection(s);
    setStudents([...mockStudents]); // Load fresh mock students for the class
    setIsClassSelected(true);
  };

  const markStudent = (id: number, status: Student['status']) => {
    setStudents(students.map(s => s.id === id ? { ...s, status } : s));
  };

  const markAll = (status: Student['status']) => {
    setStudents(students.map(s => ({ ...s, status })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = students.filter(s => s.status === null);
    if (missing.length > 0) {
      alert(`Please mark attendance for all students. ${missing.length} remaining.`);
      return;
    }
    
    // Calculate stats
    const present = students.filter(s => s.status === 'present').length;
    const absent = students.filter(s => s.status === 'absent').length;
    
    alert(`Attendance Submitted Successfully!\nDate: ${attendanceDate}\nClass: ${selectedClass}-${selectedSection}\nPresent: ${present}\nAbsent: ${absent}`);
    // Go back
    setIsClassSelected(false);
  };

  if (!isClassSelected) {
    return (
      <div className="attendance-module">
        <header className="page-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1>Daily Attendance</h1>
            <p className="text-secondary">Select a class to mark or view attendance</p>
          </div>
          
          {/* DEMO PURPOSES: Toggle Role */}
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: 'var(--radius-full)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', paddingLeft: '0.5rem' }}>View As:</span>
            <button 
              className={`btn ${currentUserRole === 'Admin' ? 'btn-primary' : ''}`} 
              style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', borderRadius: 'var(--radius-full)', ...(currentUserRole !== 'Admin' && { background: 'transparent', color: 'var(--text-secondary)' }) }}
              onClick={() => setCurrentUserRole('Admin')}
            >Admin</button>
            <button 
              className={`btn ${currentUserRole === 'Teacher' ? 'btn-primary' : ''}`} 
              style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', borderRadius: 'var(--radius-full)', ...(currentUserRole !== 'Teacher' && { background: 'transparent', color: 'var(--text-secondary)' }) }}
              onClick={() => setCurrentUserRole('Teacher')}
            >Teacher</button>
          </div>
        </header>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Your Assigned Classes</h3>
          {currentUserRole === 'Admin' && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              As an Admin, you have access to mark/view attendance for all classes in the school.
            </p>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {availableClasses.map((item, idx) => (
              <div 
                key={idx} 
                className="class-card"
                onClick={() => handleSelectClass(item.class, item.section)}
                style={{ 
                  padding: '1.5rem', 
                  borderRadius: 'var(--radius-lg)', 
                  border: '1px solid var(--border-light)', 
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: '#fff',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--accent-primary)' }}>Class {item.class}</h2>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontWeight: 500 }}>Section {item.section}</p>
                  </div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(79,70,229,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                    <Calendar size={20} />
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--warning)' }}></span>
                  Today's Attendance: Pending
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- ATTENDANCE MARKING VIEW ---
  return (
    <div className="attendance-module">
      <header className="page-header" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="btn" onClick={() => setIsClassSelected(false)} style={{ padding: '0.5rem', backgroundColor: 'var(--bg-secondary)' }}>
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 style={{ margin: 0 }}>Mark Attendance</h1>
          <p className="text-secondary" style={{ margin: 0 }}>Class {selectedClass} - Section {selectedSection}</p>
        </div>
      </header>

      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end' }}>
        <div className="input-group" style={{ marginBottom: 0, flex: 1, minWidth: '200px' }}>
          <label className="input-label">Date</label>
          <input 
            type="date" 
            className="input-field" 
            value={attendanceDate} 
            onChange={(e) => setAttendanceDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]} // Max date is today
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flex: 2, minWidth: '300px' }}>
          <button type="button" className="btn btn-secondary" onClick={() => markAll('present')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--success)', borderColor: 'var(--success)' }}>
            <Check size={18} /> Mark All Present
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => markAll('absent')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--danger)', borderColor: 'var(--danger)' }}>
            <X size={18} /> Mark All Absent
          </button>
        </div>
      </div>

      <div className="card hide-scroll" style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-light)' }}>
              <th style={{ padding: '1rem 1.5rem' }}>Roll No</th>
              <th style={{ padding: '1rem' }}>Student Name</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {student.rollNo}
                </td>
                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 500 }}>
                  <img src={student.image} alt={student.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  {student.name}
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    
                    <button 
                      onClick={() => markStudent(student.id, 'present')}
                      style={{ 
                        padding: '0.5rem 1rem', 
                        borderRadius: 'var(--radius-full)', 
                        border: '1px solid',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '0.25rem',
                        transition: 'all 0.2s',
                        backgroundColor: student.status === 'present' ? 'var(--success)' : 'transparent',
                        color: student.status === 'present' ? '#fff' : 'var(--text-secondary)',
                        borderColor: student.status === 'present' ? 'var(--success)' : 'var(--border-light)'
                      }}
                    >
                      <Check size={16} /> Present
                    </button>

                    <button 
                      onClick={() => markStudent(student.id, 'absent')}
                      style={{ 
                        padding: '0.5rem 1rem', 
                        borderRadius: 'var(--radius-full)', 
                        border: '1px solid',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '0.25rem',
                        transition: 'all 0.2s',
                        backgroundColor: student.status === 'absent' ? 'var(--danger)' : 'transparent',
                        color: student.status === 'absent' ? '#fff' : 'var(--text-secondary)',
                        borderColor: student.status === 'absent' ? 'var(--danger)' : 'var(--border-light)'
                      }}
                    >
                      <X size={16} /> Absent
                    </button>

                    <button 
                      onClick={() => markStudent(student.id, 'late')}
                      style={{ 
                        padding: '0.5rem 1rem', 
                        borderRadius: 'var(--radius-full)', 
                        border: '1px solid',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '0.25rem',
                        transition: 'all 0.2s',
                        backgroundColor: student.status === 'late' ? 'var(--warning)' : 'transparent',
                        color: student.status === 'late' ? '#fff' : 'var(--text-secondary)',
                        borderColor: student.status === 'late' ? 'var(--warning)' : 'var(--border-light)'
                      }}
                    >
                      <Clock size={16} /> Late
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
        <button className="btn btn-primary" onClick={handleSubmit} style={{ padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
          <Save size={20} /> Submit Attendance
        </button>
      </div>

    </div>
  );
};

export default Attendance;
