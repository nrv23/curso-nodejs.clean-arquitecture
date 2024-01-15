"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTable = void 0;
class CreateTable {
    constructor() {
    }
    execute({ base, limit = 10 }) {
        let outputMessage = '';
        for (let index = 1; index <= limit; index++) {
            outputMessage += `${base} x ${index} = ${base * index} \n`;
        }
        return outputMessage;
    }
}
exports.CreateTable = CreateTable;
