import React, { useState } from "react";
import { motion } from "motion/react";
import { Save, Sparkles, Send, Image as ImageIcon, Layout, Type, FileText, Loader2 } from "lucide-react";
import { Article, Category } from "../types";
import { CATEGORIES } from "../constants";

interface CreatorDashboardProps {
  onPublish: (article: Article) => void;
  onClose: () => void;
}

export default function CreatorDashboard({ onPublish, onClose }: CreatorDashboardProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "Fortnite" as Category,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    tags: ""
  });

  const refineField = async (type: "title" | "summary" | "draft") => {
    const textToProcess = type === "title" ? formData.title : (type === "summary" ? formData.content : formData.title);
    if (!textToProcess) return;

    setLoading(type);
    try {
      const response = await fetch("/api/ai/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, text: textToProcess, category: formData.category })
      });
      const data = await response.json();
      
      if (type === "title") setFormData({ ...formData, title: data.result });
      if (type === "summary") setFormData({ ...formData, summary: data.result });
      if (type === "draft") setFormData({ ...formData, content: data.result });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newArticle: Article = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      summary: formData.summary,
      content: formData.content,
      category: formData.category,
      image: formData.image,
      author: "Creador Hub",
      date: new Date().toISOString().split('T')[0],
      tags: formData.tags.split(',').map(t => t.trim())
    };
    onPublish(newArticle);
  };

  return (
    <div className="bg-gaming-card border border-gaming-border rounded-3xl p-8 max-w-5xl mx-auto my-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-brand-purple" />
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display font-black tracking-tight flex items-center gap-3">
            <Layout className="text-brand-purple" /> GAMERSHUB <span className="text-brand-purple">CREATOR</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Asistente editorial inteligente para AdSense.</p>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">CANCELAR</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative">
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block flex items-center gap-2">
                <Type size={14} /> Título del Artículo
              </label>
              <div className="flex gap-2">
                <input
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej: Nuevas skins de Fortnite..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-brand-purple transition-all"
                  required
                />
                <button 
                  type="button"
                  onClick={() => refineField("title")}
                  disabled={!!loading}
                  className="bg-white/5 hover:bg-brand-purple/20 p-3 rounded-xl border border-white/10 transition-all text-brand-purple group"
                  title="Refinar con IA"
                >
                  {loading === "title" ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Categoría</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full focus:outline-none"
                >
                  {CATEGORIES.filter(c => c !== "Inicio").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block flex items-center gap-2">
                  <ImageIcon size={14} /> Imagen del Artículo
                </label>
                <div className="flex gap-2">
                  <input
                    value={formData.image}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL de imagen..."
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-brand-purple transition-all text-sm"
                  />
                  <label className="bg-white/5 hover:bg-brand-purple/20 p-3 rounded-xl border border-white/10 transition-all text-brand-purple cursor-pointer flex items-center justify-center shrink-0">
                    <Save size={20} />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, image: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-4 relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
                    <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-purple px-3 py-1 rounded-full">Vista Previa</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block flex items-center gap-2">
                <FileText size={14} /> Breve Resumen
              </label>
              <div className="flex gap-2">
                <textarea
                  value={formData.summary}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full h-24 focus:outline-none resize-none"
                  placeholder="Resumen para el feed..."
                />
                <button 
                  type="button"
                  onClick={() => refineField("summary")}
                  disabled={!!loading}
                  className="bg-white/5 hover:bg-brand-purple/20 p-3 rounded-xl border border-white/10 h-fit text-brand-purple"
                  title="Generar Resumen con IA"
                >
                  {loading === "summary" ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block flex items-center justify-between">
              <span className="flex items-center gap-2"><Save size={14} /> Contenido Principal (Texto Real)</span>
              <button 
                type="button"
                onClick={() => refineField("draft")}
                disabled={!!loading}
                className="text-brand-purple text-[10px] bg-brand-purple/10 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-brand-purple hover:text-white transition-all disabled:opacity-50"
              >
                {loading === "draft" ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                🤖 GENERAR BORRADOR
              </button>
            </label>
            <textarea
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full h-full min-h-[300px] focus:outline-none focus:border-brand-purple"
              placeholder="Escribe el artículo detallado aquí (Mínimo 500 palabras recomendado)..."
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <input 
            value={formData.tags}
            onChange={e => setFormData({ ...formData, tags: e.target.value })}
            placeholder="Tags separados por coma..."
            className="bg-transparent text-sm text-gray-500 focus:outline-none w-1/2"
          />
          <button 
            type="submit"
            className="bg-brand-purple hover:bg-brand-purple/80 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-brand-purple/20"
          >
            <Send size={18} /> PUBLICAR ARTÍCULO
          </button>
        </div>
      </form>
    </div>
  );
}
