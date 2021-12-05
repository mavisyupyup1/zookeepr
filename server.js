const express = require('express');
const{animals} = require('./data/animals.json')

// to instantiate the server, assign express() to the app variable so that later to chain methods to the Express.js server
const app = express();
// get()method require two arguments. one is a string that describes the route to fetch from. second is a callback function that will execute every time that route is accessed with a GET request.
// app.get('./api/animals',(req,res)=>{
//     //using send() method form res parameter(short for response ) to send "hello" to
//     res.send("hello")
// })

app.get('/api/animals', (req, res) => {
    res.send('Hello!');
  });
// need a method for the server to listen hence chain the listen() onto the server to do so 
app.listen(3001,()=>{
    console.log('API server now on port 3001')
})