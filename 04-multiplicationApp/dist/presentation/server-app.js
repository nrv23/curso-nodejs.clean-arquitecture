"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerApp = void 0;
const create_table_use_case_1 = require("../domain/use-cases/create-table.use-case");
const save_file_use_case_1 = require("../domain/use-cases/save-file.use-case");
class ServerApp {
    static run({ base, limit, showTable, fileName, filePath }) {
        console.log("Servidor corriendo");
        const createTable = new create_table_use_case_1.CreateTable();
        const table = createTable.execute({ base, limit });
        const saveFile = new save_file_use_case_1.SaveFile().execute({ fileContent: table, fileName, filePath });
        saveFile ? console.log("Archivo creado") : console.log("Archivo no fue creado");
        if (showTable) {
            console.log(table);
        }
    }
}
exports.ServerApp = ServerApp;
