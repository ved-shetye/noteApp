import Navbar from './components/Navbar';
import Notes from './components/Notes';
import CreateNote from './components/CreateNote';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container mx-auto mt-4">
        <CreateNote />
        <Notes />
      </div>
    </div>
  );
}

export default App;
