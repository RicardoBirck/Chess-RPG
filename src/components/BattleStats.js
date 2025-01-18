import React from 'react';

const BattleStats = ({ playerHealth, playerEnergy, playerAttack, playerDefense, enemyHealth, enemyAttack, enemyDefense }) => (
  <div>
    <h2>Player Stats:</h2>
    <p>Health: {playerHealth}</p>
    <p>Energy: {playerEnergy}</p>
    <p>Attack: {playerAttack}</p>
    <p>Defense: {playerDefense}</p>

    <h3>Enemy Stats:</h3>
    <p>Health: {enemyHealth}</p>
    <p>Attack: {enemyAttack}</p>
    <p>Defense: {enemyDefense}</p>
  </div>
);

export default BattleStats;
