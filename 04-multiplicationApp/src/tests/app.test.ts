import { ServerApp } from '../presentation/server-app';

describe('App', () => {

    const originalArgv = process.argv;

    afterEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })



    test('Debe llamar el server.run con valores ', async () => {


        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        process.argv = ["node", "app.ts", "-b", "20", "-s"]
        await import("./../app");

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 20,
            showTable: true,
            limit: 10,
            filePath: "./output",
            fileName: "multiplication-table"

        })

    })

})
