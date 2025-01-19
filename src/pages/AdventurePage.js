import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EnemyList from '../components/EnemyList';  // Import EnemyList component



const AdventurePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Check if state and state.selectedClass are valid
  if (!state || !state.selectedClass) {
    return <div>Error: No character data found.</div>;
  }

  const handleBattleStart = (enemy) => {
    navigate('/battle', { state: { player: state, enemy } });
  };

  return (
    <div>
      <h1>Adventure Page</h1>
      <h2>Name: {state.name}</h2>

      {/* Check if selectedClass is an object, else display the class name */}
      <h2>Class: {Object.keys(state.selectedClass)[0]}</h2>
      
      

      {typeof state.selectedClass === 'object' && (
        <>
          <p>Health: {state.selectedClass.health}</p>
          <p>Energy: {state.selectedClass.energy}</p>
          <p>Attack: {state.selectedClass.attack}</p>
          <p>Defense: {state.selectedClass.defense}</p>
        </>
      )}

      <h3>Enemies:</h3>
      
      <EnemyList onBattleStart={handleBattleStart} />
    </div>
  );
};

export default AdventurePage;
