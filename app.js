const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
// Make sure to add the configuration for your database to the config file
const databaseConfig = require('./config/database');

// Setup db connection
const database = mongoose.connection;

mongoose.connect(databaseConfig.database, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useMongoClient:true
}, () => {
  process.stdout.write('connected to mongodb');
});

// Verify that db connection could be established
database.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Connected to Database');
});
database.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});

const app = express();

// Specify Pug as template engine
app.set('view engine', 'pug');

// Specify Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Configure Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Home Route
app.get('/', (req, res) => {
  res.render('index');
});

// Add routes
const movies = require('./routes/movies');

app.use('/movies', movies);

app.listen(3000);
