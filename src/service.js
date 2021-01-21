// MODULES //
const http = require('http');
// MODULES //

// FILES //
const routes = require('./routes');
// FILES //

const server = http.createServer(routes);

server.listen(3030);
