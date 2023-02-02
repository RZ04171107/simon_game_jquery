const buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
const flashTime = 400;
var gameStarted = false;
var level = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// a function to compare 2 arrays
const equalsCheck = (a, b) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

function playSound(name) {
  const sound = new Audio('sounds/' + name + '.mp3');
  sound.play();
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');
  setTimeout(function () {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  const randomNumber = getRandomInt(4); //  0<= randomNumber <=3
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //console.log('color: ' + randomChosenColour);

  // animate a flash to the button selected
  $('#' + randomChosenColour)
    .fadeOut(flashTime)
    .fadeIn(flashTime);

  // play the sound for the button colour selected
  playSound(randomChosenColour);

  //level increase by 1 every time when nextSequence() is called
  level++;
  $('#level-title').text('Level ' + level);

  //display all numbers in the array game pattern
  console.log('colours in game pattern:');
  for (i = 0; i < gamePattern.length; i++) {
    console.log(gamePattern[i]);
  }
  console.log('-------------');
}

function checkAnswer(currentLevel) {
  console.log('current leve: ' + currentLevel);
  for (i = 0; i <= currentLevel; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      console.log('wrong');
      return false;
    }
  }
  if (currentLevel === level - 1) {
    console.log('success');

    setTimeout(function () {
      nextSequence();
    }, 1000);
    return true;
  }
}

$(document).keydown(function () {
  if (gameStarted == false) {
    nextSequence();
    gameStarted = true;
  }
});

$('.btn').click(function () {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log('colours in user clicked pattern:');
  for (i = 0; i < userClickedPattern.length; i++) {
    console.log(userClickedPattern[i]);
  }
  console.log('*****************');
  checkAnswer(userClickedPattern.length - 1);
});
