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

  // Gemini Setup
  const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
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
