import React from 'react'
import './Carousel.scss'
import { Carousel } from 'react-bootstrap'
import carouselimg1 from '../../Assets/Images/carouselimg1.jpg'
import carouselimg2 from '../../Assets/Images/carouselimg4.jpg'
import carouselimg3 from '../../Assets/Images/carouselimg3.jpg'
function Carouseldesign() {
    const carouselarray=[{img:carouselimg1,headthree:"BOOK A CAR NOW",ptag:"FAST AND AFFORDABLE"},
        {img:carouselimg2,headthree:"BOOK A CAR NOW",ptag:"FAST AND AFFORDABLE"},
        {img:carouselimg3,headthree:"BOOK A CAR NOW",ptag:"FAST AND AFFORDABLE"},]
  return (
    <Carousel className='carouseldesign'>
        {carouselarray.map((obj)=>{
            return(
                <Carousel.Item>
      <img
        className="d-block w-100 imgheight"
        src={obj.img}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3 className='h3tag'>{obj.headthree}</h3>
        <p>{obj.ptag}</p>
      </Carousel.Caption>
    </Carousel.Item>
            )
        })}
  </Carousel>
  )
}

export default Carouseldesign