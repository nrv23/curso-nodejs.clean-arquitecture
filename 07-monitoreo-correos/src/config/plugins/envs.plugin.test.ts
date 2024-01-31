import { envs } from './envs';


describe('envs.plugin.ts', () => {

    test("Debe devolver los env options",() => {
        
        expect(envs).toEqual( {
            NODE_ENV: 'test',
            PORT: 3000,
            MAILER_EMAIL: 'nrv2391@gmail.com',
            MAILER_SECRET_KEY: 'axqxkttsbcbsxklc',
            MAILER_SERVICE: 'gmail',
            MONGO_URL: 'mongodb://nrv2391:123456789@localhost:27018',
            MONGO_DB_NAME: 'NOC_TEST',
            MONGO_USER: 'nrv2391',
            MONGO_PASS: '123456789',
            POSTGRES_USER: 'nrv2391',
            POSTGRES_DB: 'NOC_TEST',
            POSTGRES_PASSWORD: '123456789',
            POSTGRES_URL: 'postgresql://nrv2391:123456789@localhost:5433/NOC_TEST'
          }
      )
    })

    test("Debe retornar error sino encuentra el env", async() => {


        jest.resetModules(); // limpiar los mocks y las vairables
        process.env.PORT ="ABC";


        try {

            await import ("./envs");
            expect(true).toBe(false);


        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
    })
})
