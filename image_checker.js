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
            ///3 Different parameters for the image classification function. One for general classification, one for food classification,
            //and one for people classification
            const params_gen = {
                url: msg.attachments.array()[0].url,
                classifier_ids: "default",
            };
           
           const params_food = {
                url: msg.attachments.array()[0].url,
               classifier_ids: "food"
           } 

           const params_person = {
            url: msg.attachments.array()[0].url,
            classifier_ids: "person" 
           }


            //classifies the url with the default classifier
            ir.classify(params_gen, (err, res) => {
                if(err){
                    console.log(err)
                }else{
                    //print out the image object
                    let classArr = res.images[0].classifiers[0].classes //This is an array of objects, of classes.
                    for(items of classArr){
                        if(items.class == 'food'){
                            //If the item is a food then run second image classifier
                            ir.classify(params_food, (err, res) => {
                                if(err){
                                    console.log(err)
                                }
                                else{
                                    console.log("It is Food!")
                                    image_food = res.images[0].classifiers[0].classes
                                    return(image_food) //FIXME: Return this as an object
                                }
                            });
                        }
                        else if(items.class == 'person'){
                            ir.classify(params_person , (err, res) =>{
                                if(err){
                                    console.log(err)
                                }
                                else{
                                    console.log("It is a person!")
                                    let image_person = res.images[0].classifiers[0].classes;
                                    console.log(image_person)
                                    return image_person; //returns the object
                                }
                            })
                        }
                    }
                    console.log("IT is a general Image");
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