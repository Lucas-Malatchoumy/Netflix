import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'
import Navbar from "./navbar";

const useAuth = () =>{
  const token = localStorage.getItem('token');
  if (token) {
    return true
  } 
  else {
    return false
  }
}

const ProtectedRoutes = () => {
  const auth = useAuth()
  return auth?<><Navbar /><Outlet /></>: <Navigate to="/home"/>
}

export default ProtectedRoutes;