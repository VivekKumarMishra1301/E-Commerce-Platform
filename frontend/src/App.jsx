import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/contact'
import Policy from './pages/policy'
import Pagenotfound from './pages/Pagenotfound'
import Register from './pages/auth/Register'
import toast, { Toaster } from 'react-hot-toast';
import Login from './pages/auth/Login'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/about' element={<About />} />
         <Route path='/signup' element={<Register/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/login' element={<Login/>} />


        <Route path='/*' element={<Pagenotfound/>} />
      </Routes>
    </>
  )
}

export default App
