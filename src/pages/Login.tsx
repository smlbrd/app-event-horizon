import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../contexts/useUser';
import { createUserLogin } from '../api/api';

const Login: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError('Please enter your username and password.');
      return;
    }

    try {
      const { user, token } = await createUserLogin(username, password);
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user.id.toString());
      login(user);
      navigate('/');
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || 'Login failed');
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <main className="container" style={{ maxWidth: 400, marginTop: 80 }}>
      <h1 className="mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="login-username" className="form-label">
            Username
          </label>
          <input
            id="login-username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            autoComplete="username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="login-password" className="form-label">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>
      <div className="text-center mt-3">
        <Link to="/signup">Not registered yet? Sign up here!</Link>
      </div>
    </main>
  );
};

export default Login;
