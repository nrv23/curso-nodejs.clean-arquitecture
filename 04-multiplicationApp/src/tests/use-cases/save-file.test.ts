import { SaveFile } from '../../domain/use-cases/save-file.use-case';
import fs from 'fs';


describe("SaveFile", () => {

    afterEach(() => {

        const dirExists = fs.existsSync("output");
        if (dirExists) fs.rmSync('output', { recursive: true }); // borrar si existe
    })

    test('debe guardar el archivo con valores por default', async () => {

        const saveFile = new SaveFile();

        const saved = saveFile.execute({ fileContent: "Hola mundo", fileName: "test.txt", filePath: "output" });
        const path = 'output/test.txt';

        expect(saved).toBe(true);

        const checkFileExist = fs.existsSync(path);
        const fileContent = fs.readFileSync(path, { encoding: "utf-8" });

        expect(checkFileExist).toBe(true);
        expect(typeof fileContent).toBe("string");
        expect(fileContent).toBe("Hola mundo");

    })

    test('Debe guardar el archivo con valores personalizados', () => {

        const options = {
            fileContent: "contenido personalizado",
            filePath: "output",
            fileName: "custom-table-name.txt"
        };

        const { fileContent, fileName, filePath } = options;


        const saveFile = new SaveFile();

        const saved = saveFile.execute({ fileContent, fileName, filePath });
        const path = filePath + '/' + fileName;

        expect(saved).toBe(true);

        const checkFileExist = fs.existsSync(path);
        const content = fs.readFileSync(path, { encoding: "utf-8" });

        expect(checkFileExist).toBe(true);
        expect(typeof content).toBe("string");
        expect(fileContent).toBe(fileContent);

        const dirExists = fs.existsSync(filePath);
        if (dirExists) fs.rmSync(filePath, { recursive: true }); // borrar si existe
    })


    test('retorna falso cuando el directorio no se crea', () => {

        const options = {
            fileContent: "contenido personalizado",
            filePath: "output",
            fileName: "custom-table-name.txt"
        };

        // const { fileContent, fileName, filePath } = options;
        const saveFile = new SaveFile();
        const mkDirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => {
                throw new Error("error")
            }
        )

        const result = saveFile.execute(options);
        expect(result).toBeFalsy();

        mkDirSpy.mockRestore(); // restaurar la implementacion original de la funcion en el mock
    });


    test('Debe devolver falso porque no creó el archivo', () => {

        const options = {
            fileContent: "contenido personalizado",
            filePath: "output",
            fileName: "custom-table-name.txt"
        };

        // const { fileContent, fileName, filePath } = options;
        const saveFile = new SaveFile();
        const wrFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => {
                throw new Error("error al guardar el archivo")
            }
        )


        const result = saveFile.execute(options);
        expect(result).toBeFalsy();

        wrFileSpy.mockRestore(); // restaurar la implementacion original de la funcion en el mock


    })


})