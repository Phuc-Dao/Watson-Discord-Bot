var credentials = require('./credentials');
var watson = require('watson-developer-cloud');

var image_url = 'https://media4.s-nbcnews.com/j/MSNBC/Components/Video/201802/tdy_pop_klg_steak_180215_1920x1080.today-inline-vid-featured-desktop.jpg'

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
var class_obj;

var counter;

ir.classify(ir_params, 
    (err, res) => {
        //returns an array of objects with paramters classes and score
        item = res.images[0].classifiers[0].classes; 
        for(items of item){
            console.log(items.class)
        }
    } )



