import { httpClient } from "../../plugins";

describe("http-client.plugin", () => {

    test('debe regresar un string ', async () => {

        const url = "https://jsonplaceholder.typicode.com/todos/1";
        const data = await httpClient.get(url);
        expect(data).toEqual({
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            //"completed": false
            completed: expect.any(Boolean) // indica qie espera la propiedad completed de tipo boolean sin importar el valor
        });
    });

    test("Debe contener una function post", () => {

        expect(typeof httpClient.post).toBe("function");
    })

})