ear
 Watson-Discord-Bot
---
Chat bot for the Discord chat application. Uses the Watson API by IBM to classify and recognize images. The back end is handled using Node.js
---
## Quick Start
```
#install dependencies
npm install

#run server
npm start

```

### To deploy this project to heroku see steps below:

You will need to install the [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

```bash
# Heroku-cli (paste link in browser)
https://devcenter.heroku.com/articles/heroku-cli
```

Afer installing heroku-cli run the following commands in terminal and run the following command

```bash
# login locally
heroku login
```

You will be prompted to enter your email and password which is the same the email and password used when you sign up for Heroku

```bash
# create your app
heroku create

# set enviroment vareiables
heroku config:set DB_URL=YOUR_OWN_DB_URI
heroku config:set TOKEN_SECRET=YOUR_OWN_SECRET
```

#Run npm install to install all the packags

1. Documentations for reading Discord.js use https://discord.js.org/#/
1. Go to disc
