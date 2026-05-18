import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ShoppingCart, Clock, Star, Loader2 } from "lucide-react";

interface ShopEntry {
  devName: string;
  regularPrice: number;
  finalPrice: number;
  items: Array<{
    id: string;
    name: string;
    description: string;
    type: { value: string; displayValue: string };
    rarity: { value: string; displayValue: string };
    images: { featured?: string; icon: string };
  }>;
}

export default function ItemShop() {
  const [shopData, setShopData] = useState<ShopEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await fetch("/api/fortnite/shop");
        const data = await response.json();
        
        // Transform the combined shop structure
        const entries: ShopEntry[] = [];
        if (data.data?.featured?.entries) entries.push(...data.data.featured.entries);
        if (data.data?.daily?.entries) entries.push(...data.data.daily.entries);
        
        // Remove duplicates and entries without images
        const uniqueEntries = entries.filter((entry, index, self) => 
          entry.items[0]?.images.icon && 
          index === self.findIndex((e) => e.items[0]?.id === entry.items[0]?.id)
        );

        setShopData(uniqueEntries);
      } catch (error) {
        console.error("Error fetching shop:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShop();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="animate-spin text-brand-purple w-12 h-12" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Cargando Tienda Galáctica...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <ShoppingCart className="text-black w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-black uppercase tracking-tight">TIENDA DIARIA</h2>
            <p className="text-gray-500 text-xs flex items-center gap-2">
              <Clock size={12} /> SE ACTUALIZA CADA 24 HORAS
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {shopData.map((entry) => {
          const item = entry.items[0];
          if (!item) return null;

          return (
            <motion.div
              key={entry.items[0].id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              className="bg-gaming-card border border-gaming-border rounded-2xl overflow-hidden group relative"
            >
              <div className="aspect-square relative overflow-hidden bg-white/5">
                <img 
                  src={item.images.featured || item.images.icon} 
                  alt={item.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                    item.rarity.value === 'legendary' ? 'bg-orange-500 text-white' :
                    item.rarity.value === 'epic' ? 'bg-purple-600 text-white' :
                    item.rarity.value === 'rare' ? 'bg-blue-500 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {item.rarity.displayValue}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-bold truncate mb-1 group-hover:text-brand-purple transition-colors">
                  {item.name}
                </h3>
                <p className="text-[10px] text-gray-500 truncate mb-3">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-black text-brand-cyan">
                    <Star size={14} className="fill-brand-cyan" />
                    <span>{entry.finalPrice}</span>
                  </div>
                  <span className="text-[9px] text-gray-600 font-bold uppercase">{item.type.displayValue}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
