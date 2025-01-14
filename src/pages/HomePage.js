import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();

  const classes = {
    warrior: { health: 18, energy: 10, attack: 8, defense: 0 },
    mage: { health: 12, energy: 10, attack: 10, defense: 1 },
    rogue: { health: 14, energy: 12, attack: 8, defense: 2 },
  };

  const handleClassSelection = (className) => {
    setSelectedClass(classes[className]);
  };

  const handleStartAdventure = () => {
    navigate('/adventure', { state: { name, selectedClass } });
  };

  return (
    <div>
      <h1>Chess RPG</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        {Object.keys(classes).map((className) => (
          <button key={className} onClick={() => handleClassSelection(className)}>
            {className}
          </button>
        ))}
      </div>
      {selectedClass && (
        <div>
          <h3>{Object.keys(selectedClass)[0]}</h3>
          <p>Health: {selectedClass.health}</p>
          <p>Energy: {selectedClass.energy}</p>
          <p>Attack: {selectedClass.attack}</p>
          <p>Defense: {selectedClass.defense}</p>
          <button onClick={handleStartAdventure}>Start Adventure</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
