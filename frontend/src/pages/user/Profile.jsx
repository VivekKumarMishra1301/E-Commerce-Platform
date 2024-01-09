import React from 'react'
import UserMenu from '../../components/layouts/UserMenu'
import Layout from '../../components/layouts/Layout'

const Profile = () => {
  return (
      <Layout>
          <div className="container-fluid p-3 m-3">
              
          <div className="row">
                  <div className="col-md-3">
                      <UserMenu></UserMenu>
                  </div>
                  <div className="col-md-9">
                      <h1>Your Profile</h1>
              </div>
          </div>
          </div>
    </Layout>
  )
}

export default Profile