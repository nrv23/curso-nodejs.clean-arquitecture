import { envs } from '../config/envs';
import { Server } from '../presentation/Server';

jest.mock('../presentation/Server'); // mock del archivo server que levanta el servidor

describe('App.ts', () => {

    test('EL servidor debe funcionar con los argumentos esperados', async () => {

        await import("./../app");
        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            "port": envs.PORT,
            "publicPath": envs.PUBLIC_PATH,
            "routes": expect.any(Function),

        })

        expect(Server.prototype.start).toHaveBeenCalled();

    })
});
