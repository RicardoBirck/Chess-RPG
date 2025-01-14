import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const enemies = [
  { name: 'Orc', health: 18, attack: 12, defense: 3 },
  { name: 'Goblin', health: 15, attack: 5, defense: 1 },
  { name: 'Skeleton', health: 12, attack: 7, defense: 1 },
];

const AdventurePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Check if state and state.selectedClass are valid
  if (!state || !state.selectedClass) {
    return <div>Error: No character data found.</div>;
  }

  // Handle enemy selection and battle start
  const handleBattleStart = (enemy) => {
    navigate('/battle', { state: { player: state, enemy } });
  };

  return (
    <div>
      <h1>Adventure Page</h1>
      <h2>Name: {state.name}</h2>

      {/* Check if selectedClass is an object, else display the class name */}
      <h2>Class: {typeof state.selectedClass === 'object' ? Object.keys(state.selectedClass)[0] : state.selectedClass}</h2>
      
      {/* If selectedClass is an object, display stats */}
      {typeof state.selectedClass === 'object' && (
        <>
          <p>Health: {state.selectedClass.health}</p>
          <p>Energy: {state.selectedClass.energy}</p>
          <p>Attack: {state.selectedClass.attack}</p>
          <p>Defense: {state.selectedClass.defense}</p>
        </>
      )}

      <h3>Enemies:</h3>
      {enemies.map((enemy) => (
        <button key={enemy.name} onClick={() => handleBattleStart(enemy)}>
          {enemy.name}
        </button>
      ))}
    </div>
  );
};

export default AdventurePage;
