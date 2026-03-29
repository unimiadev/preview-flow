export type Platform = 'instagram' | 'linkedin' | 'twitter';

export interface BrandProfile {
  displayName: string;
  username: string;
  headline: string;
  avatarUrl: string | null;
}

export interface Project {
  id: string;
  title: string;
  caption: string;
  imageUrl: string | null;
  platform: Platform;
  brandProfile: BrandProfile;
  twitterPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EditorState {
  caption: string;
  imageUrl: string | null;
  imageFile: File | null;
  platform: Platform;
  brandProfile: BrandProfile;
  twitterPremium: boolean;
}

export const defaultBrandProfile: BrandProfile = {
  displayName: 'Your Brand',
  username: 'your_brand',
  headline: 'Your headline or company tagline',
  avatarUrl: null,
};

export interface Brand {
  id: string;
  userId: string;
  name: string;
  username: string;
  headline: string;
  avatarUrl: string | null;
  createdAt: string;
}
