const fs = require("fs");

const data = fs.readFileSync("./readme.md", "utf-8");
const wordCount = data.match(/react/ig ?? []).length; // obtener el numero de palabras que sean react case insentive con una expresion
// regular

console.log(wordCount);