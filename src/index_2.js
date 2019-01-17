const dogEditForm = document.querySelector('#dog-form')

const tableBody = document.querySelector('#table-body')

const nameInput = document.querySelector('#name-input')
const breedInput = document.querySelector('#breed-input')
const sexInput = document.querySelector('#sex-input')

const state = {
  dogs: []
}

const baseURL = 'http://localhost:3000/dogs'

const getDogs = () => {
  return fetch(baseURL).then(resp => resp.json())
}

const renderSingleDog = (dog) => {
  const editButton = document.createElement('button')

  const tableRow = document.createElement('tr')
    tableRow.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed} </td>
    <td>${dog.sex} </td>
    `
    tableRow.dataset.id = `${dog.id}`

  editButton.addEventListener('click', () => fillEditForm(dog))
  editButton.innerHTML = "Edit Dog"

  tableRow.appendChild(editButton)

  tableBody.appendChild(tableRow)
}

const renderEachDog = dogs => {
    dogs.forEach(dog => renderSingleDog(dog))
}

const updateDogList = () => {
    tableBody.innerHTML = ''
    renderEachDog(state.dogs)
}

function fillEditForm(dog){
  console.log(`${dog.id}`)

  nameInput.value = `${dog.name}`
  breedInput.value = `${dog.breed}`
  sexInput.value = `${dog.sex}`

  dogEditForm.addEventListener('submit', event => {
    event.preventDefault()

    const findDog = state.dogs.find(doggy => doggy.id === dog.id)

    findDog.name = nameInput.value
    findDog.breed = breedInput.value
    findDog.sex = sexInput.value

    console.log(findDog)

      updateDogList()

      console.log(baseURL+`/${findDog.id}`)
      persistDog(findDog)

      dogEditForm.reset()
  })


  // updateDogList()
}
const persistDog = findDog => {
  fetch(`http://localhost:3000/dogs/${findDog.id}`, {
    method: 'PATCH',
    header: {'Content-Type': 'application/json'},
    body: JSON.stringify(findDog)
  })
}
//
// const fillEditForm = (dog) => {
//   nameInput.value = `${dog.name}`
//   breedInput.value = `${dog.breed}`
//   sexInput.value = `${dog.sex}`
// }


/* calling the function to initally populate table*/
getDogs().then(dogData => {
  state.dogs = dogData
  renderEachDog(state.dogs)
})
