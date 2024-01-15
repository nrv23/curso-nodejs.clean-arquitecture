"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMakePerson = void 0;
const buildMakePerson = ({ getId, calculateAge }) => {
    return ({ name, birthdate }) => {
        return {
            id: getId(),
            name,
            birthdate,
            age: calculateAge(birthdate) // new Date().getFullYear() - new Date(birthdate).getFullYear()
        };
    };
};
exports.buildMakePerson = buildMakePerson;
