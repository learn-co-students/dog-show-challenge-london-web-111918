document.addEventListener('DOMContentLoaded', init)
const baseURL = 'http://localhost:3000/dogs'

function init() {
  getDogs().then(renderDogList)
}

function renderDogList(dogArr) {
  dogArr.forEach(addDogRow)
}

function addDogRow(dog) {
  const dogTable = document.querySelector('#table-body')
  const dogTr = document.createElement('tr')
  const editBtn = document.createElement('button')

  editBtn.innerText = 'Edit Dog'
  editBtn.classList = 'padding center'

  dogTr.innerHTML = ''
  dogTr.innerHTML = `
    <td class='padding center'>${dog.name}</td>
    <td class='padding center'>${dog.breed}</td>
    <td class='padding center'>${dog.sex}</td>
  `
  dogTr.append(editBtn)
  dogTable.append(dogTr)
  editBtn.addEventListener('click', () => popDogForm(dog))
}

function popDogForm(dog) {
  const dogForm = document.querySelector('#dog-form')
  const submitBtn = dogForm.children[3]
  // debugger
  dogForm.children[0].value = dog.name
  dogForm.children[1].value = dog.breed
  dogForm.children[2].value = dog.sex

  submitBtn.addEventListener('click', (e) => updateDog(e, dog.id))
}

// -----------------
//     API Calls
// -----------------

function getDogs() {
  return fetch(baseURL).then(res => res.json())
}

function updateDog(e, id) {
  const name = e.target.parentElement[0].value
  const breed = e.target.parentElement[1].value
  const sex = e.target.parentElement[2].value
  // const options = {
  //   method: 'PATCH',
  //   headers: {'content-type': 'application/json'},
  //   body: JSON.stringify({
  //     name: name,
  //     breed: breed,
  //     sex: sex
  //   })
  // }
  // debugger
  fetch(baseURL + `/${id}`, {
    method: 'PATCH',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      name: name,
      breed: breed,
      sex: sex
    })
  })
}
