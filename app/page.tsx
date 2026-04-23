"use client"
import { useState, useEffect } from "react";

export default function Home() {
  // --- ÉTATS ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // --- CONFIGURATION ---
  const whatsappNumber = "243971265685";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Bonjour%20Pizzaia,%20j'aimerais%20passer%20une%20commande%20!`;

  const popularPizzas = [
    { id: 1, name: "Margherita Royale", price: "16$", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800" },
    { id: 2, name: "Calabrese Piccante", price: "19$", img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800" },
    { id: 3, name: "Tartufo Nero", price: "24$", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800" }
  ];

  const testimonials = [
    { id: 1, name: "Jean-Pierre Kabila", role: "Critique Gastronomique", content: "La meilleure pâte napolitaine de Kinshasa. On sent vraiment le travail de fermentation de 48h. Une expérience authentique.", avatar: "JP" },
    { id: 2, name: "Sarah Mwamba", role: "Cliente Fidèle", content: "Le service via WhatsApp est ultra rapide. Les pizzas arrivent chaudes et croustillantes. La Tartuffo est à tomber par terre !", avatar: "SM" },
    { id: 3, name: "Marc Duval", role: "Chef de Cuisine", content: "Ingrédients de première qualité. La sauce tomate San Marzano fait toute la différence. Bravo à l'équipe.", avatar: "MD" }
  ];

  const navLinks = [
    { name: 'Accueil', link: '#accueil' },
    { name: 'Menu', link: '#menu' },
    { name: 'Tradition', link: '#tradition' },
    { name: 'Témoignages', link: '#avis' },
    { name: 'Contact', link: '#contact' }
  ];

  // --- LOGIQUE ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-[#fffcf7] text-slate-900 selection:bg-red-100 selection:text-red-900 scroll-smooth">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4 ${isScrolled || isMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-orange-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#accueil" className="flex items-center space-x-2 group z-[60]">
              <img src="images/logo.jpg" className="rounded-2xl shadow-2xl h-7 w-16" alt="Chef" />
            <span className={`font-serif font-black text-2xl tracking-tight transition-colors ${isScrolled || isMenuOpen ? 'text-slate-900' : 'text-white'}`}></span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <a key={item.name} href={item.link} className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-red-600 ${isScrolled ? 'text-slate-600' : 'text-white/90'}`}>
                {item.name}
              </a>
            ))}
            <a href={whatsappLink} target="_blank" className="bg-red-600 text-white px-7 py-2.5 rounded-full text-sm font-bold uppercase hover:bg-red-700 transition-all shadow-lg">
              Commander
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden z-[60] p-2">
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current rounded-full transition-all ${isMenuOpen ? 'rotate-45 translate-y-2 text-slate-900' : (!isScrolled ? 'text-white' : 'text-slate-900')}`} />
              <span className={`w-full h-0.5 bg-current rounded-full transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'} ${!isScrolled && !isMenuOpen ? 'text-white' : 'text-slate-900'}`} />
              <span className={`w-full h-0.5 bg-current rounded-full transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2.5 text-slate-900' : (!isScrolled ? 'text-white' : 'text-slate-900')}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* --- MOBILE OVERLAY --- */}
      <div className={`fixed inset-0 z-[55] bg-white transition-transform duration-500 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full justify-center items-center space-y-8 px-6">
          {navLinks.map((item) => (
            <a key={item.name} href={item.link} onClick={() => setIsMenuOpen(false)} className="text-4xl font-serif font-bold text-slate-900 italic">
              {item.name}
            </a>
          ))}
          <a href={whatsappLink} className="w-full max-w-xs bg-red-600 text-white py-4 rounded-full text-center font-bold uppercase">Commander WhatsApp</a>
        </div>
      </div>

      {/* --- HERO --- */}
      <section id="accueil" className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920" className="w-full h-full object-cover animate-slow-zoom" alt="Pizza" />
        </div>
        <div className="relative z-20 w-full max-w-7xl px-6 md:px-12">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block px-4 py-1.5 bg-red-600 text-white text-xs font-bold uppercase tracking-[0.3em] rounded-sm">empreinte infinie</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white leading-[0.9] animate-slide-up">L'Art de la <br/> <span className="italic text-red-500">Parfaite</span> Sandwich.</h1>
            <p className="text-lg text-white/80 font-light max-w-md animate-fade-in-delayed">Le goût authentique de l'Italie au cœur de Kinshasa.</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-delayed">
              <a href="#menu" className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-center">Voir le Menu</a>
              <a href={whatsappLink} className="border border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-center italic">WhatsApp Direct</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- MENU --- */}
      <section id="menu" className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-sm font-bold text-red-600 uppercase tracking-[0.4em] mb-4">Nos Signatures</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold italic">Le Goût de la Tradition</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {popularPizzas.map((pizza) => (
            <div key={pizza.id} className="group relative overflow-hidden rounded-[2rem] shadow-xl h-[450px]">
              <img src={pizza.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={pizza.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-8 text-white w-full">
                <h4 className="text-2xl font-serif font-bold">{pizza.name}</h4>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-serif italic font-bold text-red-500">{pizza.price}</span>
                  <a href={whatsappLink} className="bg-white text-slate-900 px-6 py-2 rounded-xl text-sm font-bold">Commander</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION TÉMOIGNAGES HAUT DE GAMME --- */}
      <section id="avis" className="py-32 bg-white relative">
        {/* Décoration d'arrière-plan discrète */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03] flex justify-center items-center">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('images/logo.jpg')" }}></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-red-600 font-bold uppercase tracking-[0.5em] text-xs mb-4">L'Expérience Client</h2>
            <h3 className="text-4xl md:text-5xl font-serif italic text-slate-900">Paroles de Gourmets</h3>
          </div>

          <div className="relative min-h-[400px] md:min-h-[300px]">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`transition-all duration-1000 ease-in-out absolute inset-0 flex flex-col items-center text-center ${
                  i === currentTestimonial 
                  ? "opacity-100 scale-100 translate-y-0" 
                  : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                }`}
              >
                {/* Icône de citation élégante */}
                <svg className="w-12 h-12 text-red-600 mb-8 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.899 14.899 16 16.017 16H19.017C19.567 16 20.017 15.55 20.017 15V9C20.017 8.45 19.567 8 19.017 8H15.017C14.467 8 14.017 8.45 14.017 9V11C14.017 11.55 13.567 12 13.017 12H12.017V5H22.017V15C22.017 18.314 19.331 21 16.017 21H14.017ZM3.017 21V18C3.017 16.899 3.899 16 5.017 16H8.017C8.567 16 9.017 15.55 9.017 15V9C9.017 8.45 8.567 8 8.017 8H4.017C3.467 8 3.017 8.45 3.017 9V11C3.017 11.55 2.567 12 2.017 12H1.017V5H11.017V15C11.017 18.314 8.331 21 5.017 21H3.017Z" />
                </svg>

                <blockquote className="max-w-3xl">
                  <p className="text-2xl md:text-3xl font-serif italic text-slate-800 leading-[1.6] mb-10 tracking-tight">
                    "{t.content}"
                  </p>
                </blockquote>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-px bg-red-600 mb-6 opacity-40"></div>
                  <h4 className="font-bold text-slate-900 tracking-widest uppercase text-sm mb-1">{t.name}</h4>
                  <p className="text-red-600 font-serif italic text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation épurée */}
          <div className="flex justify-between items-center mt-12 max-w-[200px] mx-auto">
            <button 
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors group"
            >
              <span className="text-2xl font-light group-hover:-translate-x-1 inline-block transition-transform">←</span>
            </button>

            <div className="flex space-x-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === currentTestimonial ? "w-8 bg-red-600" : "w-2 bg-slate-200 hover:bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors group"
            >
              <span className="text-2xl font-light group-hover:translate-x-1 inline-block transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* --- TRADITION --- */}
      <section id="tradition" className="py-24 bg-[#1a1a1a] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-serif font-bold italic leading-tight">Le vrai goût <br/> qui nous rassemble.</h2>
            <p className="text-white/60 text-lg leading-relaxed">Notre secret ? Des recettes authentiques et cette saveur qui rappelle la maison.</p>
            <a href={whatsappLink} className="inline-block bg-red-600 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm">Découvrir</a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=600" className="rounded-2xl mt-12 shadow-2xl" alt="Chef" />
            <img src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600" className="rounded-2xl shadow-2xl" alt="Four" />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-white py-20 px-6 border-t border-orange-100">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <span className="font-serif font-black text-4xl italic text-slate-900 tracking-tighter">EMPRIENTE INFINIE.</span>
          <div className="flex flex-col md:row justify-center gap-10 text-slate-500 font-bold uppercase text-xs tracking-[0.2em]">
            <div><p className="text-slate-900">Adresse</p><p className="mt-2">Kinshasa, Gombe</p></div>
            <div><p className="text-slate-900">WhatsApp</p><a href={whatsappLink} className="mt-2 block text-red-600">+243 971 265 685</a></div>
            <div><p className="text-slate-900">Horaires</p><p className="mt-2">12h - 23h (7j/7)</p></div>
          </div>
          <p className="text-slate-400 text-[10px] pt-10 uppercase tracking-widest">© 2026 Pizzaia Gastronomie. Tous droits réservés.</p>
        </div>
      </footer>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        @keyframes slow-zoom { from { transform: scale(1.05); } to { transform: scale(1.15); } }
        .animate-slow-zoom { animation: slow-zoom 20s infinite alternate ease-in-out; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-delayed { animation: fadeIn 1.2s ease-out 0.4s forwards; opacity: 0; }
      `}</style>
    </div>
  );
}