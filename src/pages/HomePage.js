import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NameInput from '../components/NameInput';       
import ClassButton from '../components/ClassButton';      
import ClassInfo from '../components/ClassInfo';         

const classes = [
  { name: 'Warrior', health: 18, energy: 10, attack: 8, defense: 0 },
  { name: 'Mage', health: 12, energy: 10, attack: 10, defense: 1 },
  { name: 'Rogue', health: 14, energy: 12, attack: 8, defense: 2 },
  { name: 'Druid', health: 14, energy: 10, attack: 8, defense: 1 },
  { name: 'Paladin', health: 18, energy: 10, attack: 10, defense: 3 },
];

const HomePage = () => {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();

  const handleClassSelection = (className) => {
    const selected = classes.find((cls) => cls.name === className);
    setSelectedClass(selected);
  };

  const handleStartAdventure = () => {
    navigate('/adventure', { state: { name, selectedClass } });
  };

  return (
    <div>
      <h1>Chess RPG</h1>
      <NameInput name={name} setName={setName} />
      <div>
        {classes.map((cls) => (
          <ClassButton key={cls.name} className={cls.name} onSelect={handleClassSelection} />
        ))}
      </div>
      {selectedClass && <ClassInfo selectedClass={selectedClass} />}
      {selectedClass && <button onClick={handleStartAdventure}>Start Adventure</button>}
    </div>
  );
};

export default HomePage;
