import { useState } from 'react';
import { MessageCircle, Repeat2, Heart, BarChart2, Share, MoreHorizontal, Image, BadgeCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { BrandProfile } from '../../types';
import './TwitterMockup.css';

interface TwitterMockupProps {
  imageUrl: string | null;
  caption: string;
  brand: BrandProfile;
  isPremium: boolean;
}

export default function TwitterMockup({ imageUrl, caption, brand, isPremium }: TwitterMockupProps) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();

  // Premium long-post truncation: X shows "Show more" for posts > 280 chars
  const cleanCaption = caption.trim();
  const shouldTruncate = isPremium && cleanCaption.length > 280 && !expanded;
  const displayCaption = shouldTruncate ? cleanCaption.slice(0, 280) : cleanCaption;

  return (
    <div className="tw-mockup">
      <div className="tw-post">
        {/* Avatar */}
        <div className="tw-avatar">
          {brand.avatarUrl && <img src={brand.avatarUrl} alt="" />}
        </div>

        {/* Content */}
        <div className="tw-content">
          {/* Header */}
          <div className="tw-post-header">
            <div className="tw-user-line">
              <span className="tw-display-name">{brand.displayName || t('mockups.default_name')}</span>
              {isPremium && <BadgeCheck size={16} className="tw-verified" />}
              <span className="tw-handle">@{brand.username || t('mockups.default_username')}</span>
              <span className="tw-separator">·</span>
              <span className="tw-time">{t('mockups.post_time')}</span>
            </div>
            <button className="tw-more">
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Tweet text */}
          {caption && (
            <div className="tw-text">{displayCaption}{shouldTruncate && (
                <button className="tw-show-more" onClick={() => setExpanded(true)}>
                  {t('mockups.twitter.show_more')}
                </button>
              )}</div>
          )}

          {/* Image */}
          {imageUrl ? (
            <div className="tw-image-container">
              <img src={imageUrl} alt="Post preview" className="tw-image" />
            </div>
          ) : (
            <div className="tw-image-container tw-image-placeholder-container">
              <div className="tw-image-placeholder">
                <Image size={40} />
                <span>{t('mockups.image_placeholder')}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="tw-actions">
            <button className="tw-action-btn tw-reply">
              <MessageCircle size={17} />
              <span>24</span>
            </button>
            <button className="tw-action-btn tw-repost">
              <Repeat2 size={17} />
              <span>12</span>
            </button>
            <button className="tw-action-btn tw-like">
              <Heart size={17} />
              <span>348</span>
            </button>
            <button className="tw-action-btn tw-views">
              <BarChart2 size={17} />
              <span>12.4K</span>
            </button>
            <button className="tw-action-btn tw-share">
              <Share size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
