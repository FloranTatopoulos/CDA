import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Blog = () => {

    const [posts, setPosts] = useState();

    useEffect(() => {       
        if(!posts){
            axios.get("http://localhost:8080/api/blog/readPost").then((value) => {
              setPosts(value.data.data);
            });
          }
    },[]);

    return (
        <div>
            <div className="header" style={{textAlign:'center'}}>
            <h1 style={{justifyContent:'center'}}>Blog</h1>              
            </div>
            <a href="/home">
                <img className="back" src="./back.png" alt=""/>
              </a>
              <div className="posts">
                {posts && posts.map((post) => (
                <div className="card blog-card" style={{textAlign:'center', alignItems:'center'}} key={post._id}>
                    <div className="content">
                        <Link className="link" style={{color:'black', textDecoration:'none'}} to={`/singlePost/${post._id}`}>
                            <h3>{post.theme}</h3>
                        </Link>
                        <img src={post.image} style={{height:'25vh', width:'15vw'}} alt="" />
                        <p style={{fontWeight:'bold'}}>{post.title}</p>

                        <p className="author" style={{fontStyle:'italic'}}>Créé par {post.author}</p>
                        <time>Le {new Date(post.createdAt).toLocaleDateString('fr')}</time>
                        </div>
                </div>
                ))}
            </div>
        </div>
    )

}

export default Blog;