import { loadData22 } from "./utils.ts";

type Deck = number[];

function parse(data: string[]): [Deck, Deck] {
  const deck1 = data.slice(1, 26).map((v) => parseInt(v)).reverse();
  const deck2 = data.slice(27, 53).map((v) => parseInt(v)).reverse();
  return [deck1, deck2];
}

function play1(decks: [Deck, Deck]) {
  const [deck1, deck2] = decks;
  while (deck1.length > 0 && deck2.length > 0) {
    const card1 = deck1.pop()!, card2 = deck2.pop()!;
    if (card1 > card2) {
      deck1.unshift(card2, card1);
    } else {
      deck2.unshift(card1, card2);
    }
  }
  const winner = deck1.length > 0 ? deck1 : deck2;
  return winner.reduce((acc, card, i) => acc + (i + 1) * card, 0);
}

function play2(decks: [Deck, Deck]) {
  const playRecursive = (deck1: Deck, deck2: Deck): number => {
    const previous = new Set<string>();
    const detectLoop = (deck1: Deck, deck2: Deck) => {
      const state = `${deck1.join("-")} + ${deck2.join("-")}`;
      if (previous.has(state)) {
        return true;
      } else {
        previous.add(state);
        return false;
      }
    };
    while (deck1.length > 0 && deck2.length > 0) {
      if (detectLoop(deck1, deck2)) {
        return 1;
      }
      const card1 = deck1.pop()!, card2 = deck2.pop()!;
      let winner = card1 > card2 ? 1 : 2;
      if (card1 <= deck1.length && card2 <= deck2.length) {
        winner = playRecursive(
          deck1.slice(deck1.length - card1),
          deck2.slice(deck2.length - card2),
        );
      }
      if (winner === 1) {
        deck1.unshift(card2, card1);
      } else {
        deck2.unshift(card1, card2);
      }
    }
    return deck1.length > 0 ? 1 : 2;
  };

  playRecursive(decks[0], decks[1]);
  const winner = decks[0].length > 0 ? decks[0] : decks[1];
  return winner.reduce((acc, card, i) => acc + (i + 1) * card, 0);
}

const data = await loadData22();
const result1 = play1(parse(data));
const result2 = play2(parse(data));

console.log(`RESULT FOR PUZZLE 1: ${result1}`);
console.log(`RESULT FOR PUZZLE 2: ${result2}`);
