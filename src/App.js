import './App.css';
import { ClassState } from './ClassState';
import { UseReducer } from './UseReducer';
import { UseState } from './UseState';

function App() {
  return (
    <div className="App">
      <UseReducer name="Use Reducer" />
      <UseState  name="Use State" />
      <ClassState name="Use Class State" />
    </div>
  );
}

export default App;
