import "dotenv/config";
import * as env from "env-var";

export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(),
    MAILER_SECRET_KEY: env.get("MAILER_SECRET_KEY").required().asString(),
    NODE_ENV: env.get("NODE_ENV").required().asEnum(["dev", "staggin", "prod"]),
    MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
    MONGO_URL: env.get("MONGO_URL").required().asString(),
    MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
    MONGO_USER: env.get("MONGO_USER").required().asString(),
    MONGO_PASS: env.get("MONGO_PASS").required().asString(),
    POSTGRES_USER: env.get("POSTGRES_USER").required().asString(),
    POSTGRES_DB: env.get("POSTGRES_DB").required().asString(),
    POSTGRES_PASSWORD: env.get("POSTGRES_PASSWORD").required().asString(),
    POSTGRES_URL: env.get("POSTGRES_URL").required().asString(),
};
