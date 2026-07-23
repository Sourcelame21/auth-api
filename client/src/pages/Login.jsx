// Login : formulaire email/mdp, appelle loginRequest, stocke le token dans localStorage et redirige vers /users

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginRequest } from '../api/auth.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginRequest(email, password);
      localStorage.setItem('token', data.token);
      navigate('/users');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="brand">
          <div className="brand-title">Strateg.in</div>
          <div className="brand-subtitle">Connexion à votre compte</div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="switch-link">
          Pas encore de compte ? <Link to="/register">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
