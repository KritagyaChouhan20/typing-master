import React, { useRef, useState, useEffect } from 'react';

const Content = ({ data }) => {
  const [displayDataObject, setDisplayDataObject] = useState([]);
  const [dataString, setDataString] = useState('');
  const [dataInserted, setDataInserted] = useState(false);
  const [typing, setTyping] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [correctInput, setCorrectInput] = useState('');
  const [timer, setTimer] = useState(30);
  const textArea = useRef(null);


  // Function to randomly select new data from the array
  const fetchData = () => {
    let newString = '';
    for (let i = 0; i <= 3; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomSentence = data[randomIndex].toLowerCase().trim();
      newString += ' ' + randomSentence; // Build new data string
    }
    setDataString(newString.trim()); // Set the new string to state
    setDisplayDataObject(newString.split('')); // Split string into characters
    setDataInserted(true); // Mark that data has been inserted
  };

  // Function to reset the timer and fetch new data
  const ButtonReset = () => {
    setTimer(30); // Reset timer to 30 seconds
    setTyping(true); // Enable typing again
    setUserInput(''); // Clear user input
    setCorrectInput(''); // Clear correct input
    fetchData(); // Refetch new random data

    //AutoFocus when clicking on reset button
    if (textArea.current) {
      textArea.current.focus();
    }
  };

  // Timer logic with useEffect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1); // Decrease timer every second
      }, 1000);
    } else {
      clearInterval(interval); // Stop the interval when the timer reaches 0
      setTyping(false); // Disable typing when time runs out
      calculateStats();
    }
    return () => clearInterval(interval); // Cleanup to avoid memory leaks
  }, [timer]);

  // Initial data fetch when the component mounts
  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);

  // Handle key press
  const handleKeyDown = (e) => {
    const userInputArray = userInput.split(''); // Split user input into array
    const dataStringArray = dataString.split(''); // Split data string into array
    const userInputChar = e.key; // Current key press
    const dataStringChar = dataStringArray[userInputArray.length]; // Correct character from data string

    // Check if the key is an alphabet (a-z, A-Z), a number (0-9), backspace, or space
    const isAlphabet = /^[a-zA-Z]$/.test(userInputChar);
    const isNumber = /^[0-9]$/.test(userInputChar);
    const isBackspace = userInputChar === 'Backspace';
    const isSpace = userInputChar === ' ';

    if (isBackspace) {
      setUserInput(prevInput => prevInput.slice(0, -1)); // Handle backspace
      setCorrectInput(prevCorrectInput => prevCorrectInput.slice(0, -1)); // Adjust correct input if needed
    } else if (isAlphabet || isNumber || isSpace) {
      setUserInput(prevInput => prevInput + userInputChar); // Update user input

      // Check if the input matches the corresponding data string character
      if (userInputChar === dataStringChar) {
        setCorrectInput(prevCorrectInput => prevCorrectInput + userInputChar);
      }
    } else {
      e.preventDefault(); // Prevent invalid keys from being typed
    }
  };

    // Function to calculate accuracy
  const calculateStats = () => {
    const totalCharactersTyped = userInput.length; // Total characters typed (raw)
    const correctCharactersTyped = correctInput.length; // Correct characters typed
    const timeMinutes = 0.5; // 30-second timer (0.5 minutes)

    // WPM for Correct Words (Speed)
    const speed = (correctCharactersTyped / 5) / timeMinutes;

    // WPM for Raw Words (Raw Speed)
    const rawSpeed = (totalCharactersTyped / 5) / timeMinutes;

    // Accuracy
    const accuracy = (correctCharactersTyped / totalCharactersTyped) * 100;

    const userStats = {
      rawSpeed: rawSpeed.toFixed(2), // Round to 2 decimal places
      speed: speed.toFixed(2),       // Round to 2 decimal places
      accuracy: accuracy.toFixed(2)  // Round to 2 decimal places
    };

    console.log(userStats);
    return userStats;
  };

  return (
    <>
      <p className='timer'>{timer}</p>
      <button onClick={ButtonReset}>Reset</button>

      {/* Display the full data string with correct input highlighted */}
      <p>
        {dataString.split('').map((char, index) => {
          const userChar = userInput[index];
          return (
            <span
              key={index}
              style={{
                color: userChar === char ? 'green' : 'black', // Highlight correct characters in green
                backgroundColor: index < userInput.length ? 'lightgray' : 'transparent' // Background for typed characters
              }}
            >
              {char}
            </span>
          );
        })}
      </p>

      {/* Textarea for user input */}
      <textarea
        autoFocus
        ref={textArea}
        disabled={!typing}
        type="text"
        name="input"
        id="id"
        className='w-full h-max'
        onKeyDown={handleKeyDown}
        value={userInput}
      />

      {!typing && (
        <>
          <p>Accuracy: {calculateStats().accuracy}%</p>
          <p>Speed: {calculateStats().speed} WPM</p>
          <p>Raw Speed: {calculateStats().rawSpeed} WPM</p>
        </>
      )}
    </>
  );
};

export default Content;
