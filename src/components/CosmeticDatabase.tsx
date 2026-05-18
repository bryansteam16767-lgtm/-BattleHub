import React, { useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, Filter, Loader2, Sparkles, AlertTriangle } from "lucide-react";

interface CosmeticItem {
  id: string;
  name: string;
  description: string;
  type: { displayValue: string };
  rarity: { displayValue: string; value: string };
  images: { icon: string; smallIcon: string };
  added: string;
}

export default function CosmeticDatabase({ type = "all" }: { type?: "all" | "new" }) {
  const [items, setItems] = useState<CosmeticItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [rarityFilter, setRarityFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const endpoint = type === "new" ? "/api/fortnite/cosmetics/new" : "/api/fortnite/cosmetics";
        const response = await fetch(endpoint);
        const data = await response.json();
        
        if (type === "new") {
          setItems(data.data.items || []);
        } else {
          setItems(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching cosmetics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = rarityFilter === "all" || item.rarity.displayValue === rarityFilter;
      return matchesSearch && matchesRarity;
    }).slice(0, 500); // Limit for performance
  }, [items, searchTerm, rarityFilter]);

  const rarities = useMemo(() => {
    const rSet = new Set<string>();
    items.forEach(i => rSet.add(i.rarity.displayValue));
    return Array.from(rSet).sort();
  }, [items]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="animate-spin text-brand-purple w-12 h-12" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Escaneando Archivos de Red...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-black uppercase tracking-tight flex items-center gap-3">
            {type === "new" ? (
              <>
                <AlertTriangle className="text-yellow-500" />
                FILTRACIONES <span className="text-brand-purple">RECIENTES</span>
              </>
            ) : (
              <>
                <Sparkles className="text-brand-purple" />
                BASE DE DATOS <span className="text-brand-purple">COSMÉTICOS</span>
              </>
            )}
          </h2>
          <p className="text-gray-500 text-xs mt-1">Más de {items.length} objetos encontrados en los archivos.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group min-w-[250px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre..."
              className="w-full bg-gaming-card border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs font-bold focus:outline-none focus:border-brand-purple transition-all"
            />
          </div>

          <div className="relative">
             <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
             <select 
              value={rarityFilter}
              onChange={(e) => setRarityFilter(e.target.value)}
              className="bg-gaming-card border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs font-bold text-gray-300 focus:outline-none focus:border-brand-purple appearance-none cursor-pointer"
             >
               <option value="all">TODAS LAS RAREZAS</option>
               {rarities.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
             </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-gaming-card border border-gaming-border rounded-xl overflow-hidden group hover:border-brand-purple/50 transition-all cursor-pointer"
          >
            <div className="aspect-square relative overflow-hidden bg-white/5">
              <img 
                src={item.images.icon || item.images.smallIcon} 
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-1 left-1">
                <div className={`w-2 h-2 rounded-full ${
                  item.rarity.value === 'legendary' ? 'bg-orange-500 shadow-[0_0_5px_#f97316]' :
                  item.rarity.value === 'epic' ? 'bg-purple-600 shadow-[0_0_5px_#9333ea]' :
                  item.rarity.value === 'rare' ? 'bg-blue-500 shadow-[0_0_5px_#3b82f6]' :
                  'bg-gray-500 shadow-[0_0_5px_#6b7280]'
                }`} />
              </div>
            </div>
            <div className="p-2 text-center">
              <p className="text-[10px] font-bold truncate">{item.name}</p>
              <p className="text-[8px] text-gray-500 font-bold uppercase truncate">{item.type.displayValue}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
         <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl">
           <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No se encontraron cosméticos.</p>
         </div>
      )}
    </div>
  );
}
