# Certik Full Stack Challenge

This is my submission for the Certik Full Stack Challenge for the internship position. 

## Running the Application
To run this, start by cloning this repository and going into the root directory. 

It is **required** for you to include **a Twitter API token** for this application to run. See the section about this further below.

Then, we will need to install dependencies for the server and the client. 

```bash
npm install #install server dependencies
cd client
npm install #install client dependencies
cd ..
```
You may also use `yarn` where applicable.

After install dependencies, make sure you are back in the root directory of the project if you aren't already. Then, you can build necessary components using 

```bash
npm run build
```

Finally, you can now run it like so:

```bash
npm start
```

By default, this should run the application on port 5000. To access it, go to your browser and open `localhost:5000`.

## Twitter API Token
This application requires the user to include a Twitter API token. After signing up for the Twitter API, you should be given an API token as well as some other information. Please input these into the `secrets.js` file. 

Without this token, the app will not properly run.

## Notable Features and Mentions
The server will cache the requested data to display every 10 seconds. Tweets (and hence the data) do not update that frequently and so you don't need to always store the newest version. It also means the calculations required to aggregate the twitter data are performed less often.
