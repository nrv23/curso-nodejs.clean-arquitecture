import http from 'http';

const server = http.createServer((req,res)  => {

    console.log(req.url);
})


server.listen(3000,() => {
    console.log("Servidor corriendo en 3000");
    
});