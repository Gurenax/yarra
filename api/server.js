const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authMiddleware = require('./middleware/auth')

const server = express()

// Middleware Plugins
server.use(bodyParser.json()) // Allows me to have JSON uploads (POST/PATCH/PUT)
server.use(cors()) // Allow other origins to access, i.e our react front-end
server.use(authMiddleware.initialize) // Kick passport off

// Routes
server.use('/', [
  require('./routes/product'),
  require('./routes/auth'),
  require('./routes/wishlist'),
])

// Start the server
server.listen(7000, error => {
  if (error) console.error('Error starting', error)
  else console.log('Started at http://localhost:7000')
})
