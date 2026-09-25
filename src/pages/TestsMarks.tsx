import { useState } from 'react';
import { FileText, Plus, Check, ChevronLeft, Save, FileSpreadsheet } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

interface Test {
  id: string;
  name: string;
  class: string;
  section: string;
  subject: string;
  maxMarks: number;
  status: 'pending' | 'submitted';
}

interface StudentMark {
  id: number;
  name: string;
  rollNo: string;
  image: string;
  marks: string; // string so we can leave it empty
}

const initialTests: Test[] = [
  { id: '1', name: 'Weekly Test 1', class: '10', section: 'A', subject: 'Science', maxMarks: 25, status: 'pending' },
  { id: '2', name: 'Monthly Unit Test', class: '9', section: 'B', subject: 'Mathematics', maxMarks: 50, status: 'submitted' },
];

const mockStudents: StudentMark[] = [
  { id: 101, name: 'Aarav Patel', rollNo: '10A-01', image: 'https://i.pravatar.cc/150?u=aarav', marks: '' },
  { id: 102, name: 'Diya Sharma', rollNo: '10A-02', image: 'https://i.pravatar.cc/150?u=diya', marks: '' },
  { id: 103, name: 'Kabir Singh', rollNo: '10A-03', image: 'https://i.pravatar.cc/150?u=kabir', marks: '' },
  { id: 104, name: 'Neha Gupta', rollNo: '10A-04', image: 'https://i.pravatar.cc/150?u=neha', marks: '' },
  { id: 105, name: 'Rohan Verma', rollNo: '10A-05', image: 'https://i.pravatar.cc/150?u=rohan', marks: '' },
];

const TestsMarks = () => {
  const [currentUserRole, setCurrentUserRole] = useState<'Admin' | 'Teacher'>('Admin');
  const [tests, setTests] = useState<Test[]>(initialTests);
  
  // Create Test State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTestName, setNewTestName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [maxMarks, setMaxMarks] = useState('50');

  // Mark Entry State
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [studentMarks, setStudentMarks] = useState<StudentMark[]>([]);

  // Filtering for view
  const visibleTests = currentUserRole === 'Admin' 
    ? tests 
    : tests.filter(t => t.class === '10' && t.section === 'A'); // Assume teacher assigned to 10-A

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass || !selectedSection || !selectedSubject) {
      alert('Please select Class, Section, and Subject');
      return;
    }
    const newTest: Test = {
      id: Math.random().toString(),
      name: newTestName,
      class: selectedClass,
      section: selectedSection,
      subject: selectedSubject,
      maxMarks: Number(maxMarks),
      status: 'pending'
    };
    setTests([newTest, ...tests]);
    setIsCreateModalOpen(false);
    
    // Reset form
    setNewTestName('');
    setSelectedClass('');
    setSelectedSection('');
    setSelectedSubject('');
    setMaxMarks('50');
    alert('Test Scheduled & Assigned to the class teacher successfully!');
  };

  const handleOpenTest = (test: Test) => {
    setActiveTest(test);
    setStudentMarks(mockStudents.map(s => ({ ...s, marks: test.status === 'submitted' ? String(Math.floor(Math.random() * test.maxMarks)) : '' })));
  };

  const handleMarkChange = (id: number, val: string) => {
    if (activeTest && Number(val) > activeTest.maxMarks) {
      alert(`Marks cannot exceed maximum marks (${activeTest.maxMarks})`);
      return;
    }
    setStudentMarks(studentMarks.map(s => s.id === id ? { ...s, marks: val } : s));
  };

  const handleSubmitMarks = () => {
    const missing = studentMarks.filter(s => s.marks === '');
    if (missing.length > 0) {
      alert(`Please enter marks for all students. ${missing.length} remaining.`);
      return;
    }
    
    setTests(tests.map(t => t.id === activeTest?.id ? { ...t, status: 'submitted' } : t));
    setActiveTest(null);
    alert('Marks submitted successfully! Reports are ready to be generated.');
  };

  // --- MARK ENTRY VIEW ---
  if (activeTest) {
    return (
      <div className="tests-marks-module">
        <header className="page-header" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn" onClick={() => setActiveTest(null)} style={{ padding: '0.5rem', backgroundColor: 'var(--bg-secondary)' }}>
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 style={{ margin: 0 }}>{activeTest.status === 'pending' ? 'Enter Marks' : 'View Results'}</h1>
              <p className="text-secondary" style={{ margin: 0 }}>{activeTest.name} • Class {activeTest.class}-{activeTest.section} • {activeTest.subject}</p>
            </div>
          </div>
        </header>

        <div className="card" style={{ padding: 0 }}>
          {/* Header Stats */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-secondary)' }}>
            <div>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Maximum Marks</p>
              <h2 style={{ margin: 0, color: 'var(--accent-primary)' }}>{activeTest.maxMarks}</h2>
            </div>
            {activeTest.status === 'submitted' && (
              <span style={{ backgroundColor: 'var(--success)', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 600 }}>
                Marks Submitted
              </span>
            )}
          </div>

          <div style={{ padding: '1rem' }}>
            {studentMarks.map((student) => (
              <div key={student.id} className="student-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={student.image} alt={student.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-light)' }} />
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>{student.name}</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Roll No: {student.rollNo}</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input 
                    type="number" 
                    placeholder="0"
                    value={student.marks}
                    onChange={(e) => handleMarkChange(student.id, e.target.value)}
                    disabled={activeTest.status === 'submitted'}
                    className="input-field"
                    style={{ width: '80px', textAlign: 'center', fontSize: '1.1rem', fontWeight: 600, padding: '0.5rem' }}
                  />
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>/ {activeTest.maxMarks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {activeTest.status === 'pending' ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={handleSubmitMarks} style={{ padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
              <Save size={20} /> Submit Final Marks
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button className="btn btn-secondary" style={{ padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', color: 'var(--success)' }}>
              <FileSpreadsheet size={20} /> Download Report Sheet
            </button>
          </div>
        )}
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="tests-marks-module">
      <header className="page-header">
        <div>
          <h1>Tests & Marks</h1>
          <p className="text-secondary">Schedule tests and manage student performance.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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

          {currentUserRole === 'Admin' && (
            <button className="btn btn-primary" onClick={() => setIsCreateModalOpen(true)}>
              <Plus size={18} /> Create New Test
            </button>
          )}
        </div>
      </header>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          {currentUserRole === 'Admin' ? 'All Scheduled Tests' : 'Tests Assigned To You'}
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {visibleTests.map((test) => (
            <div 
              key={test.id} 
              onClick={() => handleOpenTest(test)}
              style={{ 
                padding: '1.5rem', 
                borderRadius: 'var(--radius-lg)', 
                border: '1px solid var(--border-light)', 
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: '#fff',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ backgroundColor: 'var(--social-bg)', color: 'var(--accent-primary)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600, display: 'inline-block', marginBottom: '0.5rem' }}>
                    {test.subject}
                  </span>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{test.name}</h3>
                  <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Class {test.class} - {test.section}</p>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(79,70,229,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', flexShrink: 0 }}>
                  <FileText size={20} />
                </div>
              </div>
              
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Max Marks: <strong>{test.maxMarks}</strong>
                </div>
                {test.status === 'pending' ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--warning)', fontSize: '0.875rem', fontWeight: 600 }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--warning)' }}></span>
                    Pending Marks
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--success)', fontSize: '0.875rem', fontWeight: 600 }}>
                    <Check size={14} /> Submitted
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {visibleTests.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', gridColumn: '1 / -1' }}>
              No tests scheduled for this view.
            </div>
          )}
        </div>
      </div>

      {/* CREATE TEST MODAL FOR ADMIN */}
      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="card hide-scroll modal-content" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>Schedule New Test</h2>
            
            <form onSubmit={handleCreateTest}>
              <div className="input-group" style={{ marginBottom: '1.25rem' }}>
                <label className="input-label">Test Name</label>
                <input type="text" className="input-field" placeholder="e.g. Weekly Test 2" value={newTestName} onChange={(e) => setNewTestName(e.target.value)} required />
              </div>
              
              <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Select Class</label>
                  <CustomSelect 
                    options={[{value: '', label: 'Select'}, {value: '9', label: 'Class 9'}, {value: '10', label: 'Class 10'}, {value: '11', label: 'Class 11'}]} 
                    value={selectedClass} 
                    onChange={setSelectedClass} 
                  />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Section</label>
                  <CustomSelect 
                    options={[{value: '', label: 'Select'}, {value: 'A', label: 'Section A'}, {value: 'B', label: 'Section B'}]} 
                    value={selectedSection} 
                    onChange={setSelectedSection} 
                  />
                </div>
              </div>
              
              <div className="input-group" style={{ marginBottom: '1.25rem' }}>
                <label className="input-label">Subject</label>
                <CustomSelect 
                  options={[
                    {value: '', label: 'Select'},
                    {value: 'Mathematics', label: 'Mathematics'}, 
                    {value: 'Science', label: 'Science'},
                    {value: 'English', label: 'English'},
                    {value: 'History', label: 'History'}
                  ]} 
                  value={selectedSubject} 
                  onChange={setSelectedSubject} 
                />
              </div>

              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label className="input-label">Maximum Marks</label>
                <input type="number" className="input-field" value={maxMarks} onChange={(e) => setMaxMarks(e.target.value)} required />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsCreateModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Schedule & Assign</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestsMarks;
