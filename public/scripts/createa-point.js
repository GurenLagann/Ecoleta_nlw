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

const CollectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
  //add or remove one class with javaScript
  const itemLi = event.target
  const itemId = event.target.dataset.id

  itemLi.classList.toggle("selected")

  //verificando se existem itens selecionados 
  const alreadySelecetd = selectedItems.findIndex(item => {
    const intemFound = item == itemId
    return intemFound
  })

  //se já estiver selecionado, tirar da selecao
  if (alreadySelecetd >= 0) {
    const filteredItems = selectedItems.filter( item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })
    selectedItems = filteredItems
  } else { //adicionar a seleção
    selectedItems.push(itemId)
  }

  CollectedItems.value = selectedItems

}
