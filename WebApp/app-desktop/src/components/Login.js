import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
        const log = await  AuthService.login(username, password);
        console.log(log.roles)
        if(log.roles== 'ADMIN') {
         navigate("/");
        }
        else {
            setLoading(false);
            setMessage("accès non autorisé");
          }
    }
  };

  return (
    <div>
      <div style={{width: '-webkit-fill-available', position:"absolute", height: '100%', backgroundImage: 'url("./architecture-gris.jpg")',
       backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', opacity:"30%"}}/>
      <div className="col-md-12">
        <div className="card card-container">
          <h3 style={{textAlign:"center", marginBottom:"20px"}}>Connectez-vous</h3>

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
    </div>
  );
};

export default Login;
