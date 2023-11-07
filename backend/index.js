const http = require('http');
const path = require('path');
const qs = require('querystring');
const storage = require('./storage.js');
const frontEndPath = path.resolve(__dirname, '..', 'frontend', 'index.html');
const PORT = 5000;

function is404(res) {
  res.writeHead(404);
  res.write('404 Not Found');
  res.end();
}

const router = {
  get: {
    '/': (_req, res) => {
      const data = storage.read();
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(JSON.stringify(data));
    }
  },

  post: {
    '/': (req, res) => {
      const chunks = [];
      req.on('data', chunk => chunks.push(chunk.toString()));

      req.on('end', () => {
        try {
          res.setHeader('Access-Control-Allow-Origin', '*');
          const body = chunks.toString();

          try {
            JSON.parse(body);
            storage.save(body);
          } catch(error) {
            const bodyQsParsed = qs.parse(body);
            storage.save(JSON.stringify(bodyQsParsed));
          }

          res.end('<script>history.back()</script>');
        } catch(error) {
          console.error(error);
          res.writeHead(500);
        }

        res.end();
      });
    }
  },
};

http.createServer((req, res) => {
  const reqUrl = new URL(req.url, 'http://127.0.0.1/');
  const method = req.method.toLowerCase();
  const path = reqUrl.pathname.toLowerCase();
  const route = router[method][path];
  route ? route(req, res) : is404(res);
}).listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}/`);
  console.log('Please open on your browser:');
  console.log(`file://${frontEndPath}`);
});
