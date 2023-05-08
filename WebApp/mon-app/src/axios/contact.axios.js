import axios from "axios";

const API_URL = "http://localhost:8080/api/contact/";

const contact = (nom, email, message) => {
    return axios.post(API_URL + "contact", {
        nom,
        email,
        message
    });
}

const ContactService = {
    contact
}

export default ContactService;