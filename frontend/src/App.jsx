import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import About from './Pages/About'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Signin from './Pages/Signin'
import SignUp from './Pages/SignUp'



function App() {
  

  return (
    <>
     <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/sign-in' element={<Signin/>}></Route>
              <Route path='/sign-up' element={<SignUp/>}></Route>
              <Route path='/about' element={<About/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>
          </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
