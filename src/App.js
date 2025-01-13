import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <h1>Welcome to Chess RPG!</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Your name"
      />
      <p>Name: {inputValue}</p>
    </div>
  );
}

export default App;
