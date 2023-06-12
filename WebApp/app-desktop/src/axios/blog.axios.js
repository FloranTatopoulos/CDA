import axios from "axios";

const API_URL = "http://localhost:8080/api/blog/";

const read = () => {
    return axios.get(API_URL + "readPost");
};

const blogService = {
    read,
}

export default blogService;