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
            //if msg doesnt have a url then this object will not exist and therefore return an error
            const image = msg.attachments.array()[0].url; //json object
            console.log(image)
            
            //parameters for the general classification 
            const params_gen = {
                url: msg.attachments.array()[0].url,
                classifier_ids: "default",
            };
           
            //paramters for the food classification
           const params_food = {
                url: msg.attachments.array()[0].url,
               classifier_ids: "food"
           } 

           //parameters for the person classification
           const params_person = {
            url: msg.attachments.array()[0].url,
            classifier_ids: "person" 
           }

           //This is the json object of the classified image getting returned in the end
           const classify_object;

           //wraps the general image classification within a promise
           function gen_classify(){
                return new Promise(
                    (res, rej) => {
                        ir.classify(params_gen , (err, res) => {   
                            if(err){
                                console.log(err)
                            }
                            else{
                                classify_object = res.images[0].classifiers[0].classes;
                            }
                        })
                    }
                );
           }
           
           //Wraps the food classify function within a promise
           function food_classify(){
               return new Promise(
                   (res, rej) => {
                       //calls the watson api and classify it using the food parameters
                        ir.classify(params_food, 
                            (err, res) => {
                                if(err){
                                    console.log(err)
                                }else {
                                    classify_object = res.images[0].classifiers[0].classes;
                                }
                            });
                   }
                );
           };

           //wraps the person classify function within a promise
           function person_classify(){
               return new Promise(
                   (res , rej) => {
                       //Calls the watson api and classify image using the person paramter
                       ir.classify(params_person, 
                            (err, res) => {
                                if(err){
                                    console.log(err)
                                }
                                else{
                                    classify_object = res.images[0].classifiers[0].classes;
                                }
                            });
                   }
               );
           }

        
           //insert conditional promises here
           gen_classify().then()

            //classifies the url with the default classifier
            // ir.classify(params_gen, (err, res) => {
            //     if(err){
            //         console.log(err)
            //     }else{
            //         //print out the image object
            //         let classArr = res.images[0].classifiers[0].classes //This is an array of objects, of classes.
            //         for(items of classArr){
            //             if(items.class == 'food'){
            //                 //If the item is a food then run second image classifier
            //                 ir.classify(params_food, (err, res) => {
            //                     if(err){
            //                         console.log(err)
            //                     }
            //                     else{
            //                         console.log("It is Food!")
            //                         image_food = res.images[0].classifiers[0].classes
            //                         return(image_food) //FIXME: Return this as an object
            //                     }
            //                 });
            //             }
            //             else if(items.class == 'person'){
            //                 ir.classify(params_person , (err, res) =>{
            //                     if(err){
            //                         console.log(err)
            //                     }
            //                     else{
            //                         console.log("It is a person!")
            //                         let image_person = res.images[0].classifiers[0].classes;
            //                         console.log(image_person)
            //                         return image_person; //returns the object
            //                     }
            //                 })
            //             }
            //         }
            //         console.log("IT is a general Image");
            //         return classArr; //Returns the object of classes if it is a general image
            //     }
            // });
        }
        catch (TypeError) {
            //returns false if the top code fails which means it is a string
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