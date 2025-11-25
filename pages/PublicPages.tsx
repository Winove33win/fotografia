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
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-20 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-8">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight text-neutral-900">
              Capturing <br/> <span className="italic text-stone-500">Silence</span> & Light
            </h1>
            <p className="text-neutral-500 max-w-md leading-relaxed text-lg">
              {settings.shortBio}
            </p>
            <div className="flex gap-4 pt-4">
              <Button onClick={() => navigate('/portfolio')}>View Portfolio</Button>
              <Button variant="outline" onClick={() => navigate('/contact')}>Contact Me</Button>
            </div>
          </div>
          <div className="order-1 md:order-2 relative h-[50vh] md:h-[70vh] overflow-hidden">
             <img 
               src="https://picsum.photos/id/42/1000/1500" 
               alt="Hero" 
               className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
             />
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6">
          <SectionTitle title="Selected Works" subtitle="Recent Projects" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link to={`/portfolio/${project.slug}`} key={project.id} className="group block">
                <div className="overflow-hidden aspect-[3/4] mb-4">
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <h3 className="font-serif text-2xl text-neutral-900 group-hover:text-stone-500 transition-colors">{project.title}</h3>
                <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">{project.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                to={`/portfolio?category=${cat.slug}`}
                className="aspect-square flex flex-col items-center justify-center border border-neutral-100 hover:border-stone-500 hover:bg-neutral-50 transition-all duration-300 group"
              >
                <span className="font-serif text-xl md:text-2xl text-neutral-900 group-hover:translate-y-[-5px] transition-transform duration-300">{cat.name}</span>
                <span className="opacity-0 group-hover:opacity-100 text-xs text-stone-500 uppercase tracking-widest mt-2 transition-opacity duration-300">View Gallery</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center bg-stone-800 text-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-6xl mb-8">Let's Create Something Timeless</h2>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-stone-900" onClick={() => navigate('/contact')}>
            Book a Session
          </Button>
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