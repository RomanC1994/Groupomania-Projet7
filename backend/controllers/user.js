const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const dotenv = require('dotenv').config();
const TOKEN = process.env.TOKEN;

const User = require('../models/user');
const saltRounds = 10;
var schemaPassword = new passwordValidator();
schemaPassword
.is().min(8)                                  
.is().max(100)                            
.has().uppercase()                      
.has().lowercase()               
.has().digits(2)                               
.has().not().spaces()      

exports.signup = (req, res, next) => {
  if (schemaPassword.validate(req.body.password) == true) {
    bcrypt.genSalt(saltRounds)
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
          pseudo: req.body.pseudo,
          email: req.body.email,
          isAdmin: 'no',
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }
  else {
    res.json({ error: "Mot de passe incorrect"})
  }
   
  };

  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id, /* Il me fallait l'initier ici quand meme pour les likes (voir page Details) mais je ne l'utilise pas ailleurs */
              pseudo: user.pseudo,
              token: jwt.sign(
                  { userId: user._id, isAdmin: user.isAdmin },
                  TOKEN,
                  { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
