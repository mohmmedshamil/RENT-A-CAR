import React, { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import './Sidebar.scss'
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData'

function Sidebar() {
    const [isHover, setIsHover] = useState(false)
    const [isMaximized, setisMaximized] = useState(false)
    console.log("its reloaded");
    return (
      <div className={` main-menu menu-fixed elStyle menu-light menu-accordion menu-shadow menu-native-scroll ${!isMaximized && !isHover ? "" : 'minimized'}`} data-scroll-to-active="true"
      >
          <button onClick={()=>{
              setisMaximized(!isMaximized)
          }}>X</button>
        <div className="main-menu-content pb-5">
          <Accordion className="menuItems" defaultActiveKey="0">
  
            {SidebarData.map((item, idx) => {
              return (
                <Accordion.Item eventKey={idx} key={idx} className="nosubmenu ">
                  <Link to={`${item.path}`}>
                    <Accordion.Header>
                      {item.icon}
                      <span className="menu-title mx-2" >{(`${item.title}`)}</span>
                    </Accordion.Header>
                  </Link>
                </Accordion.Item>
              )
            })}
            
          </Accordion>
          {/* <div className="logout">
          <h1>hai</h1>
        <i class="fas fa-sign-out-alt"></i>
        </div> */}
        </div >
        
      </div >   
  )
}

export default Sidebar