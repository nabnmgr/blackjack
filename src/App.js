import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Blackjack from './components/Blackjack';

function App() {
  return (
    <ChakraProvider>
      <Box textAlign="center" p={4}>
        <Blackjack />
      </Box>
    </ChakraProvider>
  );
}

export default App;
