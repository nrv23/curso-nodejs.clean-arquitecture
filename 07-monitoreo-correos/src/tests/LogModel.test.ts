import { LogModel } from '../data/mongo/models/Log.model';
import { MongoDatabase } from '../data/mongo/init';
import mongoose from 'mongoose';

describe('LogModel', () => {

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        });
    });

    afterAll(() => {
        mongoose.connection.close();
    })


    test('Debe retornar el LogModel ', async () => {

        const log = {
            origin: "log.test.ts",
            message: "test",
            level: "low"
        };

        const response = await LogModel.create(log);
        expect(response).toEqual(expect.objectContaining(
            {
                ...log,
                id: expect.any(String),
                createdAt: expect.any(Date)
            }
        ))

    });


    /*test('Debe retornar el objeto esquema', () => {

        const schema = LogModel.schema.obj;
        expect(schema).toEqual(expect.objectContaining({
            level: {
                type: expect.any(Function),
                enum: ['low', 'high', 'medium', 'critical'],
                default: 'low'
            },
            message: { type: expect.any(Function), require: true },
            origin: { type: expect.any(Function) },
            createdAt: { type: expect.any(Function) }
        }))
    })*/
})
