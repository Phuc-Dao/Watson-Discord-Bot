//requires the different dependencies
var discord = require('discord.js');
var credentials = require('./credentials');
var watson = require('watson-developer-cloud');

//object containing credentials such as api key and tokens
var credential = {
    url: credentials.WatsonKey.url,
    version: credentials.WatsonKey.version,
    iam_apikey: credentials.WatsonKey.iam_apikey
}

var client = new discord.Client();
var ir = new watson.VisualRecognitionV3(credential);

//insertion sort that takes array as a parameter and sorts it based on the classifer score
function insertionSort(arrObj) {
    for (let i = 0; i < arrObj.length; i++) {
        let temp = arrObj[i];
        let j = i - 1;
        while (j >= 0 && arrObj[j].score > temp.score) {
            arrObj[j + 1] = arrObj[j];
            j--;
        }
        arrObj[j + 1] = temp;

    }
    return arrObj;
}

//checks if the keyword person or food is located inside the objects
function inArr(arr) {
    for (item of arr) {
        console.log(item.class);
        if (item.class == 'person') {
            return 1;
        }
        else if (item.class == 'food') {
            return 2;
        }
    }
    return 0; // returns 1 if it is a person , returns 2 if it is food, returns 0 if it is a generic
}

//function that converts decimal to percentage
function convertPercentage(a) {
    return (a * 100);
}

client.on('ready', () => {
    console.log("the bot has stated"); //prints this to the console when the client is ready
});

//event that triggers when the bot joins a guilde
client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

// this event triggers when the bot is removed from a guild.
client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

//Client on listens for user input
client.on('message', msg => {

    //Try catch statement to check if it is an image. 
    try {
        image = msg.attachments.array()[0].url
    }
    catch (TypeError) {
        image = null
    }

    //if the message is from the robot then it wont reply
    if (msg.author.bot) return;
    else if (image != null) {

        //generic classifier with no special key words
        ir.classify({ url: msg.attachments.array()[0].url }, function (error, response) {
            if (error) {
                console.log(error)
            } else {
                // checks for food/person keyword
                let val = inArr(response.images[0].classifiers[0].classes);
                var sortedArr = insertionSort(response.images[0].classifiers[0].classes);
                console.log(val);
                if (val == 1) {
                    //If contains person keyword then runs specific classifer for face detection
                    ir.detectFaces({ url: msg.attachments.array()[0].url }, function (error, response) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            //queries age and gender from json object
                            let minAge = response.images[0].faces[0].age.min;
                            let maxAge = response.images[0].faces[0].age.max;
                            let gender = response.images[0].faces[0].gender.gender;
                            let botMessage = 'I see a ' + gender + ' between the ages of ' + minAge + ' and ' + maxAge;
                            msg.reply(botMessage)
                            msg.reply('I also see: ')
                            //for loop that prints out each detected item
                            for (i = 0; i < sortedArr.length - 1; i++) {
                                msg.reply(sortedArr[i].class + ' ' + convertPercentage(sortedArr[i].score).toFixed(2) + ' %');
                            }
                        }
                   })
                }
                else if (val == 2) {
                    //if it is food then it will run the food detection classifier
                    ir.classify({ url: msg.attachments.array()[0].url, classifier_ids: 'food' }, function (error, response) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            let dishNameSorted = insertionSort(response.images[0].classifiers[0].classes);
                            let dishNameGreatest = dishNameSorted[dishNameSorted.length - 1].class; // returns the class of the greatest object
                            msg.reply('I see ' + dishNameGreatest);
                            msg.reply('I also see: ');
                            for (val = 0; val < sortedArr.length - 1; val++) {
                                console.log(sortedArr[val].class + ' ' + convertPercentage(sortedArr[val].score).toFixed(2) + ' %');
                            }
                        }
                    })}
                else {
                    //if it is neither than it will print out the generic person classifier
                    botMessage = 'I see ' + sortedArr[sortedArr.length - 1].class;
                    //console.log(botMessage); //replace this with messages that discord will send to the channel
                    msg.reply(botMessage + ': ');
                    msg.reply('Other things that I see: ');
                    for (i = 0; i < sortedArr.length - 1; i++) {
                        msg.reply(sortedArr[i].class + ' ' + convertPercentage(sortedArr[i].score).toFixed(2) + ' %');
                    }
                }
            }
        }
        )
    } else {
        //runs this else block if the user enters a message
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (command === "say") {
            // makes the bot say something and delete the message. A
            const sayMessage = args.join(" ");
            message.delete().catch(O_o => { });
            message.channel.send(sayMessage);
        }

        if (command === "kick") {
            // This command must be limited to mods and admins. 
            if (!message.member.roles.some(r => ["Administrator", "Moderator"].includes(r.name))) {
                return message.reply("Sorry, you don't have permissions to use this!");
            }
        }
    }
})
//runs the client
client.login(credentials.DiscordKey.token);
