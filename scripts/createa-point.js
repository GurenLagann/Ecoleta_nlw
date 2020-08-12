  function populatesUFs(){
  ufselect = document.getElementById("uf")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

      for (stata of states) {
        ufselect.innerHTML +=  `<option value="${state.id}">${state.name}</option>`
      }
    })
}

populatesUFs()

document
  .querySelector("select[name=uf]")
  .addEventListener("change", () => {
    console.log("Mudei")
  })
