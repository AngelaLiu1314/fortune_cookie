import { useState } from "react";
import "./App.css"; // Import the CSS file

const API_URL = 'https://fortunecookies-i3p5.onrender.com/fortune/';

const App = () => {
  return (
    <div className="app-container">
      <FortuneGenerator />
    </div>
  );
};

const FortuneGenerator = () => {
  const [fortune, setFortune] = useState('');
  const [luckyNumbers, setLuckyNumbers] = useState([]);

  const handleGeneration = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setFortune(data.cookies.fortune);
      setLuckyNumbers(data.cookies.luckyNumbers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="fortune-generator">
      <h1 className="title">Daily Fortune Cookie</h1>
      <button className="generate-button" onClick={handleGeneration}>
        Generate Today's Fortune
      </button>
      {fortune && <p className="fortune-text">Your Fortune Is: {fortune}</p>}
      {luckyNumbers.length > 0 && (
        <p className="lucky-numbers">
          Your Lucky Numbers Are: {luckyNumbers.join(', ')}
        </p>
      )}
    </div>
  );
};

export default App;