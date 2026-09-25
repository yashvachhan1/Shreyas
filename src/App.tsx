import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';

import StudentList from './pages/StudentList';
import StudentProfile from './pages/StudentProfile';
import StaffRoles from './pages/StaffRoles';
import Attendance from './pages/Attendance';
import TestsMarks from './pages/TestsMarks';
import Settings from './pages/Settings';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/student/:id" element={<StudentProfile />} />
            <Route path="/staff" element={<StaffRoles />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/tests" element={<TestsMarks />} />
            {/* Placeholder routes */}
            <Route path="/whatsapp" element={<div><h2>WhatsApp Configuration (Coming Soon)</h2></div>} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
