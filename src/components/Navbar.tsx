import { motion } from "motion/react";
import { Gamepad2, Menu, X } from "lucide-react";
import { useState } from "react";
import { CATEGORIES } from "../constants";
import { Category } from "../types";

interface NavbarProps {
  currentCategory: Category;
  setCategory: (cat: Category) => void;
}

export default function Navbar({ currentCategory, setCategory }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gaming-bg/60 backdrop-blur-xl border-b border-gaming-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCategory("Inicio")}>
            <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(124,58,237,0.3)]">
              <Gamepad2 className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-black tracking-tighter leading-tight">GAMERS<span className="text-brand-purple">HUB</span></span>
              <span className="text-[9px] font-black tracking-[0.2em] text-gray-500 -mt-1 uppercase">Noticias 24/7</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5 whitespace-nowrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.1em] transition-all ${
                    currentCategory === cat 
                    ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/20" 
                    : "text-gray-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 border-l border-white/10 pl-6 shrink-0">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
               <span className="text-[9px] font-black text-white tracking-[0.1em] uppercase">1.2M LIVE</span>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-gaming-card border-b border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentCategory === cat ? "text-brand-cyan bg-white/5" : "text-gray-300 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
