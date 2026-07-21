// server.js : charge les variables d'environnement, connecte MongoDB, configure Express, monte les routes d'authentification et démarre le serveur

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
