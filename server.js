const Discord = require('discord.js');
const credentials = require('./credentials');
const watson = require('watson-developer-cloud');
//token for the discord client
const token = credentials.DiscordKey.token
//Creates a new discord client object
const client = new Discord.Client();

const image_classify = require('./image_classify')

client.on('ready', () => {
    console.log("The bot is ready")
});

//event listener listening to messages. First parameter determines the action, and second is a callback with the message detail as the parameter
client.on('message' , msg =>{
    //If the message is from the bot then do nothing
    if(msg.author.bot) return;
    else{
        //checks the image and returns a promise. 
        const image = image_classify.isImage(msg); //image_check is a function requied from another file
        image.then(
            (value) => {
                //prints out every item from the raw classifer
            //    for(item of value.images[0].classifiers[0].classes){
            //        console.log(item.class)
            //    }
                console.log(value);
        });

    }
});

client.login(token)
