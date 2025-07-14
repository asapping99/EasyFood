import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RecipesPage from './pages/RecipesPage';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/" element={user ? <RecipesPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
