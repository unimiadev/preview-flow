import type { Platform, BrandProfile } from '../../types';
import InstagramMockup from './InstagramMockup';
import LinkedInMockup from './LinkedInMockup';
import TwitterMockup from './TwitterMockup';
import './MockupFrame.css';

interface MockupContainerProps {
  platform: Platform;
  imageUrl: string | null;
  caption: string;
  brandProfile: BrandProfile;
  twitterPremium: boolean;
}

const platformConfig: Record<Platform, { label: string; color: string }> = {
  instagram: { label: 'Instagram', color: '#E1306C' },
  linkedin: { label: 'LinkedIn', color: '#0A66C2' },
  twitter: { label: 'X / Twitter', color: '#1DA1F2' },
};

export default function MockupContainer({ platform, imageUrl, caption, brandProfile, twitterPremium }: MockupContainerProps) {
  const config = platformConfig[platform];

  const renderMockup = () => {
    switch (platform) {
      case 'instagram':
        return <InstagramMockup imageUrl={imageUrl} caption={caption} brand={brandProfile} />;
      case 'linkedin':
        return <LinkedInMockup imageUrl={imageUrl} caption={caption} brand={brandProfile} />;
      case 'twitter':
        return <TwitterMockup imageUrl={imageUrl} caption={caption} brand={brandProfile} isPremium={twitterPremium} />;
      default:
        return null;
    }
  };

  return (
    <div className="mockup-frame-wrapper">
      {/* Platform label */}
      <div className="mockup-platform-label">
        <div className="mockup-platform-dot" style={{ background: config.color }} />
        {config.label} Preview
      </div>

      {/* Phone frame */}
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-status-bar">
          <span className="phone-status-time">9:41</span>
          <div className="phone-status-icons">
            <div className="phone-battery" />
          </div>
        </div>
        <div className="phone-screen">
          {renderMockup()}
        </div>
        <div className="phone-home-indicator" />
      </div>
    </div>
  );
}
