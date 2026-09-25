import { useState } from 'react';
import { UserPlus, Shield, Edit, Trash2, X, CheckCircle, ShieldAlert } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

const StaffRoles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleType, setRoleType] = useState('Teacher');
  const [assignedClass, setAssignedClass] = useState('');
  const [assignedSection, setAssignedSection] = useState('');

  const [staffList] = useState([
    { id: 1, name: 'Vikram Singh', role: 'Super Admin', email: 'admin@edu.com', assignedTo: 'All Classes' },
    { id: 2, name: 'Anita Desai', role: 'Class Teacher', email: 'anita@edu.com', assignedTo: 'Class 10 - A' },
    { id: 3, name: 'Karan Patel', role: 'Class Teacher', email: 'karan@edu.com', assignedTo: 'Class 9 - B' },
    { id: 4, name: 'Megha Roy', role: 'Subject Teacher', email: 'megha@edu.com', assignedTo: 'Class 11, 12 (Science)' },
  ]);

  return (
    <div className="staff-roles">
      <header className="page-header">
        <div>
          <h1>Staff & Roles Management</h1>
          <p className="text-secondary">Create child admins, teachers and assign classes to them.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} /> Add New Staff
        </button>
      </header>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={20} color="var(--accent-primary)" /> Current Staff & Teachers
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem', minWidth: '600px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-light)' }}>
                <th style={{ padding: '1rem' }}>Name</th>
                <th style={{ padding: '1rem' }}>Email</th>
                <th style={{ padding: '1rem' }}>Role</th>
                <th style={{ padding: '1rem' }}>Assigned Class/Section</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: staff.role.includes('Admin') ? '#fef2f2' : '#e0e7ff', color: staff.role.includes('Admin') ? '#b91c1c' : 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                      {staff.name.charAt(0)}
                    </div>
                    {staff.name}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{staff.email}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ backgroundColor: staff.role.includes('Admin') ? '#fee2e2' : 'rgba(79, 70, 229, 0.1)', color: staff.role.includes('Admin') ? '#991b1b' : 'var(--accent-primary)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {staff.role}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{staff.assignedTo}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button className="btn" style={{ padding: '0.5rem', color: 'var(--text-secondary)' }} title="Edit Access">
                        <Edit size={16} />
                      </button>
                      <button className="btn" style={{ padding: '0.5rem', color: 'var(--danger)' }} title="Remove Staff">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="card hide-scroll modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldAlert size={20} color="var(--accent-primary)" /> Add Staff & Assign Role</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="var(--text-secondary)" /></button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Staff Added Successfully!'); setIsModalOpen(false); }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input type="text" className="input-field" placeholder="e.g. Ramesh Kumar" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Email Address (For Login)</label>
                  <input type="email" className="input-field" placeholder="ramesh@school.com" required />
                </div>
              </div>

              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label className="input-label">Role Level</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '1rem', border: roleType === 'Admin' ? '2px solid var(--accent-primary)' : '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', flex: 1, backgroundColor: roleType === 'Admin' ? 'rgba(79,70,229,0.05)' : 'transparent' }}>
                    <input type="radio" name="role" value="Admin" checked={roleType === 'Admin'} onChange={() => setRoleType('Admin')} style={{ display: 'none' }} />
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid', borderColor: roleType === 'Admin' ? 'var(--accent-primary)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {roleType === 'Admin' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }} />}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Child Admin (Full Access)</h4>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Can manage all classes & settings</p>
                    </div>
                  </label>
                  
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '1rem', border: roleType === 'Teacher' ? '2px solid var(--accent-primary)' : '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', flex: 1, backgroundColor: roleType === 'Teacher' ? 'rgba(79,70,229,0.05)' : 'transparent' }}>
                    <input type="radio" name="role" value="Teacher" checked={roleType === 'Teacher'} onChange={() => setRoleType('Teacher')} style={{ display: 'none' }} />
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid', borderColor: roleType === 'Teacher' ? 'var(--accent-primary)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {roleType === 'Teacher' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }} />}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Teacher (Restricted)</h4>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Manage only assigned class</p>
                    </div>
                  </label>
                </div>
              </div>

              {roleType === 'Teacher' && (
                <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
                  <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={18} color="var(--success)" /> Assign Class to Teacher</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                      <label className="input-label">Select Class</label>
                      <CustomSelect
                        options={[{ value: '9', label: 'Class 9' }, { value: '10', label: 'Class 10' }]}
                        value={assignedClass}
                        onChange={setAssignedClass}
                      />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                      <label className="input-label">Select Section</label>
                      <CustomSelect
                        options={[{ value: 'A', label: 'Section A' }, { value: 'B', label: 'Section B' }]}
                        value={assignedSection}
                        onChange={setAssignedSection}
                      />
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1rem', fontStyle: 'italic' }}>
                    * This teacher will only be able to view, mark attendance, and manage marks for students in the selected class and section.
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Staff Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffRoles;
