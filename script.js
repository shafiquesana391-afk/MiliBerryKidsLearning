// =====================================
// MiliBerry Kids Learning
// script.js (Part 1A)
// Login • Avatar • Music • Rewards
// =====================================

// Avatar
let selectedAvatar = "🐻";

function selectAvatar(avatar){

selectedAvatar = avatar;

let box = document.getElementById("selectedAvatar");

if(box){
box.innerHTML = avatar;
}

}

// Login
function startLearning(){

let name = document.getElementById("name");

if(!name || name.value.trim()==""){

alert("Please enter your name 😊");

return;

}

localStorage.setItem("childName",name.value);
localStorage.setItem("avatar",selectedAvatar);

if(localStorage.getItem("stars")==null){
localStorage.setItem("stars",0);
}

if(localStorage.getItem("coins")==null){
localStorage.setItem("coins",0);
}

if(localStorage.getItem("badges")==null){
localStorage.setItem("badges",0);
}

window.location.href="home.html";

}

// Background Music

function playMusic(){

let music=document.getElementById("bgMusic");

if(music){

music.volume=0.5;

music.play().catch(function(){});

}

}

// Voice Helper

function speakText(text){

window.speechSynthesis.cancel();

let speech=new SpeechSynthesisUtterance(text);

speech.lang="en-US";
speech.rate=0.8;
speech.pitch=1;

speechSynthesis.speak(speech);

}

// Reward System

function addReward(){

let stars=Number(localStorage.getItem("stars"))||0;
let coins=Number(localStorage.getItem("coins"))||0;
let badges=Number(localStorage.getItem("badges"))||0;

stars+=5;
coins+=10;

if(stars>=50){

badges++;
stars=0;

speakText("Congratulations! You earned a badge.");

}

localStorage.setItem("stars",stars);
localStorage.setItem("coins",coins);
localStorage.setItem("badges",badges);

updateRewardDisplay();

}

// Update Reward Display

function updateRewardDisplay(){

let star=document.getElementById("totalStars");
let coin=document.getElementById("totalCoins");
let badge=document.getElementById("totalBadges");

if(star){

star.innerHTML=localStorage.getItem("stars")||0;

}

if(coin){

coin.innerHTML=localStorage.getItem("coins")||0;

}

if(badge){

badge.innerHTML=localStorage.getItem("badges")||0;

}

}

// Welcome Voice

function welcomeVoice(){

let name=localStorage.getItem("childName");

if(name){

speakText("Welcome " + name);

}

}

// Reset Progress

function resetProgress(){

if(confirm("Reset all progress?")){

localStorage.setItem("stars",0);
localStorage.setItem("coins",0);
localStorage.setItem("badges",0);

updateRewardDisplay();

alert("Progress Reset Successfully");

}

}
// =====================================
// Part 1B - ABC Learning & Numbers
// =====================================

// ---------- ABC Data ----------

const alphabet = [

["A","🍎","Apple"],
["B","⚽","Ball"],
["C","🐱","Cat"],
["D","🐶","Dog"],
["E","🐘","Elephant"],
["F","🐟","Fish"],
["G","🍇","Grapes"],
["H","🏠","House"],
["I","🍦","Ice Cream"],
["J","🧃","Juice"],
["K","🔑","Key"],
["L","🦁","Lion"],
["M","🌙","Moon"],
["N","🪺","Nest"],
["O","🍊","Orange"],
["P","🐼","Panda"],
["Q","👑","Queen"],
["R","🌈","Rainbow"],
["S","⭐","Star"],
["T","🐯","Tiger"],
["U","☂️","Umbrella"],
["V","🚐","Van"],
["W","🍉","Watermelon"],
["X","🎄","Xmas Tree"],
["Y","🛥️","Yacht"],
["Z","🦓","Zebra"]

];

let currentLetter = 0;

// Show Letter

function showLetter(){

let letter=document.getElementById("letter");
let emoji=document.getElementById("emoji");
let word=document.getElementById("word");

if(letter) letter.innerHTML=alphabet[currentLetter][0];
if(emoji) emoji.innerHTML=alphabet[currentLetter][1];
if(word) word.innerHTML=alphabet[currentLetter][2];

}

// Speak Letter

function speak(){

let text=alphabet[currentLetter][0]+" for "+alphabet[currentLetter][2];

speakText(text);

}

// Next Letter

function next(){

if(currentLetter<alphabet.length-1){

currentLetter++;

showLetter();

}

}

// Previous Letter

function previous(){

if(currentLetter>0){

currentLetter--;

showLetter();

}

}

// ---------- Numbers ----------

const numbers=[];

for(let i=1;i<=50;i++){

numbers.push(i);

}

let currentNumber=0;

// Show Number

function showNumber(){

let box=document.getElementById("number");

if(box){

box.innerHTML=numbers[currentNumber];

}

}

// Speak Number

function speakNumber(){

speakText(numbers[currentNumber].toString());

}

// Next Number

function nextNumber(){

if(currentNumber<numbers.length-1){

currentNumber++;

showNumber();

}

}

// Previous Number

function previousNumber(){

if(currentNumber>0){

currentNumber--;

showNumber();

}

}

// Auto Load

document.addEventListener("DOMContentLoaded",function(){

if(document.getElementById("letter")){

showLetter();

}

if(document.getElementById("number")){

showNumber();

}

updateRewardDisplay();

});
// =====================================
// Part 2A - Quiz & Match Game
// =====================================

// Quiz Score
let quizScore = 0;

// Quiz

function checkAnswer(answer){

let result=document.getElementById("result");

if(answer=="Apple"){

quizScore++;

if(result){
result.innerHTML="🎉 Correct Answer! ⭐";
}

addReward();

speakText("Excellent!");

let score=document.getElementById("quizScore");

if(score){
score.innerHTML=quizScore;
}

}else{

if(result){
result.innerHTML="❌ Try Again";
}

speakText("Try Again");

}

}

// Reset Quiz

function resetQuiz(){

quizScore=0;

let score=document.getElementById("quizScore");

if(score){
score.innerHTML="0";
}

let result=document.getElementById("result");

if(result){
result.innerHTML="";
}

}

// =====================================
// Match Game
// =====================================

let matchScore=0;

function checkGame(answer){

let result=document.getElementById("gameResult");

if(answer=="Apple"){

matchScore++;

if(result){
result.innerHTML="🎉 Great Job!";
}

addReward();

speakText("Great Job!");

let score=document.getElementById("matchScore");

if(score){
score.innerHTML=matchScore;
}

}else{

if(result){
result.innerHTML="❌ Try Again";
}

speakText("Try Again");

}

}

// Reset Match

function resetMatch(){

matchScore=0;

let score=document.getElementById("matchScore");

if(score){
score.innerHTML="0";
}

let result=document.getElementById("gameResult");

if(result){
result.innerHTML="";
}

}
// =====================================
// Part 2B - Memory, Balloon & Drag Games
// =====================================

// ----------------------
// Memory Game - Fruits
// ----------------------

function memoryGame(item){

let result=document.getElementById("memoryResult");

if(item=="🍎"){

if(result){
result.innerHTML="🎉 Excellent! You Found Apple";
}

addReward();
speakText("Excellent! You found Apple.");

}else{

if(result){
result.innerHTML="😊 Try Again";
}

speakText("Try Again");

}

}

// ----------------------
// Memory Game - Animals
// ----------------------

function animalGame(item){

let result=document.getElementById("animalResult");

if(item=="🐶"){

if(result){
result.innerHTML="🎉 Excellent! You Found Dog";
}

addReward();
speakText("Excellent! You found Dog.");

}else{

if(result){
result.innerHTML="😊 Try Again";
}

speakText("Try Again");

}

}

// ----------------------
// Memory Game - Colors
// ----------------------

function colorGame(color){

let result=document.getElementById("colorResult");

if(color=="red"){

if(result){
result.innerHTML="🎉 Excellent! You Found Red";
}

addReward();
speakText("Excellent!");

}else{

if(result){
result.innerHTML="😊 Try Again";
}

speakText("Try Again");

}

}

// ----------------------
// Memory Game - ABC
// ----------------------

function abcGame(letter){

let result=document.getElementById("abcResult");

if(letter=="A"){

if(result){
result.innerHTML="🎉 Excellent!";
}

addReward();
speakText("Excellent!");

}else{

if(result){
result.innerHTML="😊 Try Again";
}

speakText("Try Again");

}

}

// ----------------------
// Memory Game - Numbers
// ----------------------

function numberGame(number){

let result=document.getElementById("numberResult");

if(number==5){

if(result){
result.innerHTML="🎉 Excellent!";
}

addReward();
speakText("Excellent!");

}else{

if(result){
result.innerHTML="😊 Try Again";
}

speakText("Try Again");

}

}

// ----------------------
// Balloon Game
// ----------------------

let balloonScore=0;

function popBalloon(balloon){

balloon.innerHTML="💥";
balloon.style.pointerEvents="none";

balloonScore++;

let score=document.getElementById("score");

if(score){
score.innerHTML="⭐ Score: "+balloonScore;
}

speakText("Pop");

if(balloonScore>=5){

addReward();

setTimeout(function(){

alert("🎉 Congratulations!");

speakText("Congratulations! You Win!");

},500);

}

}

// ----------------------
// Drag & Drop
// ----------------------

function allowDrop(event){
event.preventDefault();
}

function drag(event){
event.dataTransfer.setData("text",event.target.id);
}

// Apple

function dropApple(event){

event.preventDefault();

let data=event.dataTransfer.getData("text");

if(data=="apple"){

event.target.innerHTML="🍎";

let result=document.getElementById("result");

if(result){
result.innerHTML="🎉 Excellent!";
}

addReward();

speakText("Excellent!");

}

}

// Dog

function dropDog(event){

event.preventDefault();

let data=event.dataTransfer.getData("text");

if(data=="dog"){

event.target.innerHTML="🐶";

let result=document.getElementById("dogResult");

if(result){
result.innerHTML="🎉 Excellent!";
}

addReward();

speakText("Excellent!");

}

}

// Red

function dropRed(event){

event.preventDefault();

let data=event.dataTransfer.getData("text");

if(data=="red"){

event.target.innerHTML="❤️";

let result=document.getElementById("redResult");

if(result){
result.innerHTML="🎉 Excellent!";
}

addReward();

speakText("Excellent!");

}

}

// Number 5

function dropFive(event){

event.preventDefault();

let data=event.dataTransfer.getData("text");

if(data=="five"){

event.target.innerHTML="5️⃣";

let result=document.getElementById("fiveResult");

if(result){
result.innerHTML="🎉 Excellent!";
}

addReward();

speakText("Excellent!");

}

}

// Banana

function dropBanana(event){

event.preventDefault();

let data=event.dataTransfer.getData("text");

if(data=="banana"){

event.target.innerHTML="🍌";

let result=document.getElementById("bananaResult");

if(result){
result.innerHTML="🎉 Excellent!";
}

addReward();

speakText("Excellent!");

}

}
// ===========================
// Vegetables
// ===========================

const vegetables = [

["🥕","Carrot"],
["🥔","Potato"],
["🍅","Tomato"],
["🥒","Cucumber"],
["🌽","Corn"],
["🥬","Cabbage"],
["🥦","Broccoli"],
["🧅","Onion"],
["🧄","Garlic"],
["🌶️","Chili"]

];

let currentVegetable = 0;

function showVegetable(){

document.getElementById("vegetableEmoji").innerHTML =
vegetables[currentVegetable][0];

document.getElementById("vegetableName").innerHTML =
vegetables[currentVegetable][1];

}

function speakVegetable(){

let text = vegetables[currentVegetable][1];

speakText(text);

}

function nextVegetable(){

if(currentVegetable < vegetables.length-1){

currentVegetable++;

showVegetable();

}

}

function previousVegetable(){

if(currentVegetable > 0){

currentVegetable--;

showVegetable();

}

}

document.addEventListener("DOMContentLoaded",function(){

if(document.getElementById("vegetableEmoji")){

showVegetable();

}

});
// ===========================
// Fruits
// ===========================

const fruits = [

["🍎","Apple"],
["🍌","Banana"],
["🍇","Grapes"],
["🍊","Orange"],
["🥭","Mango"],
["🍍","Pineapple"],
["🍉","Watermelon"],
["🍓","Strawberry"],
["🥝","Kiwi"],
["🍒","Cherry"]

];

let currentFruit = 0;

function showFruit(){

document.getElementById("fruitEmoji").innerHTML =
fruits[currentFruit][0];

document.getElementById("fruitName").innerHTML =
fruits[currentFruit][1];

}

function speakFruit(){

let text = fruits[currentFruit][1];

speakText(text);

}

function nextFruit(){

if(currentFruit < fruits.length-1){

currentFruit++;

showFruit();

}

}

function previousFruit(){

if(currentFruit > 0){

currentFruit--;

showFruit();

}

}

document.addEventListener("DOMContentLoaded",function(){

if(document.getElementById("fruitEmoji")){

showFruit();

}

});
// ===========================
// Colors
// ===========================

const colors = [

["red","Red"],
["blue","Blue"],
["green","Green"],
["yellow","Yellow"],
["orange","Orange"],
["purple","Purple"],
["pink","Pink"],
["brown","Brown"],
["black","Black"],
["white","White"],
["gray","Gray"],
["cyan","Cyan"]

];

let currentColor = 0;

function showColor(){

let box = document.getElementById("colorBox");
let name = document.getElementById("colorName");

if(box){
box.style.background = colors[currentColor][0];
}

if(name){
name.innerHTML = colors[currentColor][1];
}

}

function speakColor(){

speakText(colors[currentColor][1]);

}

function nextColor(){

if(currentColor < colors.length-1){

currentColor++;

showColor();

}

}

function previousColor(){

if(currentColor > 0){

currentColor--;

showColor();

}

}

document.addEventListener("DOMContentLoaded",function(){

if(document.getElementById("colorBox")){

showColor();

}

});
// =====================================
// English Words
// =====================================

const englishWords = [

["👋","Hello"],
["🌞","Good Morning"],
["🌙","Good Night"],
["🙏","Please"],
["😊","Thank You"],
["👋","Good Bye"],
["👍","Yes"],
["👎","No"],
["❤️","Love"],
["😁","Happy"],
["😢","Sad"],
["💧","Water"]

];

let currentWord = 0;

// Show Current Word
function showEnglishWord(){

let emoji = document.getElementById("wordEmoji");
let word = document.getElementById("englishWord");

if(emoji){
emoji.innerHTML = englishWords[currentWord][0];
}

if(word){
word.innerHTML = englishWords[currentWord][1];
}

}

// Speak Word
function speakEnglishWord(){

speakText(englishWords[currentWord][1]);

}

// Next
function nextWord(){

if(currentWord < englishWords.length - 1){

currentWord++;

showEnglishWord();

}

}

// Previous
function previousWord(){

if(currentWord > 0){

currentWord--;

showEnglishWord();

}

}

// Auto Load
document.addEventListener("DOMContentLoaded",function(){

if(document.getElementById("englishWord")){

showEnglishWord();

}

});
// ===========================
// Animals
// ===========================

const animals = [

["🦁","Lion"],
["🐯","Tiger"],
["🐘","Elephant"],
["🐵","Monkey"],
["🐶","Dog"],
["🐱","Cat"],
["🐰","Rabbit"],
["🐻","Bear"],
["🦓","Zebra"],
["🦒","Giraffe"],
["🦊","Fox"],
["🐼","Panda"],
["🐮","Cow"],
["🐴","Horse"],
["🐷","Pig"],
["🐑","Sheep"],
["🐐","Goat"],
["🦌","Deer"],
["🐪","Camel"],
["🦛","Hippo"]

];

let currentAnimal = 0;

function showAnimal(){

document.getElementById("animalEmoji").innerHTML =
animals[currentAnimal][0];

document.getElementById("animalName").innerHTML =
animals[currentAnimal][1];

}

function speakAnimal(){

speakText(animals[currentAnimal][1]);

}

function nextAnimal(){

if(currentAnimal < animals.length-1){

currentAnimal++;

showAnimal();

}

}

function previousAnimal(){

if(currentAnimal > 0){

currentAnimal--;

showAnimal();

}

}

document.addEventListener("DOMContentLoaded",function(){

if(document.getElementById("animalEmoji")){

showAnimal();

}

});
// ===========================
// Birds
// ===========================

const birds = [

["🦜","Parrot"],
["🦅","Eagle"],
["🦉","Owl"],
["🕊️","Dove"],
["🐦","Sparrow"],
["🐧","Penguin"],
["🦆","Duck"],
["🦢","Swan"],
["🦩","Flamingo"],
["🦚","Peacock"],
["🐓","Rooster"],
["🐔","Hen"],
["🐥","Chick"],
["🪿","Goose"],
["🐦","Crow"],
["🐦","Pigeon"],
["🐦","Kingfisher"],
["🐦","Woodpecker"],
["🐦","Robin"],
["🐦","Canary"]

];

let currentBird = 0;

function showBird(){

document.getElementById("birdEmoji").innerHTML =
birds[currentBird][0];

document.getElementById("birdName").innerHTML =
birds[currentBird][1];

}

function speakBird(){

speakText(birds[currentBird][1]);

}

function nextBird(){

if(currentBird < birds.length-1){

currentBird++;

showBird();

}

}

function previousBird(){

if(currentBird > 0){

currentBird--;

showBird();

}

}

document.addEventListener("DOMContentLoaded",function(){

if(document.getElementById("birdEmoji")){

showBird();

}

});
// ===========================
// Vehicles
// ===========================

const vehicles = [

["🚗","Car"],
["🚌","Bus"],
["🚚","Truck"],
["🏍️","Motorcycle"],
["🚲","Bicycle"],
["🚕","Taxi"],
["🚓","Police Car"],
["🚑","Ambulance"],
["🚒","Fire Truck"],
["🚜","Tractor"],
["🚂","Train"],
["🚆","Metro Train"],
["✈️","Airplane"],
["🚁","Helicopter"],
["⛵","Boat"],
["🚢","Ship"],
["🛶","Canoe"],
["🚀","Rocket"],
["🛺","Auto Rickshaw"],
["🛻","Pickup Truck"]

];

let currentVehicle = 0;

function showVehicle(){

document.getElementById("vehicleEmoji").innerHTML =
vehicles[currentVehicle][0];

document.getElementById("vehicleName").innerHTML =
vehicles[currentVehicle][1];

}

function speakVehicle(){

speakText(vehicles[currentVehicle][1]);

}

function nextVehicle(){

if(currentVehicle < vehicles.length-1){

currentVehicle++;

showVehicle();

}

}

function previousVehicle(){

if(currentVehicle > 0){

currentVehicle--;

showVehicle();

}

}

document.addEventListener("DOMContentLoaded",function(){

if(document.getElementById("vehicleEmoji")){

showVehicle();

}

});
// ===========================
// Shapes
// ===========================

const shapes = [

["⭕","Circle"],
["🔺","Triangle"],
["🟦","Square"],
["▭","Rectangle"],
["⭐","Star"],
["❤️","Heart"],
["💎","Diamond"],
["🥚","Oval"],
["⬟","Pentagon"],
["⬡","Hexagon"],
["🛑","Octagon"],
["🌙","Crescent"],
["➖","Line"],
["🔷","Rhombus"],
["🔶","Kite"]

];

let currentShape = 0;

function showShape(){

document.getElementById("shapeEmoji").innerHTML =
shapes[currentShape][0];

document.getElementById("shapeName").innerHTML =
shapes[currentShape][1];

}

function speakShape(){

speakText(shapes[currentShape][1]);

}

function nextShape(){

if(currentShape < shapes.length-1){

currentShape++;

showShape();

}

}

function previousShape(){

if(currentShape > 0){

currentShape--;

showShape();

}

}

document.addEventListener("DOMContentLoaded",function(){

if(document.getElementById("shapeEmoji")){

showShape();

}

});
// ===========================
// ABC Tracing
// ===========================

const traceLetters = [
"A","B","C","D","E","F","G","H","I","J",
"K","L","M","N","O","P","Q","R","S","T",
"U","V","W","X","Y","Z"
];

let traceIndex = 0;

function showTraceLetter(){

let box=document.getElementById("traceLetter");

if(box){

box.innerHTML=traceLetters[traceIndex];

}

}

function nextTraceLetter(){

finishTracing();

if(traceIndex<traceLetters.length-1){

traceIndex++;

showTraceLetter();

clearCanvas();

}else{

alert("🏆 ABC Tracing Completed!");

speechSynthesis.speak(
new SpeechSynthesisUtterance("Congratulations! You completed ABC Tracing.")
);

}

}

function speakTraceLetter(){

speakText(traceLetters[traceIndex]);

}

let canvas=document.getElementById("canvas");

if(canvas){

let ctx=canvas.getContext("2d");

let drawing=false;

canvas.addEventListener("mousedown",start);
canvas.addEventListener("mousemove",draw);
canvas.addEventListener("mouseup",stop);

canvas.addEventListener("touchstart",start);
canvas.addEventListener("touchmove",draw);
canvas.addEventListener("touchend",stop);

function start(e){

drawing=true;

ctx.beginPath();

}

function draw(e){

if(!drawing) return;

let rect=canvas.getBoundingClientRect();

let x=(e.touches?e.touches[0].clientX:e.clientX)-rect.left;

let y=(e.touches?e.touches[0].clientY:e.clientY)-rect.top;

ctx.lineWidth=8;
ctx.lineCap="round";

ctx.lineTo(x,y);

ctx.stroke();

e.preventDefault();

}

function stop(){

drawing=false;

}

}

function clearCanvas(){

let canvas=document.getElementById("canvas");

let ctx=canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

}

document.addEventListener("DOMContentLoaded",function(){

if(document.getElementById("traceLetter")){

showTraceLetter();

}

});
// ===========================
// Tracing Reward
// ===========================

function finishTracing(){

addReward();

speechSynthesis.speak(
new SpeechSynthesisUtterance("Excellent! Great Job!")
);

alert("🎉 Excellent! +5 Stars ⭐");

}
// ===========================
// Number Tracing
// ===========================

const traceNumbers = [];

for(let i=1;i<=50;i++){

traceNumbers.push(i);

}

let numberIndex = 0;

function showTraceNumber(){

document.getElementById("traceNumber").innerHTML =
traceNumbers[numberIndex];

document.getElementById("numberProgress").value =
numberIndex+1;

document.getElementById("numberCount").innerHTML =
numberIndex+1;

}

function speakTraceNumber(){

speakText(traceNumbers[numberIndex].toString());

}

function nextTraceNumber(){

finishTracing();

if(numberIndex<traceNumbers.length-1){

numberIndex++;

showTraceNumber();

clearNumberCanvas();

}else{

alert("🏆 Number Tracing Completed!");

speechSynthesis.speak(

new SpeechSynthesisUtterance(
"Congratulations! You completed Number Tracing."
)

);

}

}
// ===========================
// Number Tracing Canvas
// ===========================

let numberCanvas = document.getElementById("numberCanvas");

if(numberCanvas){

let ctx = numberCanvas.getContext("2d");

let drawing = false;

numberCanvas.addEventListener("mousedown", startNumber);
numberCanvas.addEventListener("mousemove", drawNumber);
numberCanvas.addEventListener("mouseup", stopNumber);

numberCanvas.addEventListener("touchstart", startNumber);
numberCanvas.addEventListener("touchmove", drawNumber);
numberCanvas.addEventListener("touchend", stopNumber);

function startNumber(e){

drawing = true;

ctx.beginPath();

}

function drawNumber(e){

if(!drawing) return;

let rect = numberCanvas.getBoundingClientRect();

let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;

let y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

ctx.lineWidth = 8;
ctx.lineCap = "round";

ctx.lineTo(x,y);

ctx.stroke();

e.preventDefault();

}

function stopNumber(){

drawing = false;

}

}

function clearNumberCanvas(){

let canvas = document.getElementById("numberCanvas");

let ctx = canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

}

document.addEventListener("DOMContentLoaded",function(){

if(document.getElementById("traceNumber")){

showTraceNumber();

}

});
// ===========================
// Word Tracing
// ===========================

const traceWords=[

"Apple",
"Ball",
"Cat",
"Dog",
"Elephant",
"Fish",
"Grapes",
"House",
"Ice Cream",
"Juice",
"Key",
"Lion",
"Moon",
"Nest",
"Orange",
"Panda",
"Queen",
"Rainbow",
"Star",
"Tiger"

];

let wordIndex=0;

function showTraceWord(){

document.getElementById("traceWord").innerHTML=
traceWords[wordIndex];

document.getElementById("wordProgress").value=
wordIndex+1;

document.getElementById("wordCount").innerHTML=
wordIndex+1;

}

function speakTraceWord(){

speakText(traceWords[wordIndex]);

}

function nextTraceWord(){

finishTracing();

if(wordIndex<traceWords.length-1){

wordIndex++;

showTraceWord();

clearWordCanvas();

}else{

alert("🏆 Word Tracing Completed!");

speechSynthesis.speak(

new SpeechSynthesisUtterance(
"Congratulations! You completed Word Tracing."
)

);

}

}
let wordCanvas=document.getElementById("wordCanvas");

if(wordCanvas){

let ctx=wordCanvas.getContext("2d");

let drawing=false;

wordCanvas.addEventListener("mousedown",startWord);
wordCanvas.addEventListener("mousemove",drawWord);
wordCanvas.addEventListener("mouseup",stopWord);

wordCanvas.addEventListener("touchstart",startWord);
wordCanvas.addEventListener("touchmove",drawWord);
wordCanvas.addEventListener("touchend",stopWord);

function startWord(){

drawing=true;
ctx.beginPath();

}

function drawWord(e){

if(!drawing) return;

let rect=wordCanvas.getBoundingClientRect();

let x=(e.touches?e.touches[0].clientX:e.clientX)-rect.left;

let y=(e.touches?e.touches[0].clientY:e.clientY)-rect.top;

ctx.lineWidth=8;
ctx.lineCap="round";

ctx.lineTo(x,y);
ctx.stroke();

e.preventDefault();

}

function stopWord(){

drawing=false;

}

}

function clearWordCanvas(){

let canvas=document.getElementById("wordCanvas");

let ctx=canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

}

document.addEventListener("DOMContentLoaded",function(){

if(document.getElementById("traceWord")){

showTraceWord();

}

});
// ===========================
// Shape Tracing
// ===========================

const traceShapes=[

["⭕","Circle"],
["🔺","Triangle"],
["🟦","Square"],
["▭","Rectangle"],
["⭐","Star"],
["❤️","Heart"],
["💎","Diamond"],
["🥚","Oval"],
["⬟","Pentagon"],
["⬡","Hexagon"]

];

let shapeIndex=0;

function showTraceShape(){

document.getElementById("traceShape").innerHTML=
traceShapes[shapeIndex][0];

document.getElementById("shapeName").innerHTML=
traceShapes[shapeIndex][1];

document.getElementById("shapeProgress").value=
shapeIndex+1;

document.getElementById("shapeCount").innerHTML=
shapeIndex+1;

}

function speakTraceShape(){

speakText(traceShapes[shapeIndex][1]);

}

function nextTraceShape(){

finishTracing();

if(shapeIndex<traceShapes.length-1){

shapeIndex++;

showTraceShape();

clearShapeCanvas();

}else{

alert("🏆 Shape Tracing Completed!");

speechSynthesis.speak(

new SpeechSynthesisUtterance(
"Congratulations! You completed Shape Tracing."
)

);

}

}
let shapeCanvas=document.getElementById("shapeCanvas");

if(shapeCanvas){

let ctx=shapeCanvas.getContext("2d");

let drawing=false;

shapeCanvas.addEventListener("mousedown",startShape);
shapeCanvas.addEventListener("mousemove",drawShape);
shapeCanvas.addEventListener("mouseup",stopShape);

shapeCanvas.addEventListener("touchstart",startShape);
shapeCanvas.addEventListener("touchmove",drawShape);
shapeCanvas.addEventListener("touchend",stopShape);

function startShape(){

drawing=true;
ctx.beginPath();

}

function drawShape(e){

if(!drawing) return;

let rect=shapeCanvas.getBoundingClientRect();

let x=(e.touches?e.touches[0].clientX:e.clientX)-rect.left;

let y=(e.touches?e.touches[0].clientY:e.clientY)-rect.top;

ctx.lineWidth=8;
ctx.lineCap="round";

ctx.lineTo(x,y);

ctx.stroke();

e.preventDefault();

}

function stopShape(){

drawing=false;

}

}

function clearShapeCanvas(){

let canvas=document.getElementById("shapeCanvas");

let ctx=canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

}

document.addEventListener("DOMContentLoaded",function(){

if(document.getElementById("traceShape")){

showTraceShape();

}

});
// ===========================
// MiliBerry Rhymes
// ===========================

function openIntroSong(){
window.open("https://youtu.be/rJok3rkGYPg","_blank");
}

function openTwinkle(){
window.open("https://youtu.be/1l3BmSbTVhQ","_blank");
}

function openABCVehicles(){
window.open("https://youtu.be/ot1WeBJuaYU","_blank");
}

function openABCSong(){
window.open("https://youtube.com/shorts/HlJLu-EcRXU","_blank");
}

function openOldMacDonald(){
window.open("https://youtube.com/shorts/brl5LSSdrlY","_blank");
}

function openBabyShark(){
window.open("https://youtube.com/shorts/Bd4rAKbSQuo","_blank");
}

function openExtraRhyme(){
window.open("https://youtube.com/shorts/XBtOdR3GDPg","_blank");
}
// ============================
// Certificate
// ============================

document.addEventListener("DOMContentLoaded",function(){

if(document.getElementById("childName")){

document.getElementById("childName").innerHTML=
localStorage.getItem("childName") || "Student";

document.getElementById("stars").innerHTML=
localStorage.getItem("stars") || 0;

document.getElementById("coins").innerHTML=
localStorage.getItem("coins") || 0;

document.getElementById("badges").innerHTML=
localStorage.getItem("badges") || 0;

document.getElementById("date").innerHTML=
new Date().toLocaleDateString();

}

});

async function downloadPDF(){

const { jsPDF } = window.jspdf;

let certificate=document.getElementById("certificate");

html2canvas(certificate).then(canvas=>{

let img=canvas.toDataURL("image/png");

let pdf=new jsPDF("landscape","mm","a4");

pdf.addImage(img,"PNG",10,10,277,190);

pdf.save("MiliBerry_Certificate.pdf");

});

}
// ==========================
// Dark / Light Mode
// ==========================

function toggleTheme(){

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("theme","dark");

}else{

localStorage.setItem("theme","light");

}

}

document.addEventListener("DOMContentLoaded",function(){

let theme=localStorage.getItem("theme");

if(theme=="dark"){

document.body.classList.add("dark");

}

});
function speakWord(word){

speechSynthesis.cancel();

let speech = new SpeechSynthesisUtterance(word);

speech.lang = "en-US";

speech.rate = 0.8;

speechSynthesis.speak(speech);

}