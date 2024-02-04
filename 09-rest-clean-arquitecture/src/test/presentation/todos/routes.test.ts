
import request from 'supertest';
import { prisma } from '../../../data/postgres/init';
import { testServer } from '../../test-server';

describe('routes.ts', () => {

    beforeAll(async () => {
        await testServer.start();
    });

    afterAll(() => {
        testServer.close(); // cerrar todas las instancias del servidor de express
    });

    beforeEach(async () => {
        await prisma.todo.deleteMany();
    })

    const todos = [
        {
            text: "todo 1"
        },
        {
            text: "todo 2"
        }
    ];

    const todoId = 999999;

    test('Debe obtener los todos', async () => {


        await prisma.todo.createMany({
            data: todos
        });

        const { body } = await request(testServer.app)
            .get("/api/todos")
            .expect(200);

        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);
    })


    test('Devolver todo por id ', async () => {


        const todo1 = await prisma.todo.create({
            data: todos[0]
        });

        console.log(todo1)
        const { body } = await request(testServer.app)
            .get(`/api/todos/${todo1.id}`)
            .expect(200);

        expect(body).toEqual(todo1);

    })

    test('Debe regresar un not found', async () => {

        const { body } = await request(testServer.app)
            .get(`/api/todos/${todoId}`)
            .expect(400);

        expect(body).toEqual(`Todo with id ${todoId} not found`);

    });


    test('Debe crear un nuevo todo', async () => {

        const { body } = await request(testServer.app)
            .post("/api/todos")
            .send(todos[0])
            .expect(201);

        expect(body).toEqual({
            id: expect.any(Number),
            text: todos[0].text,
            completedAt: null
        });
    });

    test('Debe devolver un error al crear el todo', async () => {

        const { body, statusCode } = await request(testServer.app)
            .post("/api/todos")
            .send({
                text: "",
            })
        expect(body.message).toEqual('El valor para text es requerido');
        expect(statusCode).toEqual(400);
    });

    test('Actualizar un todo por el id', async () => {

        const newTodo = await prisma.todo.create({
            data: todos[0]
        });

        const { body } = await request(testServer.app)
            .put(`/api/todos/${newTodo.id}`)
            .send({
                text: "texto actualizado en prueba",
                completedAt: new Date().toISOString()
            });
        console.log(body)
        expect(body.id).toEqual(expect.any(Number));
        expect(body.text).toBe("texto actualizado en prueba");
        expect(new Date(body.completedAt).toString()).not.toBe("Invalid Date")
    }, 6000)

    test('Debe devolver 404 si no encuentra el todo al actualizar', async () => {

        const { body, statusCode } = await request(testServer.app)
        .put(`/api/todos/${todoId}`)
        .send({
            text: "texto actualizado en prueba",
            completedAt: new Date().toISOString()
        });

        expect(statusCode).toBe(400);
        expect(body).toBe(`Todo with id ${todoId} not found`)
    },6000)
    
    test('Actualizar soloa la fecha del todo por el id', async () => {

        const newTodo = await prisma.todo.create({
            data: todos[0]
        });
        const updateDate = new Date().toISOString();

        const { body, statusCode } = await request(testServer.app)
            .put(`/api/todos/${newTodo.id}`)
            .send({
                completedAt: updateDate
            });

        expect(body.id).toBe(newTodo.id);
        expect(body.text).toBe(todos[0].text);
        expect(new Date(body.completedAt).toString()).not.toBe(updateDate);
        expect(statusCode).toBe(200);
        
    }, 6000)

})
