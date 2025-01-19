import React from 'react';

const AttackButtons = ({ onBasicAttack, onEnhancedAttack, playerEnergy }) => {
  return (
    <div>
      <button onClick={() => onBasicAttack()}>
        Basic Attack
      </button>
      <button onClick={() => onEnhancedAttack()} disabled={playerEnergy < 3}>
        Enhanced Attack
      </button>
    </div>
  );
};

export default AttackButtons;
