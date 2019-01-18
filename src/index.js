document.addEventListener('DOMContentLoaded', () => {

const dogForm = document.querySelector("#dog-form")
const dogTableBody = document.querySelector("#table-body")
let dogEditButtons
let dogTableRow

state = {
  dogs: [],
  selectedDog: null
}

dogApiCall = () => {
  return fetch("http://localhost:3000/dogs").then(response => response.json())
}

renderDog = (dog) => {
  dogTableRow = document.createElement("tr")
  dogTableRow.innerHTML = `
  <td class='padding center'>${dog.name}</td>
  <td class='padding center'>${dog.breed}</td>
  <td class='padding center'>${dog.sex}</td>
  <td class='padding center'><button class="edit-button" data-id="${dog.id}" >Edit Dog</button></td>
  `
  dogTableBody.innerHTML += dogTableRow.innerHTML
}

renderAllDogs = (dogs) => {
  dogTableBody.innerHTML = ""
  dogs.forEach(renderDog)
  dogEditButtons = document.querySelectorAll(".edit-button")
  dogEditButtons.forEach(dogButton => dogButton.addEventListener("click", loadDogForEditing))
}

getAndRenderAllDogs = () => {
  dogApiCall().then(dogs => {
    state.dogs = dogs
    renderAllDogs(state.dogs)
  })
}

loadDogForEditing = (event) => {
  state.selectedDog = state.dogs.find(dog => dog.id == event.target.dataset.id)
  dogForm.name.value = state.selectedDog.name
  dogForm.breed.value = state.selectedDog.breed
  dogForm.sex.value = state.selectedDog.sex
  dogForm.addEventListener('submit', editThenUpdateDogDetails)
}

editDogDetails = () => {
  state.selectedDog.name = dogForm.name.value
  state.selectedDog.breed = dogForm.breed.value
  state.selectedDog.sex = dogForm.sex.value
}

updateDog = () => {
  fetch("http://localhost:3000/dogs/" + state.selectedDog.id, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(state.selectedDog)
  }).then(getAndRenderAllDogs)
}

editThenUpdateDogDetails = () => {
  editDogDetails()
  updateDog()
}

document.onload = getAndRenderAllDogs()

})
