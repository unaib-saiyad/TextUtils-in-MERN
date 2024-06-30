import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NodeState';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ message: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <div>
            <Navbar />
            <Alert alert={alert}/>
            <div className="container">
              <Routes>
                <Route axact path="/" element={<Home showAlert={showAlert}/>} />
                <Route exact path="/about" element={<About />} />
                <Route axact path="/login" element={<Login showAlert={showAlert} />} />
                <Route axact path="/signup" element={<Signup showAlert={showAlert} />} />
              </Routes>
            </div>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
