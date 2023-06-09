import axios from "axios";

const API_URL = "http://localhost:8080/api/blog/";

const read = () => {
    return axios.get(API_URL + "readPost");
};

const create =(title,image,body,author) => {
    return axios.post(API_URL + "createPost", {
        title,image,body,author
    });
}

const update =(title,image,body,author) => {
    return axios.post(API_URL + "createPost", {
        title,image,body,author
    });
}

const Delete =() => {
    return axios.post(API_URL + "createPost", {
    });
}

const blogService = {
    read,
    create,
    update,
    Delete,
}

export default blogService;