import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import UserService from "../axios/user.axios";
import EventBus from "../common/EventBus";
import axios from "axios";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        Ce champ est requis!
      </div>
    );
  }
};

const BoardAdmin = () => {
  const [title, setTitle]= useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  const createNewPost = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      console.log(token);
      await axios.post(
        "http://localhost:8080/api/blog/createPost",
        { title, image, body, author },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.reload();
    } catch (error) {
      console.error("Une erreur s'est produite lors de la création du post:", error);
    }
  };

  
  return (
    <div>
        <div className="header">
          <a href="/home">
              <img className="back" src="./back.png" alt=""/>
           </a>
        </div>
        <div className="container">
        <div className="card card-container">
        <Form onSubmit={createNewPost}>
          <h2 style={{textAlign:'center'}}>Nouvelle publication</h2>
          <input type="title"  style={{width: '100%', marginTop:'20px'}}
            validations={[required]}
                  placeholder={'Titre'}
                  value={title}
                  onChange={e => setTitle(e.target.value)} />
            <input type="img"  style={{width: '100%', marginTop:'20px'}}
            validations={[required]}
                  placeholder={'Lien de l image'}
                  value={image}
                  onChange={e => setImage(e.target.value)} />
          <input type="author" style={{width: '100%', marginTop:'20px'}}
          validations={[required]}
                  placeholder="Nom du créateur"
                  value={author}
                  onChange={e => setAuthor(e.target.value)} />
            <textarea style={{width: '100%', height:'100px', marginTop:'20px'}}
            validations={[required]}
              placeholder="Corps"
                  value={body}
                  onChange={e => setBody(e.target.value)} />
          
            <button className="btn" style={{width:"100%"}}>
                    <span className="btn-login">Publier</span>
              </button>
          </Form>
          </div>
        </div>
    </div>
  );
};

export default BoardAdmin;
