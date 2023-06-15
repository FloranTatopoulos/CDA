import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import UserService from "../axios/user.axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle]= useState("");
  const [theme, setTheme] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const maxLength = 500;

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
      }
    );
  }, []);

  const maxChar = (e) => {
    if (e.target.value.length <= maxLength) {
      setBody(e.target.value);
    }
  };

  const createNewPost = async (e) => {
    e.preventDefault();
    if (!theme || !image || !title || !body || !author) {
      alert("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      await axios.post(
        "http://localhost:8080/api/blog/createPost",
        { theme, image,title, author,body },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/blog");
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
        <div className="card card-create" >
        <Form onSubmit={createNewPost} style={{textAlign:'center'}}>
        <h2 style={{textAlign:'center'}}>Nouvelle publication</h2>
              <input type="theme"  style={{width: '100%', marginTop:'20px'}}
                      placeholder={'Thème'}
                      value={theme}
                      onChange={e => setTheme(e.target.value)} />
                <input type="img"  style={{width: '100%', marginTop:'20px'}}
                      placeholder={"Lien de l'image"}
                      value={image}
                      onChange={e => setImage(e.target.value)} />
                <input type="title"  style={{width: '100%', marginTop:'20px'}}
                      placeholder={'Titre'}
                      value={title}
                      onChange={e => setTitle(e.target.value)} />
                  <input type="author"  style={{width: '100%', marginTop:'20px'}}
                      placeholder={'Nom du créateur'}
                      value={author}
                      onChange={e => setAuthor(e.target.value)} />
                <textarea style={{width: '100%', height:'200px', marginTop:'20px'}}
                      placeholder="Description"
                      value={body}
                      onChange={maxChar}
                      />
               <p style={{fontStyle:'italic'}}>{maxLength - body.length} caractères restants</p>
            <button className="btn" style={{width:"20%"}}>
                    <span className="btn-login">Créer</span>
              </button>
          </Form>
          </div>
        </div>
    </div>
  );
};

export default CreatePost;
