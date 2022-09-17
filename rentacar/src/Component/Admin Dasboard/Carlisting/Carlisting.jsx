import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardGroup,Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../Container/Layouts/Layout";
import SidebarLayout from "../../../Container/Layouts/SidebarLayout";
import * as CarListingActions from '../../../store/CarListing/CarListingAction'
import Cards from "../../Card/Cards";
import validate from '../../../validations/RequiredValidation'
import "./carlisting.scss";
import serviceBase from "../../../Api/servicebase";
import { API_END_POINTS } from "../../../Api/apiEndPoints";
import { toast } from "react-toastify";
import Fileuploads from "../../FileUpload/Fileuploads";
function Carlisting() {
  var c=0
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [file, setfile] = useState("");
  const [search, setsearch] = useState("")
  const [values, setvalues] = useState({
    fields: {
      carName: { value:"",required:"true"  },
      maxperson: { value:"",required:"true"  },
      type: { value:"",required:"true"  },
      price: { value:"", required:"true" },
      location: { value:"",required:"true" },
      collectionName: { value:"",required:"true" },
      available: { value:"",required:"true" },
    },
  });
  const [isValid, setIsvalid] = useState(false);
  const [errors, setErrors] = useState({});
const [data, setdata] = useState({ carName: "",price: "",maxperson:"",type:"",location: "" ,collectionName: "" ,available: ""  });
  const [count, setcount] = useState(0)
  const [updatestate, setupdatestate] = useState(0)
    const {carList,carcolList} = useSelector(store => store.car)
  useEffect(() => {
    dispatch(CarListingActions.GETCarListing())

  }, [updatestate])

  const handleClose = () => setShow(false);

  const handleShow =()=>{
    setShow(true);
  }


  // useEffect(() => {
  //   console.log(searchref.current.value)
  // }, [searchref])

  useEffect(() => {
    console.log(file)
  }, [file])

  const fileremove=(filerem)=>{
    var files=filerem.replace('data:image/jpeg;base64,','')
    return files
  }
  

  const searchhandle=(e)=>{
    setsearch(e.target.value)
    console.log(e.target.value)
  }
  useEffect(() => {
    setdata({...data,['imageurl']:fileremove(file)})
  }, [file])
  

  const savechanges=()=>{
    setErrors(validate(values));
    console.log(errors);
    setIsvalid(true);
  }

  const handlechange=(e)=>{
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

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isValid) {
        serviceBase.post(API_END_POINTS.SERVICE.CARS+API_END_POINTS.ADD,data).then((res)=>{
          toast.error("dddfdfd",{
            position: toast.POSITION.TOP_CENTER
        });
        alert("Add Success")
        setupdatestate(updatestate+1)
        // success(res)
        handleClose()
        }).catch((err)=>{
          toast.error(err.message?err.message:"Error while processing the request",{
            position: toast.POSITION.TOP_RIGHT
        });
        alert("Something wrong")
        })
      }
  }, [errors,isValid])
  
  
  
  return (
    <>
      <Layout>
        <span className="spangrid">
          <SidebarLayout />
          <div className="cardcont">
            <div className="cont">
            <input type="text" onChange={searchhandle} placeholder="Search" />
          <Button variant='success' className="successbtn" onClick={handleShow}>ADD A CAR</Button>
            </div>
          <CardGroup className="cardgroups">
            {carList.filter((obj)=>{
              if(obj.carName.toUpperCase().includes(search.toUpperCase())){
                c=c+1
                 return obj
              }
            }).map((car)=>{
              return(
                <Cards cars={car} setupdatestate={setupdatestate} updatestate={updatestate}/>
              )
            })}
          {c==0 && <h1></h1>}
          {c==0 && <h1>Not Found</h1>}
          {c==0 && <h1></h1>}

</CardGroup>
</div>
        </span>
      </Layout>


      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="image">
                    {/* <input type="file" placeholder='image' name='imageurl' onChange={handlechange}/> */}
                    <Fileuploads setFile={setfile}/>
                </div>
        <div className="alladd">
                <div className="carname">
                    <p>Car Name :</p>
                    <input type="text" placeholder='car name' name='carName' onChange={handlechange}/>
                </div>
                <p>{errors.carName}</p>
                <div className="price">
                <p>price :</p>
                    <input type="text" placeholder='price' name='price' onChange={handlechange}/>
                </div>
                <p>{errors.price}</p>
                <div className="maxperson">
                <p>maxperson :</p>
                    <input type="text" placeholder='maxperson' name='maxperson' onChange={handlechange}/>
                </div>
                <p>{errors.maxperson}</p>
                <div className="type">
                <p>type :</p>
                    <input type="text" placeholder='type' name='type' onChange={handlechange}/>
                </div>
                <p>{errors.type}</p>
                <div className="location">
                <p>location :</p>
                    <input type="text" placeholder='location' name='location' onChange={handlechange}/>
                </div>
                <p>{errors.location}</p>
                <div className="collectionName">
                <p>collectionName :</p>
                    <input type="text" placeholder='collectionName' name='collectionName' onChange={handlechange}/>
                </div>
                <p>{errors.collectionName}</p>
                <div className="available">
                <p>available :</p>
                    <input type="text" placeholder='available' name='available' onChange={handlechange}/>
                </div>
                <p>{errors.available}</p>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        <Button variant="primary" onClick={savechanges}>
            Save Changes
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Carlisting;
