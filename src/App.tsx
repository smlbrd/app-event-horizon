import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';
import { UserProvider } from './contexts/UserProvider';
import ProtectedRoute from './components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const CreateEvent = lazy(() => import('./pages/CreateEvent'));
const MyEvents = lazy(() => import('./pages/MyEvents'));

function App() {
  return (
    <Router>
      <UserProvider>
        <Suspense fallback={<div className="text-center my-5">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/e/:eventId" element={<EventDetail />} />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-events"
              element={
                <ProtectedRoute>
                  <MyEvents />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </UserProvider>
    </Router>
  );
}

export default App;
