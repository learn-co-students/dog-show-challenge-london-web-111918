document.addEventListener('DOMContentLoaded', init)

function init() {
  const submitBtn = document.querySelector('#dog-form').children[3]
  // submitBtn.addEventListener('click', patchDogInfo)

  getAllDogs().then(renderAllDogs);
}




const baseURL = 'http://localhost:3000/dogs'
// ----------------
//   parsing data
//   from API
// ----------------

function getAllDogs(){
  return fetch(baseURL).then(resp => resp.json())
}

// render

function renderAllDogs(dogsArray){
  dogsArray.forEach(dog => addDogInfo(dog))
}

function addDogInfo(dog){
  const tableRow = document.createElement('tr')
  const dogNameRow = document.createElement('td')
  const dogBreedRow = document.createElement('td')
  const dogSexRow = document.createElement('td')
  const dogEditButton = document.createElement('button')
  dogEditButton.setAttribute('data-id', dog.id)

  dogEditButton.addEventListener('click', () => editDogInfo(dog))

  const tableBody = document.querySelector('#table-body')

  dogNameRow.innerHTML = `${dog.name}`
  dogBreedRow.innerHTML = `${dog.breed}`
  dogSexRow.innerHTML = `${dog.sex}`
  dogEditButton.innerHTML = 'Edit Dog'

  tableRow.append(dogNameRow, dogBreedRow,dogSexRow, dogEditButton)
  tableBody.append(tableRow)


}

function editDogInfo(dog){
  const nameInput = document.querySelector('#dog-form').children[0]
  const breedInput = document.querySelector('#dog-form').children[1]
  const sexInput = document.querySelector('#dog-form').children[2]

  nameInput.value = `${dog.name}`
  breedInput.value = `${dog.breed}`
  sexInput.value = `${dog.sex}`
  // console.log(event.target.dataset.id)
  const submitBtn = document.querySelector('#dog-form').children[3]
  submitBtn.addEventListener('click', (e) => patchDogInfo(e, dog.id))
}

function patchDogInfo(e, id){
  debugger
  const newNameInput = e.target.form[0].value
  const newBreedInput = e.target.form[1].value
  const newSexInput = e.target.form[2].value

    if (newNameInput.length > 0 && newBreedInput.length > 0 && newSexInput.length > 0){
      const options = {
        method: "PATCH",
        headers:
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: newNameInput,
          breed: newBreedInput,
          sex: newSexInput
        })
      }
      fetch(baseURL+`/${id}`, options)
    }
}
