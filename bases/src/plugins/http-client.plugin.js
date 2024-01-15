const axios = require("axios");

const httpClientPlugin = {

    get: async (url) => {

        try {

            /*  const response = await fetch(url);
              return await response.json(); */


            const { data } = await axios.get(url);
            return data;

        } catch (error) {

            throw new Error(error);
        }
    }
}

module.exports = {
    httpClientPlugin
}