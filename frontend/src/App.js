import logo from './logo.svg';
import './App.css';
import './App.css';
import ButtonAppBar from './components/Appbar';
import Tasks from './components/Tasks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Task from './components/Task';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
      <ButtonAppBar></ButtonAppBar>
        <Routes>
            <Route path='' element={<Tasks></Tasks>} />
            <Route path='/tasks' element={<Tasks></Tasks>} />
            <Route path='/task' element={ <Task></Task>} />

        </Routes>
            </BrowserRouter>
    </div>
  );
}

export default App;
