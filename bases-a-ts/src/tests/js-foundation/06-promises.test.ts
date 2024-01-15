import { getPokemonById } from '../../js-foundation/06-promises';

describe("Promises", () => {
    test('debe retornar un pokemon', async () => {

        const pokemonId = 1;
        const pokemonName = await getPokemonById(pokemonId);

        expect(pokemonName).toBe("bulbasaur");
    });

    test("debe devolver un error si el pokemon no existe", async () => {

        const pokemonId = 1000;
        const messageNotFound = 'Pokemon no existe';


        try {
            await getPokemonById(pokemonId);

        } catch (error) {
            expect(error).toBe(messageNotFound)
        }

    });

})