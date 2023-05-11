import React, { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import AuthService from "./axios/auth.axios";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import EventBus from "./common/EventBus";
import Blog from "./components/Blog";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };

  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };
  
  return (
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path={"/blog"} element={<Blog />} />
        </Routes>
  );
}

export default App;