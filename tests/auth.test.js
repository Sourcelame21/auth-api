// beforeAll : démarre une MongoDB en mémoire et connecte Mongoose dessus
// afterAll : ferme la connexion Mongoose et arrête la MongoDB en mémoire
// register : teste la création réussie d'un utilisateur, puis le rejet d'un email déjà utilisé
// login : teste la connexion réussie avec les bons identifiants, puis le rejet avec un mauvais mot de passe
// users : teste le rejet sans token, le rejet avec un mauvais token, et le succès avec un token valide

import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';

let mongoServer;

beforeAll(async () => {
  process.env.JWT_SECRET = 'test_secret_key';
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /register', () => {
  it('crée un nouvel utilisateur avec succès', async () => {
    const res = await request(app)
      .post('/register')
      .send({ email: 'test@example.com', password: 'motdepasse123' });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('test@example.com');
  });

  it("rejette un email déjà utilisé", async () => {
    const res = await request(app)
      .post('/register')
      .send({ email: 'test@example.com', password: 'motdepasse123' });

    expect(res.statusCode).toBe(409);
  });
});

describe('POST /login', () => {
  it('connecte un utilisateur avec les bons identifiants', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'motdepasse123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('rejette un mauvais mot de passe', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'mauvaismotdepasse' });

    expect(res.statusCode).toBe(401);
  });
});

describe('GET /users', () => {
  it('rejette la requête sans token', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(401);
  });

  it('rejette la requête avec un token invalide', async () => {
    const res = await request(app).get('/users').set('Authorization', 'Bearer fauxtoken');
    expect(res.statusCode).toBe(403);
  });

  it('renvoie la liste des utilisateurs avec un token valide', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'motdepasse123' });

    const token = loginRes.body.token;

    const res = await request(app).get('/users').set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].password).toBeUndefined();
  });
});
