import './App.css';
import Homepage from './HomePage/homepage';
import { Route, Routes } from 'react-router-dom';
import Loginpage from './HomePage/Loginpage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Loginpage />} exact />
        <Route path='/home' element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
