import Deck from "./deck.js"

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const computerDeckSlot = document.querySelector('.computer-deck')
const playerDeckSlot = document.querySelector('.player-deck')
const text = document.querySelector('.text')
const CARD_VALUE_MAP = {
    "2": 2, 
    "3": 3, 
    "4": 4, 
    "5": 5, 
    "6": 6, 
    "7": 7, 
    "8": 8, 
    "9": 9, 
    "10": 10, 
    "J": 11, 
    "Q": 12, 
    "K": 13, 
    "A": 14
}

let computerDeck, playerDeck
let computerFlipped=false, playerFlipped=false
let revealedCards = []
let winner //retains the winner of a round

startGame()
function startGame() {
    cleanBeforeRound()
    text.innerText = 'Click on a deck to reveal a card'

    // split deck to players
    const deck = new Deck()
    deck.shuffle()
    const mid = deck.cards.length/2
    computerDeck = deck.cards.slice(0, mid)
    playerDeck = deck.cards.slice(mid)
    
    updateDeckCount()
}

function cleanBeforeRound() {
    // Remove the listener of clicking anywhere for the new round
    document.removeEventListener('click', cleanBeforeRound, true)

    computerFlipped = false
    playerFlipped = false

    const computerCard = computerCardSlot.querySelector('.card')
    const playerCard = playerCardSlot.querySelector('.card')
    computerCard.style.display = 'none'
    playerCard.style.display = 'none'
    text.innerText = ''

    // Pushes cards to winner deck
    if(winner == "computer") {
        computerDeck.push(revealedCards.pop())
        computerDeck.push(revealedCards.pop())
        updateDeckCount()
    }
    else if(winner == "player") {
        playerDeck.push(revealedCards.shift())
        playerDeck.push(revealedCards.shift())
        updateDeckCount()
    } 

    computerDeckSlot.addEventListener('click', computerDeckSlotListener)
    playerDeckSlot.addEventListener('click', playerDeckSlotListener)
}

function updateDeckCount() {
    computerDeckSlot.innerText = computerDeck.length
    playerDeckSlot.innerText = playerDeck.length
}

function flipCard(cardSlot, deck) {
    text.innerText = '' //disapears text that suggests to click
    const card = deck.shift()
    revealedCards.push(card)

    cardSlot.querySelector('.card').innerText = card.suit
    cardSlot.querySelector('.card').style.color = card.color
    cardSlot.querySelector('.card').setAttribute('value', card.value)
    cardSlot.querySelector('.card').setAttribute('suit', card.suit)

    cardSlot.querySelector('.card').style.display = ''
    updateDeckCount()
}

/* Changes the games state when clicking on decks */
computerDeckSlot.addEventListener('click', computerDeckSlotListener)
playerDeckSlot.addEventListener('click', playerDeckSlotListener)
function computerDeckSlotListener() {
    // Flip a card from deck only on fulfilling conditions
    //and end game if a player has no more cards
    if(computerDeck.length == 0 && playerDeck.length != 0 
        && computerCardSlot.querySelector('.card').style.display == "none") {
        console.log("Player deck is empty!")
        text.innerText = "Player wins the game!"
        
        //remove event listeners on deck clicking
        computerDeckSlot.removeEventListener('click', computerDeckSlotListener)
        playerDeckSlot.removeEventListener('click', playerDeckSlotListener)
    } 
    else if(! computerFlipped) {
        flipCard(computerCardSlot, computerDeck)
        computerFlipped = true
    }
    else roundWinner()
}
function playerDeckSlotListener() {
    // flip a card from deck only on fulfilling conditions
    if(playerDeck.length == 0 && computerDeck.length != 0 
        && playerCardSlot.querySelector('.card').style.display == "none") {
        console.log("Computer deck is empty!")
        text.innerText = "Computer wins the game!"

        //remove event listeners on deck clicking
        computerDeckSlot.removeEventListener('click', computerDeckSlotListener)
        playerDeckSlot.removeEventListener('click', playerDeckSlotListener)
    } 
    else if(! playerFlipped) {
        flipCard(playerCardSlot, playerDeck)
        playerFlipped = true
    }
    else roundWinner()
}

/* Determines the winner of round when clicking on one of revealed cards */
computerCardSlot.addEventListener('click', roundWinner)
playerCardSlot.addEventListener('click', roundWinner)
/* When both cards are revealed a function will listen for 
setting round winner when clicking on one of revealed cards  */
function roundWinner() {
    if(!computerFlipped || !playerFlipped) return;

    const computerCard = computerCardSlot.querySelector('.card').getAttribute('value')
    const playerCard = playerCardSlot.querySelector('.card').getAttribute('value')

    if(CARD_VALUE_MAP[playerCard] > CARD_VALUE_MAP[computerCard]) {
        text.innerText = "Player wins round"
        winner = "player"
    }
    else if(CARD_VALUE_MAP[playerCard] < CARD_VALUE_MAP[computerCard]) {
        text.innerText = "Computer wins round"
        winner = "computer"
    }
    else {
        text.innerText = "Draw"
        winner = "draw"
    }

    // After deciding winner, add listener to click anywhere for starting a new round,
    //with capture to not trigger the listener imediately in this function
    document.addEventListener('click', cleanBeforeRound, true);
    // remove listeners for deck slot until after starts new round
    computerDeckSlot.removeEventListener('click', computerDeckSlotListener)
    playerDeckSlot.removeEventListener('click', playerDeckSlotListener)
}