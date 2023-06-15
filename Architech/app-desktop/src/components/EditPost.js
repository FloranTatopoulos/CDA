import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-validation/build/form";


const EditPost =() => {
    const {id} = useParams();
    const [title, setTitle]= useState("");
    const [theme, setTheme] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [redirect,setRedirect] = useState(false);
    const navigate = useNavigate();
    const maxLength = 500;

    useEffect(() => {
      axios.get(`http://localhost:8080/api/blog/getPostById/${id}`)
        .then(response => {
          const postInfo = response.data.data;
          setTitle(postInfo.title);
          setImage(postInfo.image);
          setBody(postInfo.body);
          setTheme(postInfo.theme);
        })
        .catch(error => {
          console.error(error);
        });
    }, [id]);

      const maxChar = (e) => {
        if (e.target.value.length <= maxLength) {
          setBody(e.target.value);
        }
      };

      const updatePost = async(e) => {
        e.preventDefault();
        if (!theme || !image || !title || !body) {
          alert("Veuillez remplir tous les champs");
          return;
        }
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          const token=user.token;
          await axios.put(`http://localhost:8080/api/blog/updatePost/${id}`, {
              theme,image,title,body
          }, {headers:{Authorization:`Bearer ${token}`}}
          );
          navigate("/blog")
      } catch (error) {
        console.error("Une erreur s'est produite lors de l'édition du post:", error);
      }
    }

    return (
        <div>
            <div className="header">
              <a href={`/singlePost/${id}`}>
                  <img className="back" src="../back.png" alt=""/>
               </a>
            </div>
            <div className="container">
            <div className="card card-create">
            <Form onSubmit={updatePost} style={{textAlign:'center'}}>
              <h2 style={{textAlign:'center'}}>Editer publication</h2>
              <input type="theme"  style={{width: '100%', marginTop:'20px'}}
                      placeholder={'Theme'}
                      value={theme}
                      onChange={e => setTheme(e.target.value)} />
                <input type="img"  style={{width: '100%', marginTop:'20px'}}
                      placeholder={'Lien de l image'}
                      value={image}
                      onChange={e => setImage(e.target.value)} />
                <input type="title"  style={{width: '100%', marginTop:'20px'}}
                      placeholder={'Titre'}
                      value={title}
                      onChange={e => setTitle(e.target.value)} />
                <textarea style={{width: '100%', height:'200px', marginTop:'20px'}}
                      placeholder="Description"
                      value={body}
                      onChange={maxChar} />
               <p style={{fontStyle:'italic'}}>{body ? maxLength - body.length : maxLength} caractères restants</p>
                <button className="btn" style={{width:"20%"}}>
                        <span className="btn-login">Mettre a jour</span>
                  </button>
              </Form>
              </div>
            </div>
        </div>
      );
}

export default EditPost;