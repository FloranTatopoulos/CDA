import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

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
    <div> 
      <div className="archi" style={{width: '100%', position: 'absolute', top: 0, height: '100%'}}>
        <div style={{width: '100vw', height: '100%', backgroundImage: 'url("./architecture-gris.jpg")', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}/>
      </div>
    </div>
  );
};

export default Home;