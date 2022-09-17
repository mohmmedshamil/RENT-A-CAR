import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AboutUs from '../Container/AboutUs/AboutUs'
import ContactUs from '../Container/ContactUs/ContactUs'
import Home from '../Container/Home/Home'
import Profile from '../Container/Profile/Profile'
import Rentacar from '../Container/Rentacar/Rentacar'

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path='AboutUs' element={<AboutUs />} />
        <Route path="ContactUs" element={<ContactUs />}>
          <Route path="Rentacar" element={<Rentacar />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default Routing