// Modulo http
const http = require('http');
const port = 8081;

// Funzione server intestazione
const server = http.createServer(function(req, res) {

    console.log(req.url);
    if(req.url === '/'){

        res.writeHead(200, {"Content-Type": 'text/html'});
        res.write('<h1>Home</h1>');
        res.end();
    } else if(req.url === '/api'){

        res.writeHead(200, {"Content-Type": 'text/html'});
        res.write(JSON.stringify(
            [
                {
                    "nome": "Mario",
                    "cognome": "Rossi"
                },
                {
                    "nome": "Luigi",
                    "cognome": "Verdi"
                },
            ]
        ));
        res.end();
    } else {

        res.writeHead(200, {"Content-Type": 'text/html'});
        res.write(`<h1>${req.url}</h1>`);
        res.end();
    }       
})

// Ascolto su porta + indirizzo
server.listen(port, '127.0.0.1');

console.log(`Server in funzione su http://127.0.0.1:${port}/`);