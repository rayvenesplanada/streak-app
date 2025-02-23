import './App.css';
import Days from './streak/Days';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Your streak is n days</h1>
        <Days />
      </header>
    </div>
  );
}

export default App;
