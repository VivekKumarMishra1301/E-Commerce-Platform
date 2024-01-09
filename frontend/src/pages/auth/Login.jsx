import React,{useState} from 'react'
import Layout from '../../components/layouts/Layout'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/auth';
const Login = () => {
   
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/auth/login`, {email, password})
            if (response.data.success) {
                toast.success(response.data.message);
                setAuth({...auth,user:response.data.user,token:response.data.token})
                console.log(response.data);
                localStorage.setItem('auth',JSON.stringify(response.data))
                navigate('/')
            } else {
                 toast.error('Something went wrong')
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
        // toast.success('Registered Successfully');
    }

  return (
    <Layout> <div className="register">
              <h1>
                  
                    Login Page
              </h1>
              <form onSubmit={handleSubmit}>
                  
  <div className="mb-1">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                      <input
                          value={email}
                           onChange={(e)=>setEmail(e.target.value)}
                          type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                      required/>
  </div>
  <div className="mb-1">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                      <input
                          
                          value={password}
                          onChange={(e)=>setPassword(e.target.value)}
                          type="password" className="form-control" id="exampleInputPassword1"
                      required/>
  </div>
   
  <button type="submit" className="btn btn-primary">Submit</button>
</form>



      </div>
      </Layout>
  )
}

export default Login