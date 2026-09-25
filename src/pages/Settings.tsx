import { useState } from 'react';
import { Building, BookOpen, Layers, Settings as SettingsIcon, Plus, Trash2, Save, X } from 'lucide-react';

interface SchoolClass {
  id: string;
  name: string;
  sections: string[];
}

interface Subject {
  id: string;
  name: string;
  code: string;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'classes' | 'subjects' | 'system'>('classes');

  // Dialog State for custom Modals
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    type: 'prompt' | 'confirm';
    title: string;
    placeholder?: string;
    inputValue?: string;
    onConfirm: (val?: string) => void;
  }>({
    isOpen: false,
    type: 'prompt',
    title: '',
    inputValue: '',
    onConfirm: () => {}
  });

  const closeDialog = () => setDialog(prev => ({ ...prev, isOpen: false, inputValue: '' }));

  // MOCK DATA
  const [classes, setClasses] = useState<SchoolClass[]>([
    { id: '1', name: 'Class 9', sections: ['A', 'B'] },
    { id: '2', name: 'Class 10', sections: ['A', 'B', 'C'] },
    { id: '3', name: 'Class 11', sections: ['Science', 'Commerce'] },
  ]);

  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Mathematics', code: 'MAT' },
    { id: '2', name: 'Science', code: 'SCI' },
    { id: '3', name: 'English', code: 'ENG' },
    { id: '4', name: 'History', code: 'HIS' },
  ]);

  // --- Handlers for Classes ---
  const handleAddClass = () => {
    setDialog({
      isOpen: true,
      type: 'prompt',
      title: 'Enter new class name',
      placeholder: 'e.g. Class 12',
      inputValue: '',
      onConfirm: (newClass) => {
        if (newClass) {
          setClasses([...classes, { id: Math.random().toString(), name: newClass, sections: ['A'] }]);
        }
      }
    });
  };

  const handleDeleteClass = (id: string) => {
    setDialog({
      isOpen: true,
      type: 'confirm',
      title: 'Delete Class?',
      onConfirm: () => {
        setClasses(classes.filter(c => c.id !== id));
      }
    });
  };

  const handleAddSection = (classId: string) => {
    setDialog({
      isOpen: true,
      type: 'prompt',
      title: 'Enter new section name',
      placeholder: 'e.g. D',
      inputValue: '',
      onConfirm: (newSection) => {
        if (newSection) {
          setClasses(classes.map(c => c.id === classId ? { ...c, sections: [...c.sections, newSection] } : c));
        }
      }
    });
  };

  const handleDeleteSection = (classId: string, sectionToRemove: string) => {
    setClasses(classes.map(c => c.id === classId ? { ...c, sections: c.sections.filter(s => s !== sectionToRemove) } : c));
  };

  // --- Handlers for Subjects ---
  const handleAddSubject = () => {
    // For subject, we need two inputs. Let's just prompt for name and generate code for now, or use a custom form.
    // To keep it simple in the generic prompt, we'll prompt for Name, then Code.
    setDialog({
      isOpen: true,
      type: 'prompt',
      title: 'Enter subject name',
      placeholder: 'e.g. Geography',
      inputValue: '',
      onConfirm: (name) => {
        if (name) {
          setTimeout(() => {
            setDialog({
              isOpen: true,
              type: 'prompt',
              title: 'Enter subject code',
              placeholder: 'e.g. GEO',
              inputValue: '',
              onConfirm: (code) => {
                if (code) {
                  setSubjects([...subjects, { id: Math.random().toString(), name, code: code.toUpperCase() }]);
                }
              }
            });
          }, 300); // slight delay for smooth transition
        }
      }
    });
  };

  const handleDeleteSubject = (id: string) => {
    setDialog({
      isOpen: true,
      type: 'confirm',
      title: 'Delete Subject?',
      onConfirm: () => {
        setSubjects(subjects.filter(s => s.id !== id));
      }
    });
  };

  const handleSave = () => {
    setDialog({
      isOpen: true,
      type: 'confirm',
      title: 'Settings saved successfully!',
      onConfirm: () => {}
    });
  };

  return (
    <div className="settings-module">
      <header className="page-header" style={{ marginBottom: '2rem' }}>
        <h1>System Settings</h1>
        <p className="text-secondary">Manage your school's master configuration.</p>
      </header>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }} className="hide-scroll">
        <button 
          onClick={() => setActiveTab('profile')} 
          className="btn" 
          style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-full)', backgroundColor: activeTab === 'profile' ? 'var(--accent-primary)' : 'var(--bg-secondary)', color: activeTab === 'profile' ? '#fff' : 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}
        >
          <Building size={18} /> School Profile
        </button>
        <button 
          onClick={() => setActiveTab('classes')} 
          className="btn" 
          style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-full)', backgroundColor: activeTab === 'classes' ? 'var(--accent-primary)' : 'var(--bg-secondary)', color: activeTab === 'classes' ? '#fff' : 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}
        >
          <Layers size={18} /> Classes & Sections
        </button>
        <button 
          onClick={() => setActiveTab('subjects')} 
          className="btn" 
          style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-full)', backgroundColor: activeTab === 'subjects' ? 'var(--accent-primary)' : 'var(--bg-secondary)', color: activeTab === 'subjects' ? '#fff' : 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}
        >
          <BookOpen size={18} /> Subjects
        </button>
        <button 
          onClick={() => setActiveTab('system')} 
          className="btn" 
          style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-full)', backgroundColor: activeTab === 'system' ? 'var(--accent-primary)' : 'var(--bg-secondary)', color: activeTab === 'system' ? '#fff' : 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}
        >
          <SettingsIcon size={18} /> Preferences
        </button>
      </div>

      {/* CONTENT: CLASSES & SECTIONS */}
      {activeTab === 'classes' && (
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>Manage Classes</h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Define all classes and their respective sections.</p>
            </div>
            <button className="btn btn-primary" onClick={handleAddClass} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={18} /> Add New Class
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {classes.map((cls) => (
              <div key={cls.id} style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{cls.name}</h3>
                  <button onClick={() => handleDeleteClass(cls.id)} className="btn" style={{ padding: '0.5rem', color: 'var(--danger)', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: 'var(--radius-md)' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>SECTIONS</p>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {cls.sections.map((sec, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#fff', border: '1px solid var(--border-light)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-sm)' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{sec}</span>
                        <button onClick={() => handleDeleteSection(cls.id, sec)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => handleAddSection(cls.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'transparent', border: '1px dashed var(--accent-primary)', color: 'var(--accent-primary)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}>
                      <Plus size={16} /> Add Section
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT: SUBJECTS */}
      {activeTab === 'subjects' && (
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>Manage Subjects</h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>List of all subjects taught in the school.</p>
            </div>
            <button className="btn btn-primary" onClick={handleAddSubject} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={18} /> Add Subject
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {subjects.map((sub) => (
              <div key={sub.id} style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{sub.name}</h4>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', backgroundColor: 'var(--social-bg)', padding: '0.1rem 0.5rem', borderRadius: 'var(--radius-sm)', display: 'inline-block' }}>{sub.code}</p>
                </div>
                <button onClick={() => handleDeleteSubject(sub.id)} className="btn" style={{ padding: '0.5rem', color: 'var(--danger)', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: 'var(--radius-md)' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT: PROFILE (Placeholder) */}
      {activeTab === 'profile' && (
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', color: 'var(--text-primary)' }}>School Profile</h2>
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="input-group">
              <label className="input-label">School Name</label>
              <input type="text" className="input-field" defaultValue="Shreyas" />
            </div>
            <div className="input-group">
              <label className="input-label">Registration No.</label>
              <input type="text" className="input-field" defaultValue="DPS-100293" />
            </div>
            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label className="input-label">Address</label>
              <input type="text" className="input-field" defaultValue="Sector 14, Dwarka, New Delhi" />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Save size={18} /> Save Changes</button>
          </div>
        </div>
      )}

      {/* CONTENT: SYSTEM (Placeholder) */}
      {activeTab === 'system' && (
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', color: 'var(--text-primary)' }}>System Preferences</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem' }}>Passing Percentage</h4>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Minimum percentage required to pass a test.</p>
              </div>
              <input type="number" className="input-field" defaultValue="35" style={{ width: '80px', textAlign: 'center' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem' }}>WhatsApp Notifications</h4>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Send automated alerts to parents.</p>
              </div>
              <div style={{ width: '44px', height: '24px', backgroundColor: 'var(--success)', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Save size={18} /> Save Preferences</button>
          </div>
        </div>
      )}

      {/* CUSTOM DIALOG MODAL */}
      {dialog.isOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }} onClick={closeDialog}>
          <div className="card" style={{ width: '100%', maxWidth: '400px', animation: 'slideUp 0.3s ease', padding: '1.5rem' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem' }}>{dialog.title}</h3>
              <button onClick={closeDialog} className="btn" style={{ padding: '0.5rem' }}><X size={20} /></button>
            </div>
            
            {dialog.type === 'prompt' && (
              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder={dialog.placeholder}
                  value={dialog.inputValue}
                  onChange={(e) => setDialog(prev => ({ ...prev, inputValue: e.target.value }))}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      dialog.onConfirm(dialog.inputValue);
                      closeDialog();
                    }
                  }}
                />
              </div>
            )}

            {dialog.type === 'confirm' && (
              <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)' }}>Are you sure you want to proceed with this action?</p>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button className="btn" onClick={closeDialog} style={{ backgroundColor: 'var(--bg-secondary)' }}>Cancel</button>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  dialog.onConfirm(dialog.inputValue);
                  closeDialog();
                }}
              >
                {dialog.type === 'prompt' ? 'Save' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
