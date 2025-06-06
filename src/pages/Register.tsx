import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../api/api';
import { useUser } from '../contexts/useUser';
import eventHorizonLogo from '../assets/icons8-sun.svg';
import splashImg1 from '../assets/login-splash1.jpeg';
import splashImg2 from '../assets/login-splash2.jpeg';
import splashImg3 from '../assets/login-splash3.jpeg';
import PasswordStrengthBar from '../components/PasswordStrengthBar';

const splashImages = [splashImg1, splashImg2, splashImg3];

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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

    if (!email || !password || !name) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const data = await createUser(email, password, name);
      localStorage.setItem('token', data.token);
      login({
        id: data.id.toString(),
        email: data.email,
        name: data.name,
        role: data.role,
      });
      navigate('/');
    } catch (e: unknown) {
      console.error(e);
      setError('Signup failed');
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
          margin: '2rem auto',
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

        <h3 className="mb-4 text-center">Welcome!</h3>
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
            <label htmlFor="signup-name" className="form-label visually-hidden">
              Name
            </label>
            <input
              id="signup-name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="What should we call you?"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="signup-email"
              className="form-label visually-hidden"
            >
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="signup-password"
              className="form-label visually-hidden"
            >
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <PasswordStrengthBar value={password} minLength={15} />
          <button className="btn btn-success w-100 mt-3" type="submit">
            Continue
          </button>
          <div className="text-center mt-3">
            Already have an account? <Link to="/login">Log in here!</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
