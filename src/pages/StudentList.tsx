import { useState } from 'react';
import { Search, Filter, Edit, Trash2, UserPlus, FileSpreadsheet } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentList = () => {
  // Dummy data for preview
  const [students] = useState([
    { id: 1, name: 'Rahul Sharma', grNumber: 'GR-101', class: '10', section: 'A', rollNo: '45', parent: 'Ramesh Sharma', whatsapp: '9876543210' },
    { id: 2, name: 'Priya Singh', grNumber: 'GR-102', class: '9', section: 'B', rollNo: '12', parent: 'Rajesh Singh', whatsapp: '9123456780' },
    { id: 3, name: 'Amit Kumar', grNumber: 'GR-103', class: '10', section: 'A', rollNo: '04', parent: 'Suresh Kumar', whatsapp: '9988776655' },
    { id: 4, name: 'Neha Gupta', grNumber: 'GR-104', class: '11', section: 'C', rollNo: '21', parent: 'Alok Gupta', whatsapp: '9876543111' },
    { id: 5, name: 'Rohan Verma', grNumber: 'GR-105', class: '12', section: 'A', rollNo: '33', parent: 'Vikash Verma', whatsapp: '9988112233' },
  ]);

  return (
    <div className="student-list">
      <header className="page-header">
        <div>
          <h1>Student Directory</h1>
          <p className="text-secondary">Manage, view, and search all enrolled students.</p>
        </div>
        <Link to="/add-student" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          <UserPlus size={18} /> Add New Student
        </Link>
      </header>

      <div className="card">
        {/* Filters & Search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '300px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input type="text" placeholder="Search by name, GR No, or WhatsApp..." className="input-field" style={{ width: '100%', paddingLeft: '2.5rem' }} />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <select className="input-field" style={{ minWidth: '120px' }}>
              <option value="">All Classes</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
            <select className="input-field" style={{ minWidth: '120px' }}>
              <option value="">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
            <button className="btn btn-secondary">
              <Filter size={18} /> Filters
            </button>
            <button className="btn btn-secondary" style={{ color: 'var(--success)' }}>
              <FileSpreadsheet size={18} /> Export
            </button>
          </div>
        </div>

        {/* Student Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-light)' }}>
              <tr>
                <th style={{ padding: '1rem' }}>GR No.</th>
                <th style={{ padding: '1rem' }}>Student Name</th>
                <th style={{ padding: '1rem' }}>Class</th>
                <th style={{ padding: '1rem' }}>Roll No.</th>
                <th style={{ padding: '1rem' }}>Parent's Name</th>
                <th style={{ padding: '1rem' }}>WhatsApp</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--accent-primary)' }}>{student.grNumber}</td>
                  <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {student.name.charAt(0)}
                    </div>
                    {student.name}
                  </td>
                  <td style={{ padding: '1rem' }}>{student.class} - {student.section}</td>
                  <td style={{ padding: '1rem' }}>{student.rollNo}</td>
                  <td style={{ padding: '1rem' }}>{student.parent}</td>
                  <td style={{ padding: '1rem' }}>{student.whatsapp}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button className="btn" style={{ padding: '0.5rem', color: 'var(--text-secondary)' }} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="btn" style={{ padding: '0.5rem', color: 'var(--danger)' }} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Dummy */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <div>Showing 1 to 5 of 124 students</div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem' }}>Previous</button>
            <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem' }}>1</button>
            <button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem' }}>2</button>
            <button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem' }}>Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentList;
