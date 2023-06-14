import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../axios/auth.axios";
import axios from "axios";

const SinglePost =() => {
    const [post,setPost] = useState({});
    const {id} = useParams();
    const currentUser = AuthService.getCurrentUser();
    const navigate = useNavigate();
    const [visible, isVisible] = useState(false);

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

    const handleDelete = async ()=>{
        const user = localStorage.getItem("user");
        const token=user.token;
        try {
          await axios.delete(`http://localhost:8080/api/blog/deletePost/${id}`,
          {headers:{token:`Bearer ${token}`}} );
          navigate("/blog")
        } catch (err) {
          console.log(err);
        }
      }
    if(visible){
    return (
        <div className="post-page">
        <div className="card single-blog" style={{textAlign:'center', alignItems:'center'}}></div>
        <div className="contentblog">
          <h1>{post.title}</h1>
            {currentUser.username === post.author && (
                <div className="edit-row">
                <Link className="edit-btn" to={`/editPost/${post._id}`}>
                    Edit this post
                </Link>
                <button className="delete-btn" onClick={handleDelete}>
                    Delete this post
                </button>
                </div>
            )}
            <img src={post.image} style={{height:'60%', width:'80%'}} alt="" />
          </div>
          <div className="content" dangerouslySetInnerHTML={{__html:post.body}} />
          <p className="author" style={{fontStyle:'italic'}}>Créé par {post.author}</p>
          <time>Le {new Date(post.createdAt).toLocaleDateString('fr')}</time>
        </div>
      );
   }
   else {
      return;
   }
}

export default SinglePost;