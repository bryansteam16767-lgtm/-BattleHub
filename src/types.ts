export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
}

export type Category = "Inicio" | "Noticias" | "Mapas" | "Skins" | "Eventos" | "Fortnite" | "Roblox" | "Minecraft" | "IA" | "Apps" | "Guías y Tutoriales";
