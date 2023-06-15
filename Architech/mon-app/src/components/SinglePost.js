import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const SinglePost =() => {
    const [post,setPosts] = useState({});
    const {id} = useParams();
    const [visible, isVisible] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await axios.get(`https://api.architechcda.fr/api/blog/getPostById/${id}`); 
            setPosts(response.data.data);
            isVisible(true);
          } catch (error) {
            console.error('Error fetching post:', error);
          }
        };
        fetchPost();
      }, [id]);

      useEffect(() => {
      }, [post])

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }
    if(visible) {
      return (
        <div>
          <Navbar></Navbar>
          <div style={{width: '-webkit-fill-available', position:"absolute", height: '90%', backgroundImage: 'url("../architecture-gris.jpg")',
          backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', opacity:"30%"}}/>
          <div className="card single-blog" style={{textAlign:'center'}}>
            <div className="content">
              <h1 style={{marginBottom:'20px'}}>{post.theme}</h1>
                <img src={post.image} style={{height:'60%', width:'60%'}} alt="" />
              <h4 style={{fontWeight:'bold'}}>{post.title}</h4>
              <p style={{fontWeight:'bold', marginTop:'30px'}}>{getText(post.body)}</p>
              <h5 style={{fontStyle:'italic',  marginTop:'30px'}}>Créé par {post.author}</h5>
              <h5 style={{marginTop:'30px'}}>Le {new Date(post.createdAt).toLocaleDateString('fr')}</h5>
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