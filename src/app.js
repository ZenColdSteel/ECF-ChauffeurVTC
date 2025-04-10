import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import router from "./routes/router.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", router);

// Middleware de gestion des erreurs personnalisées (doit être AVANT le middleware 404)
app.use(errorMiddleware);

// Middleware pour les routes non trouvées
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route non trouvée" });
});

// Définir le port sur lequel le serveur va écouter
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

export default app;