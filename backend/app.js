require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { limiter } = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT = 3000 } = process.env;
const app = express();
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFoundError = require('./errors/notfounderror');

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(requestLogger);

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use(helmet());
app.use(limiter);
app.use(errorLogger);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Requested resourece was not found.'));
});

const serverErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
};
app.use(serverErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
