// modules
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const AuthController = require('./client-react/controllers/auth')

// server
const http = require('http').createServer(app)
const port = process.env.PORT || 8000


// middleware
app.use(express.static(path.join(__dirname, 'client-react/build')))
app.use(express.json())
app.use(morgan('tiny'))
app.use('/', AuthController)

// database
const connectDatabase = async (databaseName = 'homrDB', hostname = 'localhost') => {
  const database = await mongoose.connect(process.env.MONGODB_URI || `mongodb://${hostname}/${databaseName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  console.log(`Database connected at mongodb://${hostname}/${databaseName}`)
  return database
}

const startServer = port => {
  http.listen(port, async () => {
    await connectDatabase()
    console.log(`Listening on port: ${port}`)
  })
}

startServer(port)
