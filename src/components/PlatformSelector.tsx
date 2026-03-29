import { InstagramIcon, LinkedInIcon, XTwitterIcon } from './PlatformIcons';
import type { Platform } from '../types';
import './PlatformSelector.css';

interface PlatformSelectorProps {
  value: Platform;
  onChange: (platform: Platform) => void;
}

const platforms: { id: Platform; label: string; icon: React.FC<{ size?: number }>; color: string }[] = [
  { id: 'instagram', label: 'Instagram', icon: InstagramIcon, color: '#E1306C' },
  { id: 'linkedin', label: 'LinkedIn', icon: LinkedInIcon, color: '#0A66C2' },
  { id: 'twitter', label: 'X / Twitter', icon: XTwitterIcon, color: '#1DA1F2' },
];

export default function PlatformSelector({ value, onChange }: PlatformSelectorProps) {
  return (
    <div className="platform-selector" role="tablist">
      {platforms.map((p) => (
        <button
          key={p.id}
          role="tab"
          aria-selected={value === p.id}
          className={`platform-tab ${value === p.id ? 'active' : ''}`}
          style={{ '--tab-color': p.color } as React.CSSProperties}
          onClick={() => onChange(p.id)}
        >
          <p.icon size={16} />
          <span>{p.label}</span>
        </button>
      ))}
    </div>
  );
}
