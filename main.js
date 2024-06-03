const http = require('http');
const fs = require('fs');

function readFile(filePath, response) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end(`Error reading file: ${err.message}`);
        } else {
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end(data);
        }
    });
}
const server = http.createServer((req, res) => {
    const filePath = './output.txt'; 

    readFile(filePath, res);
});
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
