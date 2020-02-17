const express = require('express')
const cowsay = require('cowsay')
const cors = require('cors')
// Create the server
const app = express()

app.use("/count", require('./server/routes/count'))

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, (err) => {
  if(err) { console.log(err) }
  console.log(`Listening on port ${PORT}`)
})

const path = require('path')
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'painikepeli-frontend/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/painikepeli-frontend/build/index.html'))
})