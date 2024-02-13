import { sign, verify } from "jsonwebtoken";
import { envs } from "./envs";

const SEED = envs.JWT_KEY;

export const jwtAdapter = {

    genereteToken(payload: any, duration: string = '24h') {

        return new Promise((resolve, reject) => {
            sign(payload, SEED, {
                expiresIn: duration
            }, (err, hash) => {

                if (err) return resolve(null);
                return resolve(hash);
            });
        })
    },
    async validateToken<T>(token: string): Promise<T | null> {

        try {

            return verify(token, SEED) as T;

        } catch (error) {

            return null
        }
    }
}
