const http = require('http');
const app = require('./app');
/* Starting connection on port 4000 */
const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port);