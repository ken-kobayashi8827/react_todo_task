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
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [authError, setAuthError] = useState<string>('');
  const navigate = useNavigate();
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
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/');
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            setAuthError('正しいメールアドレスの形式で入力してください。');
            break;
          case 'auth/user-not-found':
            setAuthError('メールアドレスかパスワードに誤りがあります。');
            break;
          case 'auth/wrong-password':
            setAuthError('メールアドレスかパスワードに誤りがあります。');
            break;
          default:
            setAuthError('メールアドレスかパスワードに誤りがあります。');
            break;
        }
      } else {
        console.log('Firebase Authentication エラー:', error);
      }
    }
  };

  return (
    <div>
      <Heading>ログイン</Heading>

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
        <Button type='submit' w='100%' mt='2' colorScheme='teal'>
          ログイン
        </Button>
        <Link to={'/signup'}>
          <Button w='100%' mt='2' colorScheme='blue'>
            新規登録
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
