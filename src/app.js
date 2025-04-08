import cors from "cors";
import express from "express";
import router from "./routes/router.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});
// Définir le port sur lequel le serveur va écouter
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
