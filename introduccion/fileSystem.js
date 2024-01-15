const fs = require("fs");

const data = fs.readFileSync("./readme.md", "utf-8");

const newData = data.replace(/React/ig, "Angular")


fs.writeFileSync("readme-Angular.md", newData);

console.log(data);