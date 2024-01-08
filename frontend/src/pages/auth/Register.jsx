import React, { useState} from 'react'
import Layout from '../../components/layouts/Layout'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const Register = () => {

    const [name, setName]= useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const[role,setRole] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/auth/register`, { name, email, password, phone, role })
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login')
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
      <Layout>
          <div className="register">
              <h1>
                  
                    Register Page
              </h1>
              <form onSubmit={handleSubmit}>
                   <div className="mb-1">
    <label htmlFor="exampleInputName1" className="form-label">Full Name</label>
                      <input
                          value={name}
                          onChange={(e)=>setName(e.target.value)}
                          type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp"
                      required/>
  </div>
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
   <div className="mb-1">
    <label htmlFor="phone" className="form-label">Phone</label>
                      <input
                          value={phone}
                          onChange={(e)=>setPhone(e.target.value)}
                          type="text" className="form-control" id="phone" aria-describedby="emailHelp"
                          required
                      />
                  </div>
                   
                   <div className="mb-1">
    <label htmlFor="role" className="form-label">Role</label>
                      <input
                          value={role}
                          onChange={(e)=>setRole(e.target.value)}
                          type="number" className="form-control" id="role" aria-describedby="emailHelp"
                      required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>



          </div>
      </Layout>
  )
}

export default Register