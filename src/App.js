import React from 'react';
import { ChakraProvider, Box, Button } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Box textAlign="center" fontSize="xl" p={4}>
        <Button colorScheme="teal">Test</Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;
