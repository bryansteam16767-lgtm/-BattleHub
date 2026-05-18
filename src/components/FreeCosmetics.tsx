import React, { useEffect, useState } from "react";
import { Gift, Loader2 } from "lucide-react";

export default function FreeCosmetics() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFree = async () => {
      try {
        // We look for specifically tagged or free items in the database
        const response = await fetch("/api/fortnite/cosmetics");
        const data = await response.json();
        
        // Simulating free items filter logic
        const free = data.data.filter((i: any) => 
          i.type.value === "outfit" && 
          (i.description.toLowerCase().includes("free") || i.description.toLowerCase().includes("gratis") || i.id.includes("Starter"))
        ).slice(0, 20);

        setItems(free);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFree();
  }, []);

  if (loading) return <div className="py-20 text-center"><Loader2 className="animate-spin inline-block text-brand-purple" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          <Gift className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-3xl font-display font-black uppercase tracking-tight">RECOMPENSAS <span className="text-brand-purple">GRATUITAS</span></h2>
          <p className="text-gray-500 text-xs text-uppercase font-bold tracking-widest">Objetos que puedes conseguir sin gastar PaVos.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-gaming-card border border-white/5 rounded-3xl p-6 text-center group hover:border-green-500/50 transition-all">
             <div className="aspect-square mb-4 relative">
               <img src={item.images.icon} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
               <div className="absolute top-0 right-0 bg-green-500 text-[8px] font-black px-2 py-1 rounded-full uppercase">GRATIS</div>
             </div>
             <h3 className="font-bold text-sm mb-1">{item.name}</h3>
             <p className="text-[10px] text-gray-500 leading-tight">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
