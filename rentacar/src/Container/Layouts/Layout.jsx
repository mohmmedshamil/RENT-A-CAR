import React from 'react'
import Header from '../Header/Header'

function Layout({children}) {
  return (
    <>
    <Header/>
    <div className="layoutchild">
        {children}
    </div>
    </>
  )
}

export default Layout