import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import AuthService from "../axios/auth.axios";
import blogService from "../axios/blog.axios";

const Blog = () => {

    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [posts, setPosts] = useState();

    useEffect(() => {
        // const user = AuthService.getCurrentUser();
        // if (user) {
        //     setCurrentUser(user);
        //     setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        // }
        
        if(!posts){
            let test = blogService.read()
            const promise1 = Promise.resolve(test);
            promise1.then((value) => {
              setPosts(value.data.data);
            });
          }
    },[]);

    return (
        <div>
            <Navbar></Navbar>
            {showAdminBoard && (
                <Link to={"/post"}>
                    <h3>Créer une publication</h3>
              </Link>
            )}
             <div className="allPosts"> 
                {posts && posts.length > 0 ? (
                posts.map((c) => (
                <div className="image-type">
                    <p>{c.title} créé par {c.author} {c.body}</p>
                </div>
                ))
                ) : (
                    <div className="image-type">
                    <p>salut</p>
                    </div>
                )}
            </div>
        </div>
    )

}

export default Blog;