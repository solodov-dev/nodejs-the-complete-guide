const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    writeHtml(
      res,
      '<form action="/message" method="POST"><input type="text" name="message" /><button type="submit">send</button></form>'
    );
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => body.push(chunk));
    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  res.setHeader('Content-Type', 'text/html');
  writeHtml(res, '<h1>404: page not found!</h1>');
  res.end();
};

const writeHtml = (res, body) => {
  res.write('<html>');
  res.write('<head><title>Send a message</title></head>');
  res.write(`<body>${body}</body>`);
  res.write('</html>');
};

exports.handler = requestHandler;
