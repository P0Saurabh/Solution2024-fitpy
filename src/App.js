// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Auth from './Auth';
import Chat from './chat';
import Leaderboard from './leadboard';
import Marketplace from './Marketplace';
import Challenge from './cha';
import './App.css'; // Assuming you have an App.css for styling

function App() {
  const { isLoggedIn } = useAuth(); // Use the useAuth hook to get the login status

  return (
    <BrowserRouter>
      <div>
        {isLoggedIn && (
          <nav>
            <ul>
              <li><Link to="/chat">Chat</Link></li>
              <li><Link to="/leaderboard">Leaderboard</Link></li>
              <li><Link to="/market">Marketplace</Link></li>
              <li><Link to="/challenge">Challenge</Link></li>
            </ul>
          </nav>
        )}
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/market" element={<Marketplace />} />
          <Route path="/challenge" element={<Challenge />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
