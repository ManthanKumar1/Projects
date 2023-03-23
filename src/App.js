import React, { useState } from 'react';
import './App.css';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'num1') {
      setNum1(value);
    } else if (name === 'num2') {
      setNum2(value);
    }
  };

  const handleAddition = () => {
    if (num1 && num2) {
      const sum = parseFloat(num1) + parseFloat(num2);
      setResult(sum);
    }
  };

  return (
    <div className="App">
      <div id="assignment">Add Two Numbers</div>
      <div id="Exercises">Enter the two numbers which indicates the First and Second Numbers.</div>
      <div id="Adding 2 number should work">On click of 'Display Result' button, result should be displayed in result input box.</div>
      <div>
        <label htmlFor="Text1">Enter First Number: </label>
        <input type="text" id="Text1" name="num1" value={num1} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="Text2">Enter Second Number: </label>
        <input type="text" id="Text2" name="num2" value={num2} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="txtresult">Result: </label>
        <input type="text" id="txtresult" name="result" value={result} readOnly />
      </div>
      <div>
        <button id="clickbtn" onClick={handleAddition} disabled={!num1 || !num2}>
          Display Result
        </button>
      </div>
    </div>
  );
}

export default App;