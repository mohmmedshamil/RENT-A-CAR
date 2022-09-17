import "./App.css";
import Header from "./Container/Header/Header";
import {
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Container/Home/Home";
import AboutUs from "./Container/AboutUs/AboutUs";
import ContactUs from "./Container/ContactUs/ContactUs";
import Rentacar from "./Container/Rentacar/Rentacar";
import Profile from "./Container/Profile/Profile";
import Signin from "./Container/Signin/Signin";
import NotFound from "./Component/NotFound/NotFound";
import Layout from "./Container/Layouts/Layout";
import Sidebar from "./Component/Admin Dasboard/Admin Sidebar/Sidebar";
import Carlisting from "./Component/Admin Dasboard/Carlisting/Carlisting";
import SidebarRoute from "./routes/SidebarRoute";
import { useEffect, useState } from "react";
import BookingCart from "./Component/BookingCart/BookingCart";
import Signup from "./Container/Signup/Signup";

function App() {
  // const location = useLocation()
  // const [admin, setadmin] = useState(true)
  //   useEffect(() => {
  //     var loc=location.pathname;
  //   let result = loc.includes("/Admin");
  //   setadmin(result)
  // }, [location])
  


  return (
    <div className="App">
        <Routes>
      {/* <Layout> */}
    {/* <Header/> */}
            <Route index path="/" element={<Home />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Admin/*" element={<SidebarRoute />} />
            <Route path="/Rentacar" element={<Rentacar />} />
            <Route path="/Booking/:carid" element={<BookingCart />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Signin" element={<Signin/>} />
            <Route path="/Signup" element={<Signup/>} />
        {/* {admin && <SidebarRoute/>} */}
      {/* </Layout> */}
      </Routes>

    </div>
  );
}

export default App;
