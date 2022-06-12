
//not the best or fixed blackjack game but good for learning more javascript!//
let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0

let deck;

let canHit = true;

window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
let dealerCard = document.getElementById('dealer-hand')
let playerCard = document.getElementById('player-hand')

window.onload = function ()  {
    buildDeck();
    shuffleDeck();
    startGame()
}

//--------------------------------------------------------//
 function buildDeck() {
   let value = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king','ace'];
   let type = ['clubs', 'diamonds', 'hearts', 'spades'];
   deck = [];

   for (let i = 0; i < type.length; i++) {
     for (let j = 0; j < value.length; j++) {
       deck.push(value[j] + "_of_" + type[i]);
     }
   }
  //  console.log(deck);
}

function shuffleDeck() {
  for (let i =0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}
function startGame() {
  game = deck.pop();
  dealerSum += getValue(game);
  dealerAceCount += checkAce (game);
  console.log(game);
  console.log(dealerSum);
  while (dealerSum < 21 ) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "images/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-hand").append(cardImg);
  }

  for (let i =0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "images/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("player-hand").append(cardImg);
  }
document.getElementById('hit-button').addEventListener('click',hit)
document.getElementById('stand-button').addEventListener('click',handleButtonClickStand)

}
function handleButtonClickStand() {
  dealerSum = reduceAce(dealerSum , dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);

  canHit = false;
  
  let message = '';
  if (yourSum > 21) {
    message = "You Lose!"
  }
  else if (dealerSum > 21) {
    message = "You Win!" 
  }
  else if (yourSum == dealerSum) {
    message = "Tie";
  }
  else if (yourSum > dealerSum) {
    message = "You Win";
  }
  else if (yourSum < dealerSum) {
    message = "You Lose!";
  }
  document.getElementById("dealer-points").innerText = dealerSum;
  document.getElementById("player-points").innerText = yourSum;
  document.getElementById("dealer-points").innerText = message;

}

function hit() {
  if (!canHit) {
    return;
  }
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "images/" + card + ".png";
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.getElementById("player-hand").append(cardImg);

  if (reduceAce(yourSum, yourAceCount) > 21) {
    canHit = false;
  }
  }
//

function getValue(card) {
  let data = card.split("_of_");
  let value = data[0];

  if (isNaN (value)) {
    if(value == "ace") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if(card[0] == "ace") {
    return 1;
  }
  return 0;
}
function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerSum -= 1;
  }
  return playerSum;
}

const handleButtonClickDealerCard = () => {
  console.log('dealer-hand')
  getValue();
}

const handleButtonClickplayerCard = () => {
  console.log('player-hand')
  getValue();
}


//---------------------------------------------------------//

// dealButton.addEventListener('click', dealButton)
dealerCard.addEventListener('click', handleButtonClickDealerCard)
playerCard.addEventListener('click', handleButtonClickplayerCard)
});