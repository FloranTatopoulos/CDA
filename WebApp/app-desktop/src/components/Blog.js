import React, { useEffect, useState } from "react";
import blogService from "../axios/blog.axios";
import { Link } from "react-router-dom";

const Blog = () => {

    const [posts, setPosts] = useState();

    useEffect(() => {       
        if(!posts){
            blogService.read().then((value) => {
              setPosts(value.data.data);
            });
          }
    },[]);

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }

    return (
        <div>
            <div className="posts">
                {posts && posts.map((post) => (
                <div className="card blog-card" style={{textAlign:'center', alignItems:'center'}} key={post._id}>
                    <div className="contentblog">
                        <Link className="link" style={{color:'black', textDecoration:'none'}} to={`/post/${post._id}`}>
                            <h3>{post.title}</h3>
                        </Link>
                        <img src={post.image} style={{height:'25vh', width:'15vw'}} alt="" />
                        <p style={{fontWeight:'bold'}}>{getText(post.body)}</p>
                        <p className="author" style={{fontStyle:'italic'}}>Créé par {post.author}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )

}

export default Blog;