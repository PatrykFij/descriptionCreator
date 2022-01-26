const compression = require('compression');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');
require('dotenv-flow').config();

const backendUrl = process.env.SERVER_API || 'http://localhost:3000';
const contextPath =
  process.env.CONTEXT_PATH === '/' ? '' : process.env.CONTEXT_PATH || '';

module.exports = function (app) {
  app.set('x-powered-by', false);
  app.use(compression());
  app.use(
    morgan(
      '[:remote-addr] [:date[iso]] ":method :url HTTP/:http-version" status: :status time: :response-time ms contentLength: :res[content-length] ref: ":referrer" userAgent: ":user-agent"',
    ),
  );

  app.use(`${contextPath}/env-config.js`, (req, res) => {
    res.set('Content-Type', 'application/json');
  });

  app.use(
    '/api',
    createProxyMiddleware({
      target: backendUrl,
      pathRewrite: { [`^/api/`]: '/' },
      changeOrigin: true,
      logLevel: 'debug',
      secure: false,
    }),
  );
};
