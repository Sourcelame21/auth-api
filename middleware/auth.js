// verifyToken : lit le token dans le header Authorization (format "Bearer <token>"), le vérifie avec JWT_SECRET, bloque en 401 si absent ou en 403 si invalide, sinon laisse passer et attache les infos utilisateur à req.user

import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: 'Token invalide ou expiré' });
    }

    req.user = decoded;
    next();
  });
};

export default verifyToken;
