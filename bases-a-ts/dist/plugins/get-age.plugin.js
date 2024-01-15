"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAge = void 0;
const calculateAge = (birthdate) => {
    return new Date().getFullYear() - new Date(birthdate).getFullYear();
};
exports.calculateAge = calculateAge;
