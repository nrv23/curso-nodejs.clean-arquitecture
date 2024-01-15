import { getId } from '../../plugins/get-id.plugin';


describe("getId", () => {

    test('debe retornar un string ', () => {

        const id = getId();

        expect(typeof id).toBe("string");
        expect(id.length).toBe(36);
    })
});