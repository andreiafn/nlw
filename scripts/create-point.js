function fillUfs() {        
    const ufFieldSelect = document.querySelector('select[name=uf]')

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() )
        .then( states => {

            for ( const state of states) {
                ufFieldSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
            
        } )
        .catch(error => console.log(error))        
}

fillUfs()

function getCities(event) {
    const cityFieldSelect = document.querySelector('select[name=city]')    
    const stateInput = document.querySelector('input[name=state]')    

    const stateSelected = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateSelected}/municipios`
    fetch( url )
        .then( res => res.json() )
        .then( cities => {

            for ( const city of cities) {
                cityFieldSelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }

            cityFieldSelect.disabled = false

        } )        
        .catch(error => console.log(error))
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)