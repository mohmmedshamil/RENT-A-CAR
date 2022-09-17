import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carlisting from '../Component/Admin Dasboard/Carlisting/Carlisting';
import Layout from '../Container/Layouts/Layout';
import SidebarLayout from '../Container/Layouts/SidebarLayout'
function SidebarRoute() {
  return (
      <>
      <div className="sidebarroute">
          <Routes>
          <Route index path="/" element={<Carlisting />} />
          </Routes>
      </div>      
      </>
  )
}

export default SidebarRoute