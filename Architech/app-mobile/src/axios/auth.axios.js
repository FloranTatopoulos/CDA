import axios from "axios";

const API_URL = "http://192.168.1.97:8080/api/auth/";

const logout = () => {
    localStorage.removeItem("user");
    return axios.post(API_URL + "signout").then((response) => {
      return response.data;
    });
  };
  
  const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  };

  const login = async (username, password) => {
    return await axios
      .post(API_URL + "signin", {
        username,
        password,
      }).then((response) => {
        console.log(response.data.username)
    return response.data.username;
    });
  };  
  
  const AuthService = {
    register,
    login,
    logout,
  }
  
  export default AuthService;