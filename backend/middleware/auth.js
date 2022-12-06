const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const TOKEN = process.env.TOKEN;

module.exports = (req, res, next) => {
  try {
    const User = require('../models/user');
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, TOKEN);
    const userId = decodedToken.userId;
    User.findOne({ userId: userId })
    .then(user => {
      if (!user) {
        throw 'Invalid user ID';
      }
      else {
      next()
      }
    })
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};