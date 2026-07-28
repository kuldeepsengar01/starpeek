import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ragister from "../pages/Ragister";
import Login from "../pages/login";
import Homepage from "../general/Homepage";
import FoodPartner from "../pages/foodpartner";
import FoodPartnerLogin from "../pages/foodpartnerlogin";
import Createfood from "../general/createfood";
import Profile from "../general/profile";
import UserProfile from "../general/userprofile";

const Approutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/user/ragister" element={<Ragister/>} />
            <Route path="/user/login" element={<Login/>} />
            <Route path="/foodpartner/ragister" element={<FoodPartner/>} />
            <Route path="/foodpartner/login" element={<FoodPartnerLogin/>} />
            <Route path="/createfood" element={<Createfood/>} />
            <Route path="/foodpartner/:id" element={<Profile/>} />
            <Route path="/user/profile" element={<UserProfile/>} />
        </Routes>
    </Router>
  
  );
};

export default Approutes;