function doSomething() {
    return new Promise((resolve, reject) => {
      console.log("It is done.");
      // Succeed half of the time.
      if (Math.random() > .5) {
        resolve("SUCCESS")
      } else {
        reject("FAILURE")
      }
    })
  }
  
  const promise = doSomething(); 
  promise.then(successCallback, failureCallback);