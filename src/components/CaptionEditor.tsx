import type { Platform } from '../types';
import { useLanguage } from '../context/LanguageContext';
import './CaptionEditor.css';

interface CaptionEditorProps {
  value: string;
  onChange: (value: string) => void;
  platform: Platform;
  twitterPremium?: boolean;
}

export default function CaptionEditor({ value, onChange, platform, twitterPremium }: CaptionEditorProps) {
  const { t } = useLanguage();

  const platformLimits: Record<Platform, { max: number; truncateAt: number; label: string }> = {
    instagram: { max: 2200, truncateAt: 125, label: t('editor.limits.ig') },
    linkedin: { max: 3000, truncateAt: 140, label: t('editor.limits.li') },
    twitter: { max: 280, truncateAt: 280, label: t('editor.limits.tw') },
  };

  const twitterPremiumLimits = { max: 25000, truncateAt: 280, label: t('editor.limits.tw_premium') };

  const limits = platform === 'twitter' && twitterPremium
    ? twitterPremiumLimits
    : platformLimits[platform];
  const charCount = value.length;
  const isOverTruncate = charCount > limits.truncateAt;
  const isOverMax = charCount > limits.max;

  return (
    <div className="caption-editor">
      <textarea
        className="caption-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('editor.caption.placeholder')}
        rows={6}
      />
      <div className="caption-footer">
        <span className={`caption-hint ${isOverTruncate ? 'warn' : ''}`}>
          {limits.label}
        </span>
        <span className={`caption-count ${isOverMax ? 'error' : isOverTruncate ? 'warn' : ''}`}>
          {charCount.toLocaleString()}/{limits.max.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
