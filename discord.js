//This is practicing using the discord chat bot api
var discord = require('discord.js');
var credentials = require('./credentials');
var watson = require('watson-developer-cloud');

var credential = {
    url: credentials.WatsonKey.url,
    version: credentials.WatsonKey.version,
    iam_apikey: credentials.WatsonKey.iam_apikey
  }
var client = new discord.Client();
var ir = new watson.VisualRecognitionV3(credential);

//////////////////////////List of all the utility functions that are being used///////////////////////////////////////////////////////
function insertionSort(arrObj){
//takes unsorted array as an object and then sorts it based on the score value
for(let i = 0; i < arrObj.length; i++){
    let temp = arrObj[i];
    var j = i-1;
    while(j >= 0 && arrObj[j].score > temp.score){
        arrObj[j+1] = arrObj[j];
        j--;
    }
arrObj[j+1] = temp;

}
return arrObj;
}

function inArr(arr){
    for(item of arr){
        console.log(item.class); 
        if(item.class == 'person'){
            return 1;
         }
         else if (item.class == 'food'){
            return 2;
         }
    }
    return 0; // returns 1 if it is a person , returns 2 if it is food, returns 0 if it is a generic
}

function convertPercentage(a){
    return(a * 100);
}

//////////////////////////List of all the utility functions that are being used///////////////////////////////////////////////////////


client.on('ready' , () => {
    console.log("the bot has stated"); //prints this to the console when the client is ready
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
  });
  
  client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
  });

//Client on listens for user input
client.on('message', msg => {
    
    //Try catch statement to check if it is an image
    try{ 
       image = msg.attachments.array()[0].url
    }
    catch(TypeError){
        image = null
    }

    //if the message is from the robot then it wont reply
    if(msg.author.bot) return;
    else if(image != null){
        //runs if it is an image 
        // console.log(msg.attachments.array());
        // msg.reply('It is an image with url: ' + msg.attachments.array()[0].url);
        //generic classify -> returns an object

        //first promsie that returns sorted object of the generic classifier
            // This is the generic classify
            ir.classify({url: msg.attachments.array()[0].url}, function(error, response){
                if(error){
                    console.log(error)
                }else{
                    //resolve(responce.image[0].classifers)
                    //let unsortedArr = response.images[0].classifiers[0].classes;
                    let val = inArr(response.images[0].classifiers[0].classes); // checks if food/ person is here
                    var sortedArr = insertionSort(response.images[0].classifiers[0].classes);

                    console.log(val);
                        
                    
                        if(val == 1){
                        //If it is a person then it will run the face detection classifier.

                        ir.detectFaces({url: msg.attachments.array()[0].url}, function(error , response){
                            if(error){
                                console.log(error);
                            }
                           else{
                                let minAge = response.images[0].faces[0].age.min;
                                let maxAge = response.images[0].faces[0].age.max;
                                let gender = response.images[0].faces[0].gender.gender;
                                let botMessage = 'I see a ' + gender + ' between the ages of ' + minAge + ' and ' + maxAge;
                                msg.reply(botMessage)
                                msg.reply('I also see: ')
                                //for loop that prints a reply for every 
                                for(i = 0; i < sortedArr.length - 1; i++){
                                    msg.reply(sortedArr[i].class + ' ' + convertPercentage(sortedArr[i].score).toFixed(2) + ' %');
                                }

                                

                            }
                        });
                            
                        }
                        else if(val == 2){
                        //if it is food then it will run the food detection classifier
                        ir.classify({url: msg.attachments.array()[0].url, classifier_ids: 'food'}, function(error, response){
                            if(error){
                                console.log(error);
                            }
                            else{
                            let dishNameSorted = insertionSort(response.images[0].classifiers[0].classes);
                            let dishNameGreatest = dishNameSorted[dishNameSorted.length-1].class; // returns the class of the greatest object
                            msg.reply('I see ' + dishNameGreatest );
                            msg.reply('I also see: ');
                            for(val = 0; val < sortedArr.length-1; val++){
                                console.log(sortedArr[val].class + ' ' + convertPercentage(sortedArr[val].score).toFixed(2) + ' %');
                            }

                            }
                        })
                        }
                        else{
                        //if it is neither than it will print out the generic person classifier
                        botMessage = 'I see ' + sortedArr[sortedArr.length - 1].class;
                        //console.log(botMessage); //replace this with messages that discord will send to the channel
                        msg.reply(botMessage + ': ');
                        msg.reply('Other things that I see: ');

                        for(i = 0; i < sortedArr.length - 1; i++){
                            msg.reply(sortedArr[i].class + ' ' + convertPercentage(sortedArr[i].score).toFixed(2) + ' %');
                        }
                        }
                }
            }
            )}

    else{
        var obj; 
        //runs if it is not an image //Promise the generic classify and then resolve the variable to store the arr OBJ
        msg.reply('I can only recognize images, please enter an image');

   // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  


  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }

  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) ){
      return message.reply("Sorry, you don't have permissions to use this!");
  
    }
    }
   }
  


}) 
client.login(credentials.DiscordKey.token);