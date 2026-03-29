import { useRef } from 'react';
import { Upload, X, User } from 'lucide-react';
import type { BrandProfile } from '../types';
import './BrandEditor.css';

interface BrandEditorProps {
  profile: BrandProfile;
  onChange: (profile: BrandProfile) => void;
}

export default function BrandEditor({ profile, onChange }: BrandEditorProps) {
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const update = (field: keyof BrandProfile, value: string | null) => {
    onChange({ ...profile, [field]: value });
  };

  const handleAvatarUpload = (file: File) => {
    if (file.size > 2 * 1024 * 1024) return;
    if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) return;
    const reader = new FileReader();
    reader.onload = (e) => update('avatarUrl', e.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="brand-editor">
      {/* Avatar */}
      <div className="brand-avatar-row">
        <div
          className="brand-avatar"
          onClick={() => avatarInputRef.current?.click()}
          title="Upload avatar"
        >
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="Brand avatar" />
          ) : (
            <User size={20} />
          )}
          <div className="brand-avatar-overlay">
            <Upload size={12} />
          </div>
        </div>
        {profile.avatarUrl && (
          <button
            className="brand-avatar-remove"
            onClick={() => update('avatarUrl', null)}
            title="Remove avatar"
          >
            <X size={12} />
          </button>
        )}
        <input
          ref={avatarInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleAvatarUpload(file);
            e.target.value = '';
          }}
          hidden
        />
        <div className="brand-avatar-fields">
          <input
            className="brand-input"
            type="text"
            value={profile.displayName}
            onChange={(e) => update('displayName', e.target.value)}
            placeholder="Display name"
          />
          <div className="brand-username-wrap">
            <span className="brand-at">@</span>
            <input
              className="brand-input brand-input-username"
              type="text"
              value={profile.username}
              onChange={(e) => update('username', e.target.value.replace(/\s/g, ''))}
              placeholder="username"
            />
          </div>
        </div>
      </div>

      {/* Headline (LinkedIn) */}
      <input
        className="brand-input brand-input-full"
        type="text"
        value={profile.headline}
        onChange={(e) => update('headline', e.target.value)}
        placeholder="Headline / tagline (shown on LinkedIn)"
      />
    </div>
  );
}
