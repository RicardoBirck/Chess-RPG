import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NameInput from '../components/NameInput';       
import ClassButton from '../components/ClassButton';      
import ClassInfo from '../components/ClassInfo';        

const HomePage = () => {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();

  const classes = {
    warrior: { health: 18, energy: 10, attack: 8, defense: 0 },
    mage: { health: 12, energy: 10, attack: 10, defense: 1 },
    rogue: { health: 14, energy: 12, attack: 8, defense: 2 },
    druid: { health: 14, energy: 10, attack: 8, defense: 1 },
    paladin: { health: 18, energy: 10, attack: 10, defense: 3 },
  };

  const handleClassSelection = (className) => setSelectedClass(classes[className]);

  const handleStartAdventure = () => {
    navigate('/adventure', { state: { name, selectedClass } });
  };

  return (
    <div>
      <h1>Chess RPG</h1>
      <NameInput name={name} setName={setName} />
      <div>
        {Object.keys(classes).map((className) => (
          <ClassButton key={className} className={className} onSelect={handleClassSelection} />
        ))}
      </div>
      {selectedClass && <ClassInfo selectedClass={selectedClass} />}
      {selectedClass && <button onClick={handleStartAdventure}>Start Adventure</button>}
    </div>
  );
};

export default HomePage;
