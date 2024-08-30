require('dotenv').config()

const express = require('express') // Import Express
const mongoose = require('mongoose')
// This line imports the router you defined in the workouts.js file from the routes directory.
const workoutRoutes = require('./routes/workouts')

// creating an express application
// 1. you’re creating an instance of an Express app
//    by calling the express() function
// 2. This app obj will be used to define routes (endpoints) and middleware,
//    handle requests, and configure the server.
const app = express()

// middleware
app.use(express.json()) // for post & patch request

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
// add routes here to handle different HTTP requests
// 1. localhost:4000
// app.get('/', (req, res) => {
//   res.json({msg: 'Welcome to the app'})
// })
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen for requests - a certain port number
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((error)=> {
    console.log(error)
  })



