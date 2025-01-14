import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdventurePage from './pages/AdventurePage';
import BattlePage from './pages/BattlePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adventure" element={<AdventurePage />} />
        <Route path="/battle" element={<BattlePage />} />
      </Routes>
    </Router>
  );
};

export default App;
