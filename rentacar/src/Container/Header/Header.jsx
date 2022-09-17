import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap'
import { BrowserRouter, Link} from 'react-router-dom'
import './header.scss'
function Header() {
    const [admin, setadmin] = useState(false)
    // useEffect(() => {
    //     var loc=location.pathname;
    //   let result = loc.includes("/Admin");
    //   setadmin(result)
    // }, [location])
    
    const headercontent=[{name:'Home',path:'/'},{name:'About Us',path:"/AboutUs"},{name:'Contact Us',path:'/ContactUs'},{name:'Rent A Car',path:'/Rentacar'},]
  return (
    <Navbar expand="lg" className='header' fixed="top">
  <Container fluid className='unorderlist'>
    <Navbar.Brand href="#" className='logo'>Rent A Car</Navbar.Brand>
    {admin && <Nav.Link><Link to='Admin' className='pages'>sidebar</Link></Nav.Link>}
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        navbarScroll
      >
          {headercontent.map((obj,i)=>{
                  return (
                      <Nav.Link><Link to={{pathname:obj.path}} key={i} className='pages'>{obj.name}</Link></Nav.Link>
                  );
              })}
              <NavDropdown className='pages' title="Profile">
                      <NavDropdown.Item><Link to={{pathname:'/Admin'}}>Admin Dashboard</Link></NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item><Link to={{pathname:'/Signin'}}>Sign in</Link></NavDropdown.Item>
                    </NavDropdown>

      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default Header