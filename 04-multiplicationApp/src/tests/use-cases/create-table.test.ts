import { CreateTable } from '../../domain/use-cases/create-table.use-case';


describe('CreateTable', () => {

    test('debe crear una tabla con valores por default', () => {


        const createTable = new CreateTable();

        const table = createTable.execute({
            base: 10,
        });

        const rows = table.split("\n");


        console.log(table)


        // validar que sea una instancia de la clase de CreateTable

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(typeof table).toBe("string");
        expect(table).toContain("10 x 1 = 10");
        expect(table).toContain("10 x 10 = 100");
        expect(rows.length).toBe(11);

    });


    test('crear una tabla con valores personalizados', () => {

        const createTable = new CreateTable();

        const table = createTable.execute({
            base: 20,
            limit: 10
        });

        const rows = table.split("\n");


        console.log(table)


        // validar que sea una instancia de la clase de CreateTable

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(typeof table).toBe("string");
        expect(table).toContain("20 x 1 = 20");
        expect(rows.length).toBe(11);
    })


})
