const fs = require('fs');

const reqHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>A Page</title></html>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      // console.log(parsedBody);
      const msg = parsedBody.split('=')[1];
      fs.writeFile('msg.txt', msg, e => {
        if (e) {
          return console.log(e);
        }
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>A Page</title></html>');
  res.write('<body><h1>Hello World</h1></body>');
  res.write('</html>');
  res.end();
};

module.exports = reqHandler;
