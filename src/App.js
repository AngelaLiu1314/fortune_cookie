import { useState } from "react";
import "./App.css";
import sound from "../src/Assets/cookie-open.wav"

const API_URL = 'https://fortunecookies-i3p5.onrender.com/fortune/';

const App = () => {
  return (
    <div className="app-container">
      <FortuneGenerator />
    </div>
  );
};

const FortuneGenerator = () => { /*this section is to handle the main functionality of the app*/
  const [fortune, setFortune] = useState('');
  const [luckyNumbers, setLuckyNumbers] = useState([]);

  function playSound() {
    new Audio(sound).play()
  }

  const handleGeneration = async () => { /*this section will call on the api to grab the fortune and lucky numbers*/
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setFortune(data.cookies.fortune);
      setLuckyNumbers(data.cookies.luckyNumbers);
      playSound();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return ( /*this section is for creating the features of the app*/
    <div className="fortune-generator">
      <h1 className="title">Daily Fortune Cookie</h1>
      <button className="cookie-button" onClick={handleGeneration}>
        🥠
      </button>
      <h3>Click Me!</h3>
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