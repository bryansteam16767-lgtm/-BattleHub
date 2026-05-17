import { motion } from "motion/react";
import { Article } from "../types";
import { Calendar, User, ArrowLeft, Share2, MessageSquare } from "lucide-react";
import AdBanner from "./AdBanner";

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

export default function ArticleView({ article, onBack }: ArticleViewProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto pt-24 pb-12 px-4"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-brand-cyan hover:text-white transition-colors mb-8 font-bold"
      >
        <ArrowLeft size={18} /> VOLVER AL INICIO
      </button>

      <header className="mb-12">
        <span className="inline-block px-4 py-1 bg-brand-purple text-white text-sm font-bold rounded-full mb-6 uppercase tracking-widest">
          {article.category}
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-black leading-tight mb-8">
          {article.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm border-y border-white/5 py-4">
          <div className="flex items-center gap-2">
            <User size={18} className="text-brand-purple" />
            <span>Por: <b className="text-white">{article.author}</b></span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-brand-purple" />
            <span>{article.date}</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Share2 size={18} className="hover:text-brand-cyan cursor-pointer transition-colors" />
            <MessageSquare size={18} className="hover:text-brand-cyan cursor-pointer transition-colors" />
          </div>
        </div>
      </header>

      <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-brand-purple/10">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <AdBanner slot="Top Article Ad" />

      <div className="prose prose-invert prose-purple max-w-none">
        <p className="text-xl text-gray-300 leading-relaxed mb-8 italic border-l-4 border-brand-cyan pl-6">
          {article.summary}
        </p>
        
        <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
          {article.content}
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-2">
        {article.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-xs text-gray-400 hover:bg-white/10 transition-colors cursor-pointer">
            #{tag}
          </span>
        ))}
      </div>

      <AdBanner slot="Bottom Article Ad" />
      
      <div className="mt-16 p-8 bg-gaming-card rounded-3xl border border-white/5">
        <h3 className="text-2xl font-display font-bold mb-4">Sobre el Autor</h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple text-2xl font-black">
            {article.author[0]}
          </div>
          <div>
            <p className="font-bold text-lg">{article.author}</p>
            <p className="text-gray-400 text-sm">Editor Senior en GamersHub con más de 10 años de experiencia en la industria de los videojuegos.</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
