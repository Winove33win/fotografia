import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Plus, Trash2, Edit2, LogOut, Settings, Image as ImageIcon, Save, ArrowLeft, X, Move, FileText, Download, Globe } from 'lucide-react';
import { authService, dataService } from '../services/store';
import { Project, Category, ImageItem } from '../types';
import { Button, Input, Textarea } from '../components/Common';

// --- LOGIN ---
export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authService.login(email, pass)) {
      authService.setAuthenticated(true);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. (Try admin@demo.com / password)');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 shadow-sm border border-neutral-100">
        <h2 className="font-serif text-3xl text-center mb-8">Admin Access</h2>
        {error && <div className="bg-red-50 text-red-600 p-3 text-sm mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-6">
          <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} required />
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
        <p className="text-xs text-neutral-400 text-center mt-6">Use admin@demo.com / password</p>
      </div>
    </div>
  );
};

// --- LAYOUT ---
export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.setAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 fixed h-full hidden md:flex flex-col">
        <div className="p-8">
           <span className="font-serif text-xl font-bold">Lumina<span className="font-light">CMS</span></span>
        </div>
        <nav className="flex-grow px-4 space-y-2">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 rounded-md transition-colors">
            <ImageIcon size={18} /> Projects
          </Link>
          <Link to="/admin/seo" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 rounded-md transition-colors">
             <Globe size={18} /> SEO Tools
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 rounded-md transition-colors">
            <Settings size={18} /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-neutral-100">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-md transition-colors text-sm">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-neutral-200 p-4 flex justify-between items-center z-20">
         <span className="font-serif font-bold">LuminaCMS</span>
         <button onClick={handleLogout}><LogOut size={20} /></button>
      </div>

      {/* Main Content */}
      <main className="flex-grow md:ml-64 p-6 md:p-12 pt-20 md:pt-12">
        {children}
      </main>
    </div>
  );
};

// --- SEO TOOLS ---
export const AdminSeoTools: React.FC = () => {
  const projects = dataService.getProjects();
  const domain = window.location.origin; // In real deployment, this should be configurable
  
  // Generate Sitemap XML
  const generateSitemap = () => {
    const today = new Date().toISOString().split('T')[0];
    const staticRoutes = ['', 'about', 'services', 'contact', 'portfolio'];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    
    // Static routes
    staticRoutes.forEach(route => {
      xml += `\n  <url>\n    <loc>${domain}/${route}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n  </url>`;
    });

    // Dynamic Projects
    projects.forEach(project => {
      xml += `\n  <url>\n    <loc>${domain}/portfolio/${project.slug}</loc>\n    <lastmod>${project.date}</lastmod>\n    <changefreq>never</changefreq>\n    <priority>0.9</priority>\n  </url>`;
    });

    xml += `\n</urlset>`;
    return xml;
  };

  // Generate Robots.txt
  const generateRobots = () => {
    return `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${domain}/sitemap.xml`;
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="font-serif text-3xl">SEO Tools</h1>
        <p className="text-neutral-500 mt-2">Generate files for search engines to better crawl your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sitemap Generator */}
        <div className="bg-white p-8 border border-neutral-100 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><Globe size={24} /></div>
             <h3 className="font-serif text-xl">Sitemap.xml</h3>
          </div>
          <p className="text-sm text-neutral-500 mb-6">
            Generated based on {projects.length} projects and 5 static pages. 
            Upload this file to the root of your hosting provider.
          </p>
          <div className="bg-neutral-50 p-4 rounded text-xs font-mono text-neutral-600 mb-6 max-h-40 overflow-y-auto border border-neutral-200">
             {generateSitemap()}
          </div>
          <Button onClick={() => downloadFile(generateSitemap(), 'sitemap.xml', 'text/xml')} className="w-full gap-2">
            <Download size={16} /> Download Sitemap
          </Button>
        </div>

        {/* Robots.txt Generator */}
        <div className="bg-white p-8 border border-neutral-100 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-amber-50 text-amber-600 rounded-full"><FileText size={24} /></div>
             <h3 className="font-serif text-xl">Robots.txt</h3>
          </div>
          <p className="text-sm text-neutral-500 mb-6">
            Directs search engine bots on which pages to crawl and which to ignore (e.g. Admin pages).
          </p>
          <div className="bg-neutral-50 p-4 rounded text-xs font-mono text-neutral-600 mb-6 max-h-40 border border-neutral-200 whitespace-pre-wrap">
             {generateRobots()}
          </div>
          <Button onClick={() => downloadFile(generateRobots(), 'robots.txt', 'text/plain')} className="w-full gap-2" variant="outline">
             <Download size={16} /> Download Robots.txt
          </Button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg text-sm text-blue-800">
         <strong>Tip:</strong> Since this is a client-side application, these files must be placed in the <code>public/</code> folder or the root of your static hosting server manually after downloading.
      </div>
    </div>
  );
};

// --- DASHBOARD (PROJECT LIST) ---
export const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProjects(dataService.getProjects());
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure?')) {
      dataService.deleteProject(id);
      setProjects(dataService.getProjects());
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-serif text-3xl">Portfolio Projects</h1>
        <Button onClick={() => navigate('/admin/project/new')} className="gap-2">
          <Plus size={16} /> New Project
        </Button>
      </div>

      <div className="bg-white border border-neutral-100 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-6 font-medium">Cover</th>
              <th className="p-6 font-medium">Title</th>
              <th className="p-6 font-medium">Category</th>
              <th className="p-6 font-medium">Date</th>
              <th className="p-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {projects.map(p => (
              <tr key={p.id} className="hover:bg-neutral-50/50 transition-colors">
                <td className="p-4 pl-6">
                  <div className="w-16 h-16 bg-neutral-200 overflow-hidden rounded">
                    <img src={p.coverImage} alt="" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="p-6 font-medium text-neutral-900">{p.title}</td>
                <td className="p-6 text-neutral-500 text-sm">{p.category}</td>
                <td className="p-6 text-neutral-500 text-sm">{p.date}</td>
                <td className="p-6 text-right space-x-2">
                  <button onClick={() => navigate(`/admin/project/${p.id}`)} className="p-2 text-neutral-400 hover:text-stone-500">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 text-neutral-400 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && (
          <div className="p-12 text-center text-neutral-400">No projects found. Create your first one.</div>
        )}
      </div>
    </div>
  );
};

// --- PROJECT EDITOR ---
export const AdminProjectEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';
  
  const [project, setProject] = useState<Project>({
    id: crypto.randomUUID(),
    slug: '',
    title: '',
    category: 'Weddings',
    date: new Date().toISOString().split('T')[0],
    location: '',
    description: '',
    coverImage: 'https://picsum.photos/800/600',
    images: []
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const categories = dataService.getCategories();

  useEffect(() => {
    if (!isNew && id) {
      const existing = dataService.getProjects().find(p => p.id === id);
      if (existing) setProject(existing);
    }
  }, [id, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Auto-generate slug from title if empty, else custom
      setProject({ ...project, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') });
  };

  const handleSave = () => {
    const slug = project.slug || project.title.toLowerCase().replace(/\s+/g, '-');
    dataService.saveProject({ ...project, slug });
    navigate('/admin/dashboard');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files && e.target.files.length > 0) {
        // Mock upload: read file to data URL
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const newImage: ImageItem = {
                id: crypto.randomUUID(),
                url: reader.result as string,
                aspectRatio: 'square' // Default to square
            };
            setProject(prev => ({ ...prev, images: [...prev.images, newImage] }));
        };
        reader.readAsDataURL(file);
     }
  };

  const removeImage = (imgId: string) => {
    setProject(prev => ({ ...prev, images: prev.images.filter(i => i.id !== imgId) }));
  };

  const updateImageRatio = (imgId: string, ratio: 'square' | 'portrait' | 'landscape') => {
    setProject(prev => ({
        ...prev,
        images: prev.images.map(img => img.id === imgId ? { ...img, aspectRatio: ratio } : img)
    }));
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow drop
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newImages = [...project.images];
    const [draggedItem] = newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedItem);

    setProject(prev => ({ ...prev, images: newImages }));
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-4">
             <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-neutral-100 rounded-full"><ArrowLeft size={20} /></button>
             <h1 className="font-serif text-3xl">{isNew ? 'New Project' : 'Edit Project'}</h1>
         </div>
         <Button onClick={handleSave} className="gap-2"><Save size={16} /> Save Project</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 border border-neutral-100 rounded-lg space-y-6">
             <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Title</label>
                <Input name="title" value={project.title} onChange={handleChange} placeholder="Project Title" />
             </div>
             <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Slug (URL)</label>
                <Input name="slug" value={project.slug} onChange={handleSlug} placeholder="project-url-slug" />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Category</label>
                    <select name="category" value={project.category} onChange={handleChange} className="w-full border-b border-neutral-300 py-3 bg-white focus:outline-none">
                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Date</label>
                    <Input name="date" type="date" value={project.date} onChange={handleChange} />
                </div>
             </div>
             <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Location</label>
                <Input name="location" value={project.location} onChange={handleChange} />
             </div>
             <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Description</label>
                <Textarea name="description" value={project.description} onChange={handleChange} />
             </div>
          </div>

          <div className="bg-white p-8 border border-neutral-100 rounded-lg">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm uppercase tracking-widest font-semibold">Gallery Images</h3>
                <label className="cursor-pointer text-xs font-bold uppercase text-stone-600 hover:text-stone-800 border-b border-stone-300 pb-1">
                    + Add Image
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {project.images.map((img, idx) => (
                     <div 
                        key={img.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, idx)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, idx)}
                        onDragEnd={handleDragEnd}
                        className={`relative group bg-neutral-100 rounded overflow-hidden cursor-move transition-all duration-200 ${draggedIndex === idx ? 'opacity-40 scale-95 border-2 border-stone-500 border-dashed' : 'hover:shadow-md'}`}
                     >
                         {/* Using 2:3 and 3:2 ratios to match frontend display */}
                         <div className={`w-full pointer-events-none ${img.aspectRatio === 'portrait' ? 'aspect-[2/3]' : img.aspectRatio === 'landscape' ? 'aspect-[3/2]' : 'aspect-square'}`}>
                           <img src={img.url} alt="" className="w-full h-full object-cover" />
                         </div>
                         
                         {/* Controls Overlay */}
                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                             <div className="flex justify-between w-full">
                                <span className="text-white opacity-70"><Move size={14} /></span>
                                <button 
                                    onClick={() => removeImage(img.id)}
                                    className="bg-white text-red-500 p-1 rounded-full shadow-sm hover:bg-red-50"
                                    title="Remove Image"
                                >
                                    <X size={14} />
                                </button>
                             </div>
                             
                             <div className="bg-white rounded p-1 shadow-sm border border-neutral-200">
                                <label className="block text-[8px] uppercase text-neutral-400 text-center tracking-widest mb-1">Ratio</label>
                                <select 
                                    value={img.aspectRatio || 'square'} 
                                    onChange={(e) => updateImageRatio(img.id, e.target.value as any)}
                                    className="w-full text-[10px] uppercase bg-transparent border-none py-1 px-1 focus:ring-0 cursor-pointer font-medium text-neutral-700"
                                >
                                    <option value="square">Square 1:1</option>
                                    <option value="portrait">Portrait 2:3</option>
                                    <option value="landscape">Landscape 3:2</option>
                                </select>
                             </div>
                         </div>
                     </div>
                 ))}
                 {project.images.length === 0 && <p className="col-span-3 text-center text-neutral-400 py-8">No images added yet.</p>}
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-8 border border-neutral-100 rounded-lg sticky top-24">
              <h3 className="text-sm uppercase tracking-widest font-semibold mb-4">Cover Image</h3>
              <div className="aspect-[3/4] bg-neutral-100 mb-4 overflow-hidden rounded relative">
                 <img src={project.coverImage} alt="Cover" className="w-full h-full object-cover" />
              </div>
              <label className="block w-full text-center py-2 border border-neutral-300 text-xs uppercase tracking-widest cursor-pointer hover:bg-neutral-50">
                  Change Cover
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                      if (e.target.files?.[0]) {
                          const reader = new FileReader();
                          reader.onloadend = () => setProject({...project, coverImage: reader.result as string});
                          reader.readAsDataURL(e.target.files[0]);
                      }
                  }} />
              </label>
           </div>
        </div>
      </div>
    </div>
  );
};