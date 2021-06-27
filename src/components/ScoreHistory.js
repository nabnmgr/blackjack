import React from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';
import config from '../gameConfig';

const ScoreHistory = ({ scores }) => {
  return (
    <Box my={6}>
      <Stack
        className="score-history"
        spacing={2}
        direction="row"
        justify="center"
      >
        <Text>History:</Text>
        {scores.map((score, index) => {
          if (score === config.blackjack_value) {
            return (
              <Text key={index} color="green.600">
                {score}
              </Text>
            );
          } else {
            return (
              <Text
                key={index}
                color={score > config.blackjack_value ? 'red.500' : 'black'}
              >
                {score}
              </Text>
            );
          }
        })}
      </Stack>
    </Box>
  );
};

export default ScoreHistory;
