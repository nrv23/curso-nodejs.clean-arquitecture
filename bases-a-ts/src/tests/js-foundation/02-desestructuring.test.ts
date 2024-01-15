import { heores } from '../../js-foundation/02- destructuring';


describe("desestructuring ", () => {

    test('heores debe contener Flash y batman ', () => {

        expect(heores).toContain("flash");
        expect(heores).toContain("batman");

    });

    test('Primer heore debe ser flash y segundo batman', () => {

        expect(heores[0]).toBe("flash");
        expect(heores[1]).toBe("batman");
    })

});