import React from 'react';

const NameInput = ({ name, setName }) => (
  <input
    type="text"
    placeholder="Enter your name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
);

export default NameInput;
