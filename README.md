# FusionAuth Node.js example

This project is a simple example Node.js application that illustrates how to integrate with FusionAuth's OAuth system using the Authorization Code grant.

## To run

This assumes you already have a running FusionAuth instance, user and application running locally. If you don't, please see the [5-Minute Setup Guide](https://fusionauth.io/docs/v1/tech/5-minute-setup-guide) to do so.

* Create two local aliases in your DNS: `hooli.local` and `piedpiper.local`, both resolving to `127.0.0.1`.
* Create two applications, `Hooli` and `Pied Piper`
** Update the `Hooli` FusionAuth application to allow a redirect of `http://hooli.local:3001/oauth-redirect`
** Update the `Pied Piper` FusionAuth application to allow a redirect of `http://piedpiper.local:3000/oauth-redirect`
* Make sure your user has a first name. Register your user for both the applications.
* In the `hooli` directory, run:
** `npm install`
** update `routes/index.js` with the client id and client secret of your FusionAuth application.
** `PORT=3001 npm start`
* In the `piedpiper` directory, run:
** `npm install`
** update `routes/index.js` with the client id and client secret of your FusionAuth application.
** `PORT=3000 npm start`

Go to `http://hooli.local:3001/` and login with the previously created user. 

You should see 'Hello <name>'.

Then go to http://piedpiper.local:3000` and click login. You won't be prompted to sign in again, but will automatically be logged in.
