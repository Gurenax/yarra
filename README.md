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
server.use('/',[
  // require('./routes/rainfall')
])

// Start the server
server.listen(7000, (error) => {
  if(error) console.error('Error starting', error)
  else console.log('Started at http://localhost:7000')
})
```

4. Add scripts in package.json
```javascript
"scripts": {
  "dev" : "nodemon server.js"
}
```

5. 