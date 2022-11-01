# FusionAuth Node.js SSO example

This project is two simple example Node.js applications that illustrates how you can easily implement single sign-on (SSO) using FusionAuth.

## Prerequisites

This assumes you already have a running FusionAuth instance, user and application running with a valid TLS certificate. If you don't, please see the [5-Minute Setup Guide](https://fusionauth.io/docs/v1/tech/5-minute-setup-guide) to do so. 

If you don't have easy access to a FusionAuth instance with a valid TLS certificate, try using https://sandbox.fusionauth.io for the FusionAuth server. This is a **shared** host.

You need to have a valid SSL certificate, otherwise the cookies are not set correctly when the user logs in at FusionAuth. 

## To run

* Create two local aliases in your DNS: `hooli.local` and `piedpiper.local`, both resolving to `127.0.0.1`.
* Create two applications, `Hooli` and `Pied Piper`
  * Update the `Pied Piper` FusionAuth application to allow a redirect of `http://piedpiper.local:3000/oauth-redirect`
  * Update the `Pied Piper` FusionAuth application to have a logout url of `http://piedpiper.local:3000/endsession`
  * Update the `Hooli` FusionAuth application to allow a redirect of `http://hooli.local:3001/oauth-redirect`
  * Update the `Hooli` FusionAuth application to have a logout url of `http://hooli.local:3001/endsession`
* Make sure your user has a first name. Register your user for both the applications.
* In the `pied-piper` directory, run:
  * `npm install`
  * update `routes/index.js` with the client id and client secret of your FusionAuth application.
  * `PORT=3000 npm start`
* In the `hooli` directory, run:
  * `npm install`
  * update `routes/index.js` with the client id and client secret of your FusionAuth application.
  * `PORT=3001 npm start`

Go to `http://hooli.local:3001/` and login with the previously created user. 

You should see 'Hello user'.

Then click on the 'Pied Piper' link in the menu to go to `http://piedpiper.local:3000`. You won't be prompted to sign in again, but will automatically be logged in.

Click 'logout' and you'll be logged out of both applications. 

## Known issues


Logout only works on Firefox with http:// hosts. If you want to test with Chrome or Safari, run all hosts with valid TLS certificates.

## Last updated

This was last reviewed Nov 2022.
