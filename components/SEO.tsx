import React, { useEffect } from 'react';
import { dataService } from '../services/store';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image, 
  type = 'website',
  schema 
}) => {
  const settings = dataService.getSettings();
  const siteTitle = `${title} | ${settings.photographerName}`;
  const metaDescription = description || settings.shortBio;
  const siteUrl = window.location.origin;
  const ogImage = image || (settings.instagram ? `https://instagram.com/${settings.instagram}` : '');

  useEffect(() => {
    // Update Title
    document.title = siteTitle;

    // Helper to update meta tags
    const updateMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      if (!content) return;
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', metaDescription);
    updateMeta('og:title', siteTitle, 'property');
    updateMeta('og:description', metaDescription, 'property');
    updateMeta('og:image', ogImage, 'property');
    updateMeta('og:type', type, 'property');
    updateMeta('og:url', window.location.href, 'property');
    updateMeta('twitter:card', 'summary_large_image', 'name');

    // JSON-LD Injection
    let script: HTMLScriptElement | null = null;
    if (schema) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup JSON-LD only (Meta tags persist until overwritten to prevent flickering, 
      // but ideally we'd cleanup if we had a full head manager)
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [title, description, image, type, schema, siteTitle, metaDescription, ogImage]);

  return null;
};
