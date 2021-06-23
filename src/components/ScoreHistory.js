import React from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';

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
          if (score === 21) {
            return (
              <Text key={index} color="green.600">
                {score}
              </Text>
            );
          } else {
            return (
              <Text key={index} color={score > 21 ? 'red.500' : 'black'}>
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
