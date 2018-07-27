const watson = require('watson-developer-cloud');

const credentials = require('./credentials')

//object containing credentials such as api key and tokens
const credential = {
    url: credentials.WatsonKey.url,
    version: credentials.WatsonKey.version,
    iam_apikey: credentials.WatsonKey.iam_apikey
}

const ir = new watson.VisualRecognitionV3(credential);

module.exports = {
    //Function that checks if it is an image and returns the image. If it is not an image then it returns false
    isImage : (msg) => {
        try {
            const image = msg.attachments.array()[0].url; //json object
            console.log(image)
            //parameters for the image recognition bot. Takes the URL from the discord msg ovject
            const params = {
                url: msg.attachments.array()[0].url,
                classifier_ids: "default",
            }
            
            //classifies the url with the default classifier
            ir.classify(params, (err, res) => {
                if(err){
                    console.log(err)
                }else{
                    //print out the image object
                    let classArr = res.images[0].classifiers[0].classes //This is an array of objects, of classes.
                    for(items of classArr){
                        if(items.class == 'food'){
                            console.log("The item is 1")
                            return 1;
                        }
                        else if(items.class == 'person'){
                            console.log("The item is 2")
                            return 2;
                        }
                    }
                    return classArr; //Returns the object of classes if it is a general image
                }
            });
        }
        catch (TypeError) {
            return false;
        }
    },

    //Function that checks if the classified image is food, person, or general image. If it is food then return 1, if it is 
    //a person then return 2, if it is general then return 3. Is image function uses this info to determine what to do. Takes array of object of classes as  as a 
    //parameter
    isSpecific: (objArr) => {
        for(items of objArr){
            if(items.class == "food"){
                return 1;
            }
            else if (items.class == "person"){
                return 2;
            }
            else{
                return 0;
            }
        }
    }
}