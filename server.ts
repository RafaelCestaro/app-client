import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());

  // Initialize Gemini Client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      }
    }
  });

  // Server-side Chat Proxy
  app.post("/api/chat", async (req, res) => {
    const { message, history, systemInstruction } = req.body;

    if (!message) {
      res.status(400).json({ error: "O campo 'message' é obrigatório." });
      return;
    }

    try {
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: systemInstruction,
        },
        history: history || []
      });

      const response = await chat.sendMessage({ message: message });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Erro na API do Gemini (Server-side):", error);
      res.status(500).json({ error: error?.message || "Desculpe, tive um problema tático de conexão. Pode repetir?" });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in DEVELOPMENT mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in PRODUCTION mode serving static files...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html for SPA routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
