import React, { useState, useEffect } from 'react';
import { Box, Stack, Button, Text } from '@chakra-ui/react';
import gsap from 'gsap';
import _ from 'lodash';
import Deck from './Deck';
import Card from './Card';
import ScoreHistory from './ScoreHistory';

const Blackjack = () => {
  const [cards, setCards] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [outcome, setOutcome] = useState(null);
  const [scoreHistory, setScoreHistory] = useState([]);

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
    } else if (cards.length === 51) {
      gsap.delayedCall(0.3, hitCard);
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
      setOutcome('Blackjack');
    } else if (currentTotal > 21) {
      setOutcome('Busted');
    }
  }, [currentTotal]);

  const handleNewGame = () => {
    // move the cards on hand to the back.
    const cardsToGoBack = _.shuffle(playerHand);
    setCards([...cards, ...cardsToGoBack]);
    setPlayerHand([]);

    setScoreHistory([...scoreHistory, currentTotal]);
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
        m={10}
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

      <Box
        className="score-wrapper"
        position="relative"
        width="500px"
        margin="auto"
      >
        {outcome && (
          <Text
            className="outcome-label"
            fontSize="4em"
            fontWeight="extrabold"
            position="absolute"
            color={outcome === 'Busted' ? 'red.500' : 'black'}
            top="-190px"
          >
            {outcome}
          </Text>
        )}

        <Text
          className="total-value"
          fontSize="4em"
          fontWeight="extrabold"
          position="absolute"
          top="-270px"
          color={outcome === 'Blackjack' ? 'green.600' : 'black'}
          textDecoration={outcome === 'Busted' ? 'line-through' : 'none'}
        >
          {currentTotal}
        </Text>
      </Box>

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
          disabled={outcome || playerHand.length < 2}
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

      {scoreHistory.length > 0 && <ScoreHistory scores={scoreHistory} />}
    </Box>
  );
};

export default Blackjack;
