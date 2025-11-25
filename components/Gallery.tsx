import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RefreshCcw, Loader2 } from 'lucide-react';
import { ImageItem } from '../types';

interface PhotoGridProps {
  images: ImageItem[];
  onImageClick: (index: number) => void;
  aspectOverride?: boolean;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ images, onImageClick, aspectOverride = false }) => {
  const getItemClasses = (img: ImageItem) => {
    if (aspectOverride) return 'aspect-square';
    
    switch (img.aspectRatio) {
      case 'portrait':
        // Spans 2 rows vertically. Using 2:3 ratio which is standard for photography.
        return 'md:row-span-2 aspect-[2/3]';
      case 'landscape':
        // Spans 2 columns horizontally. Using 3:2 ratio.
        return 'md:col-span-2 aspect-[3/2]';
      case 'square':
      default:
        // Standard square 1x1
        return 'aspect-square';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 grid-flow-dense">
      {images.map((img, idx) => (
        <div 
          key={img.id} 
          className={`relative group overflow-hidden bg-neutral-100 cursor-pointer ${getItemClasses(img)}`}
          onClick={() => onImageClick(idx)}
        >
          <img 
            src={img.url} 
            alt={img.title || `Portfolio item ${idx}`} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      ))}
    </div>
  );
};

interface LightboxProps {
  images: ImageItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, isOpen, onClose, onNext, onPrev }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);

  // Reset zoom/pan when image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsLoading(true);
  }, [currentIndex]);

  // Preload next/prev images
  useEffect(() => {
    if (!isOpen) return;
    
    const preloadImage = (index: number) => {
      if (index >= 0 && index < images.length) {
        const img = new Image();
        img.src = images[index].url;
      }
    };

    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    preloadImage(nextIndex);
    preloadImage(prevIndex);
  }, [currentIndex, isOpen, images]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-fade-in">
      {/* Header / Controls */}
      <div className="absolute top-0 w-full p-4 flex justify-between items-center z-20 bg-white/50 backdrop-blur-sm">
        <span className="text-xs uppercase tracking-widest text-neutral-500">
          {currentIndex + 1} / {images.length}
        </span>
        <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
          <X size={24} className="text-neutral-900" />
        </button>
      </div>

      {/* Main Image Area */}
      <div 
        className="flex-grow relative overflow-hidden flex items-center justify-center bg-neutral-50 cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Loader2 className="animate-spin text-neutral-400" size={32} />
          </div>
        )}
        
        <img 
          ref={imageRef}
          src={currentImage.url} 
          alt={currentImage.title}
          decoding="sync"
          onLoad={() => setIsLoading(false)}
          className={`max-h-[90vh] max-w-[90vw] object-contain transition-transform duration-200 ease-out select-none`}
          style={{ 
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            cursor: scale > 1 ? 'grab' : 'default'
          }}
          draggable={false}
        />
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 hover:bg-white/80 rounded-full transition-all z-20 shadow-sm"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 hover:bg-white/80 rounded-full transition-all z-20 shadow-sm"
      >
        <ChevronRight size={24} />
      </button>

      {/* Toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur shadow-sm border border-neutral-100 px-6 py-3 rounded-full flex gap-6 z-20">
         <button onClick={handleZoomOut} disabled={scale <= 1} className="text-neutral-600 hover:text-neutral-900 disabled:opacity-30">
            <ZoomOut size={18} />
         </button>
         <span className="text-xs font-mono w-8 text-center pt-1">{Math.round(scale * 100)}%</span>
         <button onClick={handleZoomIn} disabled={scale >= 3} className="text-neutral-600 hover:text-neutral-900 disabled:opacity-30">
            <ZoomIn size={18} />
         </button>
         <div className="w-[1px] bg-neutral-300 h-4 self-center mx-2"></div>
         <button onClick={handleReset} className="text-neutral-600 hover:text-neutral-900">
            <RefreshCcw size={16} />
         </button>
      </div>

      {/* Footer Info */}
      {(currentImage.title || currentImage.projectSlug) && (
        <div className="absolute bottom-6 left-6 z-10 hidden md:block max-w-sm pointer-events-none">
           {currentImage.title && <h3 className="text-lg font-serif text-neutral-900 bg-white/80 inline-block px-2">{currentImage.title}</h3>}
        </div>
      )}
    </div>
  );
};