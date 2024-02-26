import React from 'react'
import Layout from './Layout'
import { NavLink } from 'react-router-dom'
const AdminMenu = () => {
    return (
        
        
            <div className="text-center">
                    <h1>Admin Panel</h1>
        
        <div
          className="list-group">
  <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action " aria-current="true">
    Create Category 
  </NavLink>
          <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
          <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action"> Products</NavLink>
 
  <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
 
  {/* <NavLink className="list-group-item list-group-item-action disabled" aria-disabled="true">A disabled link item</NavLink> */}
</div>
            </div>
          

  )
}

export default AdminMenu