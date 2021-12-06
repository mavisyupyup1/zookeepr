const express = require('express');
const{animals} = require('./data/animals.json')

// to instantiate the server, assign express() to the app variable so that later to chain methods to the Express.js server
const app = express();
// get()method require two arguments. one is a string that describes the route to fetch from. second is a callback function that will execute every time that route is accessed with a GET request.
// app.get('./api/animals',(req,res)=>{
//     //using send() method form res parameter(short for response ) to send "hello" to
//     res.send("hello")
// })

// create seperate function to handle the filter (instead of inside the call back function). this function will take in the req.query as an argument and return a new filtered array
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


app.get('/api/animals', (req, res) => {
   let results =animals;
   if(req.query){
     results = filterByQuery(req.query, results)
   }
   res.json(results)
  });

  
// need a method for the server to listen hence chain the listen() onto the server to do so 
app.listen(3001,()=>{
    console.log('API server now on port 3001')
})