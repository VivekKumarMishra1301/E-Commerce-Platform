import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu></UserMenu>
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1>{auth?.user?.name}</h1>
          </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard