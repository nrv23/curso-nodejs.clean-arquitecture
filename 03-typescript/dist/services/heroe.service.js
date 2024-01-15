"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findHeroById = void 0;
const heroes_1 = __importDefault(require("../data/heroes"));
const findHeroById = (id) => heroes_1.default.find(heroe => heroe.id === id);
exports.findHeroById = findHeroById;
