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
    });

    return (
        <div>
            <header className="header" style={{display:'flex'}}>
            <a href="/home">
                <img className="back" src="./back.png" alt=""/>
              </a>
            <h1 style={{marginTop:'30px', textAlign:'center', flexGrow:1, }}>Blog</h1>
            <a href="/createpost" style={{color:'black'}}>
              <button className="btn btn-login" style={{marginRight:'20px'}}>Créer une publication</button>
              </a>              
              </header>
              <div className="posts">
                {posts && posts.map((post) => (
                <div className="card blog-card" style={{textAlign:'center', alignItems:'center'}} key={post._id}>
                <Link className="link" style={{color:'black', textDecoration:'none'}} to={`/singlePost/${post._id}`}>
                  <div className="contentblog">
                    <h3>{post.theme}</h3>
                    <img src={post.image} style={{height:'25vh', width:'15vw'}} alt="" />
                    <p style={{fontWeight:'bold'}}>{post.title}</p>
                    <p className="author" style={{fontStyle:'italic'}}>Créé par {post.author}</p>
                    <time>Le {new Date(post.createdAt).toLocaleDateString('fr')}</time>
                    </div>
                  </Link>
                </div>
                ))}
            </div>
        </div>
    )

}

export default Blog;