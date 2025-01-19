import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EnemyList from '../components/EnemyList';  // Import EnemyList component


const AdventurePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleBattleStart = (enemy) => {
    navigate('/battle', { state: { player: state, enemy } });
  };

  return (
    <div>
      <h1>Adventure Page</h1>
      <h2>Name: {state.name}</h2>
      <h2>Class: {state.selectedClass.name}</h2>
      
        <>
          <p>Health: {state.selectedClass.health}</p>
          <p>Energy: {state.selectedClass.energy}</p>
          <p>Attack: {state.selectedClass.attack}</p>
          <p>Defense: {state.selectedClass.defense}</p>
        </>
            
      <EnemyList onBattleStart={handleBattleStart} />
    </div>
  );
};

export default AdventurePage;
