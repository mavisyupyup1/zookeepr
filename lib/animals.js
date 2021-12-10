const fs = require('fs')
const path = require('path')
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
      path.join(__dirname,'../data/animals.json'),
      JSON.stringify({animals:animalsArray}, null,2)
    );
    //return finished code to post route for responses
    return animal;
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
    if(!animal.personalityTraits || !Array.isArray(animal.personalityTraits)){
        return false;
      }

    return true;
  }
  module.exports={
      filterByQuery,
      findById,
      createNewAnimal,
      validateAnimals
  }