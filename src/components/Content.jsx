import React, { useEffect, useState } from 'react';

const Content = ({countDown,data}) => {
    const [displayDataObject, setDisplayDataObject] = useState([]);
    const [datainserted, setDataInserted] = useState(false);
    const [timer, setTimer] = useState();
    const [typing, setTyping] = useState(true);

    useEffect( ()=>{
        //selecting the random sentaces from the array and displaying to the screen
        for(let i=0; i<=25; i++){
            const value = Math.floor(Math.random()*15/2*i);
            displayDataObject.push(data[value].toLowerCase());    
        }
        setDisplayDataObject(displayDataObject);
        setDataInserted(true);
        console.log(displayDataObject);

    }, []);

    //logic when the countdown reaches 0
    useEffect(()=>{
        //dynamically setting editable content to false
        if (countDown ===0) {
            setTyping(false);
        }
    }, [countDown])


  return (
    <> 
    <p contentEditable={typing}>
        { datainserted && ( displayDataObject.map((item, index) => { return <span key={index}>{item}</span> }))}
    </p>
    </>
  )
}

export default Content;