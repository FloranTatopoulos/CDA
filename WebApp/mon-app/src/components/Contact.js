import React, { useState, } from "react";
//import ContactService from "../services/contact.service";

const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
          Ce champ est requis!
        </div>
      );
    }
  };

const Contact = () => {
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    return  (
        <div className="card card-container">
        <form name="contact" method="POST" className="contact_form" data-netlify="true" onSubmit="submit">
                <label for="name">Nom:</label>
                    <input type="text"
                    validations={[required]}
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    name="name" />
                <label for="email">Email:</label>
                    <input 
                        validations={[required]}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"/>
                <label for="message">Message: </label>
                    <textarea 
                        validations={[required]}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Donnez nous notre avis" 
                        name="message"></textarea>
                <button type="submit">Envoyer</button>
        </form>
        </div>
    );
}

export default Contact;