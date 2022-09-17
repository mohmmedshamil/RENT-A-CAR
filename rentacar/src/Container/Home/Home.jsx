import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Carouseldesign from '../../Component/Carousel/Carousel'
import Sliderdesign from '../../Component/Slider/Sliderdesign'
import RentaCarNow from '../RentaCarNow/RentaCarNow'
import * as CarListingActions from '../../store/CarListing/CarListingAction'

import './home.scss'
import { Container, Navbar } from 'react-bootstrap'
import Header from '../Header/Header'
import Layout from '../Layouts/Layout'
function Home() {
  const dispatch = useDispatch();
    const {carList,carcolList} = useSelector(store => store.car)
    useEffect(() => {
      dispatch(CarListingActions.GETCarListing())
      dispatch(CarListingActions.GETCarListingCollection("popular"))
    }, [])

    
    
  return (
    <Layout>
    <div className='home'>
      <Carouseldesign/>
      <RentaCarNow/>
      <div className="sliderdesigns">
      <hr />
        <h1>
        popular
        </h1>
      <hr />
      <Sliderdesign carList={carList} col={"popular"}/>
      </div>

      <div className="sliderdesigns">
      <hr />
      <h1>
      trending
        </h1>
      <hr />
      <Sliderdesign carList={carList} col={"trending"}/>
      </div>
      <div className="sliderdesigns">
      <hr />
      <h1>
      luxury
        </h1>
      <hr />
      <Sliderdesign carList={carList} col={"luxury"}/>
      </div>
      <Navbar style={{background:'black'}}>
    <Container>
      <Navbar.Brand href="#home" style={{color:'white'}}>Rent A Car</Navbar.Brand>
    </Container>
  </Navbar>
    </div>
    </Layout>

  )
}

export default Home