"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_plugin_1 = require("./plugins/logger.plugin");
const _06_promises_1 = require("./js-foundation/06-promises");
(0, _06_promises_1.getPokemonById)(1).then(console.log);
(0, logger_plugin_1.buildLogger)("app.ts").info("prueba de log");
(0, logger_plugin_1.buildLogger)("app.ts").error("prueba de log");
