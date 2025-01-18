import React from 'react';

const ClassInfo = ({ selectedClass }) => (
  <div>
    <h3>{Object.keys(selectedClass)[0]}</h3>
    <p>Health: {selectedClass.health}</p>
    <p>Energy: {selectedClass.energy}</p>
    <p>Attack: {selectedClass.attack}</p>
    <p>Defense: {selectedClass.defense}</p>
  </div>
);

export default ClassInfo;
