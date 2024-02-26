import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/contact'
import Policy from './pages/policy'
import Pagenotfound from './pages/Pagenotfound'
import Register from './pages/auth/Register'
import toast, { Toaster } from 'react-hot-toast';
import Login from './pages/auth/Login'
import Dashboard from './pages/user/Dashboard'
import Private from './components/routes/Private'
import AdminRoute from './components/routes/AdminRoute'
import AdminDashboard from './pages/Admin/AdminDashboard'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import User from './pages/Admin/User'
import Orders from './pages/user/Orders'
import Profile from './pages/user/Profile'
import Products from './pages/Admin/Products'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<Private/>}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders' element={<Orders />} />
          <Route path='user/profile' element={<Profile />}/>
        </Route>
         <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path='admin' element={<AdminDashboard />}/>
                    <Route path='admin/create-category' element={<CreateCategory/>}/>

          <Route path='admin/create-product' element={<CreateProduct/>}/>
           <Route path='admin/products' element={<Products/>}/>
                  
                    <Route path='admin/users' element={<User />}/>


        </Route>
        <Route path='/about' element={<About />} />
         <Route path='/signup' element={<Register/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/login' element={<Login/>} />


          <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/*' element={<Pagenotfound/>} />
      </Routes>
    </>
  )
}

export default App
