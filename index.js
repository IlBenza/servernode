// Modulo http
const http = require('http');

// Funzione server intestazione
const server = http.createServer(function(req, res) {

    res.writeHead(200, {"Content-Type": 'text/html'});
    res.write('<h1>Nome Cognome</h1>');
    res.end();
})

// Ascolto su porta + indirizzo
server.listen(8081, '127.0.0.1');

console.log('Server in funzione su http://127.0.0.1:8081/');