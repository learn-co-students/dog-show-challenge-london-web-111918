const dogForm = document.querySelector('#dog-form')
const nameInput = document.querySelector('#name-input')
const breedInput = document.querySelector('#breed-input')
const sexInput = document.querySelector('#sex-input')
const dogTable = document.querySelector('#table-body')

const state = {
  dogs: []
}

// render single dog
function renderDog(dog) {
  const dogTr = document.createElement('tr')
  dogTr.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button id="edit-btn">Edit Dog</button></td>
  `
  const editBtn = dogTr.querySelector('#edit-btn')
  dogTr.addEventListener('click', () => popDogForm(dog))
  dogTable.append(dogTr)
}

// render all dogs
function renderDogs(dogs) {
  dogs.forEach(dog => renderDog(dog))
}

// get all dogs from api for initial render
getDogs().then(dogsData => {
  state.dogs = dogsData
  renderDogs(dogsData)
})

// update page when changes have been made
function updatePage() {
  dogTable.innerHTML = ''
  renderDogs(state.dogs)
}

// populates form inputs with dogs info
function popDogForm(dog) {
  nameInput.value = dog.name
  breedInput.value = dog.breed
  sexInput.value = dog.sex
  nameInput.dataset.id = dog.id
}

// form listener to update dog on submit
dogForm.addEventListener('submit', event => {
  event.preventDefault()

  const upDog = state.dogs.find(dog => dog.id === parseInt(nameInput.dataset.id))

  upDog.name = nameInput.value
  upDog.breed = breedInput.value
  upDog.sex = sexInput.value

  dogForm.reset()
  updateDog(upDog)
  updatePage()

})

// ------------------
//     API Calls
// ------------------

// get all dog data
function getDogs() {
  return fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
}

// update a single dog
function updateDog(dog) {
  fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dog)
  })
}