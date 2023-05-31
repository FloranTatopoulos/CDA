import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../axios/auth.axios";
import Navbar from "./Navbar";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        Ce champ est requis!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        Cet email n'est pas valide
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6) {
    return (
      <div className="invalid-feedback d-block">
        Le mot de passe doit comporter minimum 6 caracteres.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div style={{height:"100vh"}}>
      <Navbar style={{position: 'absolute'}}></Navbar>
      <div style={{width: '-webkit-fill-available', position:"absolute", height: '100%', backgroundImage: 'url("./architecture-gris.jpg")',
      backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',opacity:"30%"}}/>
      <div className="col-md-12">
        <div className="card card-container">
        <h3 style={{textAlign:"center", marginBottom:"20px"}}>Inscrivez-vous</h3>
          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
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
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    validations={[required, validEmail]}
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
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn">
                    <span className="btn-login">S'inscrire</span>
                    </button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
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

export default Register;
