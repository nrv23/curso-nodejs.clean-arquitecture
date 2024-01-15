import { buildMakePerson } from '../../js-foundation/05-factory';



describe("factory", () => {

    const getId = () => '123';
    const calculateAge = () => 32;

    test('buildMakePerson debe retornar una funcion', () => {

        const makePerson = buildMakePerson({ getId, calculateAge });

        expect(typeof makePerson).toBe("function");

    });

    test('Debe retornar una persona', () => {
        const makePerson = buildMakePerson({ getId, calculateAge });
        const person = makePerson({ name: "nataniel", birthdate: "1991-11-23" });

        expect(person).toEqual({ id: '123', name: 'nataniel', birthdate: '1991-11-23', age: 32 }
        )
    })


})