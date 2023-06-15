import React from "react";
import { Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Blog from "./components/Blog";
import EditPost from "./components/EditPost";
import SinglePost from "./components/SinglePost";
import CreatePost from "./components/CreatePost";

const App = () => {
  return (
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path={"/blog"} element={<Blog />} />
          <Route exact path={"/createpost"} element={<CreatePost />} />
          <Route path="/singlePost/:id" element={<SinglePost />} />
          <Route path={"/editPost/:id"} element={<EditPost />} />
        </Routes>
  );
}

export default App;