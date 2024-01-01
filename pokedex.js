const orderList = document.querySelector("ol")

let apiUrl = 'https://pokeapi.co/api/v2/pokemon/'

for (let i = 1; i <= 150; i++) {
    apiUrl += i // apiUrl = apiUrl + i
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const pokemon = {
            name: data.name,
            image: data.sprites['front_default'],
            type: data.types.map(type => type.type.name).join(', '),
            id: data.id
        }
        paint(pokemon)
    })
    apiUrl = 'https://pokeapi.co/api/v2/pokemon/'
}

function paint(pokemon) {
    const item = document.createElement('li')
    orderList.appendChild(item)
    item.classList.add('card')
    item.innerHTML = `<h2 class="card-title">${pokemon.name}</h2><img class="card-image" src="${pokemon.image}"><h5 class="card-subtitle">${pokemon.type}</h5><p>${pokemon.id}</p>`
}

