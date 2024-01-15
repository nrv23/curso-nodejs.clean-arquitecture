

const buildMakePerson = ({ getId, calculateAge }) => {
    return ({ name, birthdate }) => {

        return {
            id: getId(),
            name,
            birthdate,
            age: calculateAge(birthdate) // new Date().getFullYear() - new Date(birthdate).getFullYear()
        }
    }
}




module.exports = {
    buildMakePerson
}