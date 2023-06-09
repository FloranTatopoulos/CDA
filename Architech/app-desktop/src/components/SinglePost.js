import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SinglePost =() => {
    const [post,setPost] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    const [visible, isVisible] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const token=user.token;

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/blog/getPostById/${id}`); 
            setPost(response.data.data);
            isVisible(true);
          } catch (error) {
            console.error('Error fetching post:', error);
          }
        };
    
        fetchPost();
      }, [id]);

      useEffect(() => {
      }, [post])

      //suppression du post
    const deletePost = async ()=>{
        try {
          await axios.delete(`http://localhost:8080/api/blog/deletePost/${id}`,
          {headers:{Authorization:`Bearer ${token}`}} );
          navigate("/blog")
        } catch (err) {
          console.log(err);
        }
      }

      const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }

    if(visible){
    return (
        <div className="post-page">
          <a href="/blog">
            <img className="back" src="../back.png" alt=""/>
          </a>
          <div className="card single-blog" style={{textAlign:'center', alignItems:'center'}}>
          <div className="contentblog">
            <h1>{post.theme}</h1>
              <img src={post.image} style={{height:'60%', width:'80%'}} alt="" />
            <h4 style={{fontWeight:'bold',  marginTop:'30px'}}>{post.title}</h4>
              <p style={{ marginTop:'30px'}}>{getText(post.body)}</p>
            
            {/**seul l'auteur d'un post peut le modifier ou supprimer */
             {headers:{Authorization:`Bearer ${token}`}}  && (
                  <div className="edit-row">
                    <button className="btn edit-btn">
                      <a href={`/editPost/${post._id}`} style={{textDecoration:'none', color:'black'}}>
                        Editer
                        </a>
                    </button>
                    <button className="btn edit-btn" onClick={deletePost} style={{backgroundColor:'#FE1B00', fontWeight:'bold'}}>
                        Supprimer
                    </button>
                  </div>
              )}
              </div>
          </div>
        </div>
      );
   }
   else {
      return;
   }
}

export default SinglePost;