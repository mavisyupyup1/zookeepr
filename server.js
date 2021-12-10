const fs = require('fs');
const path = require('path')
const express = require('express');
const{animals} = require('./data/animals.json')
// will look for index.js by defaulte
const apiRoutes =require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes')
// reserving all cap variable that are global const
const PORT = process.env.PORT || 3001;
// to instantiate the server, assign express() to the app variable so that later to chain methods to the Express.js server
const app = express();
// get()method require two arguments. one is a string that describes the route to fetch from. second is a callback function that will execute every time that route is accessed with a GET request.
// app.get('./api/animals',(req,res)=>{
//     //using send() method form res parameter(short for response ) to send "hello" to
//     res.send("hello")
// })
// parse incoming string or array data
app.use(express.urlencoded({extended:true}))
// parse incoming JSON data
app.use(express.json())
// express.js middleware that instructs the server to make certain files readily available
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes)
 // need a method for the server to listen hence chain the listen() onto the server to do so 
 app.listen(PORT,()=>{
  console.log(`API server now on port ${PORT}!`)
})