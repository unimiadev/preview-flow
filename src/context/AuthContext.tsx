import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

export interface UserProfile {
  displayName: string;
  avatarUrl: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile: UserProfile | null;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

async function fetchOrCreateProfile(user: User): Promise<UserProfile> {
  if (!supabase) return { displayName: '', avatarUrl: null };

  try {
    // Try to fetch existing profile
    const { data, error } = await supabase
      .from('profiles')
      .select('display_name, avatar_url')
      .eq('id', user.id)
      .single();

    if (data && !error) {
      return {
        displayName: data.display_name || '',
        avatarUrl: data.avatar_url || null,
      };
    }

    // Profile doesn't exist (or table missing) — create one, pulling from Google metadata if available
    const meta = user.user_metadata || {};
    const displayName = meta.full_name || meta.name || user.email?.split('@')[0] || '';
    const avatarUrl = meta.avatar_url || meta.picture || null;

    // Only attempt upsert if we didn't get a hard table error, though upsert is safe to try
    await supabase.from('profiles').upsert({
      id: user.id,
      display_name: displayName,
      avatar_url: avatarUrl,
    });

    return { displayName, avatarUrl };
  } catch (err) {
    console.error("Error fetching/creating profile (did you run the SQL migration?):", err);
    // Return fallback so the app continues loading
    return {
      displayName: user.email?.split('@')[0] || 'User',
      avatarUrl: null
    };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const profile = await fetchOrCreateProfile(session.user);
        setUserProfile(profile);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const profile = await fetchOrCreateProfile(session.user);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    if (!supabase) return { error: 'Supabase not configured' };
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error?.message ?? null };
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { error: 'Supabase not configured' };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signInWithGoogle = async () => {
    if (!supabase) return { error: 'Supabase not configured' };
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!supabase || !user) return;

    const dbUpdates: Record<string, string | null> = {};
    if (updates.displayName !== undefined) dbUpdates.display_name = updates.displayName;
    if (updates.avatarUrl !== undefined) dbUpdates.avatar_url = updates.avatarUrl;

    const { data, error } = await supabase.from('profiles').update(dbUpdates).eq('id', user.id).select();
    
    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.error('No rows affected. This might be due to missing a profile record or restrictive RLS policies.');
      throw new Error('Cannot update profile: Record not found or RLS restricted.');
    }

    setUserProfile(prev => prev ? { ...prev, ...updates } : prev);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, userProfile, signUp, signIn, signInWithGoogle, signOut, updateProfile, isConfigured: isSupabaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
