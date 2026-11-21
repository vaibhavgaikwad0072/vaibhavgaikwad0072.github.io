import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { defaultContent } from '../data/content';
import type {
  ExperienceItem,
  Inquiry,
  Project,
  ServiceItem,
  SiteContent,
  SiteSettings,
  SkillGroup,
} from '../data/types';
import { downloadJson, uid } from '../lib/utils';

const CONTENT_KEY = 'vg.portfolio.content.v1';
const INQUIRIES_KEY = 'vg.portfolio.inquiries.v1';
const SESSION_KEY = 'vg.portfolio.admin-session';

export interface InquiryInput {
  kind: Inquiry['kind'];
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

interface ContentContextValue {
  content: SiteContent;
  inquiries: Inquiry[];
  isAdmin: boolean;
  storageError: string | null;
  login: (password: string) => boolean;
  logout: () => void;
  saveProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  reorderProject: (id: string, direction: -1 | 1) => void;
  saveSettings: (patch: Partial<SiteSettings>) => void;
  saveSkillGroups: (groups: SkillGroup[]) => void;
  saveExperience: (items: ExperienceItem[]) => void;
  saveServices: (items: ServiceItem[]) => void;
  submitInquiry: (input: InquiryInput) => Promise<void>;
  setInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  resetContent: () => void;
  importContent: (raw: string) => { ok: boolean; message: string };
  exportContent: () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

function readContent(): SiteContent {
  try {
    const raw = localStorage.getItem(CONTENT_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw) as SiteContent;
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.projects)) return defaultContent;
    return {
      ...defaultContent,
      ...parsed,
      settings: { ...defaultContent.settings, ...parsed.settings },
    };
  } catch {
    return defaultContent;
  }
}

function readInquiries(): Inquiry[] {
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Inquiry[]) : [];
  } catch {
    return [];
  }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => readContent());
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => readInquiries());
  const [isAdmin, setIsAdmin] = useState<boolean>(() => sessionStorage.getItem(SESSION_KEY) === 'true');
  const [storageError, setStorageError] = useState<string | null>(null);

  const commitContent = useCallback((updater: (previous: SiteContent) => SiteContent) => {
    setContent((previous) => {
      const next = { ...updater(previous), updatedAt: new Date().toISOString() };
      try {
        localStorage.setItem(CONTENT_KEY, JSON.stringify(next));
        setStorageError(null);
      } catch {
        setStorageError(
          'Browser storage is full. Remove or shrink uploaded images, then try again. Changes are visible this session but may not persist.',
        );
      }
      return next;
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
    } catch {
      setStorageError('Could not save inquiries to browser storage.');
    }
  }, [inquiries]);

  const login = useCallback((password: string) => {
    const expected = import.meta.env.VITE_ADMIN_PASSWORD || 'vg-admin-2026';
    if (password === expected) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  }, []);

  const saveProject = useCallback(
    (project: Project) => {
      commitContent((previous) => {
        const exists = previous.projects.some((item) => item.id === project.id);
        return {
          ...previous,
          projects: exists
            ? previous.projects.map((item) => (item.id === project.id ? project : item))
            : [...previous.projects, project],
        };
      });
    },
    [commitContent],
  );

  const deleteProject = useCallback(
    (id: string) => {
      commitContent((previous) => ({
        ...previous,
        projects: previous.projects.filter((item) => item.id !== id),
      }));
    },
    [commitContent],
  );

  const reorderProject = useCallback(
    (id: string, direction: -1 | 1) => {
      commitContent((previous) => {
        const index = previous.projects.findIndex((item) => item.id === id);
        const target = index + direction;
        if (index < 0 || target < 0 || target >= previous.projects.length) return previous;
        const projects = [...previous.projects];
        const [moved] = projects.splice(index, 1);
        projects.splice(target, 0, moved);
        return { ...previous, projects };
      });
    },
    [commitContent],
  );

  const saveSettings = useCallback(
    (patch: Partial<SiteSettings>) => {
      commitContent((previous) => ({ ...previous, settings: { ...previous.settings, ...patch } }));
    },
    [commitContent],
  );

  const saveSkillGroups = useCallback(
    (groups: SkillGroup[]) => {
      commitContent((previous) => ({ ...previous, skillGroups: groups }));
    },
    [commitContent],
  );

  const saveExperience = useCallback(
    (items: ExperienceItem[]) => {
      commitContent((previous) => ({ ...previous, experience: items }));
    },
    [commitContent],
  );

  const saveServices = useCallback(
    (items: ServiceItem[]) => {
      commitContent((previous) => ({ ...previous, services: items }));
    },
    [commitContent],
  );

  const submitInquiry = useCallback(async (input: InquiryInput) => {
    const inquiry: Inquiry = {
      ...input,
      id: uid('inq'),
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
    if (endpoint) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...inquiry, source: 'vaibhav-portfolio' }),
      });
      if (!response.ok) {
        throw new Error('The message service is unavailable right now. Please email directly instead.');
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 650));
    }

    setInquiries((previous) => [inquiry, ...previous]);
  }, []);

  const setInquiryStatus = useCallback((id: string, status: Inquiry['status']) => {
    setInquiries((previous) => previous.map((item) => (item.id === id ? { ...item, status } : item)));
  }, []);

  const deleteInquiry = useCallback((id: string) => {
    setInquiries((previous) => previous.filter((item) => item.id !== id));
  }, []);

  const resetContent = useCallback(() => {
    localStorage.removeItem(CONTENT_KEY);
    setContent(defaultContent);
  }, []);

  const importContent = useCallback((raw: string) => {
    try {
      const parsed = JSON.parse(raw) as SiteContent;
      if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.projects) || !parsed.settings) {
        return { ok: false, message: 'This JSON does not look like a portfolio export.' };
      }
      const merged: SiteContent = {
        ...defaultContent,
        ...parsed,
        settings: { ...defaultContent.settings, ...parsed.settings },
        updatedAt: new Date().toISOString(),
      };
      setContent(merged);
      localStorage.setItem(CONTENT_KEY, JSON.stringify(merged));
      return { ok: true, message: 'Portfolio content imported.' };
    } catch {
      return { ok: false, message: 'Invalid JSON. Check the file and try again.' };
    }
  }, []);

  const exportContent = useCallback(() => {
    downloadJson('vaibhav-portfolio-content.json', content);
  }, [content]);

  const value = useMemo<ContentContextValue>(
    () => ({
      content,
      inquiries,
      isAdmin,
      storageError,
      login,
      logout,
      saveProject,
      deleteProject,
      reorderProject,
      saveSettings,
      saveSkillGroups,
      saveExperience,
      saveServices,
      submitInquiry,
      setInquiryStatus,
      deleteInquiry,
      resetContent,
      importContent,
      exportContent,
    }),
    [
      content,
      inquiries,
      isAdmin,
      storageError,
      login,
      logout,
      saveProject,
      deleteProject,
      reorderProject,
      saveSettings,
      saveSkillGroups,
      saveExperience,
      saveServices,
      submitInquiry,
      setInquiryStatus,
      deleteInquiry,
      resetContent,
      importContent,
      exportContent,
    ],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used inside ContentProvider');
  return context;
}
