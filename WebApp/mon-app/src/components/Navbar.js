import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";

const Navbar = (props) => {
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
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark" style={{width:"100vw" + {...props.style}}}>
            <Link to={"/"} className="navbar-brand">
              <div style={{width:'20vw',position:"absolute", height:'20%',backgroundImage: 'url("./Logo_Unique.png")'}}>
                
              </div>
              ArchiTech
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Accueil
                </Link>
              </li>
            </div>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    Profil
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    Déconnexion
                  </a>
                </li>
              </div>
            ) : (
            <div className="navbar-nav login">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Se connecter
                  </Link>
                </li>
    
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    S'inscrire
                  </Link>
                </li>
              </div>
            )}
            <div className="navbar-nav m1-auto ">
                <li className="nav-item">
                  <Link to={"/contact"} className="nav-link">
                    Contactez-nous
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/blog"} className="nav-link">
                    Blog
                  </Link>
                </li>
              </div>
          </nav>
          </div>
    );
}

export default Navbar;