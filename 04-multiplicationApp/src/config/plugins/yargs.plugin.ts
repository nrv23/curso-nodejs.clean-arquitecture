import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
    .option('b', {
        alias: "base",
        type: "number",
        demandOption: true, // indica si el valor es requerido o no
        describe: "Base de la tabla de multiplicar"
    })
    .option("l", {
        alias: "limit",
        type: "number",
        default: 10,
        describe: "Limite de tabla de multiplicar"
    })
    .option('s', {
        alias: "show",
        type: "boolean",
        default: false,
        describe: "Mostrar tabla"
    })
    .option('n', {
        alias: "name",
        type: "string",
        default: "multiplication-table",
        describe: "Nombre de la tabla"
    })
    .option('d', {
        alias: "destiantion",
        type: "string",
        default: "./output",
        describe: "ruta de salida"
    })
    .check((argv, options) => {
        if (isNaN(argv.b) || argv.b < 1) throw 'Debe ser un número mayor a 0';
        if (argv.s && typeof argv.s !== 'boolean') throw 'Debe ser un valor booleano';
        if (isNaN(argv.l) || argv.l < 1) throw 'Debe ser un número mayor a 0';

        return true;
    })
    .parseSync()