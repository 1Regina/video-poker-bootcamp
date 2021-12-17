import {
  startCredits,
  makeDeck,
  getRandomIndex,
  shuffleCards,
  newHand,
  sum,
} from './modules/transit.js';

console.log(sum(2, 3));

console.log(`a new deck`,shuffleCards(makeDeck()));

console.log(startCredits);

console.log(`hand`, newHand())