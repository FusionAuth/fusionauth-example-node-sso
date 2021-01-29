const express = require('express');
const router = express.Router();
const {FusionAuthClient} = require('@fusionauth/typescript-client');

const clientId = 'dbfc584e-8b46-4e73-9046-cba9938ec4e0';
const clientSecret = 'g52dmIF-2PCYlv4Pio0gd_vvd_ZO2TW8aRZpCER4QZw';
const client = new FusionAuthClient('noapikeyneeded', 'https://local.fusionauth.io');
const hostName = 'hooli.fusionauth.io';
const port = 3001;
const title = 'Hooli';

const redirectUrl = 'https://'+hostName+'/oauth-redirect';
const loginUrl = 'https://local.fusionauth.io/oauth2/authorize?client_id='+clientId+'&response_type=code&redirect_uri='+encodeURIComponent(redirectUrl)+'&scope=offline_access';
const logoutUrl = 'https://local.fusionauth.io/oauth2/logout?client_id='+clientId;

/* GET home page. */
router.get('/', function (req, res, next) {

  if (!req.session.user) {
     res.redirect(302, loginUrl);
     return;
  }
  res.render('index', {user: req.session.user, title: title + ' App', clientId: clientId, logoutUrl: "/logout", loginUrl: loginUrl});
});

/* Login page if we aren't logged in */
router.get('/login', function (req, res, next) {
  res.render('login', {title: title + ' Login', clientId: clientId, loginUrl: loginUrl});
});

/* Logout page */
router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect(302, logoutUrl);
});

/* End session for global SSO logout */
router.get('/endsession', function (req, res, next) {
  req.session.destroy();
  res.redirect(302, "/login");
});

/* OAuth return from FusionAuth */
router.get('/oauth-redirect', function (req, res, next) {
  // This code stores the user in a server-side session
  client.exchangeOAuthCodeForAccessToken(req.query.code,
                                         clientId,
                                         clientSecret,
                                         redirectUrl)
      .then((response) => {
        return client.retrieveUserUsingJWT(response.response.access_token);
      })
      .then((response) => {
        if (response.response.user.registrations.length == 0 || (response.response.user.registrations.filter(reg => reg.applicationId === clientId)).length == 0) {
          console.log("User not registered, not authorized.");
          res.redirect(302, '/');
          return;
        }
      
        req.session.user = response.response.user;
        req.session.application = "hooli";
      })
      .then((response) => {
        res.redirect(302, '/');
      }).catch((err) => {console.log("in error"); console.error(JSON.stringify(err));});
});

module.exports = router;
