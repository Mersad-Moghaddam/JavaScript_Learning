import express from 'express';
import bodyParser from 'body-parser';

import usersRouter from './routes/users.js'; // Importing the users router

const app = express();
const PORT = 8000;


app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('Received a GET request');
  res.send('Hello, World!');
});
// Using the users router for requests to /users
app.use('/users', usersRouter);


app.listen(PORT, () => {
  console.log(`Server is Running on port: http://localhost:${PORT}`);
});