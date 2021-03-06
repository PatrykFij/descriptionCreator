require('dotenv-flow').config();
const express = require('express');
const path = require('path');

const app = express();
const setupProxy = require('../src/setupProxy.js');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '3000';
const contextPath =
  process.env.CONTEXT_PATH === '/' ? '' : process.env.CONTEXT_PATH || '';

setupProxy(app);

app.use(`${contextPath}/`, express.static('build'));
app.use('/*', (req, res) => {
  res.header('X-Frame-Options', 'allow-from *');
  return res.sendFile(path.resolve('build/index.html'));
});

const isLocalhost = Boolean(
  host === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    host === '[::1]' ||
    host === '0.0.0.0' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    host.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
);

const server = app.listen(port, host, () => {
  console.log(
    `Server started on http://${
      isLocalhost ? 'localhost' : host
    }:${port}${contextPath}`,
    server.address(),
  );
});
