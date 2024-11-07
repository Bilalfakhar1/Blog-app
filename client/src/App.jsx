import {BrowserRouter , Routes,Route} from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import Signup from './pages/signup'
import Dashboard from './pages/Dashboard'
import Projects from './pages/projects'

function App() {
 

  return (
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/SignIn' element={<SignIn/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path='/Projects' element={<Projects/>}/>
     </Routes>
     
     </BrowserRouter>
  )
}

export default App
