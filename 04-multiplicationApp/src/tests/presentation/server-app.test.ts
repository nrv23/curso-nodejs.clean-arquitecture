import { ServerApp } from '../../presentation/server-app';
import { CreateTable } from '../../domain/use-cases/create-table.use-case';
import { SaveFile } from '../../domain/use-cases/save-file.use-case';


describe("ServerApp", () => {

    beforeEach(() => jest.clearAllMocks())

    test('Debe crear el server app instance', () => {

        const serverApp = new ServerApp();

        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe("function");
    });

    test('Debe correr el server app con opciones', () => {

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        const options = {
            base: 2,
            limit: 10,
            showTable: false,
            filePath: "test",
            fileName: "test.txt"
        };

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2);
        // indicar con cuales argumento fue llamada una funcion 

        expect(logSpy).toHaveBeenCalledWith("Servidor corriendo");
        expect(logSpy).toHaveBeenCalledWith("Archivo creado");

        // confirmar que la funcion execute haya sido llamada

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit })
        //fileContent, fileName, filePath
        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileName: options.fileName,
            filePath: options.filePath
        });

    });


    test('Debe ejecutar con valores personalizados', () => {

        const createMock = jest.fn().mockReturnValue("2 x 1 = 2");
        const saveFileMock = jest.fn();
        const logMock = jest.fn();
        // usar los mocks en las funciones de clase 


        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
        console.log = logMock;


        const options = {
            base: 2,
            limit: 10,
            showTable: false,
            filePath: "test",
            fileName: "test.txt"
        };

        ServerApp.run(options);

        const { base, limit, fileName, filePath } = options;

        expect(logMock).toHaveBeenCalledWith("Servidor corriendo");
        expect(createMock).toHaveBeenCalledWith({ base, limit });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: "2 x 1 = 2", fileName, filePath
        });
    })

})