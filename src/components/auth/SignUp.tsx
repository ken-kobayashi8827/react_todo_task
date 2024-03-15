import { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  FormControl,
  Input,
  Button,
  FormLabel,
  useToast,
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
    }

    toast({
      title: '登録成功',
      description: 'ユーザーが正常に登録されました',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
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
      <Heading>ユーザー登録</Heading>
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
          登録
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
