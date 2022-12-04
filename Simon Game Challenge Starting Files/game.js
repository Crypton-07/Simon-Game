var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//step 1
// 1 : create a new function called nextSequence()
// 2 : Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
// 3:  At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
// 4 : Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
// 5. At the top of the game.js file, create a new empty array called gamePattern.
// 6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

// Step 2 - Show the Sequence to the User with Animations and Sounds
// 1. Use jQuery to select the button with the same id as the randomChosenColour

// 2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
// Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); //Adding Sounds to Button Clicks
  audio.play();
}

//Adding Animations to User Clicks

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Step 3 - Check Which Button is Pressed
// 1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.

// 2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.

// --> So if the Green button was clicked, userChosenColour will equal its id which is "green".

// 3. At the top of the game.js file, create a new empty array with the name userClickedPattern.

// 4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern

// At this stage, if you log the userClickedPattern you should be able to build up an array in the console by clicking on different buttons.

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Levle" + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("press any key to restart the game!");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
