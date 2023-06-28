import React from "react";
import { useState,useEffect } from "react";
import AuthService from "../axios/auth.axios";

const Home = () => {

  const [showAdminBoard, setShowAdminBoard] = useState(false);
  //appel a l'utilisateur connecté
  const currentUser = AuthService.getCurrentUser();
  useEffect(() => {
    if (currentUser) {
      //l'utilisateur est administrateur 
      setShowAdminBoard(currentUser.roles.includes("ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(undefined);
  };
  

  return (
      <div>
          {/**affichage uniquement coté adminstrateur*/
          showAdminBoard ? (
          <div>
            <div style={{textAlign:'center'}}>
            <img className="architech" src="./Logo_long.png" style={{width:'30vw', marginTop:'20px',marginBottom:'30px'}} alt="" />
              <a href="/" onClick={logOut}>
                <img className="logout" src="./logout.jpg" style={{width:'80px',float:'right', marginTop:'10px'}} alt=""/>
              </a>
            </div>
            <div className="content">
              <div className="card login-card">
                <h1>Bienvenue <br/>{currentUser.username}</h1>
                <a href= "/blog" style={{color:'black', marginTop:'50px'}}>
                  <button className="btn btn-login">Consulter Blog</button>
                </a>    
              <a href="/createpost" style={{color:'black'}}>
              <button className="btn btn-login">Créer une publication</button>
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