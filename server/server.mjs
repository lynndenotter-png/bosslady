import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ OPENAI_API_KEY mist. Vul deze in je .env in.");
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BossLady AI server draait ✅");
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array is verplicht" });
    }

      if (!apiKey) {
      return res.status(500).json({ error: "Geen OPENAI_API_KEY ingesteld op de server" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      return res.status(500).json({ error: "Fout bij OpenAI API-aanvraag" });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "";

    res.json({ reply });
  } catch (error) {
    console.error("Fout in /api/chat:", error);
    res.status(500).json({ error: "Er ging iets mis bij de AI-aanvraag" });
  }
});

app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
