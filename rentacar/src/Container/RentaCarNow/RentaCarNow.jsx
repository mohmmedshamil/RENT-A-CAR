import React from 'react'
import './rentaCarNow.scss'
function RentaCarNow() {
  return (
      <div className="mainrent">
    <div className='RentaCarNow'>
        <h1>RENT A CAR NOW !</h1>
        <div className="rentselect">
            <div className="carmodel samedes">
                <input type="text" placeholder='CAR MODEL' />
            </div>
            <div className="pickuplocation samedes">
                <input type="text" placeholder='PICK-UP' />
            </div>
            <div className="pickupdate samedes">
                <input type="Date" />
            </div>
            <div className="dropofflocation samedes">
                <input type="text" placeholder='DROP-OFF' />
            </div>
            <div className="dropoffdate samedes">
                <input type="Date" />
            </div>
            <div className="dropoffdate samedes">
                <button>Search</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default RentaCarNow