const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let score=-1;
let flippedCard = 0;
let noClick = false;

// Start Screen and Button
document.addEventListener('DOMContentLoaded', function startScreen(){
  let titleScreen = document.getElementById('titleScreen');
  let startButton = document.getElementById('startButton');
  let game = document.getElementById('game')
  startButton.addEventListener('click', function(){
    titleScreen.style.display = 'none';
    game.style.display = 'block';
  })
})

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  let selectColor = event.target;
  selectColor.style.backgroundColor = selectColor.classList[0]
  if(noClick) return;
  // if they dont match
  if(event.target.classList.contains("flipped")) return;
  if (!card1 || !card2){
    selectColor.classList.add("flipped");
    card1 = card1 || selectColor;
    card2 = selectColor === card1 ? null :selectColor;
  }
  // if the cards are matched
  if(card1 && card2){
    noClick = true;
    let match1 = card1.className;
    let match2 = card2.className;
    if(match1===match2){
      flippedCard += 2;
      card1.removeEventListener('click',handleCardClick);
      card2.removeEventListener('click',handleCardClick);
      card1 = null;
      card2 = null;
      noClick = false;
    }
    //switch card back over
    else{
      setTimeout(function(){
      card1.style.backgroundColor= "";  
      card2.style.backgroundColor= "";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1 = null;
      card2 = null;
      noClick = false;
    },500)

  }
  
}
}
// Reset Button
let restart = document.getElementById('restartButton');
restart.addEventListener('click',function(){
  location.reload()
})

// Score Counter
document.addEventListener('click',function(){
  score++;
  document.getElementById('scoreValue').innerText=score;
})
// when the DOM loads
createDivsForColors(shuffledColors);
