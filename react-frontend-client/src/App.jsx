import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import './App.css';
import LoginPage from './components/auth/LoginComponent';
import ProtectedLayout from './components/auth/ProtectedLayout.jsx';
import ProfilePage from './components/auth/ProfilePage.jsx';
import AddStudySetComponent from './components/AddStudySetComponent';
import StudySetDetailsComponent from './components/StudySetDetailsComponent';
import StudySetListComponent from './components/StudySetListComponent';

import { useAuth } from './components/auth/AuthContext.jsx';
import WeatherService from './WeatherService.jsx';

function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="nav-btn">Home</Link>

          {user && (
            <Link to="/profile" className="nav-btn">Profile</Link>
          )}
        </div>

        <div className="nav-right">
          {user ? (
            <button className="nav-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-btn">Login</Link>
          )}
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<StudySetListComponent />} />
            <Route path="/study-sets" element={<StudySetListComponent />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/study-sets/:id" element={<StudySetDetailsComponent />} />
            <Route path="/add-study-set" element={<AddStudySetComponent />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;