document.addEventListener('DOMContentLoaded', function() {
    const dashboard = document.querySelector('.dashboard');

    // Fetch data from the PokeAPI
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
        .then(response => response.json())
        .then(data => {
            data.results.forEach(pokemon => {
                // Create elements for each Pokemon
                const pokemonElement = document.createElement('div');
                pokemonElement.classList.add('pokemon');

                const nameElement = document.createElement('h3');
                nameElement.textContent = pokemon.name;

                const imageElement = document.createElement('img');
                imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png`;
                imageElement.alt = pokemon.name;

                // Toggle stats on clicking the Pokemon
                pokemonElement.addEventListener('click', () => toggleStats(pokemonElement, pokemon.url));

                // Append elements to dashboard
                pokemonElement.appendChild(nameElement);
                pokemonElement.appendChild(imageElement);
                dashboard.appendChild(pokemonElement);
            });
        })
        .catch(error => console.log('Error fetching Pokemon:', error));
});

    // Function to extract Pokemon ID from URL
    function getPokemonId(url) {
        const parts = url.split('/');
        return parts[parts.length - 2];
    }

    // Function to toggle stats
    function toggleStats(pokemonElement, url) {
        const imageElement = pokemonElement.querySelector('img');
        const statsElement = pokemonElement.querySelector('.stats');

        // If stats already exist, remove them and show image
        if (statsElement) {
            pokemonElement.removeChild(statsElement);
            imageElement.style.display = 'block'; // Show image
        } else {
            // Fetch stats from PokeAPI and display
            fetch(url)
            .then(response => response.json())
            .then(data => {
                const statsContainer = document.createElement('div');
                statsContainer.classList.add('stats');
        
                // Iterate over each stat and create elements
                data.stats.forEach(stat => {
                    const statElement = document.createElement('p');
                    statElement.textContent = `${stat.stat.name}: ${stat.base_stat}`;
                    statsContainer.appendChild(statElement);
                });
        
                // Hide image and append stats to Pokemon element
                imageElement.style.display = 'none'; // Hide image
                pokemonElement.appendChild(statsContainer);
            })
            .catch(error => console.log('Error fetching Pokemon stats:', error));
        
        }
    }

