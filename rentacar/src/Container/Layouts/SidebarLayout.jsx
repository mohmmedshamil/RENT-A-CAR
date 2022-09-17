import React from 'react'
import Sidebar from '../../Component/Admin Dasboard/Admin Sidebar/Sidebar'

function SidebarLayout({children}) {
  return (
      <>
    <Sidebar/>
    <div className="layoutchild">
        {children}
    </div>
    </>
  )
}

export default SidebarLayout