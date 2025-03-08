import React from 'react';
import GradingForm from './components/GradingForm';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>AI Grading App</h1>
      <GradingForm />
    </div>
  );
};

export default App;