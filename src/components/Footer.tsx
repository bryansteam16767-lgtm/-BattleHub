import { Facebook, Twitter, Instagram, Youtube, Github, Mail } from "lucide-react";

export default function Footer() {
  const links = [
    { name: "Sobre Nosotros", href: "#" },
    { name: "Contacto", href: "#" },
    { name: "Política de Privacidad", href: "#" },
    { name: "Términos y Condiciones", href: "#" }
  ];

  return (
    <footer className="bg-gaming-card border-t border-gaming-border pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-display font-black tracking-tighter mb-6">GAMERS<span className="text-brand-purple">HUB</span></h2>
            <p className="text-gray-400 max-w-sm mb-6">
              Tu portal líder en noticias de videojuegos, guías competitivas y comunidad gamer. 
              Todo el contenido real generado por expertos y optimizado para el mejor rendimiento.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-brand-purple hover:border-brand-purple transition-all cursor-pointer group">
                <Twitter size={18} className="text-gray-400 group-hover:text-white" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-brand-purple hover:border-brand-purple transition-all cursor-pointer group">
                <Instagram size={18} className="text-gray-400 group-hover:text-white" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-brand-purple hover:border-brand-purple transition-all cursor-pointer group">
                <Youtube size={18} className="text-gray-400 group-hover:text-white" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider">Enlaces Rápidos</h3>
            <ul className="space-y-4">
              {links.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Recibe las últimas noticias en tu correo.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="tu@email.com"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-purple"
              />
              <button className="bg-brand-purple px-4 py-2 rounded-lg hover:bg-brand-purple/80 transition-colors">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-xs">
          © 2026 GamersHub Pro - Todos los derechos reservados. Optimizado para Google AdSense.
        </div>
      </div>
    </footer>
  );
}
