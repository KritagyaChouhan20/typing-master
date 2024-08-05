import './App.css';
import Content from './components/Content';
import Input from './components/Input';
import sentences from './assets/Data';
import { useEffect, useState } from 'react';


function App() {
  let [timer, setTimer] = useState(30);

  //using useEffect with reference to timer value
  useEffect(()=>{

    //reducing the timer value every second till it becomes 0
    let interval;
    if(timer!==0){
      interval = setInterval(() => {
        setTimer(timer-1);
      }, 1000)
    } else {
        // clearing the setInterval function when the value of timer becomes 0
        clearInterval(interval);
      }

      //clearing up the setInterval function when useEffect is unmounted from the DOM to avoid memory leak or unexpected behaviour
      return () => clearInterval(interval);
  }, [timer]);


  return (
    <>
      <p className='timer'> {timer}</p>
      <button onClick={() => setTimer(30)}>Reset</button>

      <Input />
      <Content countDown={timer} data={sentences}/>
    </>
  )
}

export default App;
