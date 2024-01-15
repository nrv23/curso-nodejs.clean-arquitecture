const { calculateAge } = require("./get-age.plugin");
const { getId } = require("./get-id.plugin");
const { httpClientPlugin } = require("./http-client.plugin");
const buildLogger = require("./logger.plugin");

module.exports = {
    calculateAge,
    getId,
    httpClientPlugin,
    buildLogger
}