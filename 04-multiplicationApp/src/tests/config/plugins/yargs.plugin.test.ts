


const runCommand = async (args: string[]) => {

    process.argv = [...process.argv, ...args]; // para concatenar los argumentos de sistema con los pasados por la terminal
    const { yarg } = await import("../../../config/plugins/yargs.plugin"); // una vez cargados los argumentos se carga el yarg
    return yarg;
}

describe("Yargs", () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    test('Debe retonar los valores por defecto', async () => {

        const args = await runCommand(['-b', '200']);


        expect(args).toEqual(expect.objectContaining({ // indica que el objeto de salida debe contener estas propiedade
            b: 200,
            l: 10,
            s: false
        }))
    })


    test('devolver los valores personalizados', async () => {

        const args = await runCommand(['-b', '200', '-l', '10', '-s', '-n', 'custom-name', '-d', 'custome-dir']);

        expect(args).toEqual(expect.objectContaining({ // indica que el objeto de salida debe contener estas propiedade
            b: 200,
            l: 10,
            s: true,
            n: "custom-name",
            d: "custome-dir"
        }))
    })


})