import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, X, User, Plus, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBrands } from '../context/BrandContext';
import { useLanguage } from '../context/LanguageContext';
import logoFull from '../assets/preview-flow-logo.png';
import type { Brand } from '../types';
import './ProfilePage.css';

interface BrandFormData {
  name: string;
  username: string;
  headline: string;
  avatarUrl: string | null;
}

const emptyBrand: BrandFormData = { name: '', username: '', headline: '', avatarUrl: null };

export default function ProfilePage() {
  const { userProfile, updateProfile } = useAuth();
  const { brands, addBrand, updateBrand, deleteBrand } = useBrands();
  const { t } = useLanguage();

  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [avatarUrl, setAvatarUrl] = useState(userProfile?.avatarUrl || null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [showBrandForm, setShowBrandForm] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState<string | null>(null);
  const [brandForm, setBrandForm] = useState<BrandFormData>(emptyBrand);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const brandAvatarInputRef = useRef<HTMLInputElement>(null);

  // Sync with context once loaded
  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName);
      setAvatarUrl(userProfile.avatarUrl);
    }
  }, [userProfile]);

  const handleProfileSave = async () => {
    setSaving(true);
    await updateProfile({ displayName, avatarUrl });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAvatarUpload = (file: File) => {
    if (file.size > 2 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = (e) => setAvatarUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleBrandAvatarUpload = (file: File) => {
    if (file.size > 2 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = (e) => setBrandForm(prev => ({ ...prev, avatarUrl: e.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const openEditBrand = (brand: Brand) => {
    setEditingBrandId(brand.id);
    setBrandForm({ name: brand.name, username: brand.username, headline: brand.headline, avatarUrl: brand.avatarUrl });
    setShowBrandForm(true);
  };

  const openNewBrand = () => {
    setEditingBrandId(null);
    setBrandForm(emptyBrand);
    setShowBrandForm(true);
  };

  const handleBrandSubmit = async () => {
    if (!brandForm.name.trim()) return;
    if (editingBrandId) {
      await updateBrand(editingBrandId, brandForm);
    } else {
      await addBrand(brandForm);
    }
    setShowBrandForm(false);
    setBrandForm(emptyBrand);
    setEditingBrandId(null);
  };

  const handleDeleteBrand = async (id: string) => {
    if (confirm(t('profile.brands.confirm_delete'))) {
      await deleteBrand(id);
    }
  };

  return (
    <div className="profile-page page-enter">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/dashboard" className="btn btn-ghost btn-icon" title={t('nav.back_dashboard')}>
            <ArrowLeft size={18} />
          </Link>
          <Link to="/" className="navbar-brand">
            <img src={logoFull} alt="PreviewFlow" className="navbar-logo" />
          </Link>
        </div>
        <div className="navbar-actions" />
      </nav>

      <div className="profile-container">
        {/* User Profile Section */}
        <section className="profile-section">
          <h2 className="section-title">{t('profile.settings.title')}</h2>
          <div className="profile-card glass-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar-large" onClick={() => avatarInputRef.current?.click()}>
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="profile-avatar-img" />
                ) : (
                  <User size={32} />
                )}
                <div className="avatar-overlay"><Upload size={16} /></div>
              </div>
              {avatarUrl && (
                <button className="avatar-remove-btn" onClick={() => setAvatarUrl(null)}>
                  <X size={12} /> {t('common.remove')}
                </button>
              )}
              <input
                ref={avatarInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleAvatarUpload(f); e.target.value = ''; }}
                hidden
              />
            </div>
            <div className="profile-fields">
              <label className="field-label">{t('profile.settings.display_name')}</label>
              <input
                type="text"
                className="field-input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={t('profile.settings.display_name_placeholder')}
              />
            </div>
            <button className="btn btn-primary profile-save-btn" onClick={handleProfileSave} disabled={saving}>
              {saving ? t('common.saving') : saved ? t('common.saved_check') : t('profile.settings.save')}
            </button>
          </div>
        </section>

        {/* Brands Section */}
        <section className="profile-section">
          <div className="section-header">
            <h2 className="section-title">{t('profile.brands.title')}</h2>
            <button className="btn btn-primary btn-sm" onClick={openNewBrand}>
              <Plus size={14} /> {t('profile.brands.new')}
            </button>
          </div>

          {showBrandForm && (
            <div className="brand-form glass-card">
              <h3>{editingBrandId ? t('profile.brands.edit') : t('profile.brands.create_new')}</h3>
              <div className="brand-form-row">
                <div className="brand-form-avatar" onClick={() => brandAvatarInputRef.current?.click()}>
                  {brandForm.avatarUrl ? (
                    <img src={brandForm.avatarUrl} alt="" />
                  ) : (
                    <User size={20} />
                  )}
                  <div className="avatar-overlay"><Upload size={10} /></div>
                </div>
                <input
                  ref={brandAvatarInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleBrandAvatarUpload(f); e.target.value = ''; }}
                  hidden
                />
                <div className="brand-form-fields">
                    <input
                      type="text"
                      className="field-input"
                      value={brandForm.name}
                      onChange={(e) => setBrandForm(p => ({ ...p, name: e.target.value }))}
                      placeholder={t('profile.brands.name_placeholder')}
                    />
                  <div className="brand-username-row">
                    <span className="at-sign">@</span>
                      <input
                        type="text"
                        className="field-input username-input"
                        value={brandForm.username}
                        onChange={(e) => setBrandForm(p => ({ ...p, username: e.target.value.replace(/\s/g, '') }))}
                        placeholder={t('profile.brands.username_placeholder')}
                      />
                  </div>
                </div>
              </div>
              <input
                type="text"
                className="field-input full-width"
                value={brandForm.headline}
                onChange={(e) => setBrandForm(p => ({ ...p, headline: e.target.value }))}
                placeholder={t('profile.brands.headline_placeholder')}
              />
              <div className="brand-form-actions">
                <button className="btn btn-ghost" onClick={() => { setShowBrandForm(false); setEditingBrandId(null); }}>{t('common.cancel')}</button>
                <button className="btn btn-primary" onClick={handleBrandSubmit} disabled={!brandForm.name.trim()}>
                  {editingBrandId ? t('profile.brands.update_button') : t('profile.brands.create_button')}
                </button>
              </div>
            </div>
          )}

          {brands.length === 0 && !showBrandForm ? (
            <div className="empty-brands glass-card">
              <p>{t('profile.brands.empty')}</p>
            </div>
          ) : (
            <div className="brands-list">
              {brands.map(brand => (
                <div key={brand.id} className="brand-item glass-card">
                  <div className="brand-item-avatar">
                    {brand.avatarUrl ? (
                      <img src={brand.avatarUrl} alt={brand.name} />
                    ) : (
                      <User size={18} />
                    )}
                  </div>
                  <div className="brand-item-info">
                    <span className="brand-item-name">{brand.name}</span>
                    {brand.username && <span className="brand-item-username">@{brand.username}</span>}
                    {brand.headline && <span className="brand-item-headline">{brand.headline}</span>}
                  </div>
                  <div className="brand-item-actions">
                    <button className="btn btn-ghost btn-icon" onClick={() => openEditBrand(brand)} title={t('common.edit')}>
                      <Pencil size={14} />
                    </button>
                    <button className="btn btn-ghost btn-icon" onClick={() => handleDeleteBrand(brand.id)} title={t('common.delete')}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
