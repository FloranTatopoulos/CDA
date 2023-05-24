import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Navbar from "./Navbar";
import ContactService from "../axios/contact.axios";

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

const Contact = () => {
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const[message, setMessage] = useState("");
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const checkBtn = useRef();
    const form = useRef();

    const formSubmit=(e) => {
      e.preventDefault();

      // setMessage("");
      // setLoading(true);
      
      ContactService.contact(nom,email, msg);
      

      // if (checkBtn.current.context._errors.length === 0) {
      //   ContactService.contact(nom, email, msg).then(
      //     () => {
      //       navigate("/home");
      //       window.location.reload();
      //     },
      //     (error) => {
      //       const resMessage =
      //         (error.response &&
      //           error.response.data &&
      //           error.response.data.message) ||
      //         error.message ||
      //         error.toString();
  
      //       setLoading(false);
      //       setMessage(resMessage);
      //     }
      //   );
      // } else {
      //   setLoading(false);
      // }
  }

    return  (
      <div style={{height:"100vh"}}>
        <Navbar style={{position: 'absolute'}}></Navbar>
          <div style={{width: '-webkit-fill-available', position:"absolute", height: '100%', backgroundImage: 'url("./architecture-gris.jpg")',
          backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',opacity:"30%"}}/>
            <div className="card card-container">
              <Form name="contact" className="contact_form" data-netlify="true" onSubmit={formSubmit} ref={form}>
                <h4 style={{textAlign: "center"}}>Contactez-nous</h4>
                <label for="name">Nom:</label>
                    <input type="text"
                    validations={[required]}
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    name="name" />
                <label for="email">Email:</label>
                    <input 
                        validations={[required,validEmail]}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"/>
                <label for="message">Message: </label>
                    <textarea style={{height:"15vh"}}
                        validations={[required]}
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Donnez nous notre avis" 
                        name="message"></textarea>
                <button className="btn">
                  <span className="btn-login">Envoyer</span></button>
                  {/* {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
              </Form>
           </div>
        </div>
    );
}

export default Contact;