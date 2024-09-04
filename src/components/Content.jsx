import React, { useState, useEffect } from 'react';

const Content = ({ countDown, data }) => {
  const [displayDataObject, setDisplayDataObject] = useState([]);
  const [dataString, setDataString] = useState('');
  const [dataInserted, setDataInserted] = useState(false);
  const [typing, setTyping] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [correctInput, setCorrectInput] = useState('');

  useEffect(() => {
    for (let i = 0; i <= 1; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomSentence = data[randomIndex].toLowerCase().trim();
      setDataString((prevString) => prevString + ' ' + randomSentence);
    }
    setDisplayDataObject(dataString.split(''));
    setDataInserted(true);
  }, []);

  useEffect(() => {
    if (countDown === 0) {
      setTyping(false);
    }
  }, [countDown]);

  const handleKeyDown = (e) => {
    var userInputArray;
    userInputArray.push(e.key);
    const dataStringArray = dataString.split('');
    const userInputChar = e.key.toLowerCase();
    const dataStringChar = dataStringArray[userInputArray.length];

    if (userInputChar === dataStringChar) {
      setCorrectInput((prevCorrectInput) => prevCorrectInput + userInputChar);
      setUserInput((prevUserInput) => prevUserInput + userInputChar);
      console.log('Correct input');
    } else {
      console.log('Incorrect input');
    }
  };

  return (
    <>
      <p
        contentEditable={typing ? 'true' : 'false'}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: dataString }}
      />
    </>
  );
};

export default Content;




// logic
// 1) array that will fetch data from array to string and than store in array to display individual word.
// 2) function that will trigger using keyDown event and will store the value to the array.
// 3) real time function check of the array
// 4) moving the cursor and providing the specific classes based on the correctness of the alaphbet
// 5) 