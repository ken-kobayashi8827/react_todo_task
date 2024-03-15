import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import {
  FormControl,
  Input,
  Button,
  FormLabel,
  Heading,
  Text,
} from '@chakra-ui/react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <Heading>ログイン</Heading>

      <form onSubmit={handleSubmit}>
        <FormControl pt='2' isRequired>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            fontSize='xl'
            fontWeight='bold'
            borderColor='black'
            mb='2'
            type='email'
            placeholder='example@example.com'
            onChange={handleChangeEmail}
          />
        </FormControl>
        <FormControl pt='2' isRequired>
          <FormLabel>パスワード</FormLabel>
          <Input
            fontSize='xl'
            fontWeight='bold'
            borderColor='black'
            mb='2'
            type='password'
            placeholder='パスワード'
            onChange={handleChangePassword}
          />
        </FormControl>
        <Button type='submit' w='100%' mt='2' colorScheme='teal'>
          ログイン
        </Button>
        <Text>
          ユーザー登録は<Link to={'/signup'}>こちら</Link>から
        </Text>
      </form>
    </div>
  );
};

export default Login;
