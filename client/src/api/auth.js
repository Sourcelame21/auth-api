// registerRequest : envoie email/mdp à POST /register
// loginRequest : envoie email/mdp à POST /login, renvoie le token
// getUsersRequest : appelle GET /users avec le token dans le header Authorization

const API_URL = 'http://localhost:3000';

export const registerRequest = async (email, password) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erreur lors de l\'inscription');
  return data;
};

export const loginRequest = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erreur lors de la connexion');
  return data;
};

export const getUsersRequest = async (token) => {
  const res = await fetch(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erreur lors de la récupération des utilisateurs');
  return data;
};
