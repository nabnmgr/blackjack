import React, { useState, useEffect } from 'react';
import { Box, Stack, Button } from '@chakra-ui/react';
import Deck from './Deck';
import _ from 'lodash';
import Card from './Card';

const Blackjack = () => {
  const [cards, setCards] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [outcome, setOutcome] = useState(null);

  useEffect(() => {
    const newDeck = new Deck();
    newDeck.createDeck();
    setCards(newDeck.cards);

    console.log('newdeck', newDeck);
  }, []);

  useEffect(() => {
    // starts new cards
    if (cards.length === 52 && currentTotal === 0) {
      setOutcome(null);
      hitCard();
    }
  }, [cards]);

  const handleHit = () => {
    hitCard();
  };

  const hitCard = () => {
    const cardsCopy = [...cards];
    const newCard = cardsCopy.splice(0, 1)[0];
    setPlayerHand([...playerHand, newCard]);
    setCards(cardsCopy);

    let { rank, value } = newCard;
    // Ace to represent 11 if the sum exceeds 21
    if (rank === 'A' && currentTotal <= 10) {
      value = 11;
    }

    setCurrentTotal(currentTotal + value);
  };

  // check score
  useEffect(() => {
    if (currentTotal === 21) {
      console.log('score updated --- BLACKJACK');
      setOutcome('Blackjack');
    } else if (currentTotal > 21) {
      console.log('score updated --- BUSTED');
      setOutcome('Busted');
    }
  }, [currentTotal]);

  const handleNewGame = () => {
    // move the cards on hand to the back.
    const cardsToGoBack = _.shuffle(playerHand);
    setCards([...cards, ...cardsToGoBack]);
    setPlayerHand([]);
    setCurrentTotal(0);
  };

  const handleStick = () => {
    setOutcome('Stick');
  };

  return (
    <Box>
      <Box
        className="player-hand"
        minH="300px"
        position="relative"
        left="-100px"
        d="flex"
        justifyContent="center"
        m={6}
      >
        {playerHand.map(card => {
          return (
            <Card
              key={`${card.suit}-${card.rank}`}
              data={card}
              index={playerHand.length}
            />
          );
        })}
      </Box>

      <div className="total-value">{currentTotal}</div>

      <Stack spacing={4} direction="row" justify="center">
        <Button
          colorScheme="purple"
          onClick={() => handleNewGame()}
          disabled={!outcome}
        >
          New
        </Button>
        <Button
          colorScheme="purple"
          onClick={() => handleHit()}
          disabled={outcome}
        >
          Hit
        </Button>
        <Button
          colorScheme="purple"
          variant="outline"
          onClick={() => handleStick()}
          disabled={outcome}
        >
          Stick
        </Button>
      </Stack>
    </Box>
  );
};

export default Blackjack;
