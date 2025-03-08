import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyBtDxlYRB1spRgvEoFbo0y-rMUdarZkDgM'; // Replace with your actual API key
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'; // Replace with the actual API endpoint

export const analyzeAnswer = async (question: string, desiredAnswer: string, studentAnswer: string) => {
  const response = await axios.post(
    GEMINI_API_URL,
    {
      question,
      desiredAnswer,
      studentAnswer,
    },
    {
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  // Example response structure (adjust based on actual API response):
  const { semanticSimilarity, meaningMatch } = response.data;

  // Calculate grade (example logic):
  const grade = (semanticSimilarity * 0.6 + meaningMatch * 0.4) * 100;

  // Generate analysis:
  const analysis = `Semantic Similarity: ${semanticSimilarity.toFixed(2)}, Meaning Match: ${meaningMatch.toFixed(2)}`;

  return { grade, analysis };
};