const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
app.use("/count", require('./server/routes/count'))

const PORT = process.env.PORT || 3005 // Choose port based on environment 
app.listen(PORT, (err) => {
  if(err) { console.log(err) }
})

const path = require('path')
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'painikepeli-frontend/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/painikepeli-frontend/build/index.html'))
})