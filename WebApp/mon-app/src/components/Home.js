import React, { useState, useEffect } from "react";

import UserService from "../axios/user.service";
import Navbar from "./Navbar";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
      <div style={{height:"100vh"}}>
      <Navbar style={{position: 'absolute'}}></Navbar>
        <div style={{width: '100vw', position:"absolute", height: '100%', backgroundImage: 'url("./architecture-gris.jpg")', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}/>
      </div>
  );
};

export default Home;