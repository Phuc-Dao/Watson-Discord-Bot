//This is the entry point for the npm packages
//Listing all the dependencies
var fs = require('fs'); 
var watson = require('watson-developer-cloud');
var credentials = require('./credentials');

var credentials = {
    url: credentials.WatsonKey.url,
    version: credentials.WatsonKey.version,
    iam_apikey: credentials.WatsonKey.iam_apikey
  }

//new object for image recognition passing the credentials
var ir = new watson.VisualRecognitionV3(credentials);

var images_file = fs.createReadStream('./images/pizza.png');
var classifier_ids = ["food"];

//Object that is passed as the first parameter, includes a path to the object and the type of classifier
var params = {
  images_file: images_file,
  classifier_ids: classifier_ids,
};

//This function classifies an image 
module.exports = {
  //These are sample export functions that dont really work /////////////////////////////////////////////////
  detectImage: function(){
  ir.classify(params, function(err, response) {
      if (err)
        console.log(err);
      else
        console.log(JSON.stringify(response, null, 2));
    });
  },

  detectPeople: function(){
  ir.detectFaces({image_file: fs.createReadStream('./images/park.jpg')} , (err, response) => {
    if(err){
        console.log(err);
    } else {
        console.log(JSON.stringify(response, null, 2).images);
    }
 }); 
},
////////////////////////////////These are sample export functions that dont really work /////////////////////////
//This is a function that generically classifies the image url. Takes the image URL as a paramter
genericClassify: function(imageURL){


},


}

//This takes the url of an image and passes it through the function
function detectPeople() { 
  ir.detectFaces({url: 'https://cdn.discordapp.com/attachments/451094577059987458/451246845256269834/trump.jpg' }  , (err, response) => {
    if(err){
        console.log(err);
    } else {
      //Parses the JSON for the gender and the score
      // console.log(response.images[0].faces[0].gender.gender);
      // console.log(response.images[0].faces[0].gender.score);
      console.log(JSON.stringify(response, null, 2));


    }
});  
}

ir.classify(params , function(error, response){
if(error){
  console.log(error)
}else{
  console.log(JSON.stringify(response, null, 2));
}
})


