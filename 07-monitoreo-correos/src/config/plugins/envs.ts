import "dotenv/config";
import * as env from "env-var";

export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(),
    MAILER_SECRET_KEY: env.get("MAILER_SECRET_KEY").required().asString(),
    NODE_ENV: env.get("NODE_ENV").required().asEnum(["dev", "staggin", "prod"]),
    MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
};
