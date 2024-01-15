"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    {
        id: 1,
        name: "John Doe"
    }, {
        id: 2,
        name: "Jane Doe"
    },
];
function getUserById(id, callback) {
    // esta funcion, se pasa el parametro de busqueda y el segundo parametro es el callback de retorno
    const user = users.find(user => user.id === id);
    if (!user)
        return callback("No existe el usuario", undefined);
    return callback(undefined, user);
}
exports.default = getUserById;
