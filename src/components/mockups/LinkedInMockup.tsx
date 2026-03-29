import { useState } from 'react';
import { ThumbsUp, MessageSquare, Repeat2, Send, MoreHorizontal, Globe, Image } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { BrandProfile } from '../../types';
import './LinkedInMockup.css';

interface LinkedInMockupProps {
  imageUrl: string | null;
  caption: string;
  brand: BrandProfile;
}

export default function LinkedInMockup({ imageUrl, caption, brand }: LinkedInMockupProps) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();
  const truncateAt = 140;
  const cleanCaption = caption.trim();
  const shouldTruncate = cleanCaption.length > truncateAt && !expanded;
  const displayCaption = shouldTruncate ? cleanCaption.slice(0, truncateAt) : cleanCaption;

  return (
    <div className="li-mockup">
      {/* Header */}
      <div className="li-header">
        <div className="li-header-left">
          <div className="li-avatar">
            {brand.avatarUrl && <img src={brand.avatarUrl} alt="" />}
          </div>
          <div className="li-user-info">
            <span className="li-name">{brand.displayName || 'Your Name'}</span>
            <span className="li-headline">{brand.headline || 'Your headline'}</span>
            <span className="li-meta">
              2h • <Globe size={12} />
            </span>
          </div>
        </div>
        <button className="li-more">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Caption */}
      {caption && (
        <div className="li-caption">
          <span className="li-caption-text">{displayCaption}{shouldTruncate && (
              <button className="li-see-more" onClick={() => setExpanded(true)}>
                {t('mockups.linkedin.see_more')}
              </button>
            )}</span>
        </div>
      )}

      {/* Image */}
      <div className="li-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt="Post preview" className="li-image" />
        ) : (
          <div className="li-image-placeholder">
            <Image size={48} />
            <span>{t('mockups.image_placeholder')}</span>
          </div>
        )}
      </div>

      {/* Reactions bar */}
      <div className="li-reactions">
        <div className="li-reactions-left">
          <div className="li-reaction-icons">
            <span className="li-reaction-emoji">👍</span>
            <span className="li-reaction-emoji">❤️</span>
            <span className="li-reaction-emoji">💡</span>
          </div>
          <span className="li-reaction-count">128</span>
        </div>
        <span className="li-comments-count">24 {t('mockups.linkedin.metrics')}</span>
      </div>

      <div className="li-divider" />

      {/* Action buttons */}
      <div className="li-actions">
        <button className="li-action-btn">
          <ThumbsUp size={18} />
          <span>{t('mockups.linkedin.like')}</span>
        </button>
        <button className="li-action-btn">
          <MessageSquare size={18} />
          <span>{t('mockups.linkedin.comment')}</span>
        </button>
        <button className="li-action-btn">
          <Repeat2 size={18} />
          <span>{t('mockups.linkedin.repost')}</span>
        </button>
        <button className="li-action-btn">
          <Send size={18} />
          <span>{t('mockups.linkedin.send')}</span>
        </button>
      </div>
    </div>
  );
}
