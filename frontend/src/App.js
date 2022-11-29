import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from './components/Sharedlayout/SharedLayout';
import { Login } from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import Answers from './components/answers/Answers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout/>} >
          <Route index element={<Login/>}/> 
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/answers' element={<Answers/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
