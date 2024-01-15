const { httpClientPlugin: {
    get
} } = require("../plugins");




const getPokemonById1 = (id /*,  callback*/) => {
    /*return new Promise((resolve, reject) => {

        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data.name))
            .catch(console.error);
    })*/

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    /*fetch(url)
        .then(response => response.json())
        .then(data => callback(null, data.name))
        .catch(err => callback(err, null)); */
    return get(url)
        .then(response => response.json())
        .then(data => data.name)
        .catch(console.log)
        .finally(() => console.log("Se ha ejecutado la promesa"))
}

// async await 


const getPokemonById = async id => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemon = await get(url);

    return pokemon.name;
}

module.exports = {
    getPokemonById
}