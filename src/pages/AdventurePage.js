import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EnemyList from '../components/EnemyList';  // Import EnemyList component

const AdventurePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

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
      <h2>Class: {typeof state.selectedClass === 'object' ? Object.keys(state.selectedClass)[0] : state.selectedClass}</h2>
      
      {typeof state.selectedClass === 'object' && (
        <>
          <p>Health: {state.selectedClass.health}</p>
          <p>Energy: {state.selectedClass.energy}</p>
          <p>Attack: {state.selectedClass.attack}</p>
          <p>Defense: {state.selectedClass.defense}</p>
        </>
      )}

      {/* Use EnemyList component here */}
      <EnemyList onBattleStart={handleBattleStart} />
    </div>
  );
};

export default AdventurePage;
