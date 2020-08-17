function populatesUFs(){
  const ufselect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {  

      for (const state of states) {
        ufselect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populatesUFs()

function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value
  
  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = "<option value>Selecione a Cidade</option"
  citySelect.disabled = true

  fetch(url)
  .then( res => res.json() )
  .then( cities => {
    for (const city of cities) {
      citySelect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled = false
  })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

// Items de Coleta
//pegar todos os Li's

const itemsToCollet = document.querySelectorAll(".items-grid li")

for ( const item of itemsToCollet ) {
  item.addEventListener("click", handleSelectedItem)
}

let selectedItems = []

function handleSelectedItem(event){
  //add or remove one class with javaScript
  const itemLi = event.target
  const itemId = event.target.dataset.id

  itemLi.classList.toggle("selected")

  //verificando se existem itens selecionados 
  const alreadySelecetd = selectedItems.findIndex(item => {
    const intemFound = item ==itemId
    return intemFound
  })
  
}
