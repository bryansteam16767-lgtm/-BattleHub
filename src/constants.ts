import { Article, Category, MapCode } from "./types";

export const CATEGORIES: Category[] = [
  "Inicio", 
  "Tienda", 
  "Mapas", 
  "Cosméticos", 
  "Filtraciones", 
  "Estadísticas", 
  "Concurrencia",
  "Gratis",
  "Noticias"
];

export const MOCK_MAP_CODES: MapCode[] = [
  {
    id: "m1",
    title: "The Pit - Free For All",
    code: "4590-4493-7113",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400",
    category: "Practice",
    creator: "GamerPro"
  },
  {
    id: "m2",
    title: "1v1 Build Fight (No Delay)",
    code: "0000-0000-0000",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400",
    category: "1v1",
    creator: "FastEdits"
  },
  {
    id: "m3",
    title: "Infinite XP Glitch Map",
    code: "1234-5678-9012",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=400",
    category: "XP",
    creator: "XPFarmer"
  },
  {
    id: "m4",
    title: "Pro Aim Trainer",
    code: "9999-8888-7777",
    image: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?auto=format&fit=crop&q=80&w=400",
    category: "Practice",
    creator: "AimGod"
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: "5",
    title: "Las 5 Skins más raras de Fortnite en 2026",
    summary: "¿Tienes al Renegade Raider? Estas son las apariencias que casi nadie tiene en su cuenta.",
    content: "En el ecosistema de Fortnite, las skins son más que simples cosméticos; son símbolos de estatus. A medida que avanzamos en 2026, algunas skins de las primeras temporadas se han vuelto casi míticas. Analizamos la rareza de la Renegade Raider, el Recon Expert original y las nuevas colaboraciones exclusivas de tiempo limitado que nunca volverán a la tienda.",
    category: "Skins",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    date: "2024-05-18",
    author: "SkinMaster",
    tags: ["Skins", "Rarity", "Fortnite"]
  },
  {
    id: "6",
    title: "Gran Evento Final de Temporada: Fecha y Hora Confirmada",
    summary: "Se filtran los primeros detalles del agujero negro 3.0 que cambiará la realidad del juego.",
    content: "La expectación es máxima. Epic Games ha empezado a colocar temporizadores gigantes en el mapa. Todo indica que el evento final involucrará una colisión multiversal masiva. Los filtradores sugieren que el servidor cerrará durante 48 horas tras la explosión final. Prepárate para el 15 de junio.",
    category: "Eventos",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=800",
    date: "2024-05-18",
    author: "EventHunter",
    tags: ["Eventos", "Fortnite", "Filtración"]
  },
  {
    id: "4",
    title: "Cómo conseguir la Victoria Magistral en Fortnite: Guía Definitiva 2026",
    summary: "Domina el campo de batalla con estas estrategias avanzadas de construcción, rotación y combate.",
    content: `Conseguir una Victoria Magistral en Fortnite no es solo cuestión de puntería; es una combinación de estrategia, conocimiento del mapa y ejecución técnica. En esta guía detallada, exploraremos los pilares fundamentales para dominar el Battle Royale más popular del mundo.

### 1. El Aterrizaje: La Base de Tu Éxito
El primer paso hacia la victoria comienza antes de tocar el suelo. Elegir un lugar de aterrizaje adecuado es vital. Si eres un jugador agresivo, zonas como Carretes Calurosos o Torres Inclinadas son ideales, pero si buscas consistencia, prefiere zonas periféricas con buen acceso a materiales y cofres. Recuerda siempre marcar tu objetivo y ajustar tu caída para ser el primero en llegar a las armas.

### 2. Recolección de Materiales y Economía de Recursos
La construcción es lo que diferencia a los novatos de los profesionales. Al inicio de la partida, prioriza picar madera y piedra. La madera es ideal para el combate inmediato por su rapidez de construcción, mientras que el metal y la piedra son preferibles para bases finales. Siempre mantén al menos 500 unidades de cada material antes de entrar en las fases finales de la tormenta.

### 3. El Loot Perfecto: Equilibrio en tu Inventario
Un inventario balanceado suele consistir en:
- Rifle de Asalto (Mediana/Larga distancia)
- Escopeta (Combate cercano, fundamental para 'box fighting')
- Subfusil o Pistola de Rayos (Para rematar o presionar construcciones)
- Objeto de movilidad (Granadas de choque, ganchos o vehículos)
- Curación (Escudos gordos o botiquines)

No subestimes el poder de los objetos de movilidad; en el meta actual de 2026, la capacidad de rotar rápidamente puede salvarte de una emboscada o de quedar atrapado en la tormenta.

### 4. Rotaciones y Control del Mapa
La tormenta es tu mayor enemigo después de los otros jugadores. Aprende a predecir las rotaciones del círculo. Si el círculo se cierra en una zona elevada, intenta ganar la posición alta (high ground) lo antes posible. Estar por encima de tus oponentes te da una ventaja táctica invaluable, permitiéndote ver sus movimientos y realizar disparos a la cabeza con mayor facilidad.

### 5. Mecánicas Avanzadas: Edición y Box Fighting
En las ligas superiores, el combate se reduce a quién edita más rápido. Practica tus '90s' y aprende a encerrar a tus oponentes en cajas (box fighting). La técnica de 'piece control' —colocar tus propias piezas de construcción alrededor del enemigo— es la clave para dictar el ritmo del enfrentamiento y asegurar la eliminación sin recibir daño.

### 6. La Psicología del Late Game
Cuando solo quedan 10 jugadores, la tensión aumenta. Mantén la calma, no reveles tu posición innecesariamente y espera a que los demás se eliminen entre sí. Si ves a dos jugadores peleando, espera el momento justo para intervenir (tercerear) y asegurar las eliminaciones cuando ambos estén bajos de salud.

### 7. Uso de IA y Herramientas Modernas
En GamersHub, recomendamos usar las nuevas herramientas de análisis de trayectorias integradas en las versiones más recientes de Fortnite. Estas ayudan a entender los patrones de caída de los suministros y la probabilidad de cierre del círculo.

Conclusión: La práctica hace al maestro. No te desanimes si no ganas a la primera; cada partida es una oportunidad para aprender de tus errores. Revisa tus repeticiones, analiza por qué fuiste eliminado y ajusta tu estrategia para la próxima vez. ¡Nos vemos en el campo de batalla, Gamer!`,
    category: "Guías y Tutoriales",
    image: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?auto=format&fit=crop&q=80&w=800",
    date: "2024-05-18",
    author: "MasterGuide",
    tags: ["Fortnite", "Tutorial", "Pro Tips", "Victoria Magistral"]
  },
  {
    id: "1",
    title: "La Nueva Temporada de Fortnite: Todo lo que necesitas saber",
    summary: "Descubre las nuevas skins, armas y cambios en el mapa de la Temporada 2.",
    content: "La nueva temporada de Fortnite ha llegado con un impacto masivo en la comunidad. Desde cambios estructurales en el mapa hasta la introducción de mecánicas de movimiento mejoradas, los jugadores tienen mucho que explorar. En esta guía detallada, analizamos cada rincón de la nueva actualización...",
    category: "Fortnite",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    date: "2024-05-17",
    author: "GamerPro",
    tags: ["Fortnite", "Battle Royale", "Actualización"]
  },
  {
    id: "2",
    title: "Roblox en 2026: El futuro del Metaverso",
    summary: "Nuevas herramientas para creadores y cómo ganar robux de forma segura.",
    content: "Roblox continúa su expansión imparable. Con la llegada de nuevas APIs de renderizado y IA integrada para desarrolladores, los mundos virtuales son cada vez más realistas. Analizamos las mejores prácticas para nuevos creadores...",
    category: "Roblox",
    image: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?auto=format&fit=crop&q=80&w=800",
    date: "2024-05-16",
    author: "PixelMaster",
    tags: ["Roblox", "Creatividad", "Metaverso"]
  },
  {
    id: "3",
    title: "10 Trucos de Minecraft para sobrevivir en el Modo Hardcore",
    summary: "Guía para veteranos que buscan el máximo desafío.",
    content: "El modo Hardcore no perdona. Un solo error y tu mundo desaparece para siempre. Aquí te presentamos las 10 estrategias fundamentales que todo jugador experto debe conocer para no morir en el intento...",
    category: "Minecraft",
    image: "https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?auto=format&fit=crop&q=80&w=800",
    date: "2024-05-15",
    author: "SteveLegends",
    tags: ["Minecraft", "Guía", "Survival"]
  }
];
