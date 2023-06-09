import React from "react";
import { Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Blog from "./components/Blog";
import BoardAdmin from "./components/BoardAdmin";

const App = () => {
  
  return (
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path={"/blog"} element={<Blog />} />
          <Route exact path={"/boardadmin"} element={<BoardAdmin />} />
        </Routes>
  );
}

export default App;