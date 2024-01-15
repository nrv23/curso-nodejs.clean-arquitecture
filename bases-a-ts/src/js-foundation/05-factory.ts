
interface buildMakerPersonOptions {
    getId: () => string;
    calculateAge: (birthdate: string) => number;
}

interface PersonOptions {
    name: string;
    birthdate: string;
}

export const buildMakePerson = ({ getId, calculateAge }: buildMakerPersonOptions) => {
    return ({ name, birthdate }: PersonOptions) => {

        return {
            id: getId(),
            name,
            birthdate,
            age: calculateAge(birthdate) // new Date().getFullYear() - new Date(birthdate).getFullYear()
        }
    }
}



