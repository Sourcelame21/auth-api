// app : configure Express (parsing JSON, montage des routes) et exporte l'app sans la connecter à une DB ni la faire écouter, pour permettre les tests avec Supertest

import express from 'express';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json());
app.use('/', authRoutes);

export default app;

