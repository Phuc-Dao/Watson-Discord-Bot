//Testing the watson facial recognition api
var watson = require('watson-developer-cloud');
var credentials = require('./credentials');

var ir = new watson.VisualRecognitionV3({
    url: credentials.WatsonKey.url,
    version: credentials.WatsonKey.version,
    iam_apikey: credentials.WatsonKey.iam_apikey
});

//insertion sort function
function insertSort(arrObj){
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

//check if food group or people group is in the array:  
function inArr(arr){
    let bool = 0; // if 0 then it is neither person or food if 1 then it is person, if 2 then it is food

    for(item of arr){
        console.log(item.className); 
        if(item.className == 'person'){
            console.log("This is a person")
            bool = 1;
         }
         else if (item.className == 'food'){
             console.log("this is a food")
            bool = 2;
         }
         else{
             //do nothing
             console.log("This is neither a person or a food")
         }
    }
    return bool;
}

var objective; 

//Call back function that executes (main code)
function callback(error, responce){
    var arrObj = [] // array of objects containing class name and score values
    var greatestScore = 0; //object with the greatest score value
    var sortedArrObj = [];
    let obj = function(className, score ){
        this.className = className;
        this.score = score;
    }
    if(error){
        console.log(error);
    }
    else{
        //console.log(JSON.stringify(responce, null, 2));
        for(items of responce.images[0].classifiers[0].classes){ 
            //console.log('Things that I see:')
            //console.log(items.class + ' has a score of ' + items.score);
            tempObj = new obj(items.class , items.score);
            arrObj.push(tempObj); // array of different objects 
        }
        let num = inArr(arrObj);
        if(num == 1){
            //code to run if the code that was parsed is person
            ir.detectFaces()
            
        }
        else if (num == 2 ){
            // run person to parse if it is food
        }
        else {
            let sortedObj = insertSort(arrObj);

        }
    }      
}
let detectFaceParam = {
    url: 'https://cdn.discordapp.com/attachments/451094577059987458/451246845256269834/trump.jpg' 
}
//Take url as parameter 
let classifyParam = {
    url: 'https://cdn.discordapp.com/attachments/451094577059987458/451246845256269834/trump.jpg',
    classifier_ids: 'default',
    threshhold: 0.2
}
//function that returns parameter as object
function getParam(link){
    let parameter = {
        url: link,
        classifier_ids: 'default',
        threshhold: 0.2
    }
    
    return parameter; 
}
//make image classifier return a single value, then use that value for the discord.js. 
function imageClassify(link){
    ir.classify(getParam(link) , callback); //function that takes the link as a parameter and performs the callback
    let threshValue = []; // An empty array that will contain the data of the classify function and determing if the keyword people or food exists
    //Do something here with data.If they meet the parameter
    if(true){
        //run second classifier
    }
    else {
        //just print to the screen
    }
}


//ir.detectFaces(detectFaceParam , callback);

//imageClassify('https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?cs=srgb&dl=car-vehicle-luxury-112460.jpg&fm=jpg');


//console.log(varglo);

//console.log(varglo);


// ir.classify({
//     url: 'http://schwartzplumbingandheating.com/communities/7/000/001/365/787//images/3591705.png',
//     classifier_ids: 'default',
//     threshhold: 0.2

// }, function(error, responce){
//     if(error){
//         console.log(error);
//     }else{
//         return new Promise (console.log(JSON.stringify(responce, null, 2)));
//     }
// });

var testobjj;

let testingPromise = new Promise(function(resolve, reject) {
    ir.classify({
        url: 'http://schwartzplumbingandheating.com/communities/7/000/001/365/787//images/3591705.png',
        classifier_ids: 'default',
        threshhold: 0.2
    
    }, function(error, responce){
        if(error){
            console.log(error);
        }else{
            testobjj = responce
            resolve(testobjj);
        }
    });
})

testingPromise.then(function(fromResolve){
    console.log(fromResolve);
});
console.log(testobjj);