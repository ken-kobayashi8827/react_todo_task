import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  FormControl,
  Input,
  Button,
  FormLabel,
  useToast,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';

type Inputs = {
  email: string;
  password: string;
};

const SignUp = () => {
  const [authError, setAuthError] = useState<string>('');
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate('/');

      toast({
        title: '登録成功',
        description: 'ユーザーが正常に登録されました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setAuthError('すでに登録済みです');
            break;
          case 'auth/invalid-email':
            setAuthError('正しいメールアドレスを入力してください');
            break;
          default:
            setAuthError(error.message);
        }
      } else {
        console.log('Firebase Authentication エラー:', error);
      }
    }
  };

  return (
    <div>
      <Heading>ユーザー登録</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl pt='2'>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            fontSize='xl'
            fontWeight='bold'
            borderColor='black'
            mb='2'
            type='email'
            placeholder='example@example.com'
            {...register('email', {
              required: { value: true, message: '必須項目です' },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: '入力されたメールアドレスの形式が正しくありません',
              },
            })}
          />
          {errors.email && (
            <Text pl='2' color='red'>
              {errors.email.message}
            </Text>
          )}
        </FormControl>
        <FormControl pt='2'>
          <FormLabel>パスワード</FormLabel>
          <Input
            fontSize='xl'
            fontWeight='bold'
            borderColor='black'
            mb='2'
            type='password'
            placeholder='パスワード'
            {...register('password', {
              required: { value: true, message: '必須項目です' },
              minLength: { value: 8, message: '8文字以上で入力してください' },
              maxLength: { value: 20, message: '20文字以内で入力してください' },
            })}
          />
          {errors.password && (
            <Text pl='2' color='red'>
              {errors.password.message}
            </Text>
          )}
        </FormControl>
        {authError && (
          <Text pl='2' color='red'>
            {authError}
          </Text>
        )}
        <Button type='submit' w='100%' mt='2' colorScheme='teal'>
          登録
        </Button>
        <Link to={'/login'}>
          <Button w='100%' mt='2' colorScheme='blue'>
            ログイン
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
