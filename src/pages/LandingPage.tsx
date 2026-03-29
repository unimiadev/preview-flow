import { Link, Navigate } from 'react-router-dom';
import { Eye, Layers, Zap, ArrowRight, Plus, type LucideIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageSelector from '../components/LanguageSelector';
import ProfileMenu from '../components/ProfileMenu';
import { InstagramIcon, LinkedInIcon, XTwitterIcon } from '../components/PlatformIcons';
import logoFull from '../assets/preview-flow-logo.png';
import './LandingPage.css';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <Icon size={24} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function getFeatures(t: (k: string) => string): FeatureCardProps[] {
  return [
    {
      icon: Eye,
      title: t('landing.features.1.title'),
      description: t('landing.features.1.desc'),
    },
    {
      icon: Layers,
      title: t('landing.features.2.title'),
      description: t('landing.features.2.desc'),
    },
    {
      icon: Zap,
      title: t('landing.features.3.title'),
      description: t('landing.features.3.desc'),
    },
  ];
}

const platforms = [
  { icon: InstagramIcon, name: 'Instagram', color: '#E1306C' },
  { icon: LinkedInIcon, name: 'LinkedIn', color: '#0A66C2' },
  { icon: XTwitterIcon, name: 'X / Twitter', color: '#1DA1F2' },
];

export default function LandingPage() {
  const { t } = useLanguage();
  const { user, isConfigured } = useAuth();
  const features = getFeatures(t);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="landing page-enter">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <img src={logoFull} alt="PreviewFlow" className="navbar-logo" />
        </Link>
        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/editor" className="btn btn-primary">
                <Plus size={16} /> {t('nav.new_preview')}
              </Link>
              <LanguageSelector />
              {isConfigured && <ProfileMenu />}
            </>
          ) : (
            <>
              <LanguageSelector />
              <Link to="/dashboard" className="btn btn-primary">
                {t('nav.get_started')} <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-badge">{t('landing.hero.badge')}</div>
          <h1>
            {t('landing.hero.title1')}
            <span className="gradient-text">{t('landing.hero.title2')}</span>
          </h1>
          <p className="hero-subtitle">
            {t('landing.hero.subtitle')}
          </p>
          <div className="hero-actions">
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              {t('landing.hero.cta')} <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Platform pills */}
        <div className="platform-pills">
          {platforms.map(p => (
            <div key={p.name} className="platform-pill" style={{ '--pill-color': p.color } as React.CSSProperties}>
              <p.icon size={16} />
              {p.name}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2>{t('landing.features.title')}</h2>
        <div className="features-grid">
          {features.map(f => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="cta-section">
        <h2>{t('landing.cta.title')}</h2>
        <p>{t('landing.cta.subtitle')}</p>
        <Link to="/dashboard" className="btn btn-primary btn-lg">
          {t('landing.cta.button')} <ArrowRight size={18} />
        </Link>
      </section>

      <footer className="landing-footer">
        <p>{t('landing.footer')}</p>
      </footer>
    </div>
  );
}
