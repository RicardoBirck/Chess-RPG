import React from 'react';

const BattleActionButtons = ({ onBasicAttack, onEnhancedAttack, isEnhancedDisabled }) => (
  <div>
    <button onClick={onBasicAttack}>Basic Attack</button>
    <button onClick={onEnhancedAttack} disabled={isEnhancedDisabled}>Enhanced Attack</button>
  </div>
);

export default BattleActionButtons;
