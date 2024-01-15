import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    filePath: string;
}

export class ServerApp {

    static run({ base, limit, showTable, fileName, filePath }: RunOptions) {

        console.log("Servidor corriendo");

        const createTable = new CreateTable();
        const table = createTable.execute({ base, limit });
        const saveFile = new SaveFile().execute({ fileContent: table, fileName, filePath });

        saveFile ? console.log("Archivo creado") : console.log("Archivo no fue creado");

        if (showTable) {

            console.log(table);
        }
    }
}