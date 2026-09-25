import { useState, useRef } from 'react';
import { UserPlus, UploadCloud, Save, FileSpreadsheet, Download, CheckCircle, Image as ImageIcon } from 'lucide-react';
import Papa from 'papaparse';

interface StudentData {
  firstName: string;
  lastName: string;
  grNumber: string;
  class: string;
  section: string;
  rollNo: string;
  parentName: string;
  whatsappNumber: string;
  imageFilename?: string;
}

const AddStudent = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
  
  // Single Student State
  const [formData, setFormData] = useState<StudentData>({
    firstName: '',
    lastName: '',
    grNumber: '',
    class: '',
    section: '',
    rollNo: '',
    parentName: '',
    whatsappNumber: '',
  });

  // Bulk Upload State
  const [parsedStudents, setParsedStudents] = useState<StudentData[]>([]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Single Student Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Single Student Data:', formData);
    alert('Student added successfully!');
  };

  // Bulk Student Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log('Parsed Results:', results.data);
          // Assuming the CSV matches our headers
          setParsedStudents(results.data as StudentData[]);
        },
        error: (error) => {
          alert('Error parsing CSV file: ' + error.message);
        }
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedImages((prev) => [...prev, ...filesArray]);
    }
  };

  const downloadSampleCSV = () => {
    const headers = ['firstName', 'lastName', 'grNumber', 'class', 'section', 'rollNo', 'parentName', 'whatsappNumber', 'imageFilename'];
    const csv = Papa.unparse({
      fields: headers,
      data: [
        ['Rahul', 'Sharma', 'GR-101', '10', 'A', '45', 'Ramesh Sharma', '9876543210', 'rahul_101.jpg'],
        ['Priya', 'Singh', 'GR-102', '9', 'B', '12', 'Rajesh Singh', '9123456780', 'priya_102.png'],
      ]
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'student_sample.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedStudents.length === 0) {
      alert('Please upload a valid CSV file first.');
      return;
    }
    console.log('Final Bulk Data to Save:', { students: parsedStudents, images: uploadedImages });
    alert(`Successfully imported ${parsedStudents.length} students and ${uploadedImages.length} images!`);
    
    // Reset state
    setParsedStudents([]);
    setUploadedImages([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  return (
    <div className="add-student">
      <header className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <UserPlus size={28} color="var(--accent-primary)" />
          Add Students
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Onboard new students individually or import them in bulk.</p>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
        <button 
          onClick={() => setActiveTab('single')}
          style={{
            padding: '0.5rem 1rem', 
            fontWeight: 600, 
            color: activeTab === 'single' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'single' ? '2px solid var(--accent-primary)' : '2px solid transparent',
            marginBottom: '-0.5rem'
          }}
        >
          Single Student
        </button>
        <button 
          onClick={() => setActiveTab('bulk')}
          style={{
            padding: '0.5rem 1rem', 
            fontWeight: 600, 
            color: activeTab === 'bulk' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'bulk' ? '2px solid var(--accent-primary)' : '2px solid transparent',
            marginBottom: '-0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FileSpreadsheet size={18} /> Bulk Import
        </button>
      </div>

      <div className="card" style={{ maxWidth: activeTab === 'bulk' && parsedStudents.length > 0 ? '100%' : '800px' }}>
        {activeTab === 'single' ? (
          <form onSubmit={handleSingleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Single Photo Upload Section */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--border-light)' }}>
                <UserPlus size={32} color="var(--text-secondary)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Student Photo</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>PNG, JPG up to 5MB</p>
                <button type="button" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                  <UploadCloud size={16} /> Upload Image
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="input-group">
                <label className="input-label">First Name</label>
                <input type="text" name="firstName" className="input-field" placeholder="John" onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label className="input-label">Last Name</label>
                <input type="text" name="lastName" className="input-field" placeholder="Doe" onChange={handleChange} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="input-group">
                <label className="input-label">GR Number (Admission No.)</label>
                <input type="text" name="grNumber" className="input-field" placeholder="e.g. GR-2023-001" onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label className="input-label">Roll Number</label>
                <input type="text" name="rollNo" className="input-field" placeholder="e.g. 45" onChange={handleChange} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="input-group">
                <label className="input-label">Class</label>
                <select name="class" className="input-field" onChange={handleChange} required>
                  <option value="">Select Class</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Section</label>
                <select name="section" className="input-field" onChange={handleChange} required>
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="input-group">
                <label className="input-label">Parent's Name</label>
                <input type="text" name="parentName" className="input-field" placeholder="Mr. / Mrs. Doe" onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label className="input-label">WhatsApp Number</label>
                <input type="tel" name="whatsappNumber" className="input-field" placeholder="+91 9876543210" onChange={handleChange} required />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary">Cancel</button>
              <button type="submit" className="btn btn-primary">
                <Save size={18} /> Save Student
              </button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-primary)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Download Sample Template</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Use this CSV format to fill student data accurately.</p>
              </div>
              <button type="button" onClick={downloadSampleCSV} className="btn btn-secondary" style={{ backgroundColor: 'white' }}>
                <Download size={18} /> Download CSV
              </button>
            </div>

            <form onSubmit={handleBulkSubmit}>
              {parsedStudents.length === 0 ? (
                <div 
                  style={{ 
                    border: '2px dashed var(--border-light)', 
                    borderRadius: 'var(--radius-lg)', 
                    padding: '3rem 2rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'var(--bg-primary)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border-light)')}
                >
                  <FileSpreadsheet size={48} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Upload CSV File</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Click below to browse your student data CSV.</p>
                  <input type="file" id="bulk-upload" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} ref={fileInputRef} />
                  <label htmlFor="bulk-upload" className="btn btn-primary" style={{ cursor: 'pointer' }}>
                    Browse CSV
                  </label>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontWeight: 600 }}>
                    <CheckCircle size={20} />
                    Successfully parsed {parsedStudents.length} students from CSV.
                  </div>

                  {/* Bulk Images Upload Section */}
                  <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Upload Student Photos (Optional)</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      To automatically link photos, name each image exactly as the student's <strong>GR Number</strong> (e.g., <code>GR-101.jpg</code>). Select multiple files at once.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <input type="file" id="bulk-images" accept="image/*" multiple onChange={handleImageUpload} style={{ display: 'none' }} ref={imageInputRef} />
                      <label htmlFor="bulk-images" className="btn btn-secondary" style={{ cursor: 'pointer', backgroundColor: 'white' }}>
                        <ImageIcon size={18} /> Select Photos
                      </label>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {uploadedImages.length > 0 ? `${uploadedImages.length} images selected` : 'No images selected'}
                      </span>
                    </div>
                  </div>

                  {/* Preview Table */}
                  <div style={{ overflowX: 'auto', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                      <thead style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-light)' }}>
                        <tr>
                          <th style={{ padding: '0.75rem 1rem' }}>GR No.</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Name</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Class/Sec</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Roll No.</th>
                          <th style={{ padding: '0.75rem 1rem' }}>WhatsApp</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Image File</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parsedStudents.slice(0, 5).map((student, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                            <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{student.grNumber}</td>
                            <td style={{ padding: '0.75rem 1rem' }}>{student.firstName} {student.lastName}</td>
                            <td style={{ padding: '0.75rem 1rem' }}>{student.class} - {student.section}</td>
                            <td style={{ padding: '0.75rem 1rem' }}>{student.rollNo}</td>
                            <td style={{ padding: '0.75rem 1rem' }}>{student.whatsappNumber}</td>
                            <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{student.imageFilename || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {parsedStudents.length > 5 && (
                      <div style={{ padding: '0.75rem 1rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem', backgroundColor: 'var(--bg-primary)' }}>
                        And {parsedStudents.length - 5} more students...
                      </div>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setParsedStudents([])}>Cancel</button>
                    <button type="submit" className="btn btn-primary">
                      Import Students & Images
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStudent;
