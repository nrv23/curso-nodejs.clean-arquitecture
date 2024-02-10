import { sign, decode } from "jsonwebtoken";
import { envs } from "./envs";

const SEED = envs.JWT_KEY;

export const jwtAdapter = {

    genereteToken: (payload: any, duration: string = '24h' ) => {

        return new Promise((resolve,reject) => {
            sign(payload,SEED,{
                expiresIn: duration
            },(err,hash) => {

                if(err) return resolve(null);
                return resolve(hash);
            });
        })
    },
    validateToken: (token: string) => {

        return decode(token);
    }
}
