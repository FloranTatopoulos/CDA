import axios from "axios";

const API_URL = "http://192.168.1.97:8080/api/blog/";

const create = (title, author, image, body) => {
    return axios.post(API_URL + "createPost", {
      title,
      author,
      image,
      body
    });
  };

const read = () => {
    return axios.get(API_URL + "readPost");
};

const update = (title, author, image, body) => {
    return axios.update(API_URL + "updatePost", {
        title,
        author,
        image,
        body
      });
};

const Delete = () => {
    return axios.delete(API_URL + "deletePost", {
      });

}

const blogService = {
    create,
    read,
    update,
    Delete
}

export default blogService;