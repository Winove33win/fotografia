export interface ImageItem {
  id: string;
  url: string;
  title?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  projectSlug?: string;
  projectTitle?: string;
  category?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  coverImage: string;
  images: ImageItem[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  priceDisplay: string;
}

export interface Testimonial {
  id: string;
  client: string;
  text: string;
  role?: string;
}

export interface SiteSettings {
  photographerName: string;
  shortBio: string;
  email: string;
  phone: string;
  instagram?: string;
  behance?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}