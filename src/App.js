import Navbar from './components/Navbar';
import Notes from './components/Notes';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container mx-auto mt-4">
        <Notes />
      </div>
    </div>
  );
}

export default App;
