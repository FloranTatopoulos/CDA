import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../axios/auth.axios";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        Ce champ est requis!
      </div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
        const response = await  AuthService.login(username, password);
        console.log(response.roles)
        if(response.roles== 'ADMIN') {
         navigate("/");
        }
        else {
            setLoading(false);
            setMessage("accès non autorisé");
          }
    }
  };

  return (
      <div className="col-md-12">
        <div className="card card-container" style={{alignItems:"center", textAlign:"center"}}>
          <h3 style={{marginBottom:"20px"}}>Connectez-vous</h3>
          <img src="./Logo_Unique.png" style={{width:'50%'}} alt=""/>
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn" disabled={loading}>
              <span className="btn-login">Se connecter</span>
            </button>
          </div>
          <p style={{marginTop:'20px'}}>Vous n'avez pas encore de compte ? <Link to={"../register"}>Inscrivez vous</Link></p>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
