import axios from "axios";

const API_URL = "https://api.architechcda.fr/api/contact/";

const contact = (nom, email, msg) => {
    return axios.post(API_URL + "contact", {
        nom,
        email,
        msg
    });
}

const ContactService = {
    contact
}

export default ContactService;