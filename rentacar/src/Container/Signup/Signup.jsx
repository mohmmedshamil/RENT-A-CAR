import React, { useEffect, useState,useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../Layouts/Layout'
import '../Signin/Signin.scss'
import carlogin from '../../Assets/Images/carlogin.jpg' 
import validate from '../../validations/RequiredValidation'
import serviceBase from '../../Api/servicebase'
import { API_END_POINTS } from '../../Api/apiEndPoints'
import {Modal,Button} from 'react-bootstrap'

function Signup() {
  let navigate = useNavigate();
    const activationRef=useRef()
  const [show, setShow] = useState(false);
    const [values, setvalues] = useState({
        fields: {
          name: { value:"",required:"true"  },
          email: { value:"",required:"true",validate: { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ }  },
          pass: { value:"",required:"true"  },
          password: { value:"",required:"true"  },
        },
      });
      const [isActivate, setisActivate] = useState(false);
      const [isValid, setIsvalid] = useState(false);
      const [errors, setErrors] = useState({});
    const [data, setdata] = useState({ name: "",email: "",password:"",pass:""});

    const signup=()=>{
        setErrors(validate(values));
        console.log(errors);
        setIsvalid(true);
      }

      const handleClose = () => setShow(false);

  const handleShow =()=>{
    setShow(true);
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
            if(data.password==data.pass){
                serviceBase.post(API_END_POINTS.SERVICE.AUTH+API_END_POINTS.REGISTER,{name:data.name,email:data.email,password:data.password}).then((res)=>{
                    console.log(res)
                    alert("successfully created")
                    setisActivate(true)
                handleShow()

                })
            }
            else{
                alert("password is not match")
            }

        }
    },[errors,isValid])
    function confirm(){
        if(activationRef.current.value.length==6){
            serviceBase.post(API_END_POINTS.SERVICE.AUTH+API_END_POINTS.ACTIVATION,{activationid:activationRef.current.value}).then((res)=>{
                console.log(res)
                alert("successfully created")
                // setisActivate(true)
                navigate('/Signin')
            })
        }
        else{
            alert("activation code have 6 digit")
        }
    }
  return (
      <>
      <Layout>
    <div className='maingridsignup'>
        <div className="formsignup">
        <div className="maingrid">
          <div className="imagecarlogin">
              <img src={carlogin} alt="" />
          </div>
          <div className="loginbox">
              <div className="loginform">
              <div className="name">
            <p>Name</p>
                  <input type="text" name='name' onChange={handlechange} />
              <p style={{color:"red"}}>{errors.name}</p>
              </div>
              <div className="email">
            <p>Email</p>
                  <input type="text" name='email' onChange={handlechange} />
              <p style={{color:"red"}}>{errors.email}</p>

              </div>
              <div className="password">
                  <p>Password</p>
                  <input type="password" name='pass' onChange={handlechange}/>
              <p style={{color:"red"}}>{errors.pass}</p>
              </div>
              <div className="cpassword">
                  <p>Confirm Password</p>
                  <input type="password"  name='password' onChange={handlechange}/>
              <p style={{color:"red"}}>{errors.password}</p>
              </div>
              <div className="signup">
                  <button onClick={signup}>Create Account</button>
              </div>
              <div className="linkpage">
                  <Link to='/Signin'>Already have an account  ?</Link>
              </div>
        </div>
    </div>
              
              </div>
          </div>
      </div>
    </Layout>

    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <span><b>Activation Code :</b>
            <input type='text' ref={activationRef}/></span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        <Button variant="primary" onClick={confirm}>
            Confirm
          </Button>

        </Modal.Footer>
      </Modal>
    </>

  )
}

export default Signup