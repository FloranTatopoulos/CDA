const nodemailer = require('nodemailer');

exports.contact = (req, res) => {
    const data = req.body;
    const setpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:'floran.tato@gmail.com',
        pass:'kvkysrjitjqtkhfc'
      }

    })
  const mailOptions = {
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
    if(error)
      res.send(error)
    else
      res.send('Message envoyé');
  })
  
  setpTransport.close()
}