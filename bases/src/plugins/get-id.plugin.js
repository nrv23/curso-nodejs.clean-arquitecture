const { v4: uuid } = require("uuid");

const getId = () => uuid();

module.exports = {
    getId
}