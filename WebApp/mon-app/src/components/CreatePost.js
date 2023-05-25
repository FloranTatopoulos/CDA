import React,  { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import blogService from "../axios/blog.axios";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const checkBtn = useRef();
    
    const createNewPost = (ev) => {
        ev.preventDefault();

        if (checkBtn.current.context._errors.length === 0) {
            blogService.create(title,author,body,image).then(
            () => {
                navigate("/blog");
                window.location.reload();
            },
            (error) => {
                const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={createNewPost}>
            <input type="title"
                    placeholder={'Titre'}
                    value={title}
                    onChange={ev => setTitle(ev.target.value)} />
            <input type="summary"
                    placeholder={`Nom d'auteur`}
                    value={author}
                    onChange={ev => setAuthor(ev.target.value)} />
            <textarea value={body} onChange={ev => setBody(ev.target.value)} />
            <input type="file"
                    onChange={ev => setImage(ev.target.image)} />
            <button style={{marginTop:'5px'}}>Créer post</button>
    </form>
    )
}

export default CreatePost;