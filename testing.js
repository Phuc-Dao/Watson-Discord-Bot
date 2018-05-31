//Testing the watson facial recognition api
var watson = require('watson-developer-cloud');
var credentials = require('./credentials');

let ir = new watson.VisualRecognitionV3({
    url: credentials.WatsonKey.url,
    version: credentials.WatsonKey.version,
    iam_apikey: credentials.WatsonKey.iam_apikey
});

function callback(error, responce){
    if(error){
        console.log(error);
    }
    else{
        console.log(JSON.stringify(responce, null, 2));
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

function getParam(link){
    let parameter = {
        url: link,
        classifier_ids: 'default',
        threshhold: 0.2
    }
    
    return parameter; 
}

function imageClassify(link){
    getParam(link);
    ir.classify(getParam , callback); //function that takes the link as a parameter and performs the callback
    
    //Do something here with data.If they meet the parameter
    if(true){
        //run second classifier
    }
    else {
        //just print to the screen
    }


}


//ir.detectFaces(detectFaceParam , callback);
ir.classify(classifyParam , callback);