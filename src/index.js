document.addEventListener('DOMContentLoaded',initialize)

function initialize() {
  getDogs().then(dogs => {
    state.dogs = dogs
    addAllDogsToDogTable(state.dogs)
  })
  addFormListener()
}

const baseURL = `http://localhost:3000/dogs`

// With state, you need to remember State, Server and Page
const state = {
  dogs: [],
  currentDog: null
}

function addAllDogsToDogTable(dogArray) {
  const tableBody = document.getElementById('table-body')
  tableBody.innerHTML = ""
  dogArray.forEach(addDogInfoToTable)
}

// Creating the table for the dog info to fill it in
function addDogInfoToTable(dog) {
  const tableBody = document.getElementById('table-body')

  const dogRow = document.createElement('tr')
  tableBody.appendChild(dogRow)

  const dogName = document.createElement('td')
  dogName.innerText = dog.name

  const dogBreed = document.createElement('td')
  dogBreed.innerText = dog.breed

  const dogSex = document.createElement('td')
  dogSex.innerText = dog.sex

  const button = document.createElement('td')

  const dogEditButton = document.createElement('button')
  dogEditButton.dataset.id = dog.id
  button.append(dogEditButton)
  dogEditButton.addEventListener('click', onEditDogButtonClickFillForm)

  dogRow.append(dogName, dogBreed, dogSex, button)
}

function onEditDogButtonClickFillForm(event) {
  // get the id from the event
  // call getIndividualDog with that id
  // insert hash into form
  getIndividualDog(event.target.dataset.id)
    .then(dog => {
      // Fill in the form with name, breed and sex
      document.getElementById('name').value =  dog.name
      document.getElementById('breed').value = dog.breed
      document.getElementById('sex').value = dog.sex
      document.getElementById('dog-form').dataset.id = dog.id
      state.currentDog = dog

    })
}


function onSubmitEditExistingDogFormClick(event) {
  event.preventDefault()
  let formName = document.getElementById('name').value
  let formBreed = document.getElementById('breed').value
  let formSex = document.getElementById('sex').value
  let formId = document.getElementById('dog-form').dataset.id

  const dog = {
    formName: formName,
    formBreed: formBreed,
    formSex: formSex,
    formId: formId
  }

  editDog(dog).then(() => getDogs().then(addAllDogsToDogTable))
  console.log("form submitted")
}

// ---- Call to the API ---- //

// Get the promise from the API
function getDogs() {
  return fetch(baseURL)
    .then(response => response.json())
}

// Get an individual dog from the API using 'id'
function getIndividualDog(id) {
  return fetch(baseURL + `/${id}`)
    .then(response => response.json())
}

// Edit the dog when form is submitted which should change both the information in the database and the table

function editDog(dog) {
  const options = {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: dog.formName,
      breed: dog.formBreed,
      sex: dog.formSex
    })
  }
  return fetch(baseURL + `/${dog.formId}`, options)
    .then(response => response.json())
}

function addFormListener () {
  let form = document.getElementById('dog-form')
  form.addEventListener('submit', onSubmitEditExistingDogFormClick)

}
// ---- Call to the API ---- //
