exports.contact = (req, res) => {
    try {
      const { nom,email,message} = req.body
      EmailSender({nom,email,message})
      res.json({ msg: "Message envoye" });
    } catch (error) {
      res.status(404).json({ msg: "Erreur" });
    }
   }