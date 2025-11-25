import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <Link to="/" className={`font-serif text-2xl tracking-tight font-semibold uppercase ${className}`}>
    Lumina<span className="font-light text-stone-500">Lens</span>
  </Link>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', size = 'md', className = "", ...props 
}) => {
  const base = "inline-flex items-center justify-center transition-all duration-300 tracking-widest uppercase text-xs font-medium";
  
  const variants = {
    primary: "bg-neutral-900 text-white hover:bg-stone-800 border border-transparent",
    outline: "bg-transparent text-neutral-900 border border-neutral-300 hover:border-neutral-900",
    ghost: "bg-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
  };

  const sizes = {
    sm: "px-4 py-2",
    md: "px-8 py-4",
    lg: "px-10 py-5 text-sm"
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    className="w-full bg-white border-b border-neutral-300 px-0 py-3 text-neutral-900 placeholder-neutral-400 focus:border-stone-500 focus:outline-none transition-colors"
    {...props}
  />
);

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea 
    className="w-full bg-white border-b border-neutral-300 px-0 py-3 text-neutral-900 placeholder-neutral-400 focus:border-stone-500 focus:outline-none transition-colors min-h-[100px] resize-y"
    {...props}
  />
);

export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-12 md:mb-20 text-center animate-slide-up">
    <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">{title}</h2>
    {subtitle && <p className="text-stone-500 uppercase tracking-widest text-xs">{subtitle}</p>}
  </div>
);