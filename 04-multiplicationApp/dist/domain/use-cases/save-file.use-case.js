"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveFile = void 0;
const fs_1 = __importDefault(require("fs"));
class SaveFile {
    constructor() {
    }
    execute({ fileContent, fileName, filePath }) {
        try {
            fs_1.default.mkdirSync(filePath, { recursive: true }); // crear la carpeta
            fs_1.default.writeFileSync(`${filePath}/${fileName}.txt`, fileContent);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    ;
}
exports.SaveFile = SaveFile;
