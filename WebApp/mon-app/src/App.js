import React from "react";
import { Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import SinglePost from "./components/SinglePost";

const App = () => {
  
  return (
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path={"/blog"} element={<Blog />} />
          <Route path={`/singlePost/:id`} element={< SinglePost/>} />
        </Routes>
  );
}

export default App;