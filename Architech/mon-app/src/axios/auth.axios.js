import axios from "axios";

//définiton de l'url de l'API hebergee
const API_URL = "https://api.architechcda.fr/api/auth/";

  //création de la méthode Axios d'inscription
  const register = (username, email, password) => {
    //appel a la route d'inscription avec la méthode Post
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  };

  const login = (username, password) => {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.username) {
          //enregistre les données de l'utilisateur dans le localStorage 
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };  

  const getCurrentUser = () => {
    //indique l'utilisateur de la session actuelle
    return JSON.parse(localStorage.getItem("user"));
  };

  const logout = () => {
    //suppression de l'utilisateur du localStorage
      localStorage.removeItem("user");
      return axios.post(API_URL + "signout").then((response) => {
        return response.data;
      });
    };
  
  const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
  }
  
  export default AuthService;