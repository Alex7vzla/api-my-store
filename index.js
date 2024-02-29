const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { errorLog, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

//Middlewares
app.use(express.json());

//Middlewares Cors
const whitelist = ['http://localhost:3000', 'http://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) ) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(options));

//Routes
routerApi(app);

//Middlewares errors
app.use(errorLog);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ' + port)
});
