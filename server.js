const fs = require('fs');
const path = require('path')
const express = require('express');
const{animals} = require('./data/animals.json')
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
// create separate function to handle the filter (instead of inside the call back function). this function will take in the req.query as an argument and return a new filtered array
function filterByQuery(query, animalsArray){
  let personalityTraitsArray = [];
  
  //note that we save the animalsArray as filtered results here:
  let filteredResults = animalsArray;
  if(query.personalityTraits){
    
    //save personalityTraits as a dedicated array
    // if personalityTraits is a string, place it into a new array and save
    if(typeof query.personalityTraits === 'string'){
      personalityTraitsArray =[query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    //loop through each trait in the personality Traits Attya:
    personalityTraitsArray.forEach(trait => {
      //check the trait against each animal in the filteredResults array. it is initially a copy of the animalsArray, but we are updating it for each trait in the .forEach() loop.
      // for each trait being targeted by the filter, the filteredResults array will then only contain the entries that contains the trait. 
      filteredResults = filteredResults.filter(
      animal => animal.personalityTraits.indexOf(trait) !== -1
      );  
    });
  }
  if(query.diet){
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet)
  }
  if(query.species){
    filteredResults = filteredResults.filter(animal =>animal.species === query.species)
  }
  if(query.name){
    filteredResults = filteredResults.filter(animal =>animal.name === query.name)
  }
  return filteredResults;
}

function findById(id, animalsArray){
  const result = animalsArray.filter(animal =>animal.id === id)[0];
  return result;
}

function createNewAnimal(body, animalsArray){
  //console.log(body)
  //our function's main code will go here!
  const animal =body;
  animalsArray.push(animal)
  fs.writeFileSync(
    path.join(__dirname,'./data/animals.json'),
    JSON.stringify({animals:animalsArray}, null,2)
  );
  //return finished code to post route for responses
  return animals;
}

function validateAnimals(animal){
  if(!animal.name || typeof animal.name !== 'string' ){
    return false;
  }
  if(!animal.species || typeof animal.species !== 'string'){
    return false;
  }
  if(!animal.diet || typeof animal.diet !== 'string'){
    return false;
  }
  return true;
}

app.get('/api/animals', (req, res) => {
   let results =animals;
   if(req.query){
     results = filterByQuery(req.query, results)
   }
   res.json(results)
  });
// a parameter route must come after the other GET route
app.get('/api/animals/:id', (req, res) => {
  const result  = findById(req.params.id,animals);
  if(result){
   res.json(result)
  } else {
    res.send(404);
  }
  });

app.post('/api/animals',(req,res)=>{
  //req.body is where our incoming content will be
  //set it based on what the next index of the array will be
  req.body.id = animals.length.toString()
// if any data in req.body is incorrect, send 400 error back
if(!validateAnimals(req.body)){
  res.status(400).send('The animal is not properly formatted');
} else {

  //add animal to json file and animals array in this function
  const animal = createNewAnimal(req.body, animals)
  res.json(req.body)}
})
  
// need a method for the server to listen hence chain the listen() onto the server to do so 
app.listen(PORT,()=>{
    console.log(`API server now on port ${PORT}!`)
})