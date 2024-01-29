import { Server } from './presentation/server';
import { LogModel, MongoDatabase } from './data/mongo';
import { envs } from './config/plugins/envs';
import { logSeverityLevel } from './domain/entities/Log.entity';


(async () => {

    main();
})();


async function main() {

    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    });

    Server.start()
}