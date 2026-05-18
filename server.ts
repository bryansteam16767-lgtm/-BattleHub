import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Fortnite Item Shop Proxy
  app.get("/api/fortnite/shop", async (req, res) => {
    try {
      const response = await fetch("https://fortnite-api.com/v2/shop/br/combined");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Fortnite API Error:", error);
      res.status(500).json({ error: "Failed to fetch shop" });
    }
  });

  // API Route: Cosmetics List
  app.get("/api/fortnite/cosmetics", async (req, res) => {
    try {
      const response = await fetch("https://fortnite-api.com/v2/cosmetics/br");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cosmetics" });
    }
  });

  // API Route: Unreleased/Leaks
  app.get("/api/fortnite/cosmetics/new", async (req, res) => {
    try {
      const response = await fetch("https://fortnite-api.com/v2/cosmetics/br/new");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch new items" });
    }
  });

  // API Route: News List
  app.get("/api/fortnite/news", async (req, res) => {
    try {
      const response = await fetch("https://fortnite-api.com/v2/news/br");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  // Gemini Setup
  const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
  });

  // API Route: Generate Gaming News
  app.post("/api/news/generate", async (req, res) => {
    try {
      const { category } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Eres un redactor experto en videojuegos. Genera un artículo de noticias real y SEO-friendly sobre la categoría "${category || 'deportes electrónicos'}". 
        El formato DEBE ser estrictamente JSON válido sin bloques de código markdown, con estos campos: 
        {
          "title": "título llamativo",
          "summary": "resumen corto",
          "content": "contenido extenso de más de 500 palabras",
          "tags": ["tag1", "tag2"],
          "date": "2024-05-17",
          "author": "Nombre Autor"
        }
        Usa un tono profesional pero emocionante para Gamers.`,
        config: { responseMimeType: "application/json" }
      });
      
      const text = response.text || "{}";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const cleanText = jsonMatch ? jsonMatch[0] : text;
      
      try {
        res.json(JSON.parse(cleanText));
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError, "Raw Text:", text);
        res.status(500).json({ error: "Invalid JSON from AI", raw: text });
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate news" });
    }
  });

  // API Route: AI Assistance for Creators
  app.post("/api/ai/refine", async (req, res) => {
    try {
      const { type, text, category } = req.body;
      let prompt = "";
      
      if (type === "title") {
        prompt = `Refina este título de videojuego para que sea más atractivo, clickbait ético y SEO-friendly. Título original: "${text}". Categoría: ${category}. Solo devuelve el nuevo título.`;
      } else if (type === "summary") {
        prompt = `Genera un resumen corto y emocionante (máximo 150 caracteres) para un artículo de ${category} basado en este texto: "${text}". Solo devuelve el resumen.`;
      } else if (type === "draft") {
        prompt = `Genera un borrador profesional de más de 600 palabras sobre: "${text}" para la categoría ${category}. Estructura con encabezados ##, usa un tono experto y asegúrate de que el contenido sea útil y real. No incluyas placeholders.`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      
      res.json({ result: response.text });
    } catch (error) {
      console.error("AI Refine Error:", error);
      res.status(500).json({ error: "Failed to refine content" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GamersHub running on http://localhost:${PORT}`);
  });
}

startServer();
