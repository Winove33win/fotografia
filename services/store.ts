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
    slug: 'tuscany-vows',
    title: 'Tuscany Vows',
    category: 'Weddings',
    date: '2024-06-18',
    location: 'Val d’Orcia, Italy',
    description: 'Sun-washed vows among cypress trees and soft linen tablescapes bathed in golden light.',
    coverImage: 'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=1600&h=900&q=80',
    images: [
      { id: 'p1-1', title: 'Vows at dusk', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&h=1600&q=80', aspectRatio: 'portrait' },
      { id: 'p1-2', title: 'Hillside embrace', url: 'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=1600&h=900&q=80', aspectRatio: 'landscape' },
      { id: 'p1-3', title: 'Detail study', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&h=1200&q=80', aspectRatio: 'square' },
      { id: 'p1-4', title: 'Procession', url: 'https://images.unsplash.com/photo-1529634892488-93cceca0f852?auto=format&fit=crop&w=1600&h=900&q=80', aspectRatio: 'landscape' },
      { id: 'p1-5', title: 'First dance', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&h=1600&q=80', aspectRatio: 'portrait' },
    ]
  },
  {
    id: '2',
    slug: 'urban-nocturne',
    title: 'Urban Nocturne',
    category: 'Editorial',
    date: '2024-09-02',
    location: 'New York, USA',
    description: 'After-dark city textures meet soft tailoring in a cinematic study of contrast and light.',
    coverImage: 'https://images.unsplash.com/photo-1496747611180-206a5c8c226a?auto=format&fit=crop&w=1600&h=900&q=80',
    images: [
      { id: 'p2-1', title: 'Neon muse', url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&h=1600&q=80', aspectRatio: 'portrait' },
      { id: 'p2-2', title: 'City monologue', url: 'https://images.unsplash.com/photo-1496747611180-206a5c8c226a?auto=format&fit=crop&w=1600&h=900&q=80', aspectRatio: 'landscape' },
      { id: 'p2-3', title: 'Chrome stillness', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&h=1200&q=80', aspectRatio: 'square' },
      { id: 'p2-4', title: 'Midnight study', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&h=1600&q=80', aspectRatio: 'portrait' },
      { id: 'p2-5', title: 'Steel horizon', url: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1600&h=900&q=80', aspectRatio: 'landscape' },
    ]
  },
  {
    id: '3',
    slug: 'studio-reveries',
    title: 'Studio Reveries',
    category: 'Portraits',
    date: '2024-04-28',
    location: 'London, UK',
    description: 'Sculptural light, pared-back palettes, and portraits that linger in the quiet moments.',
    coverImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&h=1600&q=80',
    images: [
      { id: 'p3-1', title: 'Soft profile', url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&h=1600&q=80', aspectRatio: 'portrait' },
      { id: 'p3-2', title: 'Sculpted gaze', url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&h=1600&q=80', aspectRatio: 'portrait' },
      { id: 'p3-3', title: 'Fine detail', url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=1200&h=1200&q=80', aspectRatio: 'square' },
      { id: 'p3-4', title: 'Twin silhouettes', url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&h=900&q=80', aspectRatio: 'landscape' },
      { id: 'p3-5', title: 'Quiet pause', url: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1200&h=1600&q=80', aspectRatio: 'portrait' },
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