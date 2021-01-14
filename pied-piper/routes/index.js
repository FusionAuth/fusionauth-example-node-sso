const express = require('express');
const router = express.Router();
const {FusionAuthClient} = require('@fusionauth/typescript-client');
const clientId = '85a03867-dccf-4882-adde-1a79aeec50df';
const clientSecret = '7gh9U0O1wshsrVVvflccX-UL2zxxsYccjdw8_rOfsfE';
const client = new FusionAuthClient('noapikeyneeded', 'http://localhost:9011');
const loginUrl = 'http://localhost:9011/oauth2/authorize?client_id='+clientId+'&response_type=code&redirect_uri=http%3A%2F%2Fpiedpiper.local%3A3000%2Foauth-redirect&scope=offline_access';

/* GET home page. */
router.get('/', function (req, res, next) {

  if (!req.session.user) {
     res.redirect(302, loginUrl);
  }
  res.render('index', {user: req.session.user, title: 'Pied Piper App', clientId: clientId, loginUrl: loginUrl});
});

/* Login page if we aren't logged in */
router.get('/login', function (req, res, next) {
  res.render('login', {title: 'Pied Piper Login', clientId: clientId, loginUrl: loginUrl});
});

/* OAuth return from FusionAuth */
router.get('/oauth-redirect', function (req, res, next) {
  // This code stores the user in a server-side session
  client.exchangeOAuthCodeForAccessToken(req.query.code,
                                         clientId,
                                         clientSecret,
                                         'http://piedpiper.local:3000/oauth-redirect')
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
      })
      .then((response) => {
        res.redirect(302, '/');
      }).catch((err) => {console.log("in error"); console.error(JSON.stringify(err));});
      
  // This code pushes the access and refresh tokens back to the browser as secure, HTTP-only cookies
  // client.exchangeOAuthCodeForAccessToken(req.query.code,
  //                                        clientId,
  //                                        clientSecret,
  //                                        'http://piedpier.local:3000/oauth-redirect')
  //     .then((response) => {
  //       res.cookie('access_token', response.response.access_token, {httpOnly: true});
  //       res.cookie('refresh_token', response.response.refresh_token, {httpOnly: true});
  //       res.redirect(302, '/');
  //     }).catch((err) => {console.log("in error"); console.error(JSON.stringify(err));});
});

module.exports = router;
