import React from 'react'
import './Signin.scss'
import carlogin from '../../Assets/Images/carlogin.jpg' 
import Layout from '../Layouts/Layout'
import { Link } from 'react-router-dom'
function Signin() {
  return (
      <Layout>
      <div className="maingrid">
          <div className="imagecarlogin">
              <img src={carlogin} alt="" />
          </div>
          <div className="loginbox">
              <div className="loginform">
              <div className="email">
                  <input type="text" placeholder='email' />
              </div>
              <div className="password">
                  <input type="password" placeholder='password' />
              </div>
              <div className="Login">
                  <button>Login</button>
              </div>
              <div className="linkpage">
                  <Link to='/Signup'>Create Account</Link>
                  <Link to='/Signup'>Forgot Password</Link>
              </div>
              </div>
          </div>
      </div>
      </Layout>
  )
}

export default Signin