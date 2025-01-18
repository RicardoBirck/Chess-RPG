import React from 'react';

const EnemyButton = ({ enemy, onBattleStart }) => (
  <button onClick={() => onBattleStart(enemy)}>
    {enemy.name}
  </button>
);

export default EnemyButton;
