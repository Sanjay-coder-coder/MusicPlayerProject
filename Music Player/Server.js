const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '';
    let contentType = '';

    // Route handling
    switch (req.url) {
        case '/':
        case '/MusicPlayerHomePage':
            filePath = path.join(__dirname, 'MusicPlayerHomePage.html');
            contentType = 'text/html';
            break;
        case '/MusicPlayerSinglePlaylistScreen':
            filePath = path.join(__dirname, 'MusicPlayerSinglePlaylistScreen.html');
            contentType = 'text/html';
            break;
        case '/MusicPlayerStyle.css':
            filePath = path.join(__dirname, 'MusicPlayerStyle.css');
            contentType = 'text/css';
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
    }

    // Read and serve the requested file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('File read error:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

// Start the server
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});