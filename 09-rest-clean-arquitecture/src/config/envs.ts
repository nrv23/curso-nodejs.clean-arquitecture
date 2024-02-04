import 'dotenv/config'; // cargar por defecto
import { get } from 'env-var';


export const  envs = {
    PORT: get("PORT").required().asPortNumber(),
    PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(),

}

