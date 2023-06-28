const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config();

exports.contact = (req, res) => { //controleur de contact
    const data = req.body;
    //créé l'objet de transport avec nodemailer
    const setpTransport = nodemailer.createTransport({
      //mes données pour recevoir le mail 
      service: 'gmail',
      auth: {
        user:'floran.tato@gmail.com',
        pass: process.env.NODEMAILERPASS, 
        //mdp securisé dans le .env
      }

    })
  const mailOptions = { //contenu du mail
    form:data.email,
    to:'floran.tato@gmail.com',
    subject:`Message from ${data.nom}`,
    html:`<h3>informations</h3> 
        <ul>
        <li>Nom : ${data.nom}</li>
        <li>Email : ${data.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${data.msg}</p>
    `
  }

  setpTransport.sendMail(mailOptions, (error, info) => {
    //envoyer mail
    if(error)
      res.send(error)
    else
      res.send('Message envoyé');
  })
  
  setpTransport.close()
}