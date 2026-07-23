// server.js : point d'entrée de production — charge les variables d'environnement, connecte MongoDB, puis démarre l'app Express sur PORT

import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
