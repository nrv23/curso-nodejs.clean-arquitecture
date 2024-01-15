const users = [
    {
        id: 1,
        name: "John Doe"
    }, {
        id: 2,
        name: "Jane Doe"
    },
]

function getUserById(id, callback) { // el segundo parametro callback es la funcion de retorno, entonces al ejecutar 
    // esta funcion, se pasa el parametro de busqueda y el segundo parametro es el callback de retorno

    const user = users.find(user => user.id === id);

    if (!user) return callback("No existe el usuario", null);
    return callback(null, user);
}

module.exports = {
    getUserById
}