import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Image } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { BrandProfile } from '../../types';
import './InstagramMockup.css';

interface InstagramMockupProps {
  imageUrl: string | null;
  caption: string;
  brand: BrandProfile;
}

export default function InstagramMockup({ imageUrl, caption, brand }: InstagramMockupProps) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();
  const truncateAt = 125;
  const shouldTruncate = caption.length > truncateAt && !expanded;
  const displayCaption = shouldTruncate ? caption.slice(0, truncateAt) : caption;

  return (
    <div className="ig-mockup">
      {/* Header */}
      <div className="ig-header">
        <div className="ig-header-left">
          <div className="ig-avatar">
            <div className="ig-avatar-gradient">
              {brand.avatarUrl ? (
                <img src={brand.avatarUrl} alt="" className="ig-avatar-img" />
              ) : (
                <div className="ig-avatar-inner" />
              )}
            </div>
          </div>
          <div className="ig-user-info">
            <span className="ig-username">{brand.username || 'username'}</span>
            <span className="ig-location">{t('mockups.instagram.location')}</span>
          </div>
        </div>
        <button className="ig-more">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image */}
      <div className="ig-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt="Post preview" className="ig-image" />
        ) : (
          <div className="ig-image-placeholder">
            <Image size={48} />
            <span>{t('mockups.image_placeholder')}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="ig-actions">
        <div className="ig-actions-left">
          <button className="ig-action-btn"><Heart size={24} /></button>
          <button className="ig-action-btn"><MessageCircle size={24} /></button>
          <button className="ig-action-btn"><Send size={24} /></button>
        </div>
        <button className="ig-action-btn"><Bookmark size={24} /></button>
      </div>

      {/* Likes */}
      <div className="ig-likes">
        <div className="ig-likes-avatars">
          <div className="ig-like-dot" />
          <div className="ig-like-dot" />
          <div className="ig-like-dot" />
        </div>
        <span>{t('mockups.instagram.liked_by')}<strong>user_one</strong>{t('mockups.instagram.and')}<strong>{t('mockups.instagram.others')}</strong></span>
      </div>

      {/* Caption */}
      {caption && (
        <div className="ig-caption">
          <span className="ig-caption-username">{brand.username || 'username'}</span>{' '}
          <span className="ig-caption-text">
            {displayCaption}
            {shouldTruncate && (
              <button className="ig-more-text" onClick={() => setExpanded(true)}>
                {t('mockups.instagram.more')}
              </button>
            )}
          </span>
        </div>
      )}

      {/* Comments link */}
      <div className="ig-comments-link">{t('mockups.instagram.comments')}</div>

      {/* Timestamp */}
      <div className="ig-timestamp">{t('mockups.instagram.time')}</div>
    </div>
  );
}
