const http = require('http');
const fs = require('fs');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Get the file path from the command line arguments
    const filePath = process.argv[2];

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Hello, World!\n");
});

// Start the server and listen on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});