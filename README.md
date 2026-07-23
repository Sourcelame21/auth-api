STRATEG.IN - API d'authentification + interface React

BACKEND

1. Installer les dependances :
npm install

Si un message "allow-scripts" apparait (bcrypt, mongodb-memory-server), taper :
npm approve-scripts bcrypt
npm approve-scripts mongodb-memory-server
npm install

2. Creer un fichier .env a la racine (copier .env.example) avec :
MONGO_URI=votre_connection_string_atlas
JWT_SECRET=une_chaine_secrete_aleatoire
PORT=3000

3. Lancer le serveur :
npm run dev
Le serveur tourne sur http://localhost:3000

4. Lancer les tests :
npm test

FRONTEND

Dans un second terminal :
cd client
npm install
npm run dev
Le frontend tourne sur http://localhost:5173

Le backend doit etre lance pour que le frontend fonctionne.

ROUTES DE L'API

POST /register   -> creer un compte (email, password)
POST /login      -> se connecter, recupere un token JWT
GET  /users       -> liste des utilisateurs, protegee par token JWT

STACK

Node.js, Express, Mongoose, MongoDB Atlas
bcrypt, jsonwebtoken
Jest, Supertest
React (Vite), React Router
