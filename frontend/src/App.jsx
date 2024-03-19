import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Signin from './Pages/Signin'
import SignUp from './Pages/SignUp'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'
import CreateListing from './Pages/CreateListing'
import UpdateListing from './Pages/UpdateListing'




function App() {
  

  return (
    <>
     <BrowserRouter>
          <Header></Header>
          <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/sign-in' element={<Signin/>}></Route>
              <Route path='/sign-up' element={<SignUp/>}></Route>
             
              <Route element={<PrivateRoute/>}>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/create-listing' element={<CreateListing/>}/>
                <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
              </Route>
             
          </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
