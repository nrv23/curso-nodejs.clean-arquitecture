import { compare, genSaltSync, hash } from 'bcryptjs';


export const bcryptAdapter = {
    hash : (password: string) => {
        
        const salt = genSaltSync();
        return hash(password,salt);
    },

    compare: (pass:string, passHash: string) => {

        return compare(pass,passHash);
    }
}