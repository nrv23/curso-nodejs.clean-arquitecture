import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

    const myImportanteVariable = process.env.MY_IMPORTANT_VARIABLE;

    console.log("Hola desde los logs de netlify")


    if (!myImportanteVariable) throw 'myImportanteVariable is not defined';



    return {
        statusCode: 200,
        body: JSON.stringify({
            myImportanteVariable
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }
};

export { handler };