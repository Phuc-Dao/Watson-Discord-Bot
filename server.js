const Discord = require('discord.js');
const credentials = require('./credentials');
const watson = require('watson-developer-cloud');
//token for the discord client
const token = credentials.DiscordKey.token
//Creates a new discord client object
const client = new Discord.Client();
const image_classify = require('./image_classify')
const print = require('./print');

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
            //checks the type of the promis value. If it is a stirng then run the first block. 
            if(typeof(value) == "string"){
                console.log("it is a string")
                msg.reply("it is not an image");
            }
            else{
                //if the value of the promise is an object then run this code block
                // let replyMessage = "I see... \n";
                let replyMessage = print.getMessage(value);
                // for(items of value.images[0].classifiers[0].classes){
                //     let itemClass = items.class;
                //     console.log(itemClass)
                //     replyMessage = replyMessage + String(itemClass) + " \n";
                // }
                //replys the message
                msg.reply(replyMessage);
            }
               console.log(value);
        });

    }
});

client.login(token)
