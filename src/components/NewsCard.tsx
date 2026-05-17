import { motion } from "motion/react";
import { Article } from "../types";
import { ArrowRight } from "lucide-react";

interface NewsCardProps {
  article: Article;
  onClick: (article: Article) => void;
  span?: string;
}

export default function NewsCard({ article, onClick, span = "col-span-1 row-span-1" }: NewsCardProps) {
  const isLarge = span.includes("col-span-2") || span.includes("row-span-2");

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bento-card group cursor-pointer ${span}`}
      onClick={() => onClick(article)}
    >
      <div className="absolute inset-0 z-0">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gaming-bg via-gaming-bg/60 to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="card-tag mb-4">{article.category}</div>
        
        <h3 className={`${isLarge ? "text-2xl md:text-3xl" : "text-lg"} font-display font-bold mb-2 group-hover:text-brand-purple transition-colors leading-tight`}>
          {article.title}
        </h3>
        
        {isLarge && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 max-w-md">
            {article.summary}
          </p>
        )}
        
        <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">
          VER MÁS <ArrowRight size={12} />
        </div>
      </div>
    </motion.div>
  );
}
