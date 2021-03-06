import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Debug from 'debug';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './route/index';


dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api/v1', routes);
app.get('/', (request, response) => {
  response.status(200).send({ status: 200, message: 'Welcome to Balancecheck API Version 1' });
});
app.use((error, request, response, next) => {
  if (error) {
    return response.status(500).json({
      status: 500,
      error: `Internal server error : ${error}`
    });
  }
  return next();
});

app.all('*', (request, response) => {
  response.status(404).send({ status: 404, message: 'Wrong request' });
});

const debug = Debug('http');

app.set('port', (process.env.PORT || 5000));

// Start node server
app.listen(app.get('port'), () => {
  debug(`Node server is running on port ${app.get('port')}`);
});

export default app;
