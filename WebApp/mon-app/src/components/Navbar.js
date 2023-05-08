import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EventBus from "../common/EventBus";
import AuthService from "../axios/auth.axios";

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
          <nav className="navbar" style={{width:"100vw" + {...props.style}}}>
          <div className="navlist">
              <li> 
                <div className="architech" style={{width:'5vw', height:'150%',backgroundImage: 'url("./Logo_Unique.png")',  backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
              </li>
              <li>
                  <h5 className="brandname">ArchiTech</h5>
              </li>
            </div>
            <div className="navlist home">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Accueil
                </Link>
              </li>
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
              {currentUser ? (
              <div className="navlist">
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
            <div className="navlist login">
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
          </nav>
          </div>
    );
}

export default Navbar;