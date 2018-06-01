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


//////////////////////////List of all the utility functions that are being used///////////////////////////////////////////////////////


client.on('ready' , () => {
    console.log("the bot has stated"); //prints this to the console when the client is ready
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
        let firstPromise = new Promise(function(resolve, reject){
            ir.classify({url: msg.attachments.array()[0].url}, function(error, response){
                if(error){
                    console.log(error)
                }else{
                    //resolve(responce.image[0].classifers)
                    //let unsortedArr = response.images[0].classifiers[0].classes;
                    let val = inArr(response.images[0].classifiers[0].classes);
                    console.log(val);
                        if(val == 1){
                        //If it is a person then it will run the face detection classifier
                            
                        }
                        else if(val == 2){
                        //if it is food then it will run the food detection classifier

                        }
                        else{
                        //if it is neither than it will print out the generic person classifier
                        let sortedArr = insertionSort(response.images[0].classifiers[0].classes);
                        botMessage = 'I think I see ' + sortedArr[sortedArr.length - 1].class;
                        console.log(botMessage); //replace this with messages that discord will send to the channel
                            
                        }
                }
            })
        })


        


    }
    else{
        var obj; 
        //runs if it is not an image //Promise the generic classify and then resolve the variable to store the arr OBJ
        msg.reply('I can only recognize images, please enter an image');
    }
});
   client.login(credentials.DiscordKey.token);


