import {useState,useEffect} from 'react'
import { useAuth } from '../../context/auth'
import {Outlet} from 'react-router-dom'
import axios from 'axios';
import Spinner from '../Spinner';
export default function Private() {
    const [auth, setAuth] = useAuth();
    const [ok, setok]=useState(false);
    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('http://localhost:3000/api/v1/auth/user-auth', {
                headers: {
                    "Authorization":auth?.token
                    
                }
            })
            if (res.data.ok) {
                setok(true);
            } else {
                setok(false);
            }
        }
        if (auth?.token) {
            authCheck();
        }
    },[auth?.token])
    return ok?<Outlet/>:<Spinner/>
}