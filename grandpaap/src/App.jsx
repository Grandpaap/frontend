import './App.css'
import { Routes, Route } from "react-router-dom";
import Register from './components/register';
import Login from './components/login';
import Message from './components/message';
import WelcomePage from './components/welcome';
import Group from './components/group';
import GroupSignup from './components/groupsignup';
function App() {
 

  return (
    <>
      <Routes>
      <Route path = "/groupsignup" element = {<GroupSignup/>} />
        <Route path = "/group" element = {<Group/>} />
        <Route path = "/" element = {<WelcomePage/>} />
        <Route path = "/register" element = {<Register/>} />
        <Route path = "/login" element = {<Login/>} />
        <Route path = "/message" element = {<Message/>} />
        </Routes>
    </>
  )
}

export default App
