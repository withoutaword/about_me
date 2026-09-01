import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Career from './pages/Career';
import Photography from './pages/Photography';
import MatrixRain from './components/MatrixRain';
import Scanlines from './components/Scanlines';
import { useTheme } from './context/ThemeContext';

const Articles = lazy(() => import('./pages/Articles'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

function App() {
  const { theme } = useTheme();
  const isCyber = theme === 'cyber';

  return (
    <>
      {isCyber && <MatrixRain />}
      {isCyber && <Scanlines />}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/career" element={<Career />} />
          <Route path="/articles" element={<Suspense fallback={null}><Articles /></Suspense>} />
          <Route path="/articles/:slug" element={<Suspense fallback={null}><ArticleDetail /></Suspense>} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/projects" element={<Suspense fallback={null}><Projects /></Suspense>} />
          <Route path="/projects/:slug" element={<Suspense fallback={null}><ProjectDetail /></Suspense>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
