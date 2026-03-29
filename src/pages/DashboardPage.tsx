import { Link } from 'react-router-dom';
import { Plus, Eye, Trash2, Calendar } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ProfileMenu from '../components/ProfileMenu';
import LanguageSelector from '../components/LanguageSelector';
import logoFull from '../assets/preview-flow-logo.png';
import './DashboardPage.css';

const platformColors: Record<string, string> = {
  instagram: '#E1306C',
  linkedin: '#0A66C2',
  twitter: '#1DA1F2',
};

export default function DashboardPage() {
  const { projects, deleteProject } = useProjects();
  const { user, isConfigured } = useAuth();
  const { t } = useLanguage();

  const platformLabels: Record<string, string> = {
    instagram: t('common.platforms.instagram'),
    linkedin: t('common.platforms.linkedin'),
    twitter: t('common.platforms.twitter'),
  };

  return (
    <div className="dashboard page-enter">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <img src={logoFull} alt="PreviewFlow" className="navbar-logo" />
        </Link>
        <div className="navbar-actions">
          <Link to="/editor" className="btn btn-primary">
            <Plus size={16} /> {t('nav.new_preview')}
          </Link>
          <LanguageSelector />
          {isConfigured && user && <ProfileMenu />}
        </div>
      </nav>

      <div className="page-container">
        <div className="dashboard-header">
          <h1>{t('dashboard.header.title')}</h1>
          <p className="dashboard-subtitle">{t('dashboard.header.subtitle')}</p>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Eye size={48} />
            </div>
            <h2>{t('dashboard.empty.title')}</h2>
            <p>{t('dashboard.empty.subtitle')}</p>
            <Link to="/editor" className="btn btn-primary btn-lg">
              <Plus size={18} /> {t('dashboard.empty.cta')}
            </Link>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <Link to={`/editor/${project.id}`} className="project-card-link">
                  <div className="project-thumbnail">
                    {project.imageUrl ? (
                      <div className="project-image-wrapper">
                        <img src={project.imageUrl} alt={project.title} />
                      </div>
                    ) : (
                      <div className="project-thumbnail-placeholder">
                        <Eye size={32} />
                      </div>
                    )}
                    <span
                      className="platform-badge"
                      style={{ background: platformColors[project.platform] }}
                    >
                      {platformLabels[project.platform]}
                    </span>
                  </div>
                  <div className="project-info">
                    <div className="project-title-row">
                      <h3>{project.title || t('common.untitled')}</h3>
                    </div>
                    <div className="project-meta">
                      <Calendar size={12} />
                      <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
                <button
                  className="project-delete btn btn-ghost btn-icon"
                  title={t('common.delete')}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (confirm(t('common.confirm_delete'))) {
                      deleteProject(project.id);
                    }
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
