import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AttackButtons from '../components/AttackButtons';  

const BattlePage = () => {
  const { state } = useLocation();
  const { player, enemy } = state;
  const navigate = useNavigate();

  const [playerHealth, setPlayerHealth] = useState(player.selectedClass.health);
  const [enemyHealth, setEnemyHealth] = useState(enemy.health);
  const [playerEnergy, setPlayerEnergy] = useState(player.selectedClass.energy);
  const [turn, setTurn] = useState('player');
  const [message, setMessage] = useState('Your turn!');
  const [message2, setMessage2] = useState('');
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
      // Enhanced Attack
      damage = calculateDamage(player.selectedClass.attack, enemy.defense) + 3;
      setPlayerEnergy(playerEnergy - 3);  
      setMessage(`You used Enhanced Attack! You dealt ${damage} damage.`);
    } else if (!isEnhanced) {
      // Basic Attack
      damage = calculateDamage(player.selectedClass.attack, enemy.defense);
      setMessage(`You used Basic Attack! You dealt ${damage} damage.`);
    } else {
      setMessage('Not enough energy for Enhanced Attack!');
      return;
    }

    setEnemyHealth(enemyHealth - damage);
    setPlayerDamage(damage);  // Store player damage dealt
    setTurn('enemy');
  };

  const enemyAttack = () => {
    const damage = calculateDamage(enemy.attack, player.selectedClass.defense);
    setPlayerHealth(playerHealth - damage);
    setEnemyDamage(damage);  // Store enemy damage dealt
    setMessage2(`Enemy attacked! It dealt ${damage} damage.`);
    setTurn('player');
  };

  const handleFight = (isEnhanced) => {
    if (turn === 'player') {
      playerAttack(isEnhanced);
    }
  };

  const handleDone = () => {
    navigate('/adventure', {
      state: {
        name: player.name,
        selectedClass: player.selectedClass, // Pass character data to AdventurePage
      },
    });
  };

  // Simulate the enemy's turn with a delay
  useEffect(() => {
    if (turn === 'enemy') {
      setMessage2('Enemy is attacking...');
      setTimeout(() => {
        enemyAttack();
      }, 1500); // 1.5 seconds delay for the computer's turn
    }
  }, [turn]);

  // Check if health is 0 or below
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
      <h2>Class: {player.selectedClass.name}</h2>
      <p>Health: {playerHealth}</p>
      <p>Energy: {playerEnergy}</p>
      <p>Attack: {player.selectedClass.attack}</p>
      <p>Defense: {player.selectedClass.defense}</p>
      <h3>Enemy: {enemy.name}</h3>
      <p>Enemy Health: {enemyHealth}</p>
      <p>Enemy Attack: {enemy.attack}</p>
      <p>Enemy Defense: {enemy.defense}</p>
     
      {/* Pass the attack logic into AttackButtons */}
      {!isGameOver && turn === 'player' && (
        <AttackButtons 
          onBasicAttack={() => handleFight(false)} 
          onEnhancedAttack={() => handleFight(true)} 
          playerEnergy={playerEnergy} 
        />
      )}

      <p>{message}</p>
      <p>{message2}</p>

      {/* Game over message and option to return */}
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
