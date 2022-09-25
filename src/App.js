
import './App.css';
// import {Router,Route} from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Login } from './Components/Login';
import { Register } from './Components/Register';
import { Dashboard } from './Components/Dashboard';
import { UserDetailsbyID } from './Components/UserDetailsbyID';
import {AddUser} from './Components/AddUser'
function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/userdetails/:id" element={<UserDetailsbyID/>}/>
          <Route path="/adduser" element={<AddUser/>} />
      </Routes>   
    </Router>
  );
    
}

export default App;