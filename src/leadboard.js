import React from 'react';
import './leadboard.css'; // Import the CSS file

// Sample data for demonstration
const usersData = [
  { id: 1, name: "Alice", coins: 120 },
  { id: 2, name: "Bob", coins: 150 },
  { id: 3, name: "Saurabh", coins: 1 },
];

// Leaderboard component to display users sorted by coins
const Leaderboard = ({ users }) => {
  return (
    <div className="leaderboardContainer">
      <h2 className="title">Leaderboard</h2>
      <ol className="list">
        {users.map((user, index) => (
          <li key={user.id} className="listItem">
            <span className="name">{user.name}</span>
            <span className="coins">{user.coins} coins</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

// Main App component
const lead = () => {
  // Sort users based on coins in descending order
  const sortedUsers = usersData.sort((a, b) => b.coins - a.coins);

  return (
    <div className="App">
      <Leaderboard users={sortedUsers} />
    </div>
  );
}

export default lead;
