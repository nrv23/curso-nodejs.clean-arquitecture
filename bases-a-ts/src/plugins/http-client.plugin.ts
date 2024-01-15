import axios from 'axios';

export const httpClientPlugin = {

    get: async (url: string) => {

        try {

            const { data } = await axios.get(url);
            return data;

        } catch (error) {

            throw new Error("Hubo un error");
        }
    },

    post: async (url: string, body: any) => {
        throw new Error("No implementado");
    }
}

