import { XTwitterIcon } from './PlatformIcons';
import { useLanguage } from '../context/LanguageContext';
import './TwitterPremiumToggle.css';

interface TwitterPremiumToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function TwitterPremiumToggle({ value, onChange }: TwitterPremiumToggleProps) {
  const { t } = useLanguage();

  return (
    <div className="premium-toggle">
      <div className="premium-toggle-label">
        <XTwitterIcon size={14} />
        <span>{t('editor.premium.label')}</span>
      </div>
      <button
        className={`toggle-switch ${value ? 'active' : ''}`}
        onClick={() => onChange(!value)}
        role="switch"
        aria-checked={value}
        title={value ? 'Premium enabled (up to 25,000 chars)' : 'Free account (max 280 chars)'}
      >
        <div className="toggle-thumb" />
      </button>
    </div>
  );
}
