import React, { useState } from 'react';
import { analyzeAnswer } from '../services/geminiService';

const GradingForm: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [desiredAnswer, setDesiredAnswer] = useState('');
  const [studentAnswer, setStudentAnswer] = useState('');
  const [grade, setGrade] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await analyzeAnswer(question, desiredAnswer, studentAnswer);
    setGrade(result.grade);
    setAnalysis(result.analysis);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question:</label>
        <textarea value={question} onChange={(e) => setQuestion(e.target.value)} />
      </div>
      <div>
        <label>Desired Answer:</label>
        <textarea value={desiredAnswer} onChange={(e) => setDesiredAnswer(e.target.value)} />
      </div>
      <div>
        <label>Student Answer:</label>
        <textarea value={studentAnswer} onChange={(e) => setStudentAnswer(e.target.value)} />
      </div>
      <button type="submit">Grade Answer</button>
      {grade !== null && (
        <div>
          <h3>Grade: {grade}</h3>
          <p>Analysis: {analysis}</p>
        </div>
      )}
    </form>
  );
};

export default GradingForm;