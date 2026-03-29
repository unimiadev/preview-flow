import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Project } from '../types';
import { defaultBrandProfile } from '../types';

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

const STORAGE_KEY = 'previewflow_projects';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Project[];
    // Migrate old projects missing new fields
    return parsed.map(p => ({
      ...p,
      brandProfile: p.brandProfile ?? defaultBrandProfile,
      twitterPremium: p.twitterPremium ?? false,
    }));
  } catch {
    return [];
  }
}

function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(loadProjects);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  const addProject = (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project => {
    const now = new Date().toISOString();
    const project: Project = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    setProjects(prev => [project, ...prev]);
    return project;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const getProject = (id: string) => {
    return projects.find(p => p.id === id);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject, getProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProjects must be used within ProjectProvider');
  return ctx;
}
