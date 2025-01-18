// EnemyList.js
import React from 'react';
import EnemyButton from './EnemyButton';  // Import EnemyButton component

const enemies = [
  { name: 'Orc', health: 18, attack: 12, defense: 3 },
  { name: 'Goblin', health: 15, attack: 5, defense: 1 },
  { name: 'Skeleton', health: 12, attack: 7, defense: 1 },
];

const EnemyList = ({ onBattleStart }) => {
  return (
    <div>
      <h3>Enemies:</h3>
      {enemies.map((enemy) => (
        <EnemyButton 
          key={enemy.name} 
          enemy={enemy} 
          onBattleStart={onBattleStart} 
        />
      ))}
    </div>
  );
};

export default EnemyList;  // Default export
