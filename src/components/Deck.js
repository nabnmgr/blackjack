import _ from 'lodash';

class Deck {
  constructor() {
    this.cards = [];
  }

  createDeck() {
    const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
    const ranks = [
      'A',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
    ];
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

    let cards = [];

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        let card = {
          rank: ranks[j],
          value: values[j],
          suit: suits[i],
        };
        cards.push(card);
      }
    }

    this.cards = _.shuffle(cards);
  }
}

export default Deck;
