import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, LogOut, ChevronDown, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './ProfileMenu.css';

export default function ProfileMenu() {
  const { user, userProfile, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const displayName = userProfile?.displayName || user.email?.split('@')[0] || 'User';
  const avatarUrl = userProfile?.avatarUrl;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="profile-menu" ref={menuRef}>
      <button
        className="profile-trigger"
        onClick={() => setOpen(!open)}
        aria-label="Profile menu"
      >
        <div className="profile-avatar">
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} className="profile-avatar-img" />
          ) : (
            <User size={16} />
          )}
        </div>
        <span className="profile-name">{displayName}</span>
        <ChevronDown size={14} className={`profile-chevron ${open ? 'rotated' : ''}`} />
      </button>

      {open && (
        <div className="profile-dropdown">
          <div className="profile-dropdown-header">
            <div className="profile-avatar-lg">
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="profile-avatar-img" />
              ) : (
                <User size={20} />
              )}
            </div>
            <div className="profile-dropdown-info">
              <span className="profile-dropdown-name">{displayName}</span>
              <span className="profile-dropdown-email">{user.email}</span>
            </div>
          </div>

          <div className="profile-dropdown-divider" />

          <Link
            to="/profile"
            className="profile-dropdown-item"
            onClick={() => setOpen(false)}
          >
            <Settings size={16} />
            {t('profile_menu.settings')}
          </Link>

          <div className="profile-dropdown-divider" />

          <button className="profile-dropdown-item danger" onClick={handleSignOut}>
            <LogOut size={16} />
            {t('profile_menu.signout')}
          </button>
        </div>
      )}
    </div>
  );
}
