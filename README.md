# Yarra

1. `yarn add express body-parser`
2. `yarn add nodemon --dev`
3. Create server.js
```javascript
const express = require('express')
const bodyParser = require('body-parser')

const server = express()

// Middleware Plugins
server.use(bodyParser.json())

// Routes
server.use('/', [
  // require('./routes/rainfall')
])

// Start the server
server.listen(7000, error => {
  if (error) console.error('Error starting', error)
  else console.log('Started at http://localhost:7000')
})
```

4. Add scripts in package.json
```javascript
"scripts": {
  "dev" : "nodemon server.js"
}
```

5. `yarn add mongoose`

6. Add model\init.js
```javascript
const mongoose = require('mongoose')

// Use the Promise functionality built into Node.js
mongoose.Promise = global.Promise

// Connect to our local database
mongoose
  .connect('mongodb://localhost/storms', { useMongoClient: true })
  .then(() => {
    console.log('Successfully connected to database')
  })
  .catch(error => {
    //   If there was an error connecting to the database
    if (error) console.log('Error connecting to MongoDB database', error)
  })

module.exports = mongoose
```

7. Create models
8. Add drop and seeds files
9. Modify scripts in package.json
```javascript
"scripts": {
  "dev": "nodemon server.js",
  "seed": "node models/seeds.js",
  "drop": "node models/drop.js",
  "reset": "npm run drop && npm run seed"
}
```

10. Create routes
11. Add routes to server.js

12. Add passport middleware `yarn add passport passport-local passport-local-mongoose`

13. Add User model with Passport plugin
```javascript
const mongoose = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
})

// Add passport middleware to User Schema
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email', // Use email, not the default 'username'
  usernameLowerCase: true, // Ensure that all emails are lowercase
  session: false // Disable sessions as we'll use JWTs
})

const User = mongoose.model('User', userSchema)

module.exports = User
```

14. Add Auth route
```javascript
const passport = require('passport')
const JWT = require('jsonwebtoken')
const PassportJwt = require('passport-jwt')
const User = require('../models/User')

// These should be in .env
// secret (generated using `openssl rand -base64 48` from console)
const jwtSecret = 'Z4rxmCFgxGUmworqbzQP01EJAOEIPAVoFcs3MIQpiio+q1G4+PFYQi095IRdsTE0'
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '7 days'

passport.use(User.createStrategy())

function register(req, res, next) {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })
  // Create the user with the specified password
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      // Our register middleware failed
      next(error)
      return
    }
    // Store user so we can access it in our handler
    req.user = user
    // Success!
    next()
  })
}

passport.use(new PassportJwt.Strategy(
  // Options
  {
    // Where will the JWT be passed in the HTTP request?
    // e.g. Authorization: Bearer xxxxxxxxxx
    jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    // What is the secret
    secretOrKey: jwtSecret,
    // What algorithm(s) were used to sign it?
    algorithms: [jwtAlgorithm]
  },
  // When we have a verified token
  (payload, done) => {
    // Find the real user from our database using the `id` in the JWT
    User.findById(payload.sub)
      .then(user => {
        // If user was found with this id
        if(user) {
          done(null, user)
        }
        // If not user was found
        else {
          done(null, false)
        }
      })
      .catch(error => {
        // If there was failure
        done(error, false)
      })
  }
))

function signJWTForUser(req, res) {
  // Get the user (either just signed in or signed up)
  const user = req.user
  // Create a signed token
  const token = JWT.sign(
    // payload
    {
      email: user.email
    },
    // secret
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString()
    }
  )
  // Send the token
  res.json({ token })
}

module.exports = {
  initialize: passport.initialize(),
  register,
  signIn: passport.authenticate('local', { session: false }),
  requireJWT: passport.authenticate('jwt', { session: false }),
  signJWTForUser
}
```

15. Add Auth middleware `middleware/auth.js`
```javascript
const passport = require('passport')
const JWT = require('jsonwebtoken')
const PassportJwt = require('passport-jwt')
const User = require('../models/User')

// These should be in .env
// secret (generated using `openssl rand -base64 48` from console)
const jwtSecret = 'Z4rxmCFgxGUmworqbzQP01EJAOEIPAVoFcs3MIQpiio+q1G4+PFYQi095IRdsTE0'
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '7 days'

passport.use(User.createStrategy())

function register(req, res, next) {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })
  // Create the user with the specified password
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      // Our register middleware failed
      next(error)
      return
    }
    // Store user so we can access it in our handler
    req.user = user
    // Success!
    next()
  })
}

passport.use(new PassportJwt.Strategy(
  // Options
  {
    // Where will the JWT be passed in the HTTP request?
    // e.g. Authorization: Bearer xxxxxxxxxx
    jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    // What is the secret
    secretOrKey: jwtSecret,
    // What algorithm(s) were used to sign it?
    algorithms: [jwtAlgorithm]
  },
  // When we have a verified token
  (payload, done) => {
    // Find the real user from our database using the `id` in the JWT
    User.findById(payload.sub)
      .then(user => {
        // If user was found with this id
        if(user) {
          done(null, user)
        }
        // If not user was found
        else {
          done(null, false)
        }
      })
      .catch(error => {
        // If there was failure
        done(error, false)
      })
  }
))

function signJWTForUser(req, res) {
  // Get the user (either just signed in or signed up)
  const user = req.user
  // Create a signed token
  const token = JWT.sign(
    // payload
    {
      email: user.email
    },
    // secret
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString()
    }
  )
  // Send the token
  res.json({ token })
}

module.exports = {
  initialize: passport.initialize(),
  register,
  signIn: passport.authenticate('local', { session: false }),
  requireJWT: passport.authenticate('jwt', { session: false }),
  signJWTForUser
}
```

16. `yarn add passport-jwt`

17. Update server.js routes

18. Update product routes to use JWT
```javascript
const authMiddleware = require('../middleware/auth')
```
```javascript
// GET - Read all product
router.get('/products', authMiddleware.requireJWT, (req, res) => {
  Product.find()
  // Once it has loaded these documents
  .then(products => {
    // Send them back as the response
    res.json(products)
  })
  .catch(error => {
    res.status(400).json({ error: error.message })
  })
})
```

## Models
### Product
- name: string
- brandName: string