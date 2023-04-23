import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const logout = () => {
    localStorage.removeItem("user");
    return axios.post(API_URL + "signout").then((response) => {
      return response.data;
    });
  };
  
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const AuthService = {
    logout,
    getCurrentUser,
  }
  
  export default AuthService;