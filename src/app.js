const { sequelize } = require('./models');
// sequelize.sync({ alter: true });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoute = require('./routes/authRoute');
const friendRoute = require('./routes/friendRoute');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRout');
const notFound = require('./middleware/notFound');
const error = require('./middleware/error');
const authenticate = require('./middleware/authenticate');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);
app.use('/friends', authenticate, friendRoute);
app.use('/posts', authenticate, postRoute);
app.use('/users', authenticate, userRoute);

app.use(notFound);
app.use(error);

const port = process.env.PORT || 8000;
app.listen(port, console.log(`server running on port: ${port}`));
