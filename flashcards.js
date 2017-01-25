
var inquirer = require("inquirer");
var fs = require("fs");

// constructor function used to create basic flashcard objects
function BasicCard(front, back) {
  this.front = front;
  this.back = back;
}

// constructor function used to create cloze flashcard objects
function ClozeCard(text, back) {
  this.text = text;
  this.cloze = cloze;
}

// ClozeCard should have a property or method that contains or returns only the cloze-deleted portion of the text.
ClozeCard.prototype.printCloze = function() {
  console.log("\nCloze: " + this.cloze);
};

// ClozeCard should have a property or method that contains or returns only the partial text.
ClozeCard.prototype.printText = function() {
  console.log("\nPartial Text: " + this.cloze);
};
// ClozeCard should have a property or method that contains or returns only the full text.
ClozeCard.prototype.printCloze = function() {
  console.log("\nFull Text: ");
};



var count = 0;

var createCards = function() {
  // if statement to prevent an infinite loop for now
  if (count < 3) {
    // runs inquirer and asks the user a series of questions whose replies are
    // stored within the variable answers inside of the .then statement
    inquirer.prompt([
      {
        name: "basicOrCloze",
        message: "Would you like to create a basic or cloze card?"
      }, {
        name: "firstArgument",
        message: "What is the front of card or partial text?"
      }, {
        name: "secondArgument",
        message: "What is the back of card or cloze text?"
      }
    ]).then(function(answers) {
      
      if (answers.basicOrCloze === "basic"){
        var newBasicCard = new BasicCard(
          answers.firstArgument,
          answers.secondArgument
          );

        var card = JSON.stringify(newBasicCard);

        fs.appendFile("basic.json", card, function(err){

        if (err){
          console.log(err)
        }

        else {
          console.log("\nCard Created!")
        }


        });

      }
      else if (answers.basicOrCloze === "cloze"){
        var newClozeCard = new ClozeCard(
          answers.firstArgument,
          answers.secondArgument
          );

        var card = JSON.stringify(newClozeCard);

        fs.appendFile("cloze.json", card, function(err){

        if (err){
          console.log(err)
        }

        else {
          console.log("\nCard Created!")
        }


        });
      }
      else{
        console.log("Incorrect input. Choose basic or cloze flashcard.");
      };    
      
      console.log("");
      // add one to count to increment our recursive loop by one
      count++;
      // run the askquestion function again so as to either end the loop or ask the questions again
      createCards();
    });
    // else statement which prints "all questions asked" to the console
    // when the code has been run three times
  }
  else {
    console.log("You've created three new cards and they've been put in a json file never to be seen again.");
  }
};

// call askquestion to run our code
createCards();
