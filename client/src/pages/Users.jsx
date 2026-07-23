// Users : redirige vers /login si aucun token n'est stocké, sinon appelle getUsersRequest et affiche la liste, avec option de déconnexion

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsersRequest } from '../api/auth.js';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    getUsersRequest(token)
      .then(setUsers)
      .catch((err) => {
        setError(err.message);
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 1500);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="page">
      <div className="card">
        <div className="brand">
          <div className="brand-title">Strateg.in</div>
          <div className="brand-subtitle">Utilisateurs enregistrés</div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <ul className="users-list">
          {users.map((user) => (
            <li key={user._id}>{user.email}</li>
          ))}
        </ul>

        <div className="logout-link" onClick={handleLogout}>
          Se déconnecter
        </div>
      </div>
    </div>
  );
};

export default Users;
