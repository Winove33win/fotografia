import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, SectionTitle, Input, Textarea } from '../components/Common';
import { PhotoGrid } from '../components/Gallery';
import { dataService } from '../services/store';
import { SEO } from '../components/SEO';

// --- HOME PAGE ---
export const Home: React.FC = () => {
  const navigate = useNavigate();
  const settings = dataService.getSettings();
  const projects = dataService.getProjects().slice(0, 3); // Get 3 recent
  const categories = dataService.getCategories();

  // JSON-LD for a Professional Service / Photographer
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": settings.photographerName,
    "image": projects[0]?.coverImage,
    "description": settings.shortBio,
    "telephone": settings.phone,
    "email": settings.email,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US" // Demo value
    },
    "priceRange": "$$$",
    "url": window.location.origin
  };

  return (
    <>
      <SEO
        title="Home"
        description={settings.shortBio}
        schema={schema}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80"
            alt="Fine art portrait"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/70 to-neutral-900"></div>
        </div>

        <div className="relative container mx-auto px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div className="space-y-8">
              <p className="text-sm uppercase tracking-[0.3em] text-stone-300">Fine Art Photography</p>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.05]">
                Quiet stories crafted in light, for the moments that matter.
              </h1>
              <p className="text-lg text-stone-200 max-w-xl leading-relaxed">
                {settings.shortBio}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => navigate('/portfolio')}>Ver portfólio</Button>
                <Button variant="outline" onClick={() => navigate('/contact')} className="border-white text-white hover:bg-white hover:text-neutral-900">
                  Agendar sessão
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                {[{ label: 'Ensaios entregues', value: '320+' }, { label: 'Anos de experiência', value: '12' }].map((stat) => (
                  <div key={stat.label} className="border border-white/10 p-6 bg-white/5 backdrop-blur-sm">
                    <p className="text-3xl font-serif">{stat.value}</p>
                    <p className="text-sm uppercase tracking-[0.2em] text-stone-300 mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -left-6 w-20 h-20 border border-white/10"></div>
              <div className="absolute -bottom-10 -right-6 w-28 h-28 border border-white/10"></div>
              <div className="overflow-hidden rounded-[32px] shadow-2xl shadow-black/30 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
                  alt="Editorial photography"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature series */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-6 mb-12">
            <div className="h-px w-16 bg-neutral-200" />
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Coleções autorais</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {projects.map((project) => (
              <Link to={`/portfolio/${project.slug}`} key={project.id} className="group">
                <div className="overflow-hidden aspect-[3/4] rounded-3xl bg-neutral-100">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale"
                  />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <h3 className="font-serif text-2xl text-neutral-900">{project.title}</h3>
                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 mt-2">{project.category}</p>
                  </div>
                  <span className="text-sm text-stone-500 group-hover:text-neutral-900 transition">Ver série →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Especialidades</p>
              <h2 className="font-serif text-4xl text-neutral-900 mt-2">Narrativas sob medida</h2>
            </div>
            <Button variant="outline" onClick={() => navigate('/portfolio')}>
              Ver tudo
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/portfolio?category=${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white px-4 py-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xl text-neutral-900">{cat.name}</span>
                  <span className="text-sm text-neutral-400 group-hover:text-stone-500 transition">→</span>
                </div>
                <p className="mt-3 text-sm text-neutral-500 leading-relaxed">Narrativas elegantes para {cat.name.toLowerCase()}.</p>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-neutral-900 to-stone-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2 space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-300">A experiência</p>
            <h2 className="font-serif text-4xl leading-tight">Curadoria completa, do primeiro contato à entrega final.</h2>
            <p className="text-stone-200 leading-relaxed">
              Processos claros, direção delicada e pós-produção atenta aos detalhes para entregar imagens atemporais.
            </p>
            <Button onClick={() => navigate('/contact')} variant="outline" className="border-white text-white hover:bg-white hover:text-neutral-900">
              Fale comigo
            </Button>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{ title: 'Briefing sensível', desc: 'Escuta ativa para entender o que torna sua história única.' }, { title: 'Direção sutil', desc: 'Condução natural para gestos autênticos e elegantes.' }, { title: 'Edição artesanal', desc: 'Paleta coesa, contraste suave e nitidez precisa.' }].map((item) => (
              <div key={item.title} className="p-6 border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl">
                <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                <p className="text-sm text-stone-200 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-neutral-900">Vamos criar algo que resista ao tempo.</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto mt-4 leading-relaxed">
            Ensaio editorial, casamento intimista ou retrato de marca. Cada projeto recebe direção exclusiva e entrega refinada.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button onClick={() => navigate('/portfolio')}>Ver projetos</Button>
            <Button variant="outline" onClick={() => navigate('/contact')}>Solicitar proposta</Button>
          </div>
        </div>
      </section>
    </>
  );
};

// --- ABOUT PAGE ---
export const About: React.FC = () => {
  const settings = dataService.getSettings();
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": settings.photographerName,
    "url": window.location.href,
    "sameAs": [
      `https://instagram.com/${settings.instagram}`,
      `https://behance.net/${settings.behance}`
    ],
    "jobTitle": "Photographer",
    "description": settings.shortBio
  };

  return (
    <div className="container mx-auto px-6 py-12 md:py-24 animate-fade-in">
      <SEO title="About" description={`Learn more about ${settings.photographerName}`} schema={schema} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="relative">
          <img src="https://picsum.photos/id/64/800/1000" alt="Photographer" className="w-full h-auto grayscale" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-stone-100 -z-10 hidden md:block"></div>
        </div>
        
        <div className="space-y-8 pt-8">
          <h1 className="font-serif text-5xl text-neutral-900">About {settings.photographerName.split(' ')[0]}</h1>
          <p className="text-neutral-600 leading-relaxed text-lg font-light">
            Photography is more than just capturing a moment; it's about preserving the feeling of that moment. 
            With over a decade of experience behind the lens, I strive to create images that are honest, emotive, and timeless.
          </p>
          <p className="text-neutral-600 leading-relaxed text-lg font-light">
            My approach is minimalist and observational. I prefer natural light and unposed interactions, allowing the true character of my subjects to shine through.
          </p>

          <div className="pt-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-6">Publications & Features</h3>
            <ul className="space-y-3">
              {['Vogue Italia', 'Kinfolk Magazine', 'Harper\'s Bazaar', 'The Lane'].map((pub, i) => (
                <li key={i} className="flex items-center text-stone-500">
                  <span className="w-8 h-[1px] bg-stone-300 mr-4"></span> {pub}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-32">
        <SectionTitle title="Kind Words" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1,2,3].map(i => (
            <div key={i} className="bg-neutral-50 p-10">
              <p className="font-serif text-lg italic text-neutral-600 mb-6">
                "Absolutely breathtaking work. {settings.photographerName} has an incredible eye for detail and made us feel so comfortable."
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-900">- Client Name</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SERVICES PAGE ---
export const Services: React.FC = () => {
  const services = dataService.getServices();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((s, i) => ({
      "@type": "Offer",
      "position": i + 1,
      "name": s.title,
      "description": s.description,
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "USD",
        "price": s.priceDisplay.replace(/[^0-9]/g, '') || "0"
      }
    }))
  };

  return (
    <div className="container mx-auto px-6 py-12 md:py-24 animate-fade-in">
      <SEO title="Services & Investment" description="Pricing and packages for photography services." schema={schema} />
      <SectionTitle title="Investment" subtitle="Services & Pricing" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service) => (
          <div key={service.id} className="border border-neutral-200 p-10 flex flex-col hover:border-stone-500 transition-colors duration-300">
            <h3 className="font-serif text-2xl mb-4 text-neutral-900">{service.title}</h3>
            <div className="w-12 h-[1px] bg-stone-300 mb-6"></div>
            <p className="text-neutral-500 mb-8 flex-grow leading-relaxed">{service.description}</p>
            <p className="text-xl font-medium text-stone-600 mb-6">{service.priceDisplay}</p>
            <Link to={`/contact?service=${encodeURIComponent(service.title)}`}>
              <Button variant="outline" className="w-full">Inquire</Button>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-32 max-w-3xl mx-auto">
        <SectionTitle title="FAQ" />
        <div className="space-y-6">
          {[
            { q: "Do you travel for weddings?", a: "Yes, I am available worldwide. Travel fees apply for locations outside of the main city area." },
            { q: "How many images will we receive?", a: "For a full wedding day, you can expect between 500-700 fully edited images." },
            { q: "What is your turnaround time?", a: "Portrait sessions are delivered within 2 weeks. Weddings are delivered within 6-8 weeks." }
          ].map((faq, i) => (
            <div key={i} className="border-b border-neutral-100 pb-6">
              <h4 className="font-medium text-neutral-900 mb-2">{faq.q}</h4>
              <p className="text-neutral-500 font-light">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- CONTACT PAGE ---
export const Contact: React.FC = () => {
  const settings = dataService.getSettings();
  const [formData, setFormData] = React.useState({ name: '', email: '', service: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent. (This is a demo)");
    setFormData({ name: '', email: '', service: '', message: '' });
  };

  return (
    <div className="container mx-auto px-6 py-12 md:py-24 animate-fade-in">
      <SEO title="Contact" description="Get in touch for bookings and inquiries." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
        <div>
          <h1 className="font-serif text-5xl text-neutral-900 mb-6">Get in Touch</h1>
          <p className="text-neutral-500 mb-10 text-lg font-light">
            Currently booking for the upcoming season. Please fill out the form or email me directly at <a href={`mailto:${settings.email}`} className="border-b border-neutral-300 text-neutral-900">{settings.email}</a>.
          </p>
          
          <div className="space-y-2 mb-10">
            <p className="text-neutral-400 uppercase tracking-widest text-xs">Direct Contact</p>
            <p className="text-xl font-serif">{settings.phone}</p>
            <p className="text-xl font-serif">{settings.email}</p>
          </div>

          <a 
            href={`https://wa.me/15550123456?text=Hello%20${settings.photographerName},%20I'd%20like%20to%20inquire%20about%20a%20session.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors"
          >
            <div className="p-3 bg-green-50 rounded-full text-green-700">
               {/* Simplified whatsapp icon */}
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <span className="font-medium">Chat on WhatsApp</span>
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400">Name</label>
              <Input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400">Email</label>
              <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400">Interest</label>
            <select 
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full bg-white border-b border-neutral-300 px-0 py-3 text-neutral-900 focus:border-stone-500 focus:outline-none"
            >
              <option value="">Select a service type</option>
              <option value="Wedding">Wedding Photography</option>
              <option value="Portrait">Portrait Session</option>
              <option value="Editorial">Editorial / Commercial</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400">Message</label>
            <Textarea name="message" value={formData.message} onChange={handleChange} required />
          </div>

          <Button type="submit" size="lg" className="w-full md:w-auto">Send Message</Button>
        </form>
      </div>
    </div>
  );
};