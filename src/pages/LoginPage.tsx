import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import logoFull from '../assets/preview-flow-logo.png';
import './LoginPage.css';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, isConfigured } = useAuth();
  const { t } = useLanguage();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isConfigured) {
    return (
      <div className="login-page config-error page-enter">
        <nav className="navbar">
          <Link to="/" className="navbar-brand">
            <img src={logoFull} alt="PreviewFlow" className="navbar-logo" />
          </Link>
        </nav>
        <div className="login-container">
          <div className="login-card premium-card">
            <div className="login-header">
              <h1>{t('login.error.unconfigured')}</h1>
              <p>{t('login.error.unconfigured_desc')}</p>
            </div>
            <Link to="/dashboard" className="btn btn-primary btn-lg full-width-btn">
              {t('login.error.local_mode')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await signUp(email, password);
        if (error) {
          setError(error);
        } else {
          // If no error, we assume the user is automatically logged in since confirm email is disabled
          navigate('/dashboard');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error);
        } else {
          navigate('/dashboard');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    const { error } = await signInWithGoogle();
    // Remember: signInWithOAuth redirect often refreshes the page in browser.
    if (error) {
      setError(error);
    }
  };

  return (
    <div className="login-page modern-login page-enter">
      {/* Decorative Blur Backgrounds */}
      <div className="blur-blob shape-1"></div>
      <div className="blur-blob shape-2"></div>
      <div className="blur-blob shape-3"></div>

      <nav className="navbar login-nav">
        <Link to="/" className="navbar-brand shadow-logo">
          <img src={logoFull} alt="PreviewFlow" className="navbar-logo" />
        </Link>
      </nav>

      <div className="login-container">
        <div className="login-card premium-card glass-panel">
          <div className="login-header center-text">
            <h2>{mode === 'login' ? t('login.login.title') : t('login.signup.title')}</h2>
            <p className="subtitle">{mode === 'login' ? t('login.login.subtitle') : t('login.signup.subtitle')}</p>
          </div>

          {error && <div className="login-error animated-error">{error}</div>}

          <div className="oauth-container">
            <button onClick={handleGoogleLogin} className="btn-oauth modern-oauth-btn">
              <GoogleIcon />
              <span>{t('login.google')}</span>
            </button>
          </div>

          <div className="divider">
            <span>{mode === 'login' ? t('login.or_login') : t('login.or_signup')}</span>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="modern-input-group">
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  placeholder={t('login.email_placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="modern-input"
                />
              </div>
            </div>

            <div className="modern-input-group">
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  placeholder={t('login.password_placeholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  className="modern-input"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg login-submit premium-btn" disabled={loading}>
              {loading ? (
                <div className="spinner"></div>
              ) : mode === 'login' ? (
                <><LogIn size={18} /> {t('login.signin_button')}</>
              ) : (
                <><UserPlus size={18} /> {t('login.signup_button')}</>
              )}
            </button>
          </form>

          <div className="login-toggle toggle-footer">
            {mode === 'login' ? (
              <p>{t('login.no_account')} <button className="text-link" onClick={() => { setMode('signup'); setError(null); }}>{t('login.switch_signup')}</button></p>
            ) : (
              <p>{t('login.has_account')} <button className="text-link" onClick={() => { setMode('login'); setError(null); }}>{t('login.switch_login')}</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
