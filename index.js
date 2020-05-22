var travelDistance=Math.floor($(".road").width()/10);
var alphabet="abcdefghijklmnopqrstuvwxyz".split('');
var randomLetter="";
var level=0;

$(document).keyup(function(event){
  switch(event.which){
    case 13:
      $(".random-letter").css("background-color","#CBF1F5");
      animatePress(".random-letter");
      randomLetter=getRandomLetter();
      displayLetter(".random-letter");
      $("#main-title").text("🤔 Please pronounce the letter!");
      break;
    case 37:
      if (level>0){
        $(".btn"+level).text("");
        level--;
        moveBackward();
      }
      $(".random-letter").css("background-color","#c81912");
      animateFlash(".random-letter");
      playAudio("wrong.mp3");
      $("#main-title").text("😞 Oh no ! Wrong answer! Please retry!");
      break;
    case 39:
      if (level<9){
        level++;
        moveForward();
        animatePress(".btn"+level);
        displayLetter(".btn"+level);
        $(".random-letter").css("background-color","#79d70f");
        animateFlash(".random-letter");
        playAudio("right.mp3");
        $("#main-title").text("😃 Yay ! It's correct!");
      }
      if (level===9){
        $("#main-title").text("🥳 Congrats ! You Win!");
      }
      break;
    case 82:
      level=0;
      randomLetter="";
      $(".random-letter").css("background-color","#CBF1F5");
      $(".car").css("left","10px");
      $("#main-title").text("Press ⏎ to continue ...");
      $(".btn").text("");
      $(".random-letter").text("❓");
      break;
    default:
      break;
  }
})

$(".speaker").click(function(e){
  animateFlash(".speaker");
  var letter=$(".random-letter").text();
  if (letter!=="❓" && letter!==""){
    readOutLoud(letter);
  }
  else{
    readOutLoud("Please click Enter for a letter");
  }
})

function readOutLoud(letter) {
  var synth = window.speechSynthesis;
  var msg=new SpeechSynthesisUtterance(letter);
  setTimeout(function(){
    var voices=synth.getVoices();
    console.log(voices);
    msg.voice = voices[48];
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
