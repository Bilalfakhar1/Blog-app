import {BrowserRouter , Routes,Route} from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import Signup from './pages/signup'
import Dashboard from './pages/Dashboard'
import Projects from './pages/projects'
import Header from './components/Header'
import Footercomp from './components/footer'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './pages/CreatePost'
import PostRoute from './components/PostRoute'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'

function App() {
 

  return (
     <BrowserRouter>
     <Header/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/SignIn' element={<SignIn/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route element={<PrivateRoute/>}>
          <Route path='/Dashboard' element={<Dashboard/>}/>
      </Route>
      <Route element={<PostRoute/>}>
      <Route path='/create-post' element={<CreatePost/>} />
      <Route path='/update-post/:postId' element={<UpdatePost/>} />
      </Route>
      <Route path='/Projects' element={<Projects/>}/>
      <Route path='/post/:postSlug' element={<PostPage/>}/>
     </Routes>
     <Footercomp/>
     </BrowserRouter>
  )
}

export default App
