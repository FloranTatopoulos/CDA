import React from "react";
import { useState, useEffect, useParams } from "react";
import axios from "axios";
import Form from "react-validation/build/form";

const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
          Ce champ est requis!
        </div>
      );
    }
  };  

const EditPost =() => {
    const {id} = useParams();
    const [title, setTitle]= useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/blog/getPostById/${id}`)
          .then(response => {
            response.json().then(postInfo => {
              setTitle(postInfo.title);
              setImage(postInfo.image);
              setBody(postInfo.body);
            });
          });
      }, []);
    
      const updatePost = async(ev) => {
        ev.preventDefault();
        const user = localStorage.getItem("user");
        const token=user.token;
        const response = await axios.put(`http://localhost:8080/api/blog/updatePost/${id}`, {
            title,image,body
        }, {headers:{token:`Bearer ${token}`}}
        );

        if (response.ok) {
          setRedirect(true);
        }
    }
    return (
        <div>
            <div className="header">
              <a href="/home">
                  <img className="back" src="./back.png" alt=""/>
               </a>
            </div>
            <div className="container">
            <div className="card card-container">
            <Form onSubmit={updatePost}>
              <h2 style={{textAlign:'center'}}>Editer publication</h2>
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
                <textarea style={{width: '100%', height:'100px', marginTop:'20px'}}
                validations={[required]}
                  placeholder="Corps"
                      value={body}
                      onChange={e => setBody(e.target.files)} />
              
                <button className="btn" style={{width:"100%"}}>
                        <span className="btn-login">Mettre a jour</span>
                  </button>
              </Form>
              </div>
            </div>
        </div>
      );
}

export default EditPost;