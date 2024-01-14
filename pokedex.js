//informacion de la api
document.addEventListener('DOMContentLoaded', function () {
    const orderList = document.querySelector("ol");
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    let pokemonData = [];
    const tiposArray = [];
    
    const tiposSet = new Set();
    
    function mostrar() {
        
        const promesas = [];
    
        for (let i = 1; i <= 150; i++) {
            const url = apiUrl + i;
    
            promesas.push(
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        const types = data.types.map(type => type.type.name);
                        types.forEach(type => {
                            tiposSet.add(type);
                        });
    
                        const pokemon = {
                            name: data.name,
                            image: data.sprites.versions['generation-v']['black-white'].animated.front_default,
                            types: types.join(', '),
                            id: data.id
                        };
                         pokemonData.push(pokemon)
                         paint(pokemon);
                    })
                    .catch(error => console.error(error))
            );
        }
        Promise.all(promesas)
            .then(() => {
             
                const tiposArraySinDuplicados = Array.from(tiposSet);
                console.log(tiposArraySinDuplicados);
                tipos(tiposArraySinDuplicados);
            })
            .catch(error => console.error(error));
    }
    
    mostrar();
//muestra los pokemon en la web    
    function paint(pokemon) {
        const item = document.createElement('li');
        orderList.appendChild(item);
        item.classList.add('card');
        item.innerHTML = `<h2 class="card-title">${pokemon.name}</h2><img class="card-image" src="${pokemon.image}"><h5 class="card-subtitle">${pokemon.types}</h5><p>${pokemon.id}</p><button class="favoritos" data-name="${pokemon.name}" data-image="${pokemon.image}" data-type="${pokemon.types}" data-id="${pokemon.id}"><i class="fa-sharp fa-solid fa-heart"></i></button>`;
    

        const favoritoButton = item.querySelector('.favoritos');
        favoritoButton.addEventListener('click', () => {
            addFavoritos(pokemon);
        });
    }
//crear boton por cada tipo de pokemon y otro de mostrar todos   
    function tipos(types) {
       const contenedorButton = document.getElementById("divButton");
    
      
       const todosButton = document.createElement("button");
       todosButton.innerHTML = "Mostrar Todos";
       todosButton.addEventListener("click", function() {
           orderList.innerHTML = "";  
           pokemonData.forEach(pokemon => {
               paint(pokemon);
           });
       });
       contenedorButton.appendChild(todosButton);
    
      
       types.forEach(type => {
           const button = document.createElement("button");
           button.innerHTML = type;
           button.addEventListener("click", function() {
               
               console.log(pokemonData);
               const filteredPokemon = pokemonData.filter(pokemon => 
                   pokemon.types && pokemon.types.includes && pokemon.types.includes(type)
               );
               orderList.innerHTML = "";  
               filteredPokemon.forEach(pokemon => {
                   paint(pokemon);
               });
           });
    
           contenedorButton.appendChild(button);
       });
    }
    
    const favoritos = document.querySelectorAll('.favoritos');
    
    favoritos.forEach(pokemon => {
        pokemon.addEventListener('click', () => {
            addFavoritos(pokemon);
        });
    });
    
    const favoritosList = document.querySelector('#favoritosList');
    favoritosList.addEventListener('click', (event) => {
    if (event.target.classList.contains('borrar')) {
        const listItem = event.target.closest('li');
        if (listItem) {
            listItem.remove();
        }
    }
});

const open = document.querySelector("#open");
open.addEventListener("click", () => {
    document.querySelector(".pop-up").classList.remove("dnone");
});

const dNone = document.querySelector("#close");
dNone.addEventListener("click", () => {
    document.querySelector(".pop-up").classList.add("dnone");
});
//agregar pokemon a la ventana emergente de favoritos
function addFavoritos(pokemon) {
    const favoritosList = document.querySelector('#favoritosList');
    
    const item = document.createElement('li');
    item.classList.add('card');

    item.innerHTML = `<div class="dflex"><h2 class="card-title">${pokemon.name}</h2><i class="fa-solid fa-xmark borrar"></i></div><img class="card-image" src="${pokemon.image}"><h5 class="card-subtitle">${pokemon.types}</h5><p>${pokemon.id}</p>`;

    favoritosList.appendChild(item);
}

});
