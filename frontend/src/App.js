import logo from './logo.svg';
import './App.css';
import React from 'react';
import DishesList from './componets/DishesList';

const  App = () => {
  return (
    <div className="App">
      <h1>Dishes</h1>
      <DishesList />
    </div>
  );
};

export default App;
