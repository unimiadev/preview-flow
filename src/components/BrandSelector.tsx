import { useState, useRef } from 'react';
import { User, ChevronDown, Plus, Upload, X } from 'lucide-react';
import { useBrands } from '../context/BrandContext';
import { useLanguage } from '../context/LanguageContext';
import type { BrandProfile } from '../types';
import './BrandSelector.css';

interface BrandSelectorProps {
  profile: BrandProfile;
  onChange: (profile: BrandProfile) => void;
}

export default function BrandSelector({ profile, onChange }: BrandSelectorProps) {
  const { brands, addBrand, brandToProfile } = useBrands();
  const { t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showInlineCreate, setShowInlineCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newHeadline, setNewHeadline] = useState('');
  const [newAvatarUrl, setNewAvatarUrl] = useState<string | null>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  const handleSelectBrand = (brandId: string) => {
    const brand = brands.find(b => b.id === brandId);
    if (brand) {
      onChange(brandToProfile(brand));
    }
    setDropdownOpen(false);
  };

  const handleAvatarUpload = (file: File) => {
    if (file.size > 2 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = (e) => setNewAvatarUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleCreateBrand = async () => {
    if (!newName.trim()) return;
    const brand = await addBrand({
      name: newName,
      username: newUsername,
      headline: newHeadline,
      avatarUrl: newAvatarUrl,
    });
    if (brand) {
      onChange(brandToProfile(brand));
    }
    setNewName('');
    setNewUsername('');
    setNewHeadline('');
    setNewAvatarUrl(null);
    setShowInlineCreate(false);
    setDropdownOpen(false);
  };

  const handleManualChange = (field: keyof BrandProfile, value: string | null) => {
    onChange({ ...profile, [field]: value });
  };

  return (
    <div className="brand-selector">
      {/* Currently selected brand display */}
      <div className="brand-current" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <div className="brand-current-avatar">
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="" />
          ) : (
            <User size={16} />
          )}
        </div>
        <div className="brand-current-info">
          <span className="brand-current-name">{profile.displayName || t('editor.brand.selector_placeholder')}</span>
          {profile.username && <span className="brand-current-username">@{profile.username}</span>}
        </div>
        <ChevronDown size={14} className={`brand-chevron ${dropdownOpen ? 'open' : ''}`} />
      </div>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="brand-dropdown">
          {brands.length > 0 && (
            <>
              <div className="brand-dropdown-label">{t('profile.brands.title')}</div>
              {brands.map(brand => (
                <button
                  key={brand.id}
                  className="brand-dropdown-item"
                  onClick={() => handleSelectBrand(brand.id)}
                >
                  <div className="brand-dropdown-avatar">
                    {brand.avatarUrl ? <img src={brand.avatarUrl} alt="" /> : <User size={14} />}
                  </div>
                  <div className="brand-dropdown-info">
                    <span className="brand-dropdown-name">{brand.name}</span>
                    {brand.username && <span className="brand-dropdown-user">@{brand.username}</span>}
                  </div>
                </button>
              ))}
              <div className="brand-dropdown-divider" />
            </>
          )}

          <button className="brand-dropdown-item create-btn" onClick={() => { setShowInlineCreate(true); setDropdownOpen(false); }}>
            <Plus size={14} />
            <span>{t('profile.brands.create_new')}</span>
          </button>
        </div>
      )}

      {/* Inline brand creation */}
      {showInlineCreate && (
        <div className="brand-inline-create">
          <div className="brand-inline-header">
            <h4>{t('profile.brands.new')}</h4>
            <button className="brand-inline-close" onClick={() => setShowInlineCreate(false)}>
              <X size={14} />
            </button>
          </div>
          <div className="brand-inline-row">
            <div className="brand-inline-avatar" onClick={() => avatarRef.current?.click()}>
              {newAvatarUrl ? <img src={newAvatarUrl} alt="" /> : <Upload size={14} />}
            </div>
            <input
              ref={avatarRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleAvatarUpload(f); e.target.value = ''; }}
              hidden
            />
            <input
              type="text"
              className="brand-inline-input"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={t('profile.brands.name_placeholder')}
            />
          </div>
          <div className="brand-inline-username-row">
            <span className="brand-inline-at">@</span>
            <input
              type="text"
              className="brand-inline-input brand-inline-username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value.replace(/\s/g, ''))}
              placeholder={t('profile.brands.username_placeholder')}
            />
          </div>
          <input
            type="text"
            className="brand-inline-input"
            value={newHeadline}
            onChange={(e) => setNewHeadline(e.target.value)}
            placeholder={t('profile.brands.headline_placeholder')}
          />
          <div className="brand-inline-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => setShowInlineCreate(false)}>{t('common.cancel')}</button>
            <button className="btn btn-primary btn-sm" onClick={handleCreateBrand} disabled={!newName.trim()}>{t('editor.brand.create_apply')}</button>
          </div>
        </div>
      )}

      {/* Manual override fields — always visible when not creating */}
      {!showInlineCreate && (
        <div className="brand-manual-fields">
          <div className="brand-manual-row">
            <input
              type="text"
              className="brand-manual-input"
              value={profile.displayName}
              onChange={(e) => handleManualChange('displayName', e.target.value)}
              placeholder={t('editor.brand.display_name_placeholder')}
            />
            <div className="brand-manual-username">
              <span className="brand-manual-at">@</span>
              <input
                type="text"
                className="brand-manual-input brand-manual-uname"
                value={profile.username}
                onChange={(e) => handleManualChange('username', e.target.value.replace(/\s/g, ''))}
                placeholder={t('profile.brands.username_placeholder')}
              />
            </div>
          </div>
          <input
            type="text"
            className="brand-manual-input"
            value={profile.headline}
            onChange={(e) => handleManualChange('headline', e.target.value)}
            placeholder={t('editor.brand.headline_tagline_placeholder')}
          />
        </div>
      )}
    </div>
  );
}
