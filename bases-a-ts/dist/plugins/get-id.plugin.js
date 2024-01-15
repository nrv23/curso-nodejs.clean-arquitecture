"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getId = void 0;
const uuid_1 = require("uuid");
const getId = () => (0, uuid_1.v4)();
exports.getId = getId;
