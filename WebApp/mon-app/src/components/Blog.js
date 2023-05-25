import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import blogService from "../axios/blog.axios";
import Post from "./Post";

const Blog = () => {

    const [posts, setPosts] = useState();

    useEffect(() => {       
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
             <div className="allPosts"> 
                {posts && posts.length > 0 ? (
                posts.map((c) => (
                    <p>Post numéro {c._id} {c.title} créé par {c.author} {c.body}</p>
                ))
                ) : (
                    <div className="image-type">
                    <p>salut</p>
                    </div>
                )}
            </div>

            {/* {posts.length > 0 && posts.map(post => (
                    <Post {...post}/>
                ))} */}
        </div>
    )

}

export default Blog;