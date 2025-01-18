import React from 'react';

const ClassButton = ({ className, onSelect }) => (
  <button onClick={() => onSelect(className)}>
    {className}
  </button>
);

export default ClassButton;
