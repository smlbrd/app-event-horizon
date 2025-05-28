import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authenticateUser } from '../api/api';
import { useUser } from '../contexts/useUser';
import eventHorizonLogo from '../assets/icons8-sun.svg';
import splashImg1 from '../assets/login-splash1.jpeg';
import splashImg2 from '../assets/login-splash2.jpeg';
import splashImg3 from '../assets/login-splash3.jpeg';

const splashImages = [splashImg1, splashImg2, splashImg3];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [splashImg] = useState(() => {
    const idx = Math.floor(Math.random() * splashImages.length);
    return splashImages[idx];
  });

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    try {
      const { user, token } = await authenticateUser(email, password);
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user.id.toString());
      login(user);
      navigate('/');
    } catch (e: unknown) {
      console.error(e);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <main
      className="d-flex align-items-center justify-content-center"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          backgroundImage: `url(${splashImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          background: 'rgba(128, 128, 128, 0.2)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        aria-hidden="true"
      />

      <div
        className="card"
        style={{
          width: '80vw',
          maxWidth: 500,
          height: '60vh',
          maxHeight: 600,
          padding: '1.5rem',
          zIndex: 2,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        <div
          className="d-flex align-items-center mb-4"
          style={{ gap: '0.75rem', justifyContent: 'flex-start' }}
        >
          <img
            src={eventHorizonLogo}
            alt="Event Horizon Logo"
            style={{
              height: 40,
              width: 40,
              objectFit: 'contain',
            }}
          />
          <span className="fs-3 fw-bold text-dark" style={{ lineHeight: 1 }}>
            event horizon
          </span>
        </div>
        <h3 className="mb-4 text-center">Welcome back!</h3>
        <form
          onSubmit={handleSubmit}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            height: '100%',
            width: '90%',
            alignSelf: 'center',
          }}
        >
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="login-email" className="form-label visually-hidden">
              Email
            </label>
            <input
              id="login-email"
              className="form-control"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              autoComplete="email"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="login-password"
              className="form-label visually-hidden"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="form-control"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button className="btn btn-success w-100 mt-3" type="submit">
            Login
          </button>
          <div className="text-center mt-3">
            Not registered yet? <Link to="/register">Sign up here!</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
