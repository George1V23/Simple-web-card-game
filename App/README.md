# Simple web card game

![Game](/App/img/game.png)

Card games may appear simple on the surface, but there is actually a lot of planning and problem solving that goes into creating a card game. I made a simple version of War card game by creating basic elements in Html, the deck and cards interface in CSS and the game logic in JavaScript.

## Gameplay

The deck is divided evenly, with each player receiving 26 cards, dealt one at a time, face down. Anyone may deal first. Each player has their stack of cards face down in his side.

Each player turns up a single card and the player with the higher card wins the round and takes both cards. Those two cards are introduced at the bottom of the winning player stack.

If the cards are the same rank, it is a draw and those two cards are eliminated from the game.

## Implementation

The main JavaScript file is ['main.js'](main.js). Here I implemented functions for game logic.

In file ['deck.js'](deck.js) I created class 'Card' for representing a card that has attributes suit and value, and class 'Deck' for retaining decks cards.