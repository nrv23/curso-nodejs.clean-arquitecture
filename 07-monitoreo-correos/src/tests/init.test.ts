import { MongoDatabase } from "../data/mongo/init"
import mongoose from 'mongoose';


describe('init mongodb', () => {

    afterAll(() => {
        mongoose.connection.close();
    })

    test("debe conectar con mongodb",async () => {


        const response = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        });

        expect(response).toEqual(true);
    });

    test('Debe generar un error en la conexion', async () => {
        
        try {
            
            await MongoDatabase.connect({
                dbName: "",
                mongoUrl: ""
            });

        } catch (error) {
            
        }
    })
    
})
