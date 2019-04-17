const http = require('http');
const app = require('./app');
/* Starting connection on port 4000 */
const port = process.env.PORT || 4000;
console.log('App listening on port %s', port);
console.log('Press Ctrl+C to quit.');
const server = http.createServer(app);

server.listen(port);