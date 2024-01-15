import { httpClient } from "../plugins";
const { get } = httpClient;


export const getPokemonById = async (id: number | string): Promise<string> => {

    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const pokemon = await get(url);

        return pokemon.name;
    } catch (error) {
        throw 'Pokemon no existe'; // al darle throw a un string entonces al capturar este error en otro trycatch el error solo seria un string
        // si el throw lanza un objeto Error entonces se lee como error.mesaage
        // throw new Error("Pokemon no existe")
    }
}
