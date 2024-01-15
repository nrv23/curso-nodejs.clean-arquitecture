import { getUserById } from '../../js-foundation/04-arraw';


describe("Callbacks", () => {

    const mensajeNoEncontrado = "No existe el usuario";

    test('La funcion getUserbYid debe retornar el mensaje  ' + mensajeNoEncontrado, (done) => {

        const userId = 7;
        getUserById(userId, (err, user) => {

            expect(err).toBe(mensajeNoEncontrado);
            expect(user).toBeUndefined();

            done(); // para ejecuciones asincronas donde se tenga queesperar un tiempo desconocido

        });
    });

    test('La funcion getUserbYid debe retornar el usuario con nombre Joh Doe ', () => {

        const userId = 1;

        getUserById(userId, (err, user) => {

            expect(user!.id).toBe(1);
            expect(user!.name).toBe("John Doe");

        });
    })


})