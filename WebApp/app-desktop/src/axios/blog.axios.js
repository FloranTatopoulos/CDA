import axios from "axios";

const API_URL = "http://localhost:8080/api/blog/";

const read = () => {
    return axios.get(API_URL + "readPost");
};

const create =(title,image,body,author) => {
    const user = localStorage.getItem("user");
    const token=user.token;
    return axios.post(API_URL + "createPost", {
        title,image,body,author
    }, {headers:{token:`Bearer ${token}`}}
    );
}

const update =(title,image,body,author) => {
    const user = localStorage.getItem("user");
    const token=user.token;
    return axios.post(API_URL + "createPost", {
        title,image,body,author
    }, {headers:{token:`Bearer ${token}`}}
    );
}

const Delete =() => {
    const user = localStorage.getItem("user");
    const token=user.token;
    return axios.post(API_URL + "createPost", {
    },{headers:{token:`Bearer ${token}`}}
    );
}

const blogService = {
    read,
    create,
    update,
    Delete,
}

export default blogService;