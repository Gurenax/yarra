const express = require('express')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// Register
router.post('/auth/register',
  // middleware that handles the registration process
  authMiddleware.register,
  // json handler
  (req, res) => {
    res.json({
      user: req.user
    }) 
  }
)

// Sign in
router.post('/auth',
  // middleware that handles the sign in process
  authMiddleware.signIn,
  // json handler
  (req, res) => {
    res.json({
      user: req.user
    }) 
  }
)

module.exports = router