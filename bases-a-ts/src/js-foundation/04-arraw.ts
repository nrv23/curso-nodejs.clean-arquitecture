
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

export const getUserById = (id: number, callback: (err?: string, user?: IUser) => void) => {
    const user = users.find(user => user.id === id);
    return !user ? callback("No existe el usuario", undefined) : callback(undefined, user);
}

