import { calculateAge } from '../../plugins/get-age.plugin';


describe("calculateAge", () => {

    test('calculateAge debe retornar un numero', () => {

        const brithDate = '1991-11-23';
        const age = calculateAge(brithDate);

        expect(typeof age).toBe("number");
    });

    test('Debe retornar la edad actual', () => {

        /*      const date = new Date();
              const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
              const day = date.getDate() < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1;
              const year = date.getFullYear();
              const fullDate = `${year}-${month}-${date}`;*/

        const birthdate = '1991-11-23';
        const currentAge = new Date().getFullYear() - new Date(birthdate).getFullYear();

        const age = calculateAge(birthdate);

        expect(age).toBe(currentAge);

    })

    test('Debe retornar 0 años', () => {


    })



})