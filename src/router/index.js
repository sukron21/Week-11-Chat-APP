import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../views/Register/register"
import Login from "../views/Login";
import Chatlist from "../views/chatlist/index";
import HProfile from "../views/profile";


const Router=()=>{
    return(
        <BrowserRouter>
        <Routes>
         <Route path="/">
         <Route index element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/chatlist" element={<Chatlist />} />
         <Route path="/hprofile" element={<HProfile />} />
         </Route>
         </Routes>
        </BrowserRouter>
    )
}
export default Router;