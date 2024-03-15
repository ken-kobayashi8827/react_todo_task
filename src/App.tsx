import { ChakraProvider, theme, Container, Heading } from '@chakra-ui/react';
import Todo from './components/Todo';
import { AuthProvider } from './components/context/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <BrowserRouter>
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
          <Routes>
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <Todo />
                </PrivateRoute>
              }
            />
            <Route element={<PublicRoute />}>
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  </ChakraProvider>
);
