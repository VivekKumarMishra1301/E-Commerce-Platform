import React from 'react'
import Layout from '../../components/layouts/Layout';
import AdminMenu from '../../components/layouts/AdminMenu';
import { useAuth } from '../../context/auth';
const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
              <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-9">
            <div className="card ">
              <h1>Name: {auth?.user?.name}</h1>
              <h1>Email: {auth?.user?.email}</h1>
              <h1>Phone: {auth?.user?.phone}</h1>
              <h1>{auth?.user?.name}</h1>
            </div>
          </div>
          </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard