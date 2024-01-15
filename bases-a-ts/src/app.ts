
import { buildLogger } from "./plugins/logger.plugin";
import { getPokemonById } from './js-foundation/06-promises';

getPokemonById(1).then(console.log);

buildLogger("app.ts").info("prueba de log");
buildLogger("app.ts").error("prueba de log");