import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { BrandProvider } from './context/BrandContext';
import { LanguageProvider } from './context/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EditorPage from './pages/EditorPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrandProvider>
          <ProjectProvider>
            <BrowserRouter>
              <div className="app">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute><DashboardPage /></ProtectedRoute>
                  } />
                  <Route path="/editor" element={
                    <ProtectedRoute><EditorPage /></ProtectedRoute>
                  } />
                  <Route path="/editor/:projectId" element={
                    <ProtectedRoute><EditorPage /></ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute><ProfilePage /></ProtectedRoute>
                  } />
                </Routes>
              </div>
            </BrowserRouter>
          </ProjectProvider>
        </BrandProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
