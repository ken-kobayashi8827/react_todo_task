import { ChakraProvider, theme, Container, Heading } from '@chakra-ui/react';
import Todo from './components/Todo';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Heading
      p='3'
      mb='2'
      size='lg'
      textAlign='center'
      color='white'
      bg='blackAlpha.400'
    >
      【課題】Todoリスト
    </Heading>
    <Container pt='4' pb='10'>
      <Todo />
    </Container>
  </ChakraProvider>
);
