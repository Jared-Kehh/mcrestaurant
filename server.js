const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); // Ensure JSON body parsing middleware is used
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
app
  .use('/', require('./routes'))
  .use(express.urlencoded({ extended:true }))
  .use(cors());

mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  }
  else{
  console.log('Database initialized successfully');

  app.use('/', require('./routes')); // Ensure correct path for contacts routes

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })};
});

