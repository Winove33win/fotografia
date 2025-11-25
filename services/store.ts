import { Project, SiteSettings, Category, Service, Testimonial } from '../types';

// Initial Mock Data
const INITIAL_SETTINGS: SiteSettings = {
  photographerName: "Elena Vore",
  shortBio: "Capturing the raw elegance of moments. Specializing in editorial, wedding, and portrait photography with a natural light aesthetic.",
  email: "contact@elenavore.com",
  phone: "+1 (555) 012-3456",
  instagram: "elenavore_ph",
  behance: "elenavore"
};

const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Weddings', slug: 'weddings' },
  { id: '2', name: 'Portraits', slug: 'portraits' },
  { id: '3', name: 'Editorial', slug: 'editorial' },
  { id: '4', name: 'Events', slug: 'events' },
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'coastal-wedding-anna-mark',
    title: 'Anna & Mark',
    category: 'Weddings',
    date: '2023-09-12',
    location: 'Amalfi Coast, Italy',
    description: 'An intimate celebration overlooking the Mediterranean sea. The focus was on candid emotion and the golden hour light.',
    coverImage: 'https://picsum.photos/id/10/800/1200',
    images: [
      { id: 'p1-1', url: 'https://picsum.photos/id/10/1200/1800', aspectRatio: 'portrait' },
      { id: 'p1-2', url: 'https://picsum.photos/id/11/1200/800', aspectRatio: 'landscape' },
      { id: 'p1-3', url: 'https://picsum.photos/id/12/1000/1000', aspectRatio: 'square' },
      { id: 'p1-4', url: 'https://picsum.photos/id/13/1200/800', aspectRatio: 'landscape' },
      { id: 'p1-5', url: 'https://picsum.photos/id/14/800/1200', aspectRatio: 'portrait' },
    ]
  },
  {
    id: '2',
    slug: 'vogue-urban-editorial',
    title: 'Urban Shadows',
    category: 'Editorial',
    date: '2024-01-15',
    location: 'New York, NY',
    description: 'A high-contrast fashion editorial exploring the interplay of architecture and modern street style.',
    coverImage: 'https://picsum.photos/id/20/800/1200',
    images: [
      { id: 'p2-1', url: 'https://picsum.photos/id/20/1200/1800', aspectRatio: 'portrait' },
      { id: 'p2-2', url: 'https://picsum.photos/id/21/1200/1800', aspectRatio: 'portrait' },
      { id: 'p2-3', url: 'https://picsum.photos/id/24/1200/800', aspectRatio: 'landscape' },
    ]
  },
  {
    id: '3',
    slug: 'sarah-portrait-session',
    title: 'Sarah in Studio',
    category: 'Portraits',
    date: '2024-03-10',
    location: 'London Studio',
    description: 'Minimalist studio portraits using a single light source to create depth and drama.',
    coverImage: 'https://picsum.photos/id/64/800/1200',
    images: [
      { id: 'p3-1', url: 'https://picsum.photos/id/64/1200/1800', aspectRatio: 'portrait' },
      { id: 'p3-2', url: 'https://picsum.photos/id/65/1200/1800', aspectRatio: 'portrait' },
    ]
  }
];

const INITIAL_SERVICES: Service[] = [
  { id: '1', title: 'Wedding Photography', description: 'Full day coverage, 2 photographers, online gallery.', priceDisplay: 'From $3,500' },
  { id: '2', title: 'Portrait Session', description: '2 hours on location or studio, 20 retouched images.', priceDisplay: '$600' },
  { id: '3', title: 'Editorial / Commercial', description: 'Full production support, licensing included.', priceDisplay: 'Inquire' },
];

const STORAGE_KEYS = {
  PROJECTS: 'lumina_projects',
  CATEGORIES: 'lumina_categories',
  SETTINGS: 'lumina_settings',
  SERVICES: 'lumina_services',
};

// Helper to initialize storage
const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
  }
};

initStorage();

export const dataService = {
  getProjects: (): Project[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || '[]'),
  
  getProjectBySlug: (slug: string): Project | undefined => {
    const projects = dataService.getProjects();
    return projects.find(p => p.slug === slug);
  },

  saveProject: (project: Project) => {
    const projects = dataService.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    if (index >= 0) {
      projects[index] = project;
    } else {
      projects.push(project);
    }
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  deleteProject: (id: string) => {
    const projects = dataService.getProjects().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  getCategories: (): Category[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]'),
  
  getSettings: (): SiteSettings => JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{}') as SiteSettings,
  
  saveSettings: (settings: SiteSettings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  getServices: (): Service[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES) || '[]'),
};

export const authService = {
  login: (email: string, pass: string): boolean => {
    // Mock login
    return email === 'admin@demo.com' && pass === 'password';
  },
  isAuthenticated: (): boolean => {
    return localStorage.getItem('lumina_auth') === 'true';
  },
  setAuthenticated: (status: boolean) => {
    if (status) localStorage.setItem('lumina_auth', 'true');
    else localStorage.removeItem('lumina_auth');
  }
};