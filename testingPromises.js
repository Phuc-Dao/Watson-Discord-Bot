let firstPromise = new Promise(function(resolve, reject) {
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
});

let secondPromise = new Promise(function(resolve , reject){
  ir.classify({
      url: 'http://schwartzplumbingandheating.com/communities/7/000/001/365/787//images/3591705.png',
      classifier_ids: 'default',
      threshhold: 0.2
  
  }, function(error, responce){
      if(error){
          console.log(error);
      }else{
          testobjj = responce
          resolve(5);
      }
  }); 

})


