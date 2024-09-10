import './App.css';
import Content from './components/Content';
import sentences from './assets/Data';


function App() {
  return (
    <>
      <Content data={sentences}/>
    </>
  )
}

export default App;
