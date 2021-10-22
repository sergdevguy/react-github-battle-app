import './App.scss';
// import Counter from './features/counter/Counter.js';
import { useSelector } from 'react-redux';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';

function App() {
  const step = useSelector((state) => state.step.value);

  return (
    <div className="App">
      {/* <Counter></Counter> */}
      {step === 1 ? <Step1></Step1> : ''}
      {step === 2 ? <Step2></Step2> : ''}
    </div>
  );
}

export default App;
