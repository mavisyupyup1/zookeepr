//const { response } = require("express");

const $animalForm = document.querySelector('#animal-form');

const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };
// not only can fetch() perform GET requests (as in ask a server for information to use on the front end), it can also be used when the front end data needs to be sent ot POSTed to the back end (with POST method)

fetch('/api/animals',{
  //specify type of request
  method:'POST',
  // set header property to inform the request that this is going to be JSON data. who is requesting? 
  headers:{
    Accept:'applications/json',
    'Content-Type':'application/json'
  },
  //then we can stringify the animalObject. 
  body: JSON.stringify(animalObject)
})
.then(response=>{
  if(response.ok){
    return response.json();
  }
  alert('Error: '+ response.statusText)
})
.then(postResponse=>{
  console.log(postResponse);
  alert('Thank you for adding an animal!')
})
};

$animalForm.addEventListener('submit', handleAnimalFormSubmit);
