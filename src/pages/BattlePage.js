import React, { useState, useEffect } from 'react';  // Importing React and necessary hooks
import { useLocation, useNavigate } from 'react-router-dom';  // Importing routing hooks
import BattleActionButtons from '../components/BattleActionButtons'; // If BattleActionButtons.js is in components
import BattleStats from '../components/BattleStats';               // If BattleStats.js is in components
import BattleMessage from '../components/BattleMessage';           // If BattleMessage.js is in components

const BattlePage = () => {
  const { state } = useLocation();
  const { player, enemy } = state;
  const navigate = useNavigate();

  const [playerHealth, setPlayerHealth] = useState(player.selectedClass.health);
  const [enemyHealth, setEnemyHealth] = useState(enemy.health);
  const [playerEnergy, setPlayerEnergy] = useState(player.selectedClass.energy);
  const [turn, setTurn] = useState('player');
  const [message, setMessage] = useState('Your turn!');
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameResult, setGameResult] = useState('');
  const [playerDamage, setPlayerDamage] = useState(0);
  const [enemyDamage, setEnemyDamage] = useState(0);

  const randomizeAttack = (attackPower) => Math.floor(Math.random() * attackPower) + 1;

  const calculateDamage = (attackPower, defense) => {
    const damage = randomizeAttack(attackPower) - defense;
    return Math.max(damage, 0);
  };

  const playerAttack = (isEnhanced) => {
    let damage = 0;
    if (isEnhanced && playerEnergy >= 3) {
      damage = calculateDamage(player.selectedClass.attack, enemy.defense) + 3;
      setPlayerEnergy(playerEnergy - 3);
      setMessage(`You used Enhanced Attack! You dealt ${damage} damage.`);
    } else if (!isEnhanced) {
      damage = calculateDamage(player.selectedClass.attack, enemy.defense);
      setMessage(`You used Basic Attack! You dealt ${damage} damage.`);
    } else {
      setMessage('Not enough energy for Enhanced Attack!');
      return;
    }

    setEnemyHealth(enemyHealth - damage);
    setPlayerDamage(damage);
    setTurn('enemy');
  };

  const enemyAttack = () => {
    const damage = calculateDamage(enemy.attack, player.selectedClass.defense);
    setPlayerHealth(playerHealth - damage);
    setEnemyDamage(damage);
    setMessage(`Enemy attacked! It dealt ${damage} damage.`);
    setTurn('player');
  };

  const handleFight = (isEnhanced) => {
    if (turn === 'player') {
      playerAttack(isEnhanced);
    }
  };

  const handleDone = () => {
    navigate('/adventure', { state: { name: player.name, selectedClass: player.selectedClass } });
  };

  useEffect(() => {
    if (turn === 'enemy') {
      setMessage('Enemy is thinking...');
      setTimeout(() => {
        enemyAttack();
      }, 3000);
    }
  }, [turn]);

  useEffect(() => {
    if (playerHealth <= 0) {
      setIsGameOver(true);
      setGameResult('Enemy won!');
    } else if (enemyHealth <= 0) {
      setIsGameOver(true);
      setGameResult('You won!');
    }
  }, [playerHealth, enemyHealth]);

  return (
    <div>
      <h1>Battle Page</h1>
      <h2>Name: {player.name}</h2>
      <h2>Class: {Object.keys(player.selectedClass)[0]}</h2>

      <BattleStats 
        playerHealth={playerHealth} 
        playerEnergy={playerEnergy} 
        playerAttack={player.selectedClass.attack} 
        playerDefense={player.selectedClass.defense} 
        enemyHealth={enemyHealth} 
        enemyAttack={enemy.attack} 
        enemyDefense={enemy.defense}
      />
      <BattleMessage message={message} />
      
      {!isGameOver && turn === 'player' && (
        <BattleActionButtons 
          onBasicAttack={() => handleFight(false)} 
          onEnhancedAttack={() => handleFight(true)} 
          isEnhancedDisabled={playerEnergy < 3} 
        />
      )}

      {playerDamage > 0 && <p>You dealt {playerDamage} damage to the enemy.</p>}
      {enemyDamage > 0 && !isGameOver && <p>Enemy dealt {enemyDamage} damage to you.</p>}

      {isGameOver && (
        <div>
          <h3>{gameResult}</h3>
          <button onClick={handleDone}>Return to Adventure</button>
        </div>
      )}
    </div>
  );
};

export default BattlePage;
