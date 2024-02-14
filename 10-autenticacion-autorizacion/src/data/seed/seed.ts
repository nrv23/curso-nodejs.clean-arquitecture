import { envs } from "../../config";
import { MongoDatabase } from "../mongo/mongo-database";
import { ProductModel } from '../mongo/models/product.model';
import { CategoryModel } from '../mongo/models/category.model';
import { UserModel } from "../mongo/models/User.model";
import { seedData } from "./data";


(async () => {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    await main();
    await MongoDatabase.disconnect();
})();

const randomBetween0AndX = (x: number) => {

    return Math.floor(Math.random() * x);

}

async function main() {

    // borrar todo
    await Promise.all([
        ProductModel.deleteMany(),
        CategoryModel.deleteMany(),
        UserModel.deleteMany()
    ]);

    // agregar usuarios 

    const users = await UserModel.insertMany(await seedData.users());
    const categories: any = [];

    seedData.categories.forEach(async category => {

        const { _id } = users[randomBetween0AndX(await (await seedData.users()).length - 1)];
        const cat = await CategoryModel.create({
            ...category,
            userId: _id
        });
        console.log({ cat });
        categories.push();
    })

    seedData.products.forEach(async product => {
        const { _id } = users[randomBetween0AndX(await (await seedData.users()).length - 1)];
        await ProductModel.create({
            ...product,
            categoryId: categories[randomBetween0AndX(seedData.categories.length - 1)]._id,
            userId: _id
        });
    })

    console.log("La base de datos ha cargado la información con éxito");

}
