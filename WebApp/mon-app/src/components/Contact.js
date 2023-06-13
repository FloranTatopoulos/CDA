import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Navbar from "./Navbar";
import ContactService from "../axios/contact.axios";
import  Button  from "react-validation/build/button";
import { useNavigate } from "react-router-dom";

const Contact = () => {
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const formSubmit = (e) => {
      e.preventDefault();  
      if (!nom || !email || !msg) {
        alert("Veuillez remplir tous les champs");
        return;
      }  
      ContactService.contact(nom, email, msg)
      .then(
        () => {
          navigate("/home");
          window.location.reload();
        },
    )}

    return  (
      <div style={{height:"100vh"}}>
        <Navbar style={{position: 'absolute'}}></Navbar>
          <div style={{width: '-webkit-fill-available', position:"absolute", height: '100%', backgroundImage: 'url("./architecture-gris.jpg")',
          backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',opacity:"30%"}}/>
            <div className="card card-container">
              <Form name="contact" className="contact_form" data-netlify="true" onSubmit={formSubmit}>
                <h4 style={{textAlign: "center"}}>Contactez-nous</h4>
                <label for="name">Nom:</label>
                    <input type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    name="name" />
                <label for="email">Email:</label>
                    <input type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"/>
                <label for="message">Message: </label>
                    <textarea
                    style={{height:"15vh"}}
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Donnez nous notre avis" 
                        name="message"/>
                <Button className="btn btn-login">Envoyer</Button>
              </Form>
           </div>
        </div>
    );
}

export default Contact;