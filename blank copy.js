//This creates objects with different members
let testArr = {
    value1: 1,
    value2: "this is a string",
    value3: "This is also a string"
}

//The brackets looks for the actual literal
var1 = testArr["value1"];
var2 = testArr["value2"];
var3 = testArr["value3"];

//This throws an error
//var3 = testArr["value1"];

//This is a test to practice using the delete operator
//This creates an object
let car = {
    make: "BMW",
    model: "M3",
    price: 50000,
    year: 2012,
    //This creates a method that is only used by the car object
    drive: function(){
        console.log("The bmw is driving");
    }

}

//The delete method deletes members of an object
delete car.model;
console.log(car.model); // This returns undef because we deleted it
car.model = "Acura";
console.log(car.model); // This returns Acura bc we set that to the new value

delete car.model;
console.log("model" in car); // in operator returns boolean if its in or not

//////////////////////////////////////////////////////////
///////////////Storing objects in arrays /////////////////////
/////////////////////////////////////////////////////////

//Storing objects into the array at different indexes
let testArr2 =[
    { newVar: "This is the first 1", newVar2: 2},
    { newVar: "This is the second one", newVar2: 2},
];

console.log(testArr2[0].newVar);
console.log(testArr2[1].newVar);

