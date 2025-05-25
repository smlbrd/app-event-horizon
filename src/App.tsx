import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';
import SkipToContent from './components/SkipToContent';

const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <Router>
      <SkipToContent />
      <Suspense fallback={<div className="text-center my-5">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
