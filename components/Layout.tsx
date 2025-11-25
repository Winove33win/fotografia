import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Mail, Phone } from 'lucide-react';
import { Logo, Button } from './Common';
import { dataService } from '../services/store';

export const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const settings = dataService.getSettings();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Logo className={scrolled ? 'text-xl' : 'text-2xl'} />

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `text-xs uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-stone-500 font-semibold' : 'text-neutral-600 hover:text-neutral-900'}`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-neutral-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col items-center justify-center space-y-8`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className="text-2xl font-serif text-neutral-900 hover:text-stone-500 transition-colors"
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-24">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-neutral-50 pt-20 pb-10 border-t border-neutral-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
            <div className="text-center md:text-left">
              <Logo className="mb-4 block" />
              <p className="text-neutral-500 text-sm max-w-xs">{settings.shortBio}</p>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-4">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-900">Contact</h4>
              <a href={`mailto:${settings.email}`} className="text-neutral-600 hover:text-stone-500 text-sm flex items-center gap-2">
                <Mail size={14} /> {settings.email}
              </a>
              <a href={`tel:${settings.phone}`} className="text-neutral-600 hover:text-stone-500 text-sm flex items-center gap-2">
                <Phone size={14} /> {settings.phone}
              </a>
            </div>

            <div className="flex flex-col items-center md:items-start gap-4">
               <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-900">Follow</h4>
               <div className="flex space-x-4">
                 {settings.instagram && (
                   <a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                     <Instagram size={20} />
                   </a>
                 )}
               </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-neutral-200 text-center flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400">
             <p>&copy; {new Date().getFullYear()} {settings.photographerName}. All rights reserved.</p>
             <div className="mt-4 md:mt-0 space-x-4">
                <NavLink to="/admin" className="hover:text-neutral-600">Admin</NavLink>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};