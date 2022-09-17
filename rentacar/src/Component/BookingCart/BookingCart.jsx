import React, { useEffect, useState } from 'react'
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../Container/Layouts/Layout';
import { useDispatch, useSelector } from 'react-redux'
import './bookingcart.scss'
import * as CarListingActions from '../../store/CarListing/CarListingAction'
import * as FaIcons from 'react-icons/fa';

function BookingCart() {
  let navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setshow] = useState(false)
    const [total, settotal] = useState(0)
    const [dates, setdates] = useState({startdate:"",enddate:""})
    const [image, setimage] = useState("")
    const {carObj} = useSelector(store => store.car)   
    const {carid} = useParams();
    

    useEffect(() => {
        var c=0
        c=c+1
    if(Object.keys(carObj).length>0){
        console.log(carObj,c)
        var res="data:image/png;base64, "+carObj.imageurl.replaceAll('"', '')
        console.log(res,"fgfgfgfg",c)
        setimage(res)
    }
    }, [carObj])

    useEffect(() => {
        if(carid){
        dispatch(CarListingActions.GETCarListingId(carid))
        }
      }, [carid])

      const dateConverter = (startDate, timeEnd) => {
        const newStartDate= new Date(startDate);
        const newEndDate=new Date(timeEnd);
        const one_day = 1000*60*60*24;
        let result
        result = Math.ceil((newEndDate.getTime()-newStartDate.getTime())/(one_day))
        console.log('date Converter result', result)
        if (result < 0 ) {
          alert("please check the dates EndDate < StartDate ")
          return 0
        }
        return result
      }
    

    // useEffect(() => {
    //   var dat=carObj
    //   console.log("carObj"+dat)
    // }, [carObj])
    
    

    // const replacefunc=(val)=>{
        
    //     console.log("res",res)
        
    //     return res
    // }

    const handleDate=(e)=>{
      const {name,value}=e.target
      setdates({...dates,[name]:value})
    }

    useEffect(() => {
      if(dates.startdate !="" && dates.enddate !=""){
        console.log("ssdsdsdsdsdaaaa")
        var difdays=dateConverter(dates.startdate,dates.enddate)
        settotal(difdays*carObj.price)
      }
    }, [dates.startdate,dates.enddate])
    

    const payment=()=>{
      console.log(dates.startdate,dates.enddate,dateConverter(dates.startdate,dates.enddate))
    }
    
  return (
    <Layout>
        {carObj!=null && <div className="mainrow">
            <div className="image">
                <img src={image} alt="" />
            </div>
            <div className="contents">
              <h4>CAR INFO {show ? <FaIcons.FaAngleUp onClick={()=>setshow(false)}/> : <FaIcons.FaAngleDown onClick={()=>setshow(true)}/> } </h4>
              {show && <div className="alledit">
                <div className="carname">
                    <p>Car Name :</p>
                    <p>{carObj.carName}</p>
                </div>
                <div className="price">
                <p>price :</p>
                <p>{carObj.price}/Day</p>
                </div>
                <div className="maxperson">
                <p>maxperson :</p>
                <p>{carObj.maxperson}</p>
                </div>
                <div className="type">
                <p>type :</p>
                <p>{carObj.type}</p>
                </div>
                <div className="location">
                <p>location :</p>
                <p>{carObj.location}</p>
                </div>
                <div className="collectionName">
                <p>collectionName :</p>
                <p>{carObj.collectionName}</p>
                </div>
                <div className="available">
                <p>available :</p>
                <p>{carObj.available}</p>
                </div>
            </div>}
            <h4>PAYMENT INFO</h4>
            <div className="alledit">
                <div className="carname">
                    <p>Per Day :</p>
                    <p>{carObj.price} ₹</p>
                </div>
                <div className="date">
                    <p>Start Date :</p>
                    <input type="Date" onChange={handleDate} name="startdate" />
                </div>
                <div className="date">
                    <p>End Date :</p>
                    <input type="Date" onChange={handleDate} name="enddate" />
                </div>
                <div className="total">
                    <p>Total :</p>
                    {/* <input type="Date" onChange={handleDate} name="enddate" /> */}
                    {total !=0 &&<p>{total} ₹</p>}
                </div>
                </div>

                <button onClick={payment}>payment</button>
            </div>
        </div>}
    </Layout>
  )
}

export default BookingCart