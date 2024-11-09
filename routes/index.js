const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
  };
/**
 * @swagger
 * components:
 *    securitySchemes:
 *        OpenID:
 *          type: openIdConnect
 *          openIdConnectUrl: https://dev-yob0ogn6bg5av384.us.auth0.com
 */
router.use(auth(config))
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get an authentications state
 *     description: Retrieve authentication
 *     responses:
 *       200:
 *         description: Successful response authentication
 */
// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in BOI' : 'Logged out');
  });

  /**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get an user profile
 *     description: Retrieve profile
 *     security:
 *     - OpenId: []
 *     responses:
 *       200:
 *         description: Successful response with profile
 */

router.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2));
  });

router.use('/', require('./swagger'));
router.use('/restaurants', require('./restaurants'))
router.use('/outsideRestaurants', require('./outsideRestaurants'))

module.exports = router;