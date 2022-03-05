const SUITS = ["♥", "♦", "♣", "♠"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]


export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards
    }

    shuffle() {
        for(let i=this.cards.length-1; i>1; i--) {
            const j = Math.floor(Math.random() * i)
            const swapped = this.cards[i]
            this.cards[i] = this.cards[j]
            this.cards[j] = swapped
        }
        this.cards.sort((a, b) => Math.random()-0.5)
    }
}

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    get color() {
        if(this.suit === '♥' || this.suit === '♦')
            return 'red'
        return 'black'
    }
}

function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}