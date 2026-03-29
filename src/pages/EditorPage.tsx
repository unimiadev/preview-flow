import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Save, ArrowLeft, Check } from 'lucide-react';
import logoSmall from '../assets/preview-flow-small-logo.png';
import { useProjects } from '../context/ProjectContext';
import { useLanguage } from '../context/LanguageContext';
import ImageUpload from '../components/ImageUpload';
import CaptionEditor from '../components/CaptionEditor';
import PlatformSelector from '../components/PlatformSelector';
import BrandSelector from '../components/BrandSelector';
import TwitterPremiumToggle from '../components/TwitterPremiumToggle';
import ProfileMenu from '../components/ProfileMenu';
import LanguageSelector from '../components/LanguageSelector';
import MockupContainer from '../components/mockups/MockupContainer';
import type { Platform, BrandProfile } from '../types';
import { defaultBrandProfile } from '../types';
import './EditorPage.css';

export default function EditorPage() {
  const { projectId } = useParams<{ projectId?: string }>();
  const navigate = useNavigate();
  const { getProject, addProject, updateProject } = useProjects();

  const existing = projectId ? getProject(projectId) : undefined;

  const [caption, setCaption] = useState(existing?.caption ?? '');
  const [imageUrl, setImageUrl] = useState<string | null>(existing?.imageUrl ?? null);
  const [platform, setPlatform] = useState<Platform>(existing?.platform ?? 'instagram');
  const [brandProfile, setBrandProfile] = useState<BrandProfile>(existing?.brandProfile ?? defaultBrandProfile);
  const [twitterPremium, setTwitterPremium] = useState(existing?.twitterPremium ?? false);
  const [saved, setSaved] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (existing) {
      setCaption(existing.caption);
      setImageUrl(existing.imageUrl);
      setPlatform(existing.platform);
      setBrandProfile(existing.brandProfile ?? defaultBrandProfile);
      setTwitterPremium(existing.twitterPremium ?? false);
    }
  }, [existing]);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleImageRemove = useCallback(() => {
    setImageUrl(null);
  }, []);

  const handleSave = () => {
    if (projectId && existing) {
      updateProject(projectId, { caption, imageUrl, platform, brandProfile, twitterPremium });
    } else {
      const project = addProject({
        title: caption.slice(0, 50) || t('common.untitled'),
        caption,
        imageUrl,
        platform,
        brandProfile,
        twitterPremium,
      });
      navigate(`/editor/${project.id}`, { replace: true });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="editor page-enter">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/dashboard" className="btn btn-ghost btn-icon" title={t('nav.back_dashboard')}>
            <ArrowLeft size={18} />
          </Link>
          <Link to="/" className="navbar-brand">
            <img src={logoSmall} alt="PreviewFlow" className="navbar-logo-small" />
          </Link>
        </div>
        <div className="navbar-center">
          <PlatformSelector value={platform} onChange={setPlatform} />
        </div>
        <div className="navbar-actions">
          <LanguageSelector />
          <button className="btn btn-primary" onClick={handleSave}>
            {saved ? <Check size={16} /> : <Save size={16} />}
            {saved ? t('nav.saved') : t('nav.save_project')}
          </button>
          <ProfileMenu />
        </div>
      </nav>

      {/* Editor Layout */}
      <div className="editor-layout">
        {/* Input Panel */}
        <aside className="editor-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-label">{t('editor.sidebar.brand')}</h3>
            <BrandSelector
              profile={brandProfile}
              onChange={setBrandProfile}
            />
          </div>
          <div className="sidebar-section">
            <h3 className="sidebar-label">{t('editor.sidebar.image')}</h3>
            <ImageUpload
              imageUrl={imageUrl}
              onUpload={handleImageUpload}
              onRemove={handleImageRemove}
            />
          </div>
          <div className="sidebar-section">
            <h3 className="sidebar-label">{t('editor.sidebar.caption')}</h3>
            {platform === 'twitter' && (
              <TwitterPremiumToggle
                value={twitterPremium}
                onChange={setTwitterPremium}
              />
            )}
            <CaptionEditor
              value={caption}
              onChange={setCaption}
              platform={platform}
              twitterPremium={twitterPremium}
            />
          </div>
        </aside>

        {/* Preview Panel */}
        <main className="editor-preview">
          <div className="preview-wrapper">
            <MockupContainer
              platform={platform}
              imageUrl={imageUrl}
              caption={caption}
              brandProfile={brandProfile}
              twitterPremium={twitterPremium}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
