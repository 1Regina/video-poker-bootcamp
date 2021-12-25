// low bet
const betStandard = {
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


const betPower = {
  flushRoyal: 375,
  flushStraight: 225,
  kindOfFour: 150,
  houseFull: 120,
  flushClassic: 90,
  straight: 68,
  kindOfThree: 48,
  pairDual: 38,
  pairSolo: 15,
  lose: -10,
};


const betDouble = {
  flushRoyal: 500,
  flushStraight: 300,
  kindOfFour: 200,
  houseFull: 160,
  flushClassic: 120,
  straight: 90,
  kindOfThree: 64,
  pairDual: 50,
  pairSolo: 20,
  lose: -20,
};


export { betStandard, betPower, betDouble};
