
interface IUser {
    id: number;
    name: string;
}

const users: IUser[] = [
    {
        id: 1,
        name: "John Doe"
    }, {
        id: 2,
        name: "Jane Doe"
    },
]

export default function getUserById(id: number, callback: (err?: string, user?: IUser) => void) { // el segundo parametro callback es la funcion de retorno, entonces al ejecutar 
    // esta funcion, se pasa el parametro de busqueda y el segundo parametro es el callback de retorno

    const user = users.find(user => user.id === id);

    if (!user) return callback("No existe el usuario", undefined);
    return callback(undefined, user);
}

