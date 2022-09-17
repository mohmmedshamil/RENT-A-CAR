import React from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import './sliderdesign.scss'
function Sliderdesign({carList,col}) {
    var settings = {
        infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
      };
      const replacefunc=(val)=>{
          var res="data:image/png;base64, "+val.replaceAll('"', '')
          console.log("res",res)
          
          return res
      }
  return (
      <div className="sliderdesign">
          <hr />
          <Slider {...settings} className="sliderdesignsub">
              {carList.filter((obj)=>{
                  if(obj.collectionName.toUpperCase().includes(col.toUpperCase())){
                      return obj
                  }
              })
              .map((obj,i)=>{
                  return (
                    <div class="content" key={i}>
        <img src={replacefunc(obj.imageurl)}/>
        <h3>{obj.carName}</h3>
        <div className="textslick">
        <p>{obj.location}</p>
        <h6>{obj.price} / DAY</h6>
        </div>
        <button class="buy-1"><Link to={`/Booking/${obj._id}`}>Take This</Link></button>
      </div>
                  )
              })}
    
  </Slider>
      </div>
    

  )
}

export default Sliderdesign