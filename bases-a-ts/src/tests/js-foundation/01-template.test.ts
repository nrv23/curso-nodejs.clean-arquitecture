import { emailTemplate } from '../../js-foundation/01-template';


describe("01-template", () => {

    test('el template de correos debe contener un saludo ', () => {

        expect(emailTemplate).toContain("Hi, ");
    })

    test('El email template debe contener {{name}}', () => {

        expect(emailTemplate).toContain("{{name}}")
    })

})