"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const heroe_service_1 = require("./services/heroe.service");
const hero = (0, heroe_service_1.findHeroById)(1);
console.log((hero === null || hero === void 0 ? void 0 : hero.name) || 'No encontrado!!1234');
