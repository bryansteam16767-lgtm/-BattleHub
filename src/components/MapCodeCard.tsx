import { motion } from "motion/react";
import { Copy, Check, Gamepad } from "lucide-react";
import { useState } from "react";
import { MapCode } from "../types";

export default function MapCodeCard({ mapCode }: { mapCode: MapCode }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mapCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bento-card group p-0 min-h-[280px]"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={mapCode.image}
          alt={mapCode.title}
          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gaming-bg via-gaming-bg/40 to-transparent" />
      </div>

      <div className="relative z-10 p-6 flex flex-col h-full justify-between">
        <div>
          <span className="inline-block px-2 py-1 bg-brand-purple/20 border border-brand-purple/30 text-brand-purple text-[10px] font-bold rounded-lg mb-4 uppercase tracking-widest">
            {mapCode.category}
          </span>
          <h3 className="text-xl font-display font-bold leading-tight mb-2 group-hover:text-brand-purple transition-colors">
            {mapCode.title}
          </h3>
          <p className="text-gray-500 text-xs flex items-center gap-1">
             <Gamepad size={12} /> Creado por: <span className="text-gray-300 font-bold">{mapCode.creator}</span>
          </p>
        </div>

        <div className="mt-8 flex items-center gap-2">
           <div className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono font-black text-brand-cyan tracking-wider text-center text-lg">
             {mapCode.code}
           </div>
           <button 
             onClick={copyToClipboard}
             className={`p-4 rounded-xl transition-all ${copied ? "bg-green-500 text-white" : "bg-brand-purple text-white hover:scale-105"}`}
           >
             {copied ? <Check size={20} /> : <Copy size={20} />}
           </button>
        </div>
      </div>
    </motion.div>
  );
}
