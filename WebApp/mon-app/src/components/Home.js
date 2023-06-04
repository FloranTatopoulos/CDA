import React from "react";
import Navbar from "./Navbar";

const Home = () => {

  return (
      <div style={{height:"100vh"}}>
      <Navbar style={{position: 'absolute'}}></Navbar>
        <div style={{width: '-webkit-fill-available', position:"absolute", height: '100%', backgroundImage: 'url("./architecture-gris.jpg")',
         backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}/>
      </div>
  );
};

export default Home;