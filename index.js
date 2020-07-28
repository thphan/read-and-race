var travelDistance=Math.floor($("#road").width()/10);
var alphabet="abcdefghijklmnopqrstuvwxyz".split('');
var randomLetter="";
var level=0;

//create road vertical lines
for (i = 0; i < 10; i++) {
  element=document.createElement("div");
  if ( i===0 ){
    element.classList.add("start-line");}
  else if (i===9){
    element.classList.add("finish-line");}
  else {
    element.classList.add("vl");
    var left=10+i*10;
    element.style.left=left+"%";
  }
  document.getElementById('road').appendChild(element);
}

//create text box on grass
for (i = 0; i < 8; i++) {
  element=document.createElement("p");
  element.classList.add("pronounced-letter");
  element.classList.add("pronounced-letter"+(i+1));
  var left=13.5+i*10;
  element.style.left=left+"%";
  document.getElementById('grass').appendChild(element);
}


// keyboard control
$(document).keyup(function(event){
  switch(event.which){
    case 13:
      updateRandomLetter();
      break;
    case 37:
      updateWrongAnswer();
      break;
    case 39:
      updateRightAnswer();
      break;
    case 82:
      resetGame();
      break;
    default:
      break;
  }
});

$(".speaker-button").click(function(e){
  animateFlash(".speaker");
  var letter=$(".random-letter").text();
  if (letter!=="❓" && letter!==""){
    readOutLoud(letter);
  }
  else{
    readOutLoud("Please click Enter for a letter");
  }
});


function updateRandomLetter(){
  $(".random-letter").css("background-color","#CBF1F5");
  animatePress(".random-letter");
  randomLetter=getRandomLetter();
  displayLetter(".random-letter");
  $("#main-title").text("🤔 Please pronounce the letter!");
}

function updateWrongAnswer(){
  if (level>0){
    $(".pronouned-letter"+level).text("");
    level--;
    moveBackward();
  }
  $(".random-letter").css("background-color","#c81912");
  animateFlash(".random-letter");
  playAudio("wrong.mp3");
  $("#main-title").text("😞 Oh no ! Wrong answer! Please retry!");
}

function updateRightAnswer(){
  if (level<9){
    level++;
    moveForward();
    animatePress(".pronounced-letter"+level);
    displayLetter(".pronounced-letter"+level);
    $(".random-letter").css("background-color","#79d70f");
    animateFlash(".random-letter");
    playAudio("right.mp3");
    $("#main-title").text("😃 Yay ! It's correct!");
  }
  if (level===9){
    $("#main-title").text("🥳 Congrats ! You Win!");
  }
}

function resetGame(){
  level=0;
  randomLetter="";
  $(".random-letter").css("background-color","#CBF1F5");
  $(".car").css("left","10px");
  $("#main-title").text("Press ⏎ to continue ...");
  $(".pronounced-letter").text("");
  $(".random-letter").text("❓");
}

function readOutLoud(letter) {
  var synth = window.speechSynthesis;
  var msg=new SpeechSynthesisUtterance(letter);
  setTimeout(function(){
    var voices=synth.getVoices();
    msg.voice = voices[0];
    msg.pitch = 1;
    msg.rate = 1;
    synth.speak(msg);
  },10);


  /*
  var speech = new SpeechSynthesisUtterance(letter);
  // Set the text and voice attributes.
  speech.voice = speechSynthesis.getVoices().filter(function(voice) {
    return voice.name == 'Alice'; })[0];
  window.speechSynthesis.speak(speech);
  */
}

function moveForward(){
  var currentPosition=$(".car").position().left;
  $(".car").animate({left: currentPosition+travelDistance+"px"},2000);
}

function moveBackward(){
  var currentPosition=$(".car").position().left;
  $(".car").animate({left: currentPosition-travelDistance+"px"},2000);
}

function animatePress(buttonClass){
  $(buttonClass).addClass("pressed");
  setTimeout(function(){
    $(buttonClass).removeClass("pressed");
  },100);
}

function getRandomLetter(){
  randomIndex=Math.floor(Math.random()*26);
  return alphabet[randomIndex];
}

function displayLetter(buttonClass){
  $(buttonClass).text(randomLetter);
}

function animateFlash(buttonClass){
  $(buttonClass).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
}

function playAudio(name){
  var audio= new Audio ("sounds/"+name);
  audio.play();
}
