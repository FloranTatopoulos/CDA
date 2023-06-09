import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import EventBus from "../common/EventBus";
import AuthService from "../axios/auth.axios";

const Home = () => {

  const [showAdminBoard, setShowAdminBoard] = useState(false);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setShowAdminBoard(user.roles.includes("ADMIN"));
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
    setShowAdminBoard(undefined);
  };

  return (
      <div>
          {showAdminBoard ? (
          <div>
            <div style={{textAlign:'center'}}>
            <img className="architech" src="./Logo_long.png" style={{width:'30vw', marginTop:'20px',marginBottom:'30px'}} alt="" />
              <Link to={"/profile"} >
              <img className="profil" src="./iconeprofil.png" style={{width:'100px', float:'left' }} alt=""/>
              </Link>
              <a href="/" onClick={logOut}>
                <img className="logout" src="./logout.jpg" style={{width:'80px',float:'right', marginTop:'10px'}} alt=""/>
              </a>
            </div>
            <div className="content">
              <div className="card login-card">
                <img src="./Logo_Unique.png" style={{width:'50%'}} alt=""/>
                <a href= "/blog" style={{color:'black'}}>
              <button className="btn btn-login">Consulter Blog</button>
                </a>    
              <a href="/boardadmin" style={{color:'black'}}>
              <button className="btn btn-login">Consulter board Admin</button>
              </a>
            </div>
          </div>
        </div>
        ) : (
          <div>
          <div className="header1" style={{justifyContent:'center', display:'flex'}}>
          <img className="architech" src="./Logo_long.png" style={{width:'30vw', marginTop:'20px'}} alt="" />
          </div>
        <div className="content">
          <div className="card login-card">
            <img src="./Logo_Unique.png" style={{width:'50%'}} alt=""/>
            <a href= "/login" style={{color:'black'}}>
              <button className="btn btn-login">Se connecter</button>
            </a>    
            <a href="/register" style={{color:'black'}}>
              <button className="btn btn-login">S'inscrire</button>
            </a>
          </div>
          </div>
          </div>
          )}
      </div>
  );
};

export default Home;