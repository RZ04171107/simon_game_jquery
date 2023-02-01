const buttonColours = ['red', 'blue', 'green', 'yellow'];
const gamePattern = [];
const userClickedPattern = [];
const flashTime = 400;
var gameStarted = false;
var level = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

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
});
