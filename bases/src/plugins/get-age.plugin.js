const getAge = require("get-age");

const calculateAge = birthdate => {

    if (!birthdate) throw new Error("Fecha de nacimiento requerida");
    return getAge(birthdate)
}

module.exports = {
    calculateAge
};