const users = [
    {
        id: 1,
        name: "John Doe"
    }, {
        id: 2,
        name: "Jane Doe"
    },
]

const getUserById = (id, callback) => {
    const user = users.find(user => user.id === id);
    return !user ? callback("No existe el usuario", null) : callback(null, user);
}

module.exports = {
    getUserById
}