import { buildLogger } from '../../plugins/logger.plugin';


describe("logger.plugin", () => {

    test('debe retronar una funcion logger', () => {

        const logger = buildLogger("logger.plugin.test");

        expect(typeof logger.error).toBe("function");
        expect(typeof logger.info).toBe("function");

    });

    test("Logger.log debe llamar a winston", () => {

    })

})