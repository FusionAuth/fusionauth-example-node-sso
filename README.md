# FusionAuth Node.js SSO example

This project is two simple example Node.js applications that illustrates how you can easily implement single sign-on (SSO) using FusionAuth.

## To run

This assumes you already have a running FusionAuth instance, user and application running locally. If you don't, please see the [5-Minute Setup Guide](https://fusionauth.io/docs/v1/tech/5-minute-setup-guide) to do so.

* Create two local aliases in your DNS: `hooli.fusionauth.io` and `piedpiper.fusionauth.io`, both resolving to `127.0.0.1`. 
* Configure an apache proxy to send traffic to `piedpiper.fusionauth.io` to localhost:3000.
* Configure an apache proxy to send traffic to `hooli.fusionauth.io` to localhost:3001`.
* Set up TLS.
* Create two applications, `Hooli` and `Pied Piper`
  * Update the `Pied Piper` FusionAuth application to allow a redirect of `https://piedpiper.fusionauth.io/oauth-redirect`
  * Update the `Pied Piper` FusionAuth application to have a logout url of `https://piedpiper.fusionauth.io/endsession`
  * Update the `Hooli` FusionAuth application to allow a redirect of `https://hooli.fusionauth.io/oauth-redirect`
  * Update the `Hooli` FusionAuth application to have a logout url of `https://hooli.fusionauth.io/endsession`
* Make sure your user has a first name. Register your user for both the applications.
* In the `piedpiper` directory, run:
  * `npm install`
  * update `routes/index.js` with the client id and client secret of your FusionAuth application.
  * `PORT=3000 npm start`
* In the `hooli` directory, run:
  * `npm install`
  * update `routes/index.js` with the client id and client secret of your FusionAuth application.
  * `PORT=3001 npm start`

Go to `https://piedpiper.fusionauth.io/` and login with the previously created user. 

You should see 'Hello user'.

Then click on the 'Hooli' link in the menu to go to `https://hooli.fusionauth.io/`. You won't be prompted to sign in again, but will automatically be logged in.

Click 'logout' and you'll be logged out of both applications.
