const Discord = require('discord.js');
const credentials = require('./credentials');
const watson = require('watson-developer-cloud');
//token for the discord client
const token = credentials.DiscordKey.token
//Creates a new discord client object
const client = new Discord.Client();

const image_check = require('./image_checker')

client.on('ready', () => {
    console.log("The bot is ready")
});

//event listener listening to messages. First parameter determines the action, and second is a callback with the message detail as the parameter
client.on('message' , msg =>{
    //If the message is from the bot then do nothing
    if(msg.author.bot) return;
    else{
        //checks the image returns object of classes if it is general image. Returns 1 if it is fruit. Returns 2 if it is a person. 
        //if returns false then it is not an image
        const image = image_check.isImage(msg); //image_check is a function requied from another file
        
        //If branch that checks if the image is 1 or 2
        if(image === 1){

        }
        else if(image === 2){

        }
        else if (image === false){

        }
        else{
            
        }

    }
});

client.login(token)
