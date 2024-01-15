//const { getUserById } = require("./js-foundation/04-arraw");

const { calculateAge, getId, buildLogger } = require("./plugins")
const { buildMakePerson } = require("./js-foundation/05-factory");
const { getPokemonById } = require("./js-foundation/06-promises");

// llamar la funcion que devuelve la promesa

getPokemonById(10)
    .then(response => {
        console.log(response);
    })
    .catch(err => buildLogger("app.js").info(err.message));

/*getPokemonById(3, (err, data) => {
    if (err) throw err;
    console.log(data);
})*/
// referencia a factory functions e inyeccion de dependencias

const makePerson = buildMakePerson({ getId, calculateAge });
const obj = { name: "Nataniel", birthdate: "1991-11-23" };
const person = makePerson(obj);

console.log(person);

buildLogger("app.js").error("Error de prueba");

/*const id = 1;

getUserById(id, (err, user) => {
    if (err) throw new Error(err);
    console.log({ user });
})*/
