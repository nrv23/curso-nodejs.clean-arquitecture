
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

    })
    

})
