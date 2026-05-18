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

export type Category = 
  | "Inicio" 
  | "Tienda" 
  | "Mapas" 
  | "Cosméticos" 
  | "Filtraciones" 
  | "Estadísticas" 
  | "Concurrencia" 
  | "Showdown"
  | "Gratis"
  | "Noticias";

export interface MapEvolution {
  season: string;
  image: string;
  description: string;
}

export interface PlayerStats {
  name: string;
  rank: string;
  wins: number;
  kd: number;
  winRate: number;
}
