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

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  type: string;
  rarity: string;
  price: number;
  image: string;
  category: string;
}

export interface MapCode {
  id: string;
  title: string;
  code: string;
  image: string;
  category: "XP" | "1v1" | "Box Fight" | "Hide and Seek" | "Practice";
  creator: string;
}

export type Category = "Inicio" | "Noticias" | "Mapas" | "Tienda" | "Skins" | "Eventos" | "Fortnite" | "Roblox" | "Minecraft" | "IA" | "Apps" | "Guías y Tutoriales";
