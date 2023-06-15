import axios from "axios";

const API_URL = "https://api.architechcda.fr/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const UserService = {
  getPublicContent,
  getUserBoard,
}

export default UserService;
