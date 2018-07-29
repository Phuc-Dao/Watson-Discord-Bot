var credentials = require('./credentials');
var watson = require('watson-developer-cloud');

var image_url = 'https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547'

//object containing credentials such as api key and tokens
var credential = {
    url: credentials.WatsonKey.url,
    version: credentials.WatsonKey.version,
    iam_apikey: credentials.WatsonKey.iam_apikey
}

var ir = new watson.VisualRecognitionV3(credential);

ir_params = {
    url: image_url,
    classifier_ids: "default" 
}

ir_prams2 = {
    url: image_url,
    classifier_ids: "food"
}


function func1(){
    return new Promise(
        (res , rej)=>{
            console.log("hello world");
        }
    );
}

function func2(){
    return new Promise(
        (res ,rej) =>{
            console.log("hello world part 2");
        }
    );
}

//first promise
function class1(){
    return new Promise((res, rej) => {
        //runs this function first
        ir.classify(ir_params , (err, res) => {
            if(err){
                console.log(err)
            }
            else {
                console.log(res)
            }
        });
    });
}

//second promise
function class2(){
    return new Promise((res, rej) => {
        //runs this second function next
        ir.classify(ir_prams2, (err, res) => {
            if(err){
                console.log(err);
            }else{
                console.log(res);
            }
        });
    });
}




class1().then(class2());