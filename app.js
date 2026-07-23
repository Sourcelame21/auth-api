// app : configure Express et exporte l'app sans la connecter à une DB ni la faire écouter, pour permettre les tests avec Supertest

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', authRoutes);

export default app;
