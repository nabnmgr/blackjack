import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import Deck from './Deck';

const Blackjack = () => {
  const [cards, setCards] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);

  useEffect(() => {
    const newDeck = new Deck();
    newDeck.createDeck();
    setCards(newDeck.cards);

    console.info('newdeck', newDeck);
  }, []);

  const handleHit = () => {
    setPlayerHand([...playerHand, cards.splice(0, 1)[0]]);
  };

  const getHandTotal = () => {
    return playerHand.reduce((acc, obj) => acc + obj.value, 0);
  };

  return (
    <div>
      <div className="player-hand">
        {playerHand.map(card => {
          return (
            <div key={`${card.suit}-${card.rank}`} className="player-card">
              {card.suit}-{card.rank}
            </div>
          );
        })}
      </div>

      <div className="total-value">{getHandTotal()}</div>

      <Button colorScheme="purple" onClick={() => handleHit()}>
        Hit
      </Button>
    </div>
  );
};

export default Blackjack;
