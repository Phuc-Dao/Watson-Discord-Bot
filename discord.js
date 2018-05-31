//This is practicing using the discord chat bot api
var discord = require('discord.js');
var client = new discord.Client();
var watson = require('./index');
var credentials = require('./credentials');

client.on('ready' , () => {
    console.log("the bot has stated");
});

//Client on listens for user input
client.on('message', msg => {
    
    //Try catch statement
    try{ 
       image = msg.attachments.array()[0].url
    }
    catch(TypeError){
        image = null
    }

    //if block that runs depending on commands
    if(msg.author.bot) return;
    else if(image != null){ 
        console.log(msg.attachments.array());
        msg.reply('It is an image with url: ' + msg.attachments.array()[0].url);
        //watson.detectImage(); //This calls on the watson functions
    }
    else{
        //console.log('not an img');
        msg.reply('I can only recognize images, please enter an image');
    }
    });
   client.login(credentials.DiscordKey.token);


