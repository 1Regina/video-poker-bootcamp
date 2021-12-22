// ********************//
// GLOBAL VARIABLES//
let hand = [];
let holdAray = [];
var cardNameTally = {};
var cardSuitTally = {};
// let counterDuplicates = {};
// let outcome = {};
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
let credits = 100;
// default initial hold status of cards
let allCards = [0, 0, 0, 0, 0];

// ********************//
// HELPER FUNCTIONS //
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
    let currentCard = cardDeck[cardIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[cardIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
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

// ********************//
//WINING CONDITIONS //
// FLUSHES//
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
 * A function that check if the hand is royal flush
 * @param  hand {array} array of cards in hand
 * @return {bool} true if the hand is a royal flush
 */
const hasRoyalFlush = (hand) => {
  hand.sort((a, b) => a.rank - b.rank);
  // royal flush
  if (
    hasFlush(hand) === true &&
    hand[0].name === 'ace' &&
    hand[4].name === 'king'
  ) {
    royalFlush = true;
    // outcome['royalFlush'] = 1;
  } else {
    royalFlush = false;
  }
  console.log(`royalFlush`, royalFlush);
  return royalFlush;
};

/**
 * A function that check if the hand is straight flush
 * @param  hand {array} array of cards in hand
 * @return {bool} true if the hand is a straight flush
 */
const hasStraightFlush = (hand) => {
  hand.sort((a, b) => a.rank - b.rank);
  // straight flush
  console.log(`aa`, hasFlush(hand));
  console.log(`ab`, hasStraight(hand));
  if (hasFlush(hand) === true && hasStraight(hand) === true) {
    straightFlush = true;
  } else {
    straightFlush = false;
  }
  console.log(`straightFlush`, straightFlush);
  return straightFlush;
};

// PAIRS & SAME KIND//
/**
 * A function that summarizes the hand for duplicates
 * @param  hand {array} array of cards in hand
 * @return {object} which summarize the number of pairs and triples in hand
 */
const hasDuplicateNames = (hand) => {
  cardNameTally = {};
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
  console.log(`cardNameTally`, cardNameTally);
  return counterDuplicates;
};

/**
 * A function that check if it is one pair
 * @param  hand {array} array of cards in hand
 * @return {bool} true if hand has a pair
 */
const hasOnePair = (hand) => {
  cardNameTally = {};
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
  // initialise the count of pairs in hand
  let counterPairs = 0;
  for (const key in cardNameTally) {
    if (cardNameTally[key] === 2) {
      counterPairs += 1;
    }
  }
  if (counterPairs === 1) {
    return (onePair = true);
  } else {
    onePair = false;
  }
  console.log(`cardNameTally`, cardNameTally);
  return onePair;
};

/**
 * A function that check if it has 2 pairs
 * @param  hand {array} array of cards in hand
 * @return {bool} true if hand has 2 pairs
 */
const hasTwoPairs = (hand) => {
  cardNameTally = {};
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
  // initialise the count of pairs in hand
  let counterPairs = 0;
  for (const key in cardNameTally) {
    if (cardNameTally[key] === 2) {
      counterPairs += 1;
    }
  }
  if (counterPairs === 2) {
    return (twoPair = true);
  } else {
    twoPair = false;
  }
  console.log(`cardNameTally`, cardNameTally);
  return twoPair;
};

/**
 * A function that check if it is 3 of a kind
 * @param  hand {array} array of cards in hand
 * @return {bool} true if hand has 3 same cards
 */
const hasThreeOfKind = (hand) => {
  cardNameTally = {};
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
  // initialise the count of pairs in hand
  let counter = 0;
  for (const key in cardNameTally) {
    if (cardNameTally[key] === 3) {
      counter += 1;
    }
  }
  if (counter === 1) {
    return (threeOfAKind = true);
  } else {
    threeOfAKind = false;
  }
  console.log(`cardNameTally`, cardNameTally);
  return threeOfAKind;
};

/**
 * A function that check if it is 3 of a kind & a pair (full house)
 * @param  hand {array} array of cards in hand
 * @return {bool} true if hand has a full house
 */
const hasFullHouse = (hand) => {
  if (hasThreeOfKind(hand) === true && hasOnePair(hand) === true) {
    return (fullHouse = true);
  } else {
    fullHouse = false;
  }
  return fullHouse;
};

/**
 * A function that check if it is 4 of a kind
 * @param  hand {array} array of cards in hand
 * @return {bool} true if hand has 4 of a kind
 */
const hasFourOfKind = (hand) => {
  cardNameTally = {};
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
  // initialise the count of pairs in hand
  let counter = 0;
  for (const key in cardNameTally) {
    if (cardNameTally[key] === 4) {
      counter += 1;
    }
  }
  if (counter === 1) {
    return (fourOfAKind = true);
  } else {
    fourOfAKind = false;
  }
  console.log(`cardNameTally`, cardNameTally);
  return fourOfAKind;
};

// ********************//
//SANDBOX TESTING //

// console.log(`!!!!FLUSH TESTING!!!`);
// let straits = makeDeck().slice(15, 20);
// console.log(`straits`, straits);
// let oddStraits = makeDeck().slice(17, 20);
// let oddStraitsA = makeDeck()[2];
// let oddStraitsA1 = makeDeck()[3];
// oddStraits.push(oddStraitsA);
// oddStraits.push(oddStraitsA1);
// console.log(`oddStraits: `, oddStraits);
// console.log(` Straight outcome on straits:`, hasStraight(straits)); // true
// console.log(` Straight outcome on oddStraits:`, hasStraight(oddStraits)); // true
// console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
// console.log(` Straight Flush outcome on straits:`, hasStraightFlush(straits)); //true
// console.log(` Straight Flush on oddStraits:`, hasStraightFlush(oddStraits)); // false
// console.log(`&&&&&&&&&&&&&&&&&&&&&&&&&&&&&`);
let royalty = makeDeck().slice(9, 13);
royalty.push(makeDeck()[0]);
// console.log(`royalty`, royalty);
// console.log(`$$$$$$$$$$$$$$$$$$$$$$$$$$`);
// console.log(`Royal Flush outcome:`, hasRoyalFlush(royalty)); //true

// console.log(`!!!!PAIRS & KINDS TESTING!!!`);
// let twin = makeDeck().slice(31, 35);
// twin.push(makeDeck()[47]);
// console.log(`twin`, twin);
// console.log(`OnePair outcome on twin: `, hasOnePair(twin)); // true

// let twinTwin = makeDeck().slice(32, 35);
// twinTwin.push(makeDeck()[6]);
// twinTwin.push(makeDeck()[47]);
// console.log(`twinTwin`, twinTwin);
// console.log(`TwoPair outcome on twinTwin: `, hasTwoPairs(twinTwin)); // true

// let triple = makeDeck().slice(32, 35);
// triple.push(makeDeck()[8]);
// triple.push(makeDeck()[47]);
// console.log(`triple`, triple);
// console.log(`ThreeOfAKind outcome on triple: `, hasThreeOfKind(triple)); // true

// let fully = makeDeck().slice(33, 35);
// fully.push(makeDeck()[7]);
// fully.push(makeDeck()[47]);
// fully.push(makeDeck()[20]);
// console.log(`fully`, fully);
// console.log(`fullHouse outcome on fully: `, hasFullHouse(fully)); // true

// let quadsi = makeDeck().slice(33, 35);
// quadsi.push(makeDeck()[8]);
// quadsi.push(makeDeck()[47]);
// quadsi.push(makeDeck()[21]);
// console.log(`quasi`, quadsi);
// console.log(`fourOfAKind outcome on quasi: `, hasFourOfKind(quadsi)); // true

console.log(`random test: `, hasFlush(royalty)); // false

// ********************//
// BUTTONS//
const buttonsArea = document.getElementById('choose');
// Start Game Button
const startbutton = document.createElement('button');
startbutton.innerText = 'start';

// startbutton.type = "start"
startbutton.onclick = function () {
  startClick();
};
buttonsArea.appendChild(startbutton);

// Submit Game Button
const submitbutton = document.createElement('button');
submitbutton.innerText = 'submit';

// submitbutton.type = "submit"
submitbutton.onclick = function () {
  evaluateEarnings();
};
buttonsArea.appendChild(submitbutton);

// Reset Game Button
const resetbutton = document.createElement('button');
resetbutton.innerText = 'reset';

// resetbutton.type = "reset"
resetbutton.onclick = function () {
  console.log('reset');
  document.querySelector('#cardsTable').innerHTML = '';
};
buttonsArea.appendChild(resetbutton);

// Swap Cards Button
const swapbutton = document.createElement('button');
swapbutton.innerText = 'swap';

// swapbutton.type = "swap"
// swapbutton.onclick = function () {
//   console.log('swap');
//   document.querySelector('#cardsTable').innerHTML = '';
//   // document.querySelector('#cardsTable').innerHTML = '';
//   diffArray = findDivergence(allCards, cardClick());
// };
// diffArray.forEach((element) => {
//   let newCard = deck.pop()
//   let cardElement = createCard(hand[i]);
//   container.appendChild(cardElement);
// });
// buttonsArea.appendChild(swapbutton);

// ********************//
// SHOW HAND//
// Create a visual card from sample card
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Function to display the created card //
let table = document.getElementById('cardsTable');
const startClick = () => {
  hand = [];
  container = document.createElement('div');
  container.classList.add('card-container');
  container.setAttribute('id', 'cards-container');
  table.appendChild(container);
  for (i = 0; i < allCards.length; i++) {
    hand.push(deck.pop());
    // display each card
    let cardElement = createCard(hand[i]);
    container.appendChild(cardElement);
    // liam elem ID creation step 2
    // assign an ID to each of the items (ie. the cards)
    let cardElem = document.createElement('div');
    cardElem.id = `cardElem${i}`;
    cardElem.setAttribute('data-hold', 0);

    console.log(`aaa`, `cardElement${i}`);

    cardElement.appendChild(cardElem);
    console.log(`document element`, document.getElementById(`cardElem${i}`));
    // add eventListener to each card
    cardElement.addEventListener('click', () => {
      console.log('hello');
      console.log(`ssss`, cardElem);
      let holdStatus = cardElem.getAttribute(`data-hold`);

      if (holdStatus === "0") {
        holdStatus = 1;
        cardElem.setAttribute('data-hold',holdStatus );

        // cardElement.innerText = 'HOLD';
        holdAray.push(holdStatus);
      }
      if (holdStatus === "1") {
        holdStatus = 0;
        cardElem.setAttribute('data-hold', holdStatus);

        holdAray.push(holdStatus);
        // cardElement.innerText = 'SWAP';
      }
      console.log(`ddddd`, holdStatus);
    });
  }

  console.log(`hand created`, hand);
};

// function to hold array of held cards
const cardClick = () => {
  for (i = 0; i < allCards.length; i++) {
    document
      .querySelector(`#cardElem${i + 1}`)
      .addEventListener('click', () => {
        let holdStatus = document.getElementById(`cardElem${index}`).dataset
          .hold;
        if (holdStatus === false) {
          holdStatus = true;
          cardElement.innerText = 'HOLD';
          holdAray.push(holdStatus);
        }
        if (holdStatus === true) {
          holdStatus = false;
          holdAray.push(holdStatus);
          cardElement.innerText = 'SWAP';
        }
      });
  }
  console.log(holdAray);
  return holdAray;
};

// compare 2 arrays to find index where there is a change
var findDivergence = function (a1, a2) {
  var result = [],
    longerLength = a1.length >= a2.length ? a1.length : a2.length;
  for (i = 0; i < longerLength; i++) {
    if (a1[i] !== a2[i]) {
      result.push(i);
    }
  }
  console.log(result);
  return result;
};

a2 = [true, false, true, false, true];
findDivergence(allCards, a2);

// ********************//
//CALCULATE EARNINGS //
const earnings = {
  flushRoyal: 250,
  flushStraight: 150,
  kindOfFour: 100,
  houseFull: 80,
  flushClassic: 60,
  straight: 45,
  kindOfThree: 32,
  pairDual: 25,
  pairSolo: 10,
  lose: -5,
};

/**
 * A function that updates credit on hand
 * @param  hand {array} array of cards in hand
 * @return {number} which reflect the updated credits on hand
 */
const evaluateEarnings = (hand) => {
  hasRoyalFlush(hand);
  hasStraightFlush(hand);
  hasFourOfKind(hand);
  hasFullHouse(hand);
  hasFlush(hand);
  hasStraight(hand);
  hasThreeOfKind(hand);
  hasTwoPairs(hand);
  hasOnePair(hand);

  if (royalFlush === true) {
    credits += earnings.flushRoyal;
  } else if (straightFlush === true) {
    credits += earnings.flushStraight;
  } else if (fourOfAKind === true) {
    credits += earnings.kindOfFour;
  } else if (fullHouse === true) {
    credits += earnings.houseFull;
  } else if (flush === true) {
    credits += earnings.flushClassic;
  } else if (straight === true) {
    credits += earnings.straight;
  } else if (threeOfAKind === true) {
    credits += earnings.kindOfThree;
  } else if (twoPair === true) {
    credits += earnings.pairDual;
  } else if (onePair === true) {
    credits += earnings.pairSolo;
  } else {
    credits -= earnings.lose;
  }
  let displayBal = document.getElementById('wallet');
  displayBal.innerText = credits;
};
