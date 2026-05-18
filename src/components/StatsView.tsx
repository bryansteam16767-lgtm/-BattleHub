import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, Trophy, TrendingUp, Users, Target, Loader2 } from "lucide-react";

export default function StatsView() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    setLoading(true);
    // Note: In a real app, this would call /api/fortnite/stats/:username
    // For this prototype, we'll simulate a professional stats response
    setTimeout(() => {
      setStats({
        account: { name: username },
        stats: {
          all: {
            overall: {
              wins: Math.floor(Math.random() * 500) + 50,
              kd: (Math.random() * 4 + 1).toFixed(2),
              winRate: (Math.random() * 20 + 5).toFixed(1),
              matches: Math.floor(Math.random() * 5000) + 1000,
              kills: Math.floor(Math.random() * 15000) + 2000
            }
          }
        }
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-display font-black uppercase tracking-tight">Rastreador de <span className="text-brand-purple">Estadísticas</span></h2>
        <p className="text-gray-500">Consulta tus victorias, K/D y clasificación global de Fortnite.</p>
        
        <form onSubmit={handleSearch} className="relative max-w-lg mx-auto">
          <input 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Introduce ID de Epic Games..."
            className="w-full bg-gaming-card border-2 border-white/10 rounded-2xl px-6 py-4 text-lg font-bold focus:outline-none focus:border-brand-purple transition-all pr-32"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-brand-purple text-white px-6 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : "BUSCAR"}
          </button>
        </form>
      </div>

      {stats && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="md:col-span-3 bg-brand-purple rounded-3xl p-8 flex items-center justify-between overflow-hidden relative group">
             <div className="relative z-10">
               <h3 className="text-sm font-black uppercase tracking-[0.3em] opacity-70 mb-1">Jugador Encontrado</h3>
               <p className="text-5xl font-display font-black tracking-tighter uppercase">{stats.account.name}</p>
             </div>
             <Trophy size={120} className="absolute -right-8 -bottom-8 opacity-20 group-hover:scale-110 transition-transform" />
          </div>

          <div className="bg-gaming-card border border-white/5 rounded-3xl p-8 space-y-2">
            <div className="flex items-center gap-3 text-brand-cyan mb-4">
               <TrendingUp size={24} />
               <span className="font-black uppercase tracking-widest text-xs">Win Rate</span>
            </div>
            <p className="text-4xl font-display font-black">{stats.stats.all.overall.winRate}%</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Ratio de Victorias Global</p>
          </div>

          <div className="bg-gaming-card border border-white/5 rounded-3xl p-8 space-y-2">
            <div className="flex items-center gap-3 text-red-500 mb-4">
               <Target size={24} />
               <span className="font-black uppercase tracking-widest text-xs">K/D Ratio</span>
            </div>
            <p className="text-4xl font-display font-black">{stats.stats.all.overall.kd}</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Eliminaciones por muerte</p>
          </div>

          <div className="bg-gaming-card border border-white/5 rounded-3xl p-8 space-y-2">
            <div className="flex items-center gap-3 text-yellow-500 mb-4">
               <Users size={24} />
               <span className="font-black uppercase tracking-widest text-xs">Victorias</span>
            </div>
            <p className="text-4xl font-display font-black">{stats.stats.all.overall.wins}</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Total Victorias Magistrales</p>
          </div>
        </motion.div>
      )}

      {/* Placeholder for concurrency count if no stats searched */}
      {!stats && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
          <div className="bg-gaming-card/50 border border-dashed border-white/10 rounded-3xl p-12 text-center">
             <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Jugadores Online Ahora</h4>
             <p className="text-4xl font-display font-black text-brand-purple">1,245,903</p>
          </div>
          <div className="bg-gaming-card/50 border border-dashed border-white/10 rounded-3xl p-12 text-center">
             <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Modo más Jugado</h4>
             <p className="text-4xl font-display font-black text-brand-purple">Ranked Reload</p>
          </div>
        </div>
      )}
    </div>
  );
}
