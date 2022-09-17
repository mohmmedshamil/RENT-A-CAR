import React, { useEffect, useState } from 'react'
import { Button, Card, Modal,Alert } from 'react-bootstrap'
import './Cars.scss'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import axios from 'axios';
import {API_END_POINTS} from '../../Api/apiEndPoints'
import validate from '../../validations/RequiredValidation'
import serviceBase from '../../Api/servicebase';
import { toast } from 'react-toastify';


function Cards({cars,setupdatestate,updatestate}) {
    const [show, setShow] = useState(false);
    const [type, setType] = useState();
    const [car, setcar] = useState()
    const [errors, setErrors] = useState({});
  const [isValid, setIsvalid] = useState(false);
    const [values, setvalues] = useState({
      fields: {
        carName: { value: car ? car.carName : "",  },
        maxperson: { value: car ? car.maxperson : "",  },
        type: { value: car ? car.type : "",  },
        price: { value:  car ? car.price : "",  },
        location: { value:  car ? car.location : "", },
        collectionName: { value:  car ? car.collectionName : "", },
        available: { value:  car ? car.available : "", },
      },
    });
  const [data, setdata] = useState({ carName: "",price: "",location: "" ,maxperson:"",type:"",collectionName: "" ,available: ""  });
  const handleClose = () => setShow(false);
  const handleShow = (val,type) =>{
    setType(type)
    setcar(val)
    setShow(true);
  } 

  const savechanges=()=>{
    setErrors(validate(values));
    console.log(errors);
    setIsvalid(true);
  }
  useEffect(() => {
    if(car !=null){
      setdata({...data,
        carName: car.carName,price: car.price,location: car.location ,maxperson:car.maxperson,type:car.type,collectionName: car.collectionName ,available:car.available
      })
    }
  }, [car])

  

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isValid) {
    console.log(data)
      serviceBase.put(API_END_POINTS.SERVICE.CARS+API_END_POINTS.UPDATE+`/${car._id}`,data).then((res)=>{
        toast.error("dddfdfd",{
          position: toast.POSITION.TOP_CENTER
      });
      alert("Edit Success")
      setupdatestate(updatestate+1)
      // success(res)
      handleClose()
      }).catch((err)=>{
        toast.error(err.message?err.message:"Error while processing the request",{
          position: toast.POSITION.TOP_RIGHT
      });
      alert("Something wrong")
      })
          // alert("login success")
    }
  }, [errors,isValid])

  const handleChange=(e)=>{
    const {name,value}=e.target
    setvalues({
      ...values,
      fields: {
        ...values.fields,
        [name]: { ...values.fields[name], value: value },
      },
    });
    setdata({ ...data, [name]: value });
  }

    const replacefunc=(val)=>{
        var res="data:image/png;base64, "+val.replaceAll('"', '')
        // console.log("res",res)
        
        return res
    }

    const deletecar=()=>{
      serviceBase.delete(API_END_POINTS.SERVICE.CARS+API_END_POINTS.DELETE+`/${car._id}`).then((res)=>{
        toast.error("dddfdfd",{
          position: toast.POSITION.TOP_CENTER
      });
      alert("Delete Success")
      handleClose()
      setupdatestate(updatestate+1)
      }).catch((err)=>{
        toast.error(err.message?err.message:"Error while processing the request",{
          position: toast.POSITION.TOP_RIGHT
      });
      alert("Something wrong")
      })
    }
  return (
    <>
    <Card className='carddes'>
    <Card.Img variant="top" src={replacefunc(cars.imageurl)} />
    <Card.Body>
      <Card.Title>{cars.carName}</Card.Title>
      <Card.Text>
        <div className="cardtests">
            <div>
                <p>Location</p>
            <p>{cars.location}</p>
            </div>
            <div>
                <p>Price</p>
            <p>{cars.price} / Day</p>
            </div>
            <div>
                <p>maxperson</p>
            <p>{cars.maxperson}</p>
            </div>
            <div>
                <p>type</p>
            <p>{cars.type}</p>
            </div>
            <div>
                <p>CollectionName</p>
            <p>{cars.collectionName}</p>

            </div>
            <div>
                <p>Available</p>
            <p>{cars.available}</p>
            </div>
        </div>
      </Card.Text>
    </Card.Body>
    <Card.Footer className='cardfooterdes'>
        <FaIcons.FaRegEdit className='cardfooteredit' id={cars._id} onClick={()=>handleShow(cars,"edit")}/>
        <FaIcons.FaEye className='cardfooterview' onClick={()=>handleShow(cars,"view")}/>
        <FaIcons.FaRegTrashAlt className='cardfootertrash' onClick={()=>handleShow(cars,"delete")}/>
    </Card.Footer>
  </Card>


  <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          {car && <Modal.Title>{car.carName}</Modal.Title> }
        </Modal.Header>
        {type=='delete' && <Modal.Body>
          <p>Are you sure you want to delete this ?</p>
          </Modal.Body>}
        {type=='edit'&& <Modal.Body>
            {car && <div className="alledit">
                <div className="carname">
                    <p>Car Name :</p>
                    <input type="text" placeholder='car name' name='carName' defaultValue={car.carName}  onChange={(e) => { setdata({ ...data, carName: e.target.value }) }} />
                </div>
                <div className="price">
                <p>price :</p>
                    <input type="text" placeholder='price' name='price'  defaultValue={car.price}  onChange={(e) => { setdata({ ...data, price: e.target.value }) }}/>
                </div>
                <div className="maxperson">
                <p>maxperson :</p>
                    <input type="text" placeholder='maxperson' name='maxperson'  defaultValue={car.maxperson}  onChange={(e) => { setdata({ ...data, maxperson: e.target.value }) }}/>
                </div>
                <div className="type">
                <p>type :</p>
                    <input type="text" placeholder='type' name='type'  defaultValue={car.type}  onChange={(e) => { setdata({ ...data, type: e.target.value }) }}/>
                </div>
                <div className="location">
                <p>location :</p>
                    <input type="text" placeholder='location' name='location'  defaultValue={car.location}  onChange={(e) => { setdata({ ...data, location: e.target.value }) }} />
                </div>
                <div className="collectionName">
                <p>collectionName :</p>
                    <input type="text" placeholder='collectionName' name='collectionName'  defaultValue={car.collectionName}  onChange={(e) => { setdata({ ...data, collectionName: e.target.value }) }}/>
                </div>
                <div className="available">
                <p>available :</p>
                    <input type="text" placeholder='available' name='available' defaultValue={car.available} onChange={(e) => { setdata({ ...data, available: e.target.value }) }}/>
                </div>
            </div>}
        </Modal.Body>}
        {type=='view'&& <Modal.Body>
            {car && <div className="alledit">
                <div className="carname">
                    <p>Car Name :</p>
                    <p>{car.carName}</p>
                </div>
                <div className="price">
                <p>price :</p>
                <p>{car.price}</p>
                </div>
                <div className="maxperson">
                <p>maxperson :</p>
                <p>{car.maxperson}</p>
                </div>
                <div className="type">
                <p>type :</p>
                <p>{car.type}</p>
                </div>
                <div className="location">
                <p>location :</p>
                <p>{car.location}</p>
                </div>
                <div className="collectionName">
                <p>collectionName :</p>
                <p>{car.collectionName}</p>
                </div>
                <div className="available">
                <p>available :</p>
                <p>{car.available}</p>
                </div>
            </div>}
        </Modal.Body>}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {type=='edit' && <Button variant="primary" onClick={savechanges}>
            Save Changes
          </Button>}
          {type=='delete' && <Button variant="danger" onClick={deletecar}>
            Confirm
          </Button>}

        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Cards