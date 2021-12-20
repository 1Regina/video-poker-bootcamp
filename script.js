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

// GLOBAL VARIABLES
let hand = [];
var cardNameTally = {};
var cardSuitTally = {};
let counterDuplicates = {};
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
  const symbol = ['♥', '♦', '♣', '♠'];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

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
const checkDuplicateNames = (hand) => {
  let sortHand = hand.sort();
  // Loop over hand
  for (let i = 0; i < sortHand.length; i += 1) {
    let cardName = sortHand[i].name;
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
// check for one pair scenario
// const isOnePair = (hand) => {
//   let summary = checkDuplicateNames(hand);
//   if (summary['pars'] === 1) {
//     return true;
//   }
// };

/**
 * A function that check hand for same suit
 * @param  hand {array} array of cards in hand
 * @return {bool} true if the hand is of the same suit
 */
const checkFlush = (hand) => {
  let sortHand = hand.sort();
  // Loop over hand
  for (let i = 0; i < sortHand.length; i += 1) {
    let cardSuit = sortHand[i].suit;
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
    if (cardSuitTally[key] === 5) {
      counterFlush += 1;
      // console.log(`There a flush of ${cardSuitTally[key]} in hand`);
      console.log(`There a flush of ${sortHand[0].suit} in hand`);
      console.log(`counterFlush`, counterFlush);
      flush = true;
    } else {
      flush = false;
    }
  }
  return flush;
};

/**
 * A function that check if every card is sequential
 * @param  hand {array} array of cards in hand
 * @return {bool} true if the cards are in sequential order
 */
const checkStraight = (hand) => {
  let sortHand = hand.sort();
  // Loop over hand
  for (let i = 0; i < sortHand.length; i += 1) {
    if (sortHand[i + 1].rank - sortHand[i].rank === 1) {
      straight = true;
    } else {
      straight = false;
    }
    return straight;
  }
};
