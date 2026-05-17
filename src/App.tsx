import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewsCard from "./components/NewsCard";
import ArticleView from "./components/ArticleView";
import CreatorDashboard from "./components/CreatorDashboard";
import AdBanner from "./components/AdBanner";
import { MOCK_ARTICLES } from "./constants";
import { Article, Category } from "./types";
import { Sparkles, Loader2, Layout } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<Category>("Inicio");
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCreatorMode, setIsCreatorMode] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState(false);

  const SECRET_CODE = "2026";

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === SECRET_CODE) {
      setIsCreatorMode(true);
      setShowAccessModal(false);
      setAccessCode("");
      setAccessError(false);
    } else {
      setAccessError(true);
      setAccessCode("");
    }
  };

  const handlePublish = (newArticle: Article) => {
    setArticles(prev => [newArticle, ...prev]);
    setIsCreatorMode(false);
    setCurrentCategory("Inicio");
    window.scrollTo(0, 0);
  };

  const generateAutoNews = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/news/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: currentCategory })
      });
      const newArticle = await response.json();
      
      if (newArticle.title) {
        setArticles(prev => [{
          ...newArticle,
          id: Math.random().toString(36).substr(2, 9),
          image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800"
        }, ...prev]);
      }
    } catch (error) {
      console.error("Error generating news:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo(0, 0);
  };

  const filteredArticles = currentCategory === "Inicio" 
    ? articles 
    : articles.filter(a => a.category === currentCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        currentCategory={currentCategory} 
        setCategory={(c) => {
          setCurrentCategory(c);
          setSelectedArticle(null);
          setIsCreatorMode(false);
          window.scrollTo(0, 0);
        }} 
      />

      <div className="fixed top-20 left-0 w-full z-40 bg-brand-purple/90 backdrop-blur-sm overflow-hidden h-8 flex items-center border-y border-white/10">
        <div className="bg-red-600 px-3 h-full flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-white shrink-0 animate-pulse">
           LIVE
        </div>
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-white text-[11px] font-bold uppercase tracking-tighter items-center">
          <span>Actualización: Servidores en mantenimiento (2:00 AM)</span>
          <span className="text-white/50">•</span>
          <span>Nueva Skin 'Shadow Midas' filtrada en los archivos</span>
          <span className="text-white/50">•</span>
          <span>Torneo de Cero Construcción con $50,000 en premios inicia hoy</span>
          <span className="text-white/50">•</span>
          <span>Busca los nuevos códigos de mapas creativos en la sección de Mapas</span>
        </div>
      </div>

      <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="fixed bottom-8 right-8 z-50">
          {!isCreatorMode && (
            <button 
              onClick={() => setShowAccessModal(true)}
              className="flex items-center gap-2 bg-gaming-card border border-brand-purple text-brand-purple px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-brand-purple hover:text-white transition-all group"
            >
              <Layout size={20} className="group-hover:rotate-12 transition-transform" />
              PANEL CREADOR
            </button>
          )}
        </div>

        <AnimatePresence>
          {showAccessModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-gaming-bg/90 backdrop-blur-md px-4"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gaming-card border border-brand-purple p-8 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(124,58,237,0.2)]"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-brand-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Layout className="text-brand-purple" size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-black tracking-tighter">ÁREA RESTRINGIDA</h3>
                  <p className="text-gray-500 text-sm">Introduce el código de acceso del equipo.</p>
                </div>

                <form onSubmit={handleAccessSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="password"
                      value={accessCode}
                      onChange={(e) => {
                        setAccessCode(e.target.value);
                        setAccessError(false);
                      }}
                      autoFocus
                      placeholder="CÓDIGO SECRETO"
                      className={`w-full bg-white/5 border ${accessError ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-4 text-center text-xl font-black tracking-[0.5em] focus:outline-none focus:border-brand-purple transition-all`}
                    />
                    {accessError && <p className="text-red-500 text-[10px] font-bold text-center mt-2 uppercase tracking-widest">Código Incorrecto</p>}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button 
                      type="button"
                      onClick={() => setShowAccessModal(false)}
                      className="flex-1 px-4 py-3 bg-white/5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
                    >
                      CANCELAR
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 px-4 py-3 bg-brand-purple rounded-xl font-bold text-sm shadow-lg shadow-brand-purple/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      ACCEDER
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isCreatorMode ? (
            <motion.div key="creator" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
               <CreatorDashboard onPublish={handlePublish} onClose={() => setIsCreatorMode(false)} />
            </motion.div>
          ) : !selectedArticle ? (
            <motion.div
              key="feed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section if on Home */}
              {currentCategory === "Inicio" && (
                <div className="mb-12 relative rounded-3xl overflow-hidden bg-gaming-card border border-white/5 h-[400px] flex items-center p-8 md:p-16">
                  <div className="absolute inset-0 bg-linear-to-r from-gaming-bg to-transparent z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                  <div className="relative z-20 max-w-2xl">
                    <span className="text-brand-cyan font-bold tracking-widest mb-4 block uppercase underline underline-offset-8 decoration-2">DESTACADO</span>
                    <h2 className="text-4xl md:text-6xl font-display font-black mb-6 leading-tight">
                      Domina la Arena con GamersHub
                    </h2>
                    <p className="text-gray-300 text-lg mb-8">
                      Tu fuente número uno para noticias, trucos y guías profesionales de los juegos más populares del momento.
                    </p>
                    <button 
                      onClick={generateAutoNews}
                      disabled={isGenerating}
                      className="bg-brand-purple hover:bg-brand-purple/80 px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all glow-purple disabled:opacity-50"
                    >
                      {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                      {isGenerating ? "GENERANDO NOTICIAS..." : "NOTICIAS AUTOMATICAS (IA)"}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <h2 className="text-3xl font-display font-black uppercase tracking-tight">
                  <span className="text-brand-purple">|</span> {currentCategory} <span className="text-gray-600 font-normal">Noticias Recientes</span>
                </h2>
                
                <div className="flex bg-gaming-card p-1 rounded-lg border border-white/5">
                  <button className="px-4 py-1 text-xs font-bold text-brand-cyan bg-white/5 rounded-md">ÚLTIMAS</button>
                  <button className="px-4 py-1 text-xs font-bold text-gray-500 hover:text-white">POPULARES</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-6 gap-4 auto-rows-[200px]">
                {filteredArticles.map((article, idx) => {
                  let span = "md:col-span-1 md:row-span-1";
                  if (idx === 0) span = "md:col-span-2 md:row-span-2";
                  if (idx === 1) span = "md:col-span-1 md:row-span-2";
                  if (idx === 4) span = "md:col-span-2 md:row-span-1";
                  
                  return (
                    <div key={article.id} className={span}>
                      <NewsCard 
                        article={article} 
                        onClick={handleArticleClick} 
                        span="w-full h-full"
                      />
                    </div>
                  );
                })}
                
                {/* Ad Slot in Grid */}
                <div className="md:col-span-1 md:row-span-2 bg-gaming-card border border-dashed border-white/10 rounded-[20px] flex flex-col items-center justify-center text-center p-6 grayscale hover:grayscale-0 transition-all">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 font-bold">Publicidad</span>
                  <div className="w-20 h-20 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-gray-600 mb-4 font-black">ADS</div>
                  <p className="text-[11px] text-gray-600">Espacio optimizado para AdSense</p>
                </div>

                <div className="md:col-span-2 md:row-span-1 bg-brand-purple rounded-[20px] p-8 flex items-center justify-between group overflow-hidden relative">
                   <div className="relative z-10">
                      <h3 className="text-2xl font-display font-black mb-1">CÓDIGOS ROBLOX</h3>
                      <p className="text-white/70 text-sm">Actualizados hace 2 horas</p>
                   </div>
                   <button className="relative z-10 bg-white text-brand-purple px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">VER TODOS</button>
                   <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                      <Sparkles size={120} />
                   </div>
                </div>
              </div>
              
              {filteredArticles.length === 0 && (
                <div className="text-center py-24 text-gray-500">
                  No hay artículos en esta categoría aún. ¡Haz clic en el botón de noticias automáticas!
                </div>
              )}

              <div className="mt-12 text-center">
                 <button className="border border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white px-8 py-3 rounded-xl font-bold transition-all">
                  CARGAR MÁS ARTÍCULOS
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="article" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ArticleView 
                article={selectedArticle} 
                onBack={() => setSelectedArticle(null)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
