const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'N1hsZzc6qVDsjcxfqnr1qlmNxWDX50R2',
  issuerBaseURL: 'https://dev-yob0ogn6bg5av384.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

const port = process.env.PORT || 3000;

app.use(express.json()); // Ensure JSON body parsing middleware is used
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

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

