import './App.css';
// import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';

function App() {
  return (
    <>
      <Navbar title="Text Utils" />
      <TextForm heading="Enter the text" />
      {/* <About /> */}
    </>
  );
}

export default App;