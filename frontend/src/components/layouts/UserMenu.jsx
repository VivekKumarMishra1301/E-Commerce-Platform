import React from 'react'
import Layout from './Layout'
import { NavLink } from 'react-router-dom'
const UserMenu = () => {
    return (
        
        
            <div className="text-center">
                    <h1>Admin Panel</h1>
        
        <div
          className="list-group">
  <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action " aria-current="true">
    Profile 
  </NavLink>
  <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
 
  {/* <NavLink className="list-group-item list-group-item-action disabled" aria-disabled="true">A disabled link item</NavLink> */}
</div>
            </div>
          

  )
}

export default UserMenu