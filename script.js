// import {
//   startCredits,
//   makeDeck,
//   getRandomIndex,
//   shuffleCards,
//   newHand,
//   sum,
// } from './modules/transit.js';

// console.log(sum(2, 3));

// console.log(`a new deck`,shuffleCards(makeDeck()));

// console.log(startCredits);

// console.log(`hand`, newHand())
// score: https://www.pokernews.com/img/rules/poker-hand-rankings_d.png

// GLOBAL VARIABLES
let hand = [];
var cardNameTally = {};
var cardSuitTally = {};
let counterDuplicates = {};
let outcome = {};
let royalFlush = false;
let straightFlush = false;
let fourOfAKind = false;
let fullHouse = false;
let flush = false;
let straight = false;
let threeOfAKind = false;
let twoPair = false;
let onePair = false;
// let highCard = false; unless duel

// HELPER FUNCTIONS
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  const symbol = ['♦', '♣', '♥', '♠'];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['diamonds', 'clubs', 'hearts', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // exercise solution: Store the current suitSymbol in a variable
    const currentSuitSymbol = symbol[suitIndex];

    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    let suitColour = '';
    if (currentSuit == 'hearts' || currentSuit == 'diamonds') {
      suitColour = 'red';
    } else {
      suitColour = 'black';
    }
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }
      // exercise solution : By default, the display name is the same as card name
      let cardDisplayName = `${cardName}`;
      // If cardName is ace, jack, queen, king, set displayName to a, j , q, k
      if (cardDisplayName === 'ace') {
        cardDisplayName = 'A';
      } else if (cardDisplayName === 'jack') {
        cardDisplayName = 'J';
      } else if (cardDisplayName === 'queen') {
        cardDisplayName = 'Q';
      } else if (cardDisplayName === 'king') {
        cardDisplayName = 'K';
      }
      // Create a new card with the current name, suit, and rank
      const card = {
        // exercise solution: add suitSymbol, displayName, colour
        suitSymbol: currentSuitSymbol,
        suit: currentSuit,
        name: cardName,
        displayName: cardDisplayName,
        colour: suitColour,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const getRandomIndex = (max) => {
  return Math.floor(Math.random() * max);
};

const shuffleCards = (cardDeck) => {
  // Loop over the card deck array once for every card so every card position got shuffled once
  for (let cardIndex = 0; cardIndex < cardDeck.length; cardIndex += 1) {
    // Select a random index in the deck
    let randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    let randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    // let currentCard = cardDeck[cardIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[cardIndex] = randomCard;
    // cardDeck[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cardDeck;
};

let deck = shuffleCards(makeDeck());

const createHand = () => {
  // for (let handIndex = 0; handIndex < numCards; handIndex += 1) {
  //   hand[handIndex].push(deck.pop());
  // }
  hand.push(deck.pop());
  hand.push(deck.pop());
  hand.push(deck.pop());
  hand.push(deck.pop());
  hand.push(deck.pop());

  return hand;
};

/**
 * A function that summarizes the hand for duplicates
 * @param  hand {array} array of cards in hand
 * @return {object} which summarize the number of pairs and triples in hand
 */
const hasDuplicateNames = (hand) => {
  // Loop over hand
  for (let i = 0; i < hand.length; i += 1) {
    let cardName = hand[i].name;
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  }
  for (cardName in cardNameTally) {
    console.log(
      `There are ${cardNameTally[cardName]}: ${cardName}s in the hand`
    );
  }
  // initialise the count of pairs and triple in hand
  let counterPairs = 0;
  let counterTriples = 0;
  let counterQuadruples = 0;
  for (const key in cardNameTally) {
    if (cardNameTally[key] === 2) {
      counterPairs += 1;
      counterDuplicates['pairs'] = counterPairs;
    } else if (cardNameTally[key] === 3) {
      counterTriples += 1;
      counterDuplicates['triples'] = counterTriples;
    } else if (cardNameTally[key] === 4) {
      counterQuadruples += 1;
      counterDuplicates['quadruples'] = counterQuadruples;
    }
  }
  console.log(`There are ${counterPairs} pairs of cards name in hand`);
  console.log(`There are ${counterTriples} triples of cards name in hand`);
  console.log(`There are ${counterQuadruples} full house in hand`);
  return counterDuplicates;
};

// WINNING CONDITIONS

/**
 * A function that check hand for same suit (can be simplified)
 * @param  hand {array} array of cards in hand
 * @return {bool} true if the hand is of the same suit
 */
const hasFlush = (hand) => {
  // Loop over hand
  for (let i = 0; i < hand.length; i += 1) {
    let cardSuit = hand[i].suit;
    // If we have seen the card name before, increment its count
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardSuitTally[cardSuit] = 1;
    }
  }
  for (cardSuit in cardSuitTally) {
    console.log(
      `There are ${cardSuitTally[cardSuit]}: ${cardSuit}s in the hand`
    );
  }
  let counterFlush = 0;
  for (const key in cardSuitTally) {
    // only 1 suit exists
    if (Object.keys(cardSuitTally).length === 1) {
      counterFlush += 1;
      // console.log(`There a flush of ${cardSuitTally[key]} in hand`);
      console.log(`There a flush of ${hand[0].suit} in hand`);
      console.log(`counterFlush`, counterFlush);
      flush = true;
    } else {
      flush = false;
    }
  }
  return flush;
};

// hand.sort(function (a, b) {
//     return a.city.localeCompare(b.city) || b.price - a.price;
// });

/**
 * A function that check if every card is sequential
 * @param  hand {array} array of cards in hand
 * @return {bool} true if the cards are in sequential order
 */
const hasStraight = (hand) => {
  // sort the hand in order to compare sequence
  hand.sort((a, b) => a.rank - b.rank);
  // Loop over hand
  for (let i = 0; i < hand.length; i += 1) {
    if (hand[i + 1].rank - hand[i].rank === 1) {
      straight = true;
    } else {
      straight = false;
    }
    return straight;
  }
};

/**
 * A function that check for royal flush
 * @param  hand {array} array of cards in hand
 * @return outcome {object} which if royal flush condition meeets
 */
const hasRoyalFlush = (hand) => {
  hand.sort((a, b) => a.rank - b.rank);
  // royal flush
  if (
    hasFlush(hand) === true &&
    hand[0].name === 'ace' &&
    hand[4].name === 'king'
  ) {
    let straightCounter = 0;
    for (let i = 2; i < 5; i += 1) {
      if (hand[i].rank - hand[i - 1].rank === 1) {
        straightCounter += 1;

        if (straightCounter === 3) {
          royalFlush = true;
          outcome['royalFlush'] = 1;
        } else {
          royalFlush = false;
        }
        console.log(`royalFlush`, royalFlush);
      }
    }
  }
  return royalFlush;
};

/**
 * A function that check for straight flush
 * @param  hand {array} array of cards in hand
 * @return outcome {object} which if straight flush condition meeets
 */
const hasStraightFlush = (hand) => {
  hand.sort((a, b) => a.rank - b.rank);
  if (
    hasFlush(hand) === true &&
    hasStraight(hand) === true &&
    royalFlush(hand) === false
  ) {
    straightFlush = true;
    outcome['straightFlush'] = 1;
    console.log(`straightFlush`, straightFlush);
  } else {
    straightFlush = false;
  }
  return straightFlush;
};

/**
 * A function that check for 4 of a kind
 * @param  hand {array} array of cards in hand
 * @return outcome {object} which if straight flush condition meeets
 */
const hasFourKind = (hand) => {

}

/**
 * A function that check if the hand meets any win condition
 * @param  hand {array} array of cards in hand
 * @return outcome {object} which condition did the hand meet
 */
const evaluateWin = (hand) => {
  hand.sort((a, b) => a.rank - b.rank);
  // royal flush
  console.log('xxxxx', hand, hasFlush(hand));
  if (
    hasFlush(hand) === true &&
    hand[0].name === 'ace' &&
    hand[4].name === 'king'
  ) {
    let straightCounter = 0;
    for (let i = 2; i < 5; i += 1) {
      if (hand[i].rank - hand[i - 1].rank === 1) {
        straightCounter += 1;

        if (straightCounter === 3) {
          royalFlush = true;
          outcome['royalFlush'] = 1;
        } else {
          royalFlush = false;
        }
        console.log(`royalFlush`, royalFlush);
      }
    }
  }
  // straight flush
  console.log(hand);
  console.log(`hasFlush(hand)`, hasFlush(hand));
  console.log(`hasStraight(hand)`, hasStraight(hand));
  if (hasFlush(hand) === true && hasStraight(hand) === true) {
    straightFlush = true;
    outcome['straightFlush'] = 1;
    console.log(`straightFlush`, straightFlush);
  }
  if (hasFlush(hand) === true) {
    flush = true;
    outcome['flush'] = 1;
    console.log(`flush`, flush);
  }
  return outcome;
};

let straits = makeDeck().slice(15, 20);
console.log(`straits`, straits);
console.log(` Straight outcome`, hasStraight(straits));
console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
let royalty = makeDeck().slice(9, 13);
royalty.push(makeDeck()[0]);
console.log(`royalty`, royalty);
console.log(`$$$$$$$$$$$$$$$$$$$$$$$$$$`);
console.log(`Royal Flush outcome`, hasRoyalFlush(royalty));
