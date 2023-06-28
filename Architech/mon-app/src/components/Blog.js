import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Blog = () => {

    const [posts, setPosts] = useState();

    useEffect(() => {       
        if(!posts){
            //appel a Axios avec la méthode get pour récupérer tous les posts
            axios.get("https://api.architechcda.fr/api/blog/readPost").then((value) => {
            //attribuer les données des posts a un post
              setPosts(value.data.data);
            });
          }
    },);
    
    return (
        <div>
            <Navbar></Navbar>
            <div style={{width: '-webkit-fill-available', position:"absolute", height: '100%', backgroundImage: 'url("./architecture-gris.jpg")',
            backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', opacity:"30%"}}/>
            <div className="posts">
                {/*appel a map pour itérer sur un tableau post contenant les élements de chaque post*/
                posts && posts.map((post) => (
                <div className="card blog-card" style={{textAlign:'center', alignItems:'center'}} 
                    key={/* attribution d'un id pour chaque post */
                        post._id}>
                    <div className="content">
                        <Link className="link" style={{color:'black', textDecoration:'none'}} to={`/singlePost/${post._id}`}>
                            <h3>{post.theme}</h3>
                        </Link>
                        <img src={post.image} style={{height:'25vh', width:'15vw'}} alt="" />
                        <p style={{fontWeight:'bold'}}>{post.title}</p>

                        <p className="author" style={{fontStyle:'italic'}}>Créé par {post.author}</p>
                        <time>Le {/*date au format francais */
                            new Date(post.createdAt).toLocaleDateString('fr')}</time>
                        </div>
                </div>
                ))}
            </div>
        </div>
    )

}

export default Blog;