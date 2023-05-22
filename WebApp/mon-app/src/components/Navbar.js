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
            <div className="navlist home">
                <li>
                  <img className="architech" src="./Logo_long.png"/>
                </li>
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
              </div>
              {currentUser ? (
              <div>
                <div className="navlist postlogin">
                <li className="nav-item">
                  <Link to={"/blog"} className="nav-link">
                    Blog
                   </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    Déconnexion
                  </a>
                </li>
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                  <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-navbar"
                  />
                  </Link>
                </li>
              </div>
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