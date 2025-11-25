import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PhotoGrid, Lightbox } from '../components/Gallery';
import { dataService } from '../services/store';
import { Button } from '../components/Common';
import { SEO } from '../components/SEO';

export const PortfolioIndex: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  const projects = dataService.getProjects();
  const categories = dataService.getCategories();

  // Flatten all images for "All" view or filter by category
  // The PhotoGrid renders images.
  
  const allImages = projects.flatMap(p => p.images.map(img => ({
    ...img,
    projectSlug: p.slug,
    projectTitle: p.title,
    category: p.category
  })));
  
  const filteredImages = currentCategory === 'all' 
    ? allImages 
    : allImages.filter(img => img.category.toLowerCase() === currentCategory.toLowerCase());

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <div className="container mx-auto px-6 md:px-10 lg:px-12 py-14 lg:py-20 animate-fade-in">
      <SEO
        title="Portfolio"
        description="Browse our selected photography portfolio featuring weddings, editorials, and portraits."
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Portfolio",
          "description": "Selected photography works.",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": projects.map((p, i) => ({
              "@type": "CreativeWork",
              "position": i + 1,
              "url": `${window.location.origin}/portfolio/${p.slug}`,
              "name": p.title
            }))
          }
        }}
      />
      <div className="flex flex-col items-center mb-14 lg:mb-20 space-y-7">
        <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 tracking-tight">Portfolio</h1>
        <p className="text-neutral-600 text-center max-w-3xl leading-relaxed font-light">
          Coleções selecionadas com atmosfera editorial e tons suaves, reunidas em um grid preciso e harmonioso.
        </p>

        {/* Filter */}
        <div className="w-full max-w-5xl border-b border-neutral-200 pb-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm md:text-base">
            <button
              onClick={() => setSearchParams({})}
              className={`relative pb-3 uppercase tracking-[0.2em] font-serif transition-all duration-300 ${currentCategory === 'all' ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-700'}`}
            >
              <span className="pr-1">All</span>
              <span className={`absolute left-0 -bottom-[3px] h-[1px] bg-neutral-900 transition-transform origin-left duration-300 ${currentCategory === 'all' ? 'scale-x-100' : 'scale-x-0'}`} />
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ category: cat.slug })}
                className={`relative pb-3 uppercase tracking-[0.2em] font-serif transition-all duration-300 ${currentCategory === cat.slug ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-700'}`}
              >
                <span className="pr-1">{cat.name}</span>
                <span className={`absolute left-0 -bottom-[3px] h-[1px] bg-neutral-900 transition-transform origin-left duration-300 ${currentCategory === cat.slug ? 'scale-x-100' : 'scale-x-0'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <PhotoGrid images={filteredImages} onImageClick={setLightboxIndex} />

      <Lightbox 
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxIndex >= 0}
        onClose={() => setLightboxIndex(-1)}
        onNext={() => setLightboxIndex((lightboxIndex + 1) % filteredImages.length)}
        onPrev={() => setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length)}
      />
    </div>
  );
};

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = dataService.getProjectBySlug(slug || '');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const settings = dataService.getSettings();

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <SEO title="Project Not Found" />
        <h2 className="text-2xl font-serif text-neutral-900 mb-4">Project not found</h2>
        <Link to="/portfolio"><Button variant="outline">Back to Portfolio</Button></Link>
      </div>
    );
  }

  // Schema for ImageGallery
  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": project.title,
    "description": project.description,
    "datePublished": project.date,
    "author": {
      "@type": "Person",
      "name": settings.photographerName
    },
    "locationCreated": project.location,
    "image": project.images.map(img => img.url)
  };

  return (
    <div className="animate-fade-in pb-24">
      <SEO 
        title={project.title} 
        description={project.description} 
        image={project.coverImage}
        type="article"
        schema={schema}
      />
      
      {/* Project Hero */}
      <div className="container mx-auto px-6 pt-12 pb-20 text-center max-w-4xl">
        <p className="text-stone-500 uppercase tracking-widest text-xs mb-4">{project.category} — {project.date}</p>
        <h1 className="font-serif text-4xl md:text-6xl text-neutral-900 mb-8">{project.title}</h1>
        <p className="text-neutral-600 font-light leading-relaxed text-lg">{project.description}</p>
        <p className="text-neutral-400 text-sm mt-4 font-light italic">{project.location}</p>
      </div>

      <div className="container mx-auto px-6">
        {/* Pass aspectOverride={false} (default) to respect admin settings */}
        <PhotoGrid images={project.images} onImageClick={setLightboxIndex} />
      </div>

      <div className="flex justify-center mt-20">
        <Link to="/portfolio">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft size={16} /> Back to Portfolio
          </Button>
        </Link>
      </div>

      <Lightbox 
        images={project.images}
        currentIndex={lightboxIndex}
        isOpen={lightboxIndex >= 0}
        onClose={() => setLightboxIndex(-1)}
        onNext={() => setLightboxIndex((lightboxIndex + 1) % project.images.length)}
        onPrev={() => setLightboxIndex((lightboxIndex - 1 + project.images.length) % project.images.length)}
      />
    </div>
  );
};