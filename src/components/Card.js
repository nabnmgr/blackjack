import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Box, Text } from '@chakra-ui/react';
import { GiClubs, GiDiamonds, GiHearts, GiSpades } from 'react-icons/gi';

const suitIcons = {
  clubs: <GiClubs size="2em" />,
  diamonds: <GiDiamonds size="2em" color="red" />,
  hearts: <GiHearts size="2em" color="red" />,
  spades: <GiSpades size="2em" />,
};

const Card = ({ data, index }) => {
  const cardEl = useRef(null);
  const color =
    data.suit === 'diamonds' || data.suit === 'hearts' ? 'red' : 'black';

  useEffect(() => {
    gsap.set(cardEl.current, {
      visibility: 'hidden',
      x: 500,
      y: -200,
      rotate: Math.sin(index + 5) * 5,
    });

    gsap.to(cardEl.current, {
      autoAlpha: 1,
      x: 1 * index * 60,
      y: 0,
      ease: 'power4.out',
      duration: 0.6,
    });
  }, []);

  return (
    <Box
      className="player-card"
      h="300px"
      w="200px"
      bg="white"
      borderRadius="md"
      boxShadow="md"
      position="absolute"
      visibility="hidden"
      ref={cardEl}
    >
      <div
        className="corner-label top"
        style={{ position: 'absolute', top: '5px', left: '10px' }}
      >
        <Text
          className="label"
          fontSize="24px"
          fontWeight="extrabold"
          color={color}
        >
          {data.rank}
        </Text>
        <div className="suit">{suitIcons[data.suit]}</div>
      </div>
      <div
        className="corner-label bottom"
        style={{
          position: 'absolute',
          bottom: '5px',
          right: '10px',
          transform: 'rotate(180deg)',
        }}
      >
        <Text
          className="label"
          fontSize="24px"
          fontWeight="extrabold"
          color={color}
        >
          {data.rank}
        </Text>
        <div className="suit">{suitIcons[data.suit]}</div>
      </div>
    </Box>
  );
};

export default Card;
