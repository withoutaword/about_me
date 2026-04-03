import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Beliefs from './pages/Beliefs';
import Career from './pages/Career';
import Photography from './pages/Photography';
import Projects from './pages/Projects';
// import Moments from "./pages/Moments";
import MomentDetail from "./pages/MomentDetail";
import Moments from "./pages/MomentsPage";
import MatrixRain from './components/MatrixRain';
import Scanlines from './components/Scanlines';
import { useTheme } from './context/ThemeContext';

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
          <Route path="/beliefs" element={<Beliefs />} />
          <Route path="/career" element={<Career />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/moments" element={<Moments />} />
          <Route path="/moments/:id" element={<MomentDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

