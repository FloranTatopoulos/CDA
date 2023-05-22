import React from "react";
import AuthService from "../axios/auth.axios";
import Navbar from "./Navbar";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div>
      <Navbar></Navbar>
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <h3 className="profil-name">{currentUser.username}</h3>
        <p>
          <strong>Email :</strong> 
          <br/>{currentUser.email}
        </p>
        <strong>Role :</strong>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <p key={index}>{role}</p>)}
        </div>
      </div>
    </div>
  );
};

export default Profile;