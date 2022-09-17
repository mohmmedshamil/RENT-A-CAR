import React from 'react'
import Layout from '../Layouts/Layout'
import './contactus.scss'
import carjeep from '../../Assets/Images/jeep-car.jpg'
function ContactUs() {
  return (
    <Layout>
      <div className="contactus">
        <div className="imagehalf">
          <img src={carjeep} alt="" />
        </div>
      </div>
    </Layout>
  )
}

export default ContactUs