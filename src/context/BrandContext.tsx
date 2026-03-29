import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';
import type { Brand, BrandProfile } from '../types';

interface BrandContextType {
  brands: Brand[];
  loading: boolean;
  addBrand: (data: Omit<Brand, 'id' | 'userId' | 'createdAt'>) => Promise<Brand | null>;
  updateBrand: (id: string, updates: Partial<Omit<Brand, 'id' | 'userId'>>) => Promise<void>;
  deleteBrand: (id: string) => Promise<void>;
  getBrand: (id: string) => Brand | undefined;
  brandToProfile: (brand: Brand) => BrandProfile;
}

const BrandContext = createContext<BrandContextType | null>(null);

export function BrandProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !user) {
      setBrands([]);
      setLoading(false);
      return;
    }

    const fetchBrands = async () => {
      if (!supabase) return;
      setLoading(true);
      const { data } = await supabase
        .from('brands')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setBrands(data.map(row => ({
          id: row.id,
          userId: row.user_id,
          name: row.name,
          username: row.username || '',
          headline: row.headline || '',
          avatarUrl: row.avatar_url,
          createdAt: row.created_at,
        })));
      }
      setLoading(false);
    };

    fetchBrands();
  }, [user]);

  const addBrand = async (data: Omit<Brand, 'id' | 'userId' | 'createdAt'>): Promise<Brand | null> => {
    if (!supabase || !user) return null;

    const { data: rows, error } = await supabase
      .from('brands')
      .insert({
        user_id: user.id,
        name: data.name,
        username: data.username,
        headline: data.headline,
        avatar_url: data.avatarUrl,
      })
      .select()
      .single();

    if (error || !rows) return null;

    const newBrand: Brand = {
      id: rows.id,
      userId: rows.user_id,
      name: rows.name,
      username: rows.username || '',
      headline: rows.headline || '',
      avatarUrl: rows.avatar_url,
      createdAt: rows.created_at,
    };

    setBrands(prev => [newBrand, ...prev]);
    return newBrand;
  };

  const updateBrand = async (id: string, updates: Partial<Omit<Brand, 'id' | 'userId'>>) => {
    if (!supabase || !user) return;

    const dbUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.username !== undefined) dbUpdates.username = updates.username;
    if (updates.headline !== undefined) dbUpdates.headline = updates.headline;
    if (updates.avatarUrl !== undefined) dbUpdates.avatar_url = updates.avatarUrl;

    await supabase.from('brands').update(dbUpdates).eq('id', id);
    setBrands(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBrand = async (id: string) => {
    if (!supabase || !user) return;
    await supabase.from('brands').delete().eq('id', id);
    setBrands(prev => prev.filter(b => b.id !== id));
  };

  const getBrand = (id: string) => brands.find(b => b.id === id);

  const brandToProfile = (brand: Brand): BrandProfile => ({
    displayName: brand.name,
    username: brand.username,
    headline: brand.headline,
    avatarUrl: brand.avatarUrl,
  });

  return (
    <BrandContext.Provider value={{ brands, loading, addBrand, updateBrand, deleteBrand, getBrand, brandToProfile }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrands() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error('useBrands must be used within BrandProvider');
  return ctx;
}
